import { getDb } from "@/lib/db/client";
import type { QuoteInput } from "@/lib/quote-schema";

/**
 * Persists a website lead in the database BEFORE any email/webhook is attempted, so a lead is never lost
 * when email fails. Returns false when the database is not enabled (the email/webhook path still runs).
 */
export async function saveLead(reference: string, lead: QuoteInput): Promise<boolean> {
  try {
    const db = await getDb();
    if (!db) return false;
    const { website: _website, startedAt: _startedAt, ...payload } = lead;
    void _website;
    void _startedAt;
    await db.insert("leads", {
      ref: reference,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      country: lead.country,
      source: "website",
      service: lead.service,
      payload: JSON.stringify(payload),
      message: lead.message,
      status: "new",
    });
    return true;
  } catch (e) {
    console.error(`[lead] could not store ${reference}:`, e instanceof Error ? e.message : e);
    return false;
  }
}
