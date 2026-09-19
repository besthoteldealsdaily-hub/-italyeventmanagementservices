import type { Db } from "@/lib/db/client";
import { hoursUntil } from "@/lib/dates";
import { policyKind, refundRule } from "@/lib/policy";
import { paidCents } from "./stats";

export interface RefundSuggestion {
  hours: number;
  cents: number;
  lines: { description: string; band: string; percent: number | null; cents: number }[];
}

/** What the cancellation policy says we should refund right now, line by line (capped at what was actually paid). */
export async function suggestedRefund(db: Db, bookingId: string): Promise<RefundSuggestion> {
  const items = await db.all<{ description: string; service_type: string | null; pickup_at: string | null; qty: number; price_cents: number; vat_rate: number }>(
    "SELECT description, service_type, pickup_at, qty, price_cents, vat_rate FROM booking_items WHERE booking_id = ?",
    bookingId,
  );
  const booking = await db.byId<{ service_start: string | null }>("bookings", bookingId);
  const paid = await paidCents(db, bookingId);
  const lines = items.map((i) => {
    const when = i.pickup_at || booking?.service_start;
    const rule = refundRule(policyKind(i.service_type), when ? hoursUntil(when) : 0);
    const gross = Math.round(i.qty * i.price_cents * (1 + i.vat_rate / 100));
    return { description: i.description, band: rule.band, percent: rule.percent, cents: rule.percent === null ? 0 : Math.round((gross * rule.percent) / 100) };
  });
  const start = items.map((i) => i.pickup_at).filter(Boolean).sort()[0] ?? booking?.service_start;
  return { hours: start ? hoursUntil(start) : 0, cents: Math.min(lines.reduce((a, l) => a + l.cents, 0), Math.max(paid, 0)), lines };
}
