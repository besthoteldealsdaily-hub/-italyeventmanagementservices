"use server";

import { redirect } from "next/navigation";
import { getDb } from "@/lib/db/client";
import { amountDueNow } from "@/lib/admin/stats";
import { createCheckoutSession, stripeEnabled } from "@/lib/stripe";
import { absoluteUrl, site } from "@/config/site";

/** Creates a Stripe Checkout session for the amount currently due and sends the customer there. */
export async function startCheckout(token: string) {
  const page = `/pay/${token}`;
  const db = await getDb();
  if (!db || !stripeEnabled()) redirect(`${page}?err=${encodeURIComponent("Card payment is not available. Please pay by bank transfer.")}`);

  const b = await db.first<{ id: string; ref: string; status: string; customer_email: string | null }>("SELECT id, ref, status, customer_email FROM bookings WHERE token = ?", token);
  if (!b || b.status === "cancelled") redirect("/");
  const { due } = await amountDueNow(db, b.id);
  if (due < 50) redirect(page); // nothing (or less than Stripe's €0.50 minimum) to pay

  const schedule = await db.first<{ id: string }>("SELECT id FROM payment_schedules WHERE booking_id = ? AND status != 'paid' ORDER BY due_date, rowid", b.id);
  let url = "";
  try {
    const session = await createCheckoutSession({
      bookingId: b.id,
      scheduleId: schedule?.id,
      bookingRef: b.ref,
      amountCents: due,
      description: `${site.name} — booking ${b.ref}`,
      email: b.customer_email,
      successUrl: absoluteUrl(`${page}?paid=1`),
      cancelUrl: absoluteUrl(`${page}?cancelled=1`),
    });
    url = session.url;
  } catch (e) {
    console.error("[stripe] checkout failed:", e instanceof Error ? e.message : e);
  }
  if (!url) redirect(`${page}?err=${encodeURIComponent("We could not start the card payment. Please try again or pay by bank transfer.")}`);
  redirect(url);
}
