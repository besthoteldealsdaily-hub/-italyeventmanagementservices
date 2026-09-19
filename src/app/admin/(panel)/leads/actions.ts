"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb, makeRef, makeToken, nowIso } from "@/lib/db/client";
import { addDays, todayRome } from "@/lib/dates";
import { getSettings } from "@/lib/admin/stats";
import { SERVICE_OPTIONS } from "@/lib/quote-options";
import { flashUrl } from "@/lib/admin/urls";

const STATUSES = ["new", "contacted", "quoted", "won", "lost", "spam"];

export async function setLeadStatus(id: string, formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const status = String(formData.get("status") ?? "");
  if (!STATUSES.includes(status)) redirect(flashUrl(`/admin/leads/${id}`, "err", "Unknown status."));
  const lead = await db.byId<{ first_response_at: string | null }>("leads", id);
  if (!lead) redirect("/admin/leads");
  const patch: Record<string, string | null> = { status };
  if (!lead.first_response_at && (status === "contacted" || status === "quoted" || status === "won")) patch.first_response_at = nowIso();
  await db.update("leads", id, patch);
  await db.audit("lead_status", "leads", id, { status });
  redirect(flashUrl(`/admin/leads/${id}`, "ok", `Marked as ${status}`));
}

/** Supplier applications arrive through the website form: create the supplier record (status "prospect") to start onboarding. */
export async function createSupplierFromLead(id: string) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const lead = await db.byId<{ name: string; email: string; phone: string; company: string; country: string; message: string; ref: string }>("leads", id);
  if (!lead) redirect("/admin/leads");
  const supplierId = await db.insert("suppliers", {
    legal_name: lead.company || lead.name,
    contact_name: lead.name,
    email: lead.email,
    phone: lead.phone,
    status: "prospect",
    tier: 2,
    notes: `From website application ${lead.ref}. ${lead.message ?? ""}`.trim(),
  });
  await db.update("leads", id, { status: "contacted", first_response_at: nowIso() });
  await db.audit("supplier_from_lead", "suppliers", supplierId, { lead: lead.ref });
  redirect(flashUrl(`/admin/data/suppliers/${supplierId}`, "ok", "Supplier created — now add and verify their documents"));
}

/** Trade-account requests: create the customer (organisation) + contact. */
export async function createCustomerFromLead(id: string) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const lead = await db.byId<{ name: string; email: string; phone: string; company: string; country: string; ref: string }>("leads", id);
  if (!lead) redirect("/admin/leads");
  const orgId = await db.insert("organizations", {
    name: lead.company || lead.name,
    type: "agency",
    country: lead.country,
    payment_terms_days: 0,
    notes: `From website request ${lead.ref}. New accounts prepay their first bookings.`,
  });
  const contactId = await db.insert("contacts", { organization_id: orgId, full_name: lead.name, email: lead.email, phone: lead.phone, source: "website" });
  await db.update("leads", id, { organization_id: orgId, contact_id: contactId, status: "contacted", first_response_at: nowIso() });
  redirect(flashUrl(`/admin/data/organizations/${orgId}`, "ok", "Customer created"));
}

/** Turns a lead into a draft quote (creating the contact on the way) and opens the quote builder. */
export async function createQuoteFromLead(id: string) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const lead = await db.byId<{
    name: string; email: string; phone: string; company: string; service: string; contact_id: string | null; ref: string;
  }>("leads", id);
  if (!lead) redirect("/admin/leads");

  let contactId = lead.contact_id;
  if (!contactId && lead.email) {
    const existing = await db.first<{ id: string }>("SELECT id FROM contacts WHERE lower(email) = lower(?)", lead.email);
    contactId =
      existing?.id ?? (await db.insert("contacts", { full_name: lead.name, email: lead.email, phone: lead.phone, source: "website", notes: lead.company ? `Company: ${lead.company}` : null }));
  }

  const settings = await getSettings(db);
  const label = SERVICE_OPTIONS.find((o) => o.value === lead.service)?.label ?? lead.service ?? "Service";
  const quoteId = await db.insert("quotes", {
    ref: makeRef("QT"),
    token: makeToken(),
    lead_id: id,
    contact_name: lead.name,
    contact_email: lead.email,
    contact_phone: lead.phone,
    title: `${label} — ${lead.name}`,
    status: "draft",
    valid_until: addDays(todayRome(), Number(settings.quote_valid_days) || 7),
    terms_version: settings.terms_version,
  });
  await db.update("leads", id, { contact_id: contactId, status: "quoted" });
  await db.audit("quote_from_lead", "quotes", quoteId, { lead: lead.ref });
  redirect(`/admin/quotes/${quoteId}`);
}
