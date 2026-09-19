"use server";

import { deliverLead, newReference } from "@/lib/leads";
import type { QuoteFormState } from "@/lib/quote-options";
import { quoteSchema } from "@/lib/quote-schema";

const MIN_FILL_MS = 2500; // humans don't complete this form in under 2.5 s

export async function submitQuote(_prev: QuoteFormState, formData: FormData): Promise<QuoteFormState> {
  // Only text fields exist in this form; keep string values so we can echo them back on error.
  const raw: Record<string, string> = {};
  for (const [k, v] of formData.entries()) if (typeof v === "string") raw[k] = v;

  const echo = () => {
    const values = { ...raw };
    delete values.website;
    delete values.startedAt;
    return values;
  };

  const parsed = quoteSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values: echo() };
  }

  const lead = parsed.data;

  // Bot traps: honeypot filled, or submitted implausibly fast. Pretend success so bots learn nothing.
  const startedAt = Number(lead.startedAt);
  const tooFast = Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS;
  if (lead.website || tooFast) {
    return { status: "success", reference: newReference(), message: "Thank you — we'll be in touch shortly." };
  }

  const reference = newReference();
  const delivered = await deliverLead(reference, lead);

  if (!delivered) {
    return {
      status: "error",
      message: "We couldn't send your request just now. Please email us or use WhatsApp — we'll answer right away.",
      values: echo(),
    };
  }

  return {
    status: "success",
    reference,
    message: "Thank you — your request is in. We'll reply with a fixed quote as soon as possible.",
  };
}
