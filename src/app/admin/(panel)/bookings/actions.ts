"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb, makeToken, nowIso, type Db, type Param } from "@/lib/db/client";
import { addDays, hoursUntil, todayRome } from "@/lib/dates";
import { planSchedule } from "@/lib/admin/schedule";
import { toCents } from "@/lib/money";
import { bookingTotals, getSettings, paidCents, refreshPaymentStatus } from "@/lib/admin/stats";
import { flashUrl } from "@/lib/admin/urls";
import { POLICY_TEXT, policyKind } from "@/lib/policy";
import { mailConfigured, sendMail } from "@/lib/mail";
import { refundPaymentIntent, stripeEnabled } from "@/lib/stripe";
import { absoluteUrl, site } from "@/config/site";

async function ctx(id: string) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const booking = await db.byId<Record<string, string | null>>("bookings", id);
  if (!booking) redirect("/admin/bookings");
  return { db, booking, here: `/admin/bookings/${id}` };
}

/* ───────────── payments ───────────── */

const METHODS = ["bank_transfer", "cash", "card_terminal", "paypal", "other"];

export async function recordPayment(id: string, formData: FormData) {
  const { db, here } = await ctx(id);
  const amount = toCents(String(formData.get("amount") ?? ""));
  const method = String(formData.get("method") ?? "");
  if (amount <= 0) redirect(flashUrl(here, "err", "Enter the amount received."));
  if (!METHODS.includes(method)) redirect(flashUrl(here, "err", "Choose a payment method."));

  const { gross } = await bookingTotals(db, id);
  const paid = await paidCents(db, id);
  if (paid + amount > gross) redirect(flashUrl(here, "err", "That is more than the outstanding balance. Check the amount."));

  const date = String(formData.get("date") ?? "").slice(0, 10) || todayRome();
  await db.insert("payments", {
    booking_id: id,
    provider: method,
    provider_ref: String(formData.get("reference") ?? "").trim().slice(0, 120) || null,
    kind: "payment",
    amount_cents: amount,
    status: "paid",
    paid_at: `${date}T12:00:00.000Z`,
    note: String(formData.get("note") ?? "").trim().slice(0, 300) || null,
  });
  await refreshPaymentStatus(db, id);
  await db.audit("payment_recorded", "bookings", id, { amount, method });
  redirect(flashUrl(here, "ok", "Payment recorded"));
}

/** Rebuilds the whole payment schedule from the current lines (use after changing them). Payments already received stay and are re-allocated. */
export async function rebuildSchedule(id: string, formData: FormData) {
  const { db, booking, here } = await ctx(id);
  const pctRaw = Number(String(formData.get("deposit_pct") ?? ""));
  const depositPct = Number.isFinite(pctRaw) && pctRaw > 0 && pctRaw <= 100 ? pctRaw : undefined;
  const settings = await getSettings(db);
  const { gross } = await bookingTotals(db, id);
  const types = (await db.all<{ service_type: string | null }>("SELECT service_type FROM booking_items WHERE booking_id = ?", id)).map((r) => r.service_type);
  const plan = planSchedule({
    types,
    gross,
    start: booking.service_start,
    today: todayRome(),
    depositPct,
    fallbackDepositPct: Number(settings.deposit_pct) || 30,
    fallbackBalanceDays: Number(settings.balance_due_days) || 7,
  });
  const stmts: [string, ...Param[]][] = [["DELETE FROM payment_schedules WHERE booking_id = ?", id]];
  for (const m of plan) stmts.push(db.insertStmt("payment_schedules", { booking_id: id, milestone: m.milestone, due_date: m.due, amount_cents: m.amount, status: "due" }).stmt);
  await db.batch(stmts);
  await refreshPaymentStatus(db, id); // re-allocates what was already paid across the new milestones
  redirect(flashUrl(here, "ok", "Payment schedule rebuilt"));
}

/* ───────────── invoices ───────────── */

async function nextInvoiceNumber(db: Db, year: string): Promise<string> {
  const last = await db.first<{ number: string }>("SELECT number FROM invoices WHERE number LIKE ? ORDER BY number DESC LIMIT 1", `${year}/%`);
  const n = last ? parseInt(last.number.split("/")[1], 10) || 0 : 0;
  return `${year}/${String(n + 1).padStart(4, "0")}`;
}

export async function issueInvoice(id: string, formData: FormData) {
  const { db, booking, here } = await ctx(id);
  const existing = await db.first("SELECT id FROM invoices WHERE booking_id = ? AND kind = 'invoice'", id);
  if (existing) redirect(flashUrl(here, "err", "An invoice was already issued for this booking."));
  const t = await bookingTotals(db, id);
  if (t.gross <= 0) redirect(flashUrl(here, "err", "Nothing to invoice yet."));

  const regime = String(formData.get("vat_regime") ?? "ordinary") === "margin_74ter" ? "margin_74ter" : "ordinary";
  const customerName = String(formData.get("customer_name") ?? "").trim() || booking.customer_name || "";
  const org = booking.organization_id ? await db.byId<{ vat_id: string | null }>("organizations", booking.organization_id) : null;
  const today = todayRome();

  let created = "";
  for (let attempt = 0; attempt < 4 && !created; attempt++) {
    const number = await nextInvoiceNumber(db, today.slice(0, 4));
    try {
      created = await db.insert("invoices", {
        booking_id: id,
        organization_id: booking.organization_id,
        number,
        kind: "invoice",
        vat_regime: regime,
        // Under the 74-ter margin scheme VAT is not shown on the invoice; the accountant computes it on the margin.
        net_cents: regime === "margin_74ter" ? t.gross : t.net,
        vat_cents: regime === "margin_74ter" ? 0 : t.vat,
        total_cents: t.gross,
        sdi_status: "not_sent",
        issued_on: today,
        customer_name: customerName,
        customer_vat: String(formData.get("customer_vat") ?? "").trim() || org?.vat_id || null,
        customer_address: String(formData.get("customer_address") ?? "").trim() || null,
        notes: regime === "margin_74ter" ? "Operazione in regime speciale art. 74-ter — confirm wording with your accountant." : null,
      });
    } catch (e) {
      if (!(e instanceof Error && /UNIQUE/i.test(e.message))) throw e; // number clash → try the next number
    }
  }
  if (!created) redirect(flashUrl(here, "err", "Could not allocate an invoice number. Try again."));
  await db.update("bookings", id, { invoice_status: "issued" });
  await db.audit("invoice_issued", "invoices", created);
  redirect(flashUrl(`/admin/invoices/${created}`, "ok", "Invoice record created"));
}

/* ───────────── supplier payouts ───────────── */

export async function generatePayouts(id: string) {
  const { db, here } = await ctx(id);
  const rows = await db.all<{ supplier_id: string; cost: number; last: string | null; terms: number | null }>(
    `SELECT bi.supplier_id AS supplier_id, SUM(ROUND(COALESCE(bi.qty,1) * COALESCE(bi.cost_cents,0))) AS cost,
            MAX(substr(COALESCE(bi.pickup_at, ''), 1, 10)) AS last, s.payout_terms_days AS terms
     FROM booking_items bi JOIN suppliers s ON s.id = bi.supplier_id
     WHERE bi.booking_id = ? AND bi.supplier_id IS NOT NULL GROUP BY bi.supplier_id`,
    id,
  );
  const booking = await db.byId<{ service_start: string | null }>("bookings", id);
  let created = 0;
  for (const r of rows) {
    if (r.cost <= 0) continue;
    const exists = await db.first("SELECT id FROM supplier_payouts WHERE booking_id = ? AND supplier_id = ? AND status != 'cancelled'", id, r.supplier_id);
    if (exists) continue;
    const base = r.last || booking?.service_start?.slice(0, 10) || todayRome();
    await db.insert("supplier_payouts", { supplier_id: r.supplier_id, booking_id: id, amount_cents: r.cost, due_on: addDays(base, r.terms ?? 15), status: "pending" });
    created++;
  }
  redirect(flashUrl(here, created ? "ok" : "err", created ? `${created} payout(s) created` : "No new payouts (assign suppliers and costs to lines first, or they already exist)."));
}

/* ───────────── completion, cancellation, refunds ───────────── */

export async function completeBooking(id: string) {
  const { db, booking, here } = await ctx(id);
  if (booking.status === "cancelled") redirect(flashUrl(here, "err", "This booking is cancelled."));
  await db.update("bookings", id, { status: "completed" });
  await db.run("UPDATE booking_items SET supplier_status = 'done' WHERE booking_id = ? AND supplier_status = 'confirmed'", id);
  const review = await db.first("SELECT id FROM reviews WHERE booking_id = ?", id);
  if (!review) await db.insert("reviews", { booking_id: id, token: makeToken(), requested_at: nowIso() });
  // Repeat-sales rhythm (SOP 17): check in with the customer at 60 / 120 / 300 days.
  if (!(await db.first("SELECT id FROM tasks WHERE entity_type = 'booking' AND entity_id = ? AND kind = 'reactivation'", id))) {
    for (const days of [60, 120, 300]) {
      await db.insert("tasks", {
        entity_type: "booking",
        entity_id: id,
        kind: "reactivation",
        title: `[${booking.ref}] Reactivation check-in (day ${days}): ask about the next trip; offer day trips, a hotel block or wedding logistics`,
        due_at: `${addDays(todayRome(), days)}T09:00`,
      });
    }
  }
  await db.audit("booking_completed", "bookings", id);
  redirect(flashUrl(here, "ok", "Marked as completed. Send the review request and generate supplier payouts."));
}

export async function cancelBooking(id: string, formData: FormData) {
  const { db, booking, here } = await ctx(id);
  if (booking.status === "cancelled") redirect(flashUrl(here, "err", "Already cancelled."));
  const items = await db.all<{ service_type: string | null; pickup_at: string | null }>("SELECT service_type, pickup_at FROM booking_items WHERE booking_id = ?", id);
  const start = items.map((i) => i.pickup_at).filter(Boolean).sort()[0] ?? booking.service_start;
  const hours = start ? hoursUntil(start) : 0;
  const paid = await paidCents(db, id);

  const refundable = Math.min(Math.max(toCents(String(formData.get("refund") ?? "")), 0), Math.max(paid, 0));
  const penalty = Math.max(toCents(String(formData.get("penalty") ?? "")), 0);
  const kinds = [...new Set(items.map((i) => policyKind(i.service_type)))];
  const policy = kinds.map((k) => POLICY_TEXT[k]).join(" | ");

  const cancellation = db.insertStmt("cancellations", {
    booking_id: id,
    requested_at: nowIso(),
    reason: String(formData.get("reason") ?? "").trim().slice(0, 500) || null,
    hours_before: Math.round(hours * 10) / 10,
    policy,
    refundable_cents: refundable,
    supplier_penalty_cents: penalty,
    status: "confirmed",
  });
  const stmts: [string, ...Param[]][] = [
    cancellation.stmt,
    ["UPDATE bookings SET status = 'cancelled' WHERE id = ?", id],
    ["UPDATE tasks SET done_at = ? WHERE entity_type = 'booking' AND entity_id = ? AND kind = 'sop' AND done_at IS NULL", nowIso(), id],
    ["UPDATE supplier_payouts SET status = 'cancelled' WHERE booking_id = ? AND status = 'pending'", id],
  ];
  if (refundable > 0) stmts.push(db.insertStmt("refunds", { cancellation_id: cancellation.id, booking_id: id, amount_cents: refundable, status: "pending" }).stmt);
  await db.batch(stmts);
  await db.audit("booking_cancelled", "bookings", id, { refundable, penalty, hours });
  redirect(flashUrl(here, "ok", refundable > 0 ? "Booking cancelled. Process the refund below (within 14 days, per the policy)." : "Booking cancelled — no refund due."));
}

export async function markRefundDone(bookingId: string, refundId: string, formData: FormData) {
  const { db, here } = await ctx(bookingId);
  const ref = String(formData.get("reference") ?? "").trim().slice(0, 120);
  await db.update("refunds", refundId, { status: "done", refunded_at: nowIso(), provider_ref: ref || null });
  await refreshPaymentStatus(db, bookingId);
  await db.audit("refund_done", "refunds", refundId);
  redirect(flashUrl(here, "ok", "Refund marked as paid"));
}

export async function refundViaStripe(bookingId: string, refundId: string) {
  const { db, here } = await ctx(bookingId);
  if (!stripeEnabled()) redirect(flashUrl(here, "err", "Stripe is not configured."));
  const refund = await db.byId<{ amount_cents: number; status: string }>("refunds", refundId);
  if (!refund || refund.status === "done") redirect(here);
  const pay = await db.first<{ note: string }>(
    "SELECT note FROM payments WHERE booking_id = ? AND provider = 'stripe' AND status = 'paid' AND amount_cents >= ? ORDER BY paid_at DESC LIMIT 1",
    bookingId,
    refund.amount_cents,
  );
  const pi = pay?.note?.startsWith("pi:") ? pay.note.slice(3) : "";
  if (!pi) redirect(flashUrl(here, "err", "No single card payment large enough to refund from. Refund manually and mark it as paid."));
  try {
    const r = await refundPaymentIntent(pi, refund.amount_cents);
    await db.update("refunds", refundId, { status: "done", refunded_at: nowIso(), provider_ref: r.id });
    await refreshPaymentStatus(db, bookingId);
    await db.audit("refund_stripe", "refunds", refundId, { stripe: r.id });
  } catch (e) {
    redirect(flashUrl(here, "err", `Stripe refused the refund: ${e instanceof Error ? e.message : "unknown error"}`));
  }
  redirect(flashUrl(here, "ok", "Refunded through Stripe"));
}

/* ───────────── customer links ───────────── */

export async function emailBookingLink(id: string, kind: "pay" | "voucher" | "review") {
  const { db, booking, here } = await ctx(id);
  if (!booking.customer_email) redirect(flashUrl(here, "err", "This booking has no customer email."));
  if (!mailConfigured()) redirect(flashUrl(here, "err", "Email is not configured (RESEND_API_KEY / QUOTE_FROM_EMAIL). Copy the link instead."));

  let path = `/pay/${booking.token}`;
  let subject = `Payment details — booking ${booking.ref}`;
  let intro = "Here is your secure payment page (card or bank transfer):";
  if (kind === "voucher") {
    path = `/voucher/${booking.token}`;
    subject = `Your service voucher — booking ${booking.ref}`;
    intro = "Your booking voucher with all service details and our 24/7 contact:";
  } else if (kind === "review") {
    const review = await db.first<{ token: string }>("SELECT token FROM reviews WHERE booking_id = ?", id);
    if (!review) redirect(flashUrl(here, "err", "Mark the booking as completed first."));
    path = `/review/${review.token}`;
    subject = `How was your service? — ${booking.ref}`;
    intro = "Thank you for travelling with us. It takes 20 seconds to tell us how it went:";
  }
  const ok = await sendMail({ to: booking.customer_email, subject, text: `Hello ${booking.customer_name},\n\n${intro}\n${absoluteUrl(path)}\n\n${site.name}` });
  if (!ok) redirect(flashUrl(here, "err", "The email could not be sent. Copy the link instead."));
  await db.audit("email_link", "bookings", id, { kind });
  redirect(flashUrl(here, "ok", `Emailed to ${booking.customer_email}`));
}
