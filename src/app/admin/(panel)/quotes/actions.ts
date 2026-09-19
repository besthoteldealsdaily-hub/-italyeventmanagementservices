"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb, makeRef, makeToken, nowIso, type Param } from "@/lib/db/client";
import { addDays, todayRome } from "@/lib/dates";
import { planSchedule } from "@/lib/admin/schedule";
import { createSopTasks, getSettings, quoteTotals } from "@/lib/admin/stats";
import { mailConfigured, sendMail } from "@/lib/mail";
import { absoluteUrl, site } from "@/config/site";
import { flashUrl } from "@/lib/admin/urls";

export async function createBlankQuote() {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const s = await getSettings(db);
  const id = await db.insert("quotes", {
    ref: makeRef("QT"),
    token: makeToken(),
    title: "New quote",
    contact_name: "Customer",
    status: "draft",
    valid_until: addDays(todayRome(), Number(s.quote_valid_days) || 7),
    terms_version: s.terms_version,
  });
  redirect(`/admin/quotes/${id}`);
}

export async function deleteQuote(id: string) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const booking = await db.first("SELECT id FROM bookings WHERE quote_id = ?", id);
  if (booking) redirect(flashUrl(`/admin/quotes/${id}`, "err", "This quote already became a booking and cannot be deleted."));
  await db.batch([
    ["DELETE FROM quote_items WHERE quote_id = ?", id],
    ["DELETE FROM quotes WHERE id = ?", id],
  ]);
  await db.audit("delete", "quotes", id);
  redirect(flashUrl("/admin/quotes", "ok", "Quote deleted"));
}

export async function setQuoteStatus(id: string, status: string) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const quote = await db.byId<{ valid_until: string | null; status: string }>("quotes", id);
  if (!quote) redirect("/admin/quotes");
  if (!["draft", "sent", "expired", "declined"].includes(status)) redirect(flashUrl(`/admin/quotes/${id}`, "err", "Unknown status."));
  const items = await db.scalar("SELECT COUNT(*) FROM quote_items WHERE quote_id = ?", id);
  if (status === "sent" && items === 0) redirect(flashUrl(`/admin/quotes/${id}`, "err", "Add at least one line before sending."));
  const patch: Record<string, string | null> = { status };
  if (status === "sent" && !quote.valid_until) {
    const s = await getSettings(db);
    patch.valid_until = addDays(todayRome(), Number(s.quote_valid_days) || 7);
  }
  await db.update("quotes", id, patch);
  await db.audit("quote_status", "quotes", id, { status });
  redirect(flashUrl(`/admin/quotes/${id}`, "ok", status === "sent" ? "Marked as sent — share the customer link below." : `Marked as ${status}`));
}

export async function emailQuote(id: string) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const q = await db.byId<Record<string, string | null>>("quotes", id);
  const here = `/admin/quotes/${id}`;
  if (!q) redirect("/admin/quotes");
  if (!q.contact_email) redirect(flashUrl(here, "err", "This quote has no customer email."));
  if (!mailConfigured()) redirect(flashUrl(here, "err", "Email is not configured (RESEND_API_KEY / QUOTE_FROM_EMAIL). Copy the link and send it yourself."));
  const ok = await sendMail({
    to: q.contact_email,
    subject: `Your quote ${q.ref} — ${site.name}`,
    text: `Hello ${q.contact_name},\n\nThank you for your request. Your quote is ready:\n${absoluteUrl(`/quote/${q.token}`)}\n\nYou can review every line and accept it online. The quote is valid until ${q.valid_until ?? "the date shown"}.\n\nAny question — just reply to this email.\n\n${site.name}`,
  });
  if (!ok) redirect(flashUrl(here, "err", "The email could not be sent. Copy the link instead."));
  if (q.status === "draft") await db.update("quotes", id, { status: "sent" });
  await db.audit("quote_emailed", "quotes", id);
  redirect(flashUrl(here, "ok", `Emailed to ${q.contact_email}`));
}

/** Copies an accepted quote into a booking with its payment schedule and SOP tasks. */
export async function convertQuoteToBooking(id: string, formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const here = `/admin/quotes/${id}`;

  const quote = await db.byId<Record<string, string | null>>("quotes", id);
  if (!quote) redirect("/admin/quotes");
  const existing = await db.first<{ id: string }>("SELECT id FROM bookings WHERE quote_id = ?", id);
  if (existing) redirect(`/admin/bookings/${existing.id}`);

  const acceptedOffline = formData.get("accepted_offline") === "on";
  if (quote.status !== "accepted" && !acceptedOffline) {
    redirect(flashUrl(here, "err", "The customer has not accepted online. Tick “accepted offline” only if you have their written confirmation (email/WhatsApp)."));
  }

  const items = await db.all<Record<string, string | number | null>>("SELECT * FROM quote_items WHERE quote_id = ? ORDER BY position, rowid", id);
  if (items.length === 0) redirect(flashUrl(here, "err", "The quote has no lines."));

  const settings = await getSettings(db);
  const totals = await quoteTotals(db, id);
  const dates = items.map((i) => String(i.service_date ?? "")).filter(Boolean).sort();
  const serviceStart = dates[0] ?? null;

  // Explicit deposit % from the form overrides the default schedule for this kind of service.
  const pctRaw = Number(String(formData.get("deposit_pct") ?? ""));
  const depositPct = Number.isFinite(pctRaw) && pctRaw > 0 && pctRaw <= 100 ? pctRaw : undefined;

  const bookingRef = makeRef("BK");
  const booking = db.insertStmt("bookings", {
    ref: bookingRef,
    token: makeToken(),
    quote_id: id,
    organization_id: quote.organization_id,
    customer_name: quote.contact_name,
    customer_email: quote.contact_email,
    customer_phone: quote.contact_phone,
    title: quote.title,
    status: "pending_payment",
    service_start: serviceStart,
    notes: quote.public_notes ? `Quote notes: ${quote.public_notes}` : null,
  });
  const stmts: [string, ...Param[]][] = [booking.stmt];
  items.forEach((it, idx) => {
    stmts.push(
      db.insertStmt("booking_items", {
        booking_id: booking.id,
        position: idx,
        service_type: it.service_type,
        description: it.description,
        supplier_id: it.supplier_id,
        qty: it.qty,
        price_cents: it.unit_price_cents,
        cost_cents: it.unit_cost_cents,
        vat_rate: it.vat_rate,
        pickup_at: it.service_date,
        supplier_status: "requested",
      }).stmt,
    );
  });

  // Payment schedule from the blueprint rules for this kind of service (see lib/admin/schedule.ts).
  const today = todayRome();
  const plan = planSchedule({
    types: items.map((i) => i.service_type as string | null),
    gross: totals.gross,
    start: serviceStart,
    today,
    depositPct,
    fallbackDepositPct: Number(settings.deposit_pct) || 30,
    fallbackBalanceDays: Number(settings.balance_due_days) || 7,
  });
  for (const m of plan) {
    stmts.push(db.insertStmt("payment_schedules", { booking_id: booking.id, milestone: m.milestone, due_date: m.due, amount_cents: m.amount, status: "due" }).stmt);
  }
  stmts.push(["UPDATE quotes SET status = 'accepted', accepted_at = COALESCE(accepted_at, ?) WHERE id = ?", nowIso(), id]);
  await db.batch(stmts);

  await createSopTasks(db, booking.id, bookingRef, serviceStart);
  await db.audit("booking_from_quote", "bookings", booking.id, { quote: quote.ref, offline: acceptedOffline });
  redirect(flashUrl(`/admin/bookings/${booking.id}`, "ok", "Booking created — assign suppliers and send the payment link."));
}
