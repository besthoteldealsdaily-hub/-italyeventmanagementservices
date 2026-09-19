import { randomBytes } from "node:crypto";
import { SERVICE_OPTIONS } from "./quote-options";
import type { QuoteInput } from "./quote-schema";

/**
 * Lead delivery (server-side only).
 *
 * v0 pipeline: email notification (Resend) and/or a generic webhook (Telegram bot, Slack, Make, n8n…).
 * When you add Postgres (see /db/schema.sql), persist the lead FIRST, then notify.
 */

export function newReference(now = new Date()) {
  const yy = String(now.getUTCFullYear()).slice(2);
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  const rand = randomBytes(3).toString("hex").toUpperCase();
  return `Q-${yy}${mm}${dd}-${rand}`;
}

function serviceLabel(value: string) {
  return SERVICE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function formatLead(reference: string, lead: QuoteInput) {
  const rows: [string, string | number | undefined][] = [
    ["Reference", reference],
    ["Service", serviceLabel(lead.service)],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone / WhatsApp", lead.phone],
    ["Company", lead.company],
    ["Country", lead.country],
    ["Pick-up / from", lead.pickup],
    ["Drop-off / to", lead.dropoff],
    ["Date", lead.date],
    ["Time", lead.time],
    ["Flight", lead.flight],
    ["Passengers / guests", lead.passengers],
    ["Luggage", lead.luggage],
    ["Vehicle", lead.vehicle],
    ["Rooms", lead.rooms],
    ["Nights", lead.nights],
    ["Budget", lead.budget],
    ["Message", lead.message],
  ];
  return rows
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

async function sendEmail(reference: string, lead: QuoteInput, body: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!key || !to || !from) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: lead.email,
      subject: `[${reference}] ${serviceLabel(lead.service)} — ${lead.name}`,
      text: body,
    }),
  });
  return res.ok;
}

async function sendWebhook(reference: string, lead: QuoteInput, body: string): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // "text" works out of the box for Slack/Mattermost-style hooks; the rest is for Make/n8n.
    body: JSON.stringify({ text: `New quote request\n${body}`, reference, lead }),
  });
  return res.ok;
}

/** Returns true if at least one channel accepted the lead. */
export async function deliverLead(reference: string, lead: QuoteInput): Promise<boolean> {
  const body = formatLead(reference, lead);
  const results = await Promise.allSettled([sendEmail(reference, lead, body), sendWebhook(reference, lead, body)]);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);

  if (!delivered && process.env.NODE_ENV !== "production") {
    // Local development without any channel configured: print instead of failing.
    console.log(`\n── QUOTE REQUEST (dev, no delivery channel configured) ──\n${body}\n`);
    return true;
  }
  if (!delivered) {
    console.error(`[quote] Lead ${reference} could not be delivered — check RESEND_* / LEAD_WEBHOOK_URL env vars.`);
  }
  return delivered;
}
