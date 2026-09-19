import type { Db, Param } from "@/lib/db/client";
import { nowIso } from "@/lib/db/client";
import { addDays, daysFromToday, shiftLocal } from "@/lib/dates";

/* ───────────── settings (key/value) ───────────── */

export const SETTING_DEFAULTS: Record<string, string> = {
  bank_beneficiary: "",
  bank_iban: "",
  bank_bic: "",
  deposit_pct: "30",
  balance_due_days: "7",
  quote_valid_days: "7",
  terms_version: "2026-09-19",
  launch_date: "",
  fixed_costs_monthly: "",
  vat_regime: "ordinary",
  target_net_monthly: "10000",
  min_margin_pct: "15",
  card_fee_pct: "2.0",
  card_fee_fixed: "0.25",
  company_legal_name: "",
  company_vat_id: "",
  sender_name: "",
};

export async function getSettings(db: Db): Promise<Record<string, string>> {
  const rows = await db.all<{ key: string; value: string }>("SELECT key, value FROM settings");
  const out = { ...SETTING_DEFAULTS };
  for (const r of rows) out[r.key] = r.value ?? "";
  return out;
}

export async function setSetting(db: Db, key: string, value: string) {
  await db.run("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", key, value);
}

/* ───────────── money maths (integer cents) ───────────── */

export interface Totals {
  net: number;
  vat: number;
  gross: number;
  cost: number;
  margin: number;
}

function totalsSql(table: "quote_items" | "booking_items", fk: "quote_id" | "booking_id", price: string, cost: string) {
  return `SELECT
    COALESCE(SUM(ROUND(COALESCE(qty,1) * COALESCE(${price},0))), 0) AS net,
    COALESCE(SUM(ROUND(COALESCE(qty,1) * COALESCE(${price},0) * COALESCE(vat_rate,0) / 100.0)), 0) AS vat,
    COALESCE(SUM(ROUND(COALESCE(qty,1) * COALESCE(${cost},0))), 0) AS cost
    FROM ${table} WHERE ${fk} = ?`;
}

async function totals(db: Db, sql: string, id: string): Promise<Totals> {
  const r = (await db.first<{ net: number; vat: number; cost: number }>(sql, id)) ?? { net: 0, vat: 0, cost: 0 };
  return { net: r.net, vat: r.vat, gross: r.net + r.vat, cost: r.cost, margin: r.net - r.cost };
}

export const quoteTotals = (db: Db, id: string) => totals(db, totalsSql("quote_items", "quote_id", "unit_price_cents", "unit_cost_cents"), id);
export const bookingTotals = (db: Db, id: string) => totals(db, totalsSql("booking_items", "booking_id", "price_cents", "cost_cents"), id);

/** Money actually received for a booking (paid payments minus completed refunds). */
export async function paidCents(db: Db, bookingId: string): Promise<number> {
  const paid = await db.scalar("SELECT COALESCE(SUM(amount_cents),0) FROM payments WHERE booking_id = ? AND status = 'paid'", bookingId);
  const refunded = await db.scalar("SELECT COALESCE(SUM(amount_cents),0) FROM refunds WHERE booking_id = ? AND status = 'done'", bookingId);
  return paid - refunded;
}

/**
 * Recomputes booking.payment_status from real payments and marks payment-schedule rows paid in due-date order.
 * A booking waiting for payment becomes "confirmed" as soon as anything has been received.
 */
export async function refreshPaymentStatus(db: Db, bookingId: string) {
  const booking = await db.byId<{ status: string }>("bookings", bookingId);
  if (!booking) return;
  const { gross } = await bookingTotals(db, bookingId);
  const paid = await paidCents(db, bookingId);
  const refundsDone = await db.scalar("SELECT COUNT(*) FROM refunds WHERE booking_id = ? AND status = 'done'", bookingId);
  let paymentStatus = gross > 0 && paid >= gross ? "paid" : paid > 0 ? "partial" : "unpaid";
  if (booking.status === "cancelled" && paid <= 0 && refundsDone > 0) paymentStatus = "refunded";

  let remaining = Math.max(paid, 0);
  const schedule = await db.all<{ id: string; amount_cents: number }>("SELECT id, amount_cents FROM payment_schedules WHERE booking_id = ? ORDER BY due_date, rowid", bookingId);
  const stmts: [string, ...Param[]][] = [];
  for (const s of schedule) {
    const covered = remaining >= s.amount_cents;
    if (covered) remaining -= s.amount_cents;
    stmts.push(["UPDATE payment_schedules SET status = ? WHERE id = ?", covered ? "paid" : "due", s.id]);
  }
  const nextStatus = booking.status === "pending_payment" && paid > 0 ? "confirmed" : booking.status;
  stmts.push(["UPDATE bookings SET payment_status = ?, status = ? WHERE id = ?", paymentStatus, nextStatus, bookingId]);
  await db.batch(stmts);
}

/** Money still to collect on live bookings: booking total (incl. VAT) minus what has been received, never negative. */
export const RECEIVABLES_SQL = `SELECT COALESCE(SUM(g - p), 0) FROM (
  SELECT
    COALESCE((SELECT SUM(ROUND(COALESCE(qty,1) * COALESCE(price_cents,0) * (1 + COALESCE(vat_rate,0) / 100.0))) FROM booking_items WHERE booking_id = b.id), 0) AS g,
    COALESCE((SELECT SUM(amount_cents) FROM payments WHERE booking_id = b.id AND status = 'paid'), 0)
      - COALESCE((SELECT SUM(amount_cents) FROM refunds WHERE booking_id = b.id AND status = 'done'), 0) AS p
  FROM bookings b WHERE b.status != 'cancelled'
) WHERE g > p`;

/* ───────────── dashboard ───────────── */

export interface DashboardStats {
  newLeads: number;
  oldestNewLeadAt: string | null;
  /** hours the oldest unanswered lead has been waiting (0 when none) */
  oldestLeadHours: number;
  quotesAwaiting: number;
  quotesDraft: number;
  upcoming7: number;
  receivables: number;
  overdueSchedules: number;
  docsExpiring: number;
  docsExpired: number;
  tasksDue: number;
  payoutsDue: number;
  openIncidents: number;
  blockCutoffs: number;
}

export async function dashboardStats(db: Db, today: string, in7: string, in30: string): Promise<DashboardStats> {
  const in14 = addDays(today, 14);
  const [newLeads, oldest, awaiting, draft, upcoming7, sched, overdue, docsExpiring, docsExpired, tasksDue, payoutsDue, openIncidents, blockCutoffs] = await Promise.all([
    db.scalar("SELECT COUNT(*) FROM leads WHERE status = 'new'"),
    db.first<{ at: string | null }>("SELECT MIN(created_at) AS at FROM leads WHERE status = 'new'"),
    db.scalar("SELECT COUNT(*) FROM quotes WHERE status = 'sent'"),
    db.scalar("SELECT COUNT(*) FROM quotes WHERE status = 'draft'"),
    db.scalar("SELECT COUNT(*) FROM bookings WHERE status IN ('confirmed','pending_payment','in_progress') AND substr(service_start,1,10) BETWEEN ? AND ?", today, in7),
    db.scalar(RECEIVABLES_SQL),
    db.scalar("SELECT COUNT(*) FROM payment_schedules WHERE status != 'paid' AND due_date < ? AND booking_id IN (SELECT id FROM bookings WHERE status != 'cancelled')", today),
    db.scalar("SELECT COUNT(*) FROM supplier_documents WHERE valid_to IS NOT NULL AND valid_to != '' AND valid_to >= ? AND valid_to <= ?", today, in30),
    db.scalar("SELECT COUNT(*) FROM supplier_documents WHERE valid_to IS NOT NULL AND valid_to != '' AND valid_to < ?", today),
    db.scalar("SELECT COUNT(*) FROM tasks WHERE done_at IS NULL AND (due_at IS NULL OR substr(due_at,1,10) <= ?)", today),
    db.scalar("SELECT COUNT(*) FROM supplier_payouts WHERE status = 'pending'"),
    db.scalar("SELECT COUNT(*) FROM incidents WHERE resolved_at IS NULL OR resolved_at = ''"),
    db.scalar("SELECT COUNT(*) FROM room_blocks WHERE status IN ('requested','confirmed') AND cutoff_date IS NOT NULL AND cutoff_date >= ? AND cutoff_date <= ?", today, in14),
  ]);
  return {
    newLeads,
    oldestNewLeadAt: oldest?.at ?? null,
    oldestLeadHours: oldest?.at ? Math.floor((Date.now() - Date.parse(oldest.at)) / 3600_000) : 0,
    quotesAwaiting: awaiting,
    quotesDraft: draft,
    upcoming7,
    receivables: sched,
    overdueSchedules: overdue,
    docsExpiring,
    docsExpired,
    tasksDue,
    payoutsDue,
    openIncidents,
    blockCutoffs,
  };
}

/** Standard SOP tasks generated when a booking is created (times relative to the service start, Rome time). */
export async function createSopTasks(db: Db, bookingId: string, ref: string, serviceStart: string | null) {
  if (!serviceStart) return;
  const start = serviceStart.includes("T") ? serviceStart : `${serviceStart}T09:00`;
  const rows: [string, number][] = [
    ["Confirm supplier, vehicle and driver details in writing", -72],
    ["Send customer the voucher + driver contact; re-check flight/train number", -24],
    ["Live check: driver en route, flight status, meeting point", -3],
    ["Post-service: confirm completion, ask for review, log any incident", 24],
    ["Issue invoice and schedule supplier payout", 48],
  ];
  const stmts: [string, ...Param[]][] = rows.map(([title, h]) => [
    "INSERT INTO tasks (id, entity_type, entity_id, kind, title, due_at, created_at) VALUES (?, 'booking', ?, 'sop', ?, ?, ?)",
    crypto.randomUUID(),
    bookingId,
    `[${ref}] ${title}`,
    shiftLocal(start, h),
    nowIso(),
  ]);
  await db.batch(stmts);
}

/** What a customer should pay right now: the running total of the schedule minus what was already paid. */
export async function amountDueNow(db: Db, bookingId: string): Promise<{ gross: number; paid: number; due: number }> {
  const { gross } = await bookingTotals(db, bookingId);
  const paid = await paidCents(db, bookingId);
  if (paid >= gross) return { gross, paid, due: 0 };
  const schedule = await db.all<{ amount_cents: number }>("SELECT amount_cents FROM payment_schedules WHERE booking_id = ? ORDER BY due_date, rowid", bookingId);
  let running = 0;
  for (const s of schedule) {
    running += s.amount_cents;
    if (running > paid) return { gross, paid, due: Math.min(running, gross) - paid };
  }
  return { gross, paid, due: gross - paid };
}

/**
 * Payment chasers without a scheduler: whenever the dashboard/tasks page is opened, every unpaid milestone that is
 * 1, 3, 5 or 7 days overdue gets exactly one task (blueprint §21.4 "failed payments"); tasks for milestones that have
 * since been paid are closed. Idempotent — the task kind encodes schedule id + step.
 */
export async function syncReminderTasks(db: Db, today: string) {
  const overdue = await db.all<{ id: string; booking_id: string; milestone: string; due_date: string; ref: string }>(
    `SELECT s.id, s.booking_id, s.milestone, s.due_date, b.ref
     FROM payment_schedules s JOIN bookings b ON b.id = s.booking_id
     WHERE s.status != 'paid' AND b.status != 'cancelled' AND s.due_date < ? LIMIT 200`,
    today,
  );
  for (const r of overdue) {
    const late = -daysFromToday(r.due_date);
    for (const step of [1, 3, 5, 7]) {
      if (late < step) continue;
      const kind = `chase:${r.id}:${step}`;
      if (await db.first("SELECT id FROM tasks WHERE kind = ?", kind)) continue;
      const title =
        step === 7
          ? `[${r.ref}] "${r.milestone}" unpaid for 7 days — release the held services or cancel the booking`
          : `[${r.ref}] Payment reminder D+${step}: "${r.milestone}" is overdue`;
      await db.insert("tasks", { entity_type: "booking", entity_id: r.booking_id, kind, title, due_at: `${today}T09:00` });
    }
  }
  await db.run(
    "UPDATE tasks SET done_at = ? WHERE done_at IS NULL AND kind LIKE 'chase:%' AND substr(kind, 7, 36) IN (SELECT id FROM payment_schedules WHERE status = 'paid')",
    nowIso(),
  );
}
