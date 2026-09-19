import { getDb } from "@/lib/db/client";
import { refreshPaymentStatus } from "@/lib/admin/stats";
import { verifyStripeSignature } from "@/lib/stripe";
import { notifyOwner } from "@/lib/mail";
import { absoluteUrl } from "@/config/site";

export const dynamic = "force-dynamic";

interface CheckoutSession {
  id: string;
  payment_status: string;
  amount_total: number;
  currency: string;
  payment_intent: string | null;
  metadata?: { booking_id?: string; schedule_id?: string; booking_ref?: string };
}

/** Stripe → us. Signature is verified before anything is trusted; payments are recorded idempotently by session id. */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response("Webhook not configured", { status: 503 });

  const raw = await req.text();
  if (!(await verifyStripeSignature(raw, req.headers.get("stripe-signature"), secret))) {
    return new Response("Bad signature", { status: 400 });
  }

  let event: { type: string; data: { object: CheckoutSession } };
  try {
    event = JSON.parse(raw);
  } catch {
    return new Response("Bad payload", { status: 400 });
  }

  if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") {
    return new Response("ignored", { status: 200 });
  }
  const s = event.data.object;
  if (s.payment_status !== "paid") return new Response("not paid yet", { status: 200 });

  const db = await getDb();
  if (!db) return new Response("db unavailable", { status: 503 }); // Stripe will retry

  const bookingId = s.metadata?.booking_id;
  const booking = bookingId ? await db.byId<{ id: string; ref: string }>("bookings", bookingId) : null;
  if (!booking) return new Response("unknown booking", { status: 200 });

  const seen = await db.first("SELECT id FROM payments WHERE provider = 'stripe' AND provider_ref = ?", s.id);
  if (!seen) {
    await db.insert("payments", {
      booking_id: booking.id,
      schedule_id: s.metadata?.schedule_id ?? null,
      provider: "stripe",
      provider_ref: s.id,
      kind: "payment",
      amount_cents: s.amount_total,
      currency: (s.currency ?? "eur").toUpperCase(),
      status: "paid",
      paid_at: new Date().toISOString(),
      note: s.payment_intent ? `pi:${s.payment_intent}` : null,
    });
    await refreshPaymentStatus(db, booking.id);
    await db.audit("stripe_payment", "bookings", booking.id, { session: s.id, amount: s.amount_total });
    await notifyOwner(`Payment received — ${booking.ref}`, `€${(s.amount_total / 100).toFixed(2)} via card.\n${absoluteUrl(`/admin/bookings/${booking.id}`)}`);
  }
  return new Response("ok", { status: 200 });
}
