/**
 * Minimal Stripe client using fetch + Web Crypto (no SDK → works on Cloudflare Workers).
 * Enabled only when STRIPE_SECRET_KEY is set. Webhook: STRIPE_WEBHOOK_SECRET (whsec_…).
 */

export function stripeEnabled(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

async function stripeFetch<T>(path: string, params: Record<string, string>): Promise<T> {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params).toString(),
  });
  const json = (await res.json()) as T & { error?: { message?: string } };
  if (!res.ok) throw new Error(json.error?.message ?? `Stripe error ${res.status}`);
  return json;
}

export async function createCheckoutSession(opts: {
  bookingId: string;
  scheduleId?: string;
  bookingRef: string;
  amountCents: number;
  description: string;
  email?: string | null;
  successUrl: string;
  cancelUrl: string;
}): Promise<{ id: string; url: string }> {
  const params: Record<string, string> = {
    mode: "payment",
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    client_reference_id: opts.bookingId,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "eur",
    "line_items[0][price_data][unit_amount]": String(opts.amountCents),
    "line_items[0][price_data][product_data][name]": opts.description.slice(0, 250),
    "metadata[booking_id]": opts.bookingId,
    "metadata[booking_ref]": opts.bookingRef,
    "payment_intent_data[metadata][booking_id]": opts.bookingId,
    "payment_intent_data[metadata][booking_ref]": opts.bookingRef,
  };
  if (opts.scheduleId) params["metadata[schedule_id]"] = opts.scheduleId;
  if (opts.email) params.customer_email = opts.email;
  const s = await stripeFetch<{ id: string; url: string }>("/checkout/sessions", params);
  return { id: s.id, url: s.url };
}

export async function refundPaymentIntent(paymentIntent: string, amountCents: number): Promise<{ id: string }> {
  return stripeFetch<{ id: string }>("/refunds", { payment_intent: paymentIntent, amount: String(amountCents) });
}

/* ───────────── webhook signature (Stripe-Signature: t=…,v1=…) ───────────── */

const enc = new TextEncoder();

function hex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyStripeSignature(rawBody: string, header: string | null, secret: string, toleranceSec = 300): Promise<boolean> {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((p) => {
      const i = p.indexOf("=");
      return [p.slice(0, i).trim(), p.slice(i + 1).trim()] as const;
    }),
  );
  const t = Number(parts.t);
  if (!Number.isFinite(t) || Math.abs(Date.now() / 1000 - t) > toleranceSec) return false;
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const expected = hex(await crypto.subtle.sign("HMAC", key, enc.encode(`${t}.${rawBody}`)));
  // Header may carry several v1 signatures (key rotation) — accept any that matches, comparing in constant time.
  const candidates = header
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.startsWith("v1="))
    .map((p) => p.slice(3));
  let ok = false;
  for (const c of candidates) {
    if (c.length !== expected.length) continue;
    let diff = 0;
    for (let i = 0; i < c.length; i++) diff |= c.charCodeAt(i) ^ expected.charCodeAt(i);
    if (diff === 0) ok = true;
  }
  return ok;
}
