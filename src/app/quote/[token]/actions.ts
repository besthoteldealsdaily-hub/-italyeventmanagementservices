"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb, nowIso } from "@/lib/db/client";
import { todayRome } from "@/lib/dates";
import { notifyOwner } from "@/lib/mail";
import { absoluteUrl } from "@/config/site";

/** Customer clicks "Accept": we record who, when, from where, and which terms version. */
export async function acceptQuote(token: string, formData: FormData) {
  const db = await getDb();
  if (!db) redirect(`/quote/${token}`);
  const q = await db.first<{ id: string; ref: string; status: string; valid_until: string | null; terms_version: string | null; contact_name: string }>(
    "SELECT id, ref, status, valid_until, terms_version, contact_name FROM quotes WHERE token = ?",
    token,
  );
  if (!q) redirect("/");
  const page = `/quote/${token}`;

  const name = String(formData.get("name") ?? "").trim().slice(0, 120);
  if (formData.get("agree") !== "on" || name.length < 2) redirect(`${page}?err=${encodeURIComponent("Please type your name and tick the box to accept.")}`);
  if (q.status === "accepted") redirect(`${page}?accepted=1`);
  if (q.status !== "sent") redirect(`${page}?err=${encodeURIComponent("This quote can no longer be accepted online. Please contact us.")}`);
  if (q.valid_until && q.valid_until < todayRome()) redirect(`${page}?err=${encodeURIComponent("This quote has expired. Please ask us to refresh it.")}`);

  const h = await headers();
  const ip = h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  await db.update("quotes", q.id, { status: "accepted", accepted_at: nowIso(), accepted_ip: ip, accepted_name: name });
  await db.insert("tasks", {
    entity_type: "quote",
    entity_id: q.id,
    kind: "manual",
    title: `Quote ${q.ref} accepted by ${name} — convert to booking and send payment link`,
    due_at: nowIso().slice(0, 16),
  });
  await db.audit("quote_accepted", "quotes", q.id, { name, ip, terms: q.terms_version });
  await notifyOwner(`Quote ${q.ref} ACCEPTED`, `${name} accepted quote ${q.ref}.\nOpen: ${absoluteUrl(`/admin/quotes/${q.id}`)}`);
  redirect(`${page}?accepted=1`);
}
