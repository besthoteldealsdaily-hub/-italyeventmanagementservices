"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb, nowIso } from "@/lib/db/client";
import { addDays, todayRome } from "@/lib/dates";
import { flashUrl } from "@/lib/admin/urls";

const HERE = "/admin/sales";
/** Days until the next touch after touch #n (blueprint §16: follow-ups at ~day 4, ~day 9, ~day 15). */
const GAP_DAYS: Record<number, number> = { 1: 4, 2: 5, 3: 6 };
const SEGMENTS = ["dmc", "tour_operator", "wedding_planner", "event_agency", "corporate_travel", "hotel", "supplier", "other"];
const CHANNELS = ["email", "linkedin", "whatsapp", "call", "other"];

export async function addProspect(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const name = String(formData.get("name") ?? "").trim().slice(0, 120);
  if (!name) redirect(flashUrl(HERE, "err", "Name is required."));
  const email = String(formData.get("email") ?? "").trim().toLowerCase().slice(0, 160);
  if (email && (await db.first("SELECT id FROM prospects WHERE lower(email) = ?", email))) redirect(flashUrl(HERE, "err", "A prospect with that email already exists."));
  const segment = String(formData.get("segment") ?? "");
  await db.insert("prospects", {
    name,
    company: String(formData.get("company") ?? "").trim().slice(0, 160) || null,
    segment: SEGMENTS.includes(segment) ? segment : "other",
    country: String(formData.get("country") ?? "").trim().slice(0, 80) || null,
    email: email || null,
    phone: String(formData.get("phone") ?? "").trim().slice(0, 40) || null,
    linkedin: String(formData.get("linkedin") ?? "").trim().slice(0, 200) || null,
    source: String(formData.get("source") ?? "").trim().slice(0, 120) || null,
    status: "new",
    step: 0,
    next_touch_at: todayRome(),
  });
  redirect(flashUrl(HERE, "ok", "Prospect added"));
}

/** Bulk add: one prospect per line — "Name, Company, email, segment, country". Duplicate emails are skipped. */
export async function importProspects(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const lines = String(formData.get("lines") ?? "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean).slice(0, 300);
  let added = 0;
  let skipped = 0;
  for (const line of lines) {
    const [name, company, emailRaw, segment, country] = line.split(/[,;\t]/).map((c) => c.trim());
    const email = (emailRaw ?? "").toLowerCase();
    if (!name || (email && !/^\S+@\S+\.\S+$/.test(email))) {
      skipped++;
      continue;
    }
    if (email && (await db.first("SELECT id FROM prospects WHERE lower(email) = ?", email))) {
      skipped++;
      continue;
    }
    await db.insert("prospects", {
      name: name.slice(0, 120),
      company: company?.slice(0, 160) || null,
      email: email || null,
      segment: SEGMENTS.includes(segment ?? "") ? segment : "other",
      country: country?.slice(0, 80) || null,
      source: "bulk import",
      status: "new",
      step: 0,
      next_touch_at: todayRome(),
    });
    added++;
  }
  redirect(flashUrl(HERE, added ? "ok" : "err", `${added} added, ${skipped} skipped (bad line or duplicate email).`));
}

/** Records one outreach touch and schedules the next follow-up automatically. */
export async function logTouch(id: string, formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const p = await db.byId<{ step: number; status: string }>("prospects", id);
  if (!p) redirect(HERE);
  if (p.status === "unsubscribed") redirect(flashUrl(HERE, "err", "This person opted out — do not contact."));
  const channel = String(formData.get("channel") ?? "email");
  const step = (p.step ?? 0) + 1;
  await db.batch([
    db.insertStmt("outreach_log", { prospect_id: id, channel: CHANNELS.includes(channel) ? channel : "email", step, note: String(formData.get("note") ?? "").trim().slice(0, 500) || null, at: nowIso() }).stmt,
    [
      "UPDATE prospects SET step = ?, status = ?, last_touch_at = ?, next_touch_at = ? WHERE id = ?",
      step,
      step >= 4 ? "no_reply" : "in_sequence",
      nowIso(),
      step >= 4 ? null : addDays(todayRome(), GAP_DAYS[step] ?? 5),
      id,
    ],
  ]);
  redirect(flashUrl(HERE, "ok", step >= 4 ? "Sequence finished (no reply)." : `Touch ${step} logged — next follow-up scheduled.`));
}

export async function setProspectStatus(id: string, status: string) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  if (!["replied", "meeting", "won", "lost", "unsubscribed"].includes(status)) redirect(HERE);
  // Any reply/outcome stops the automatic sequence.
  await db.update("prospects", id, { status, next_touch_at: null });
  await db.audit("prospect_status", "prospects", id, { status });
  redirect(flashUrl(HERE, "ok", status === "unsubscribed" ? "Marked as opted out — never contact again." : `Marked as ${status}`));
}
