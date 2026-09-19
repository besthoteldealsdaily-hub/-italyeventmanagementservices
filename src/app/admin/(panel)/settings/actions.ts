"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { SETTING_DEFAULTS, setSetting } from "@/lib/admin/stats";
import { flashUrl } from "@/lib/admin/urls";

const HERE = "/admin/settings";
const NUMERIC = new Set(["deposit_pct", "balance_due_days", "quote_valid_days", "min_margin_pct", "card_fee_pct"]);
const MONEY = new Set(["fixed_costs_monthly", "target_net_monthly", "card_fee_fixed"]);

export async function saveSettings(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  for (const key of Object.keys(SETTING_DEFAULTS)) {
    const raw = formData.get(key);
    if (typeof raw !== "string") continue;
    let value = raw.trim().slice(0, 300);
    if (NUMERIC.has(key) || MONEY.has(key)) {
      const n = Number(value.replace(",", "."));
      if (value !== "" && !Number.isFinite(n)) redirect(flashUrl(HERE, "err", `“${key.replace(/_/g, " ")}” must be a number.`));
      value = value === "" ? "" : String(n);
    }
    if (key === "vat_regime" && !["ordinary", "margin_74ter"].includes(value)) value = "ordinary";
    if (key === "launch_date" && value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) redirect(flashUrl(HERE, "err", "Launch date must be a valid date."));
    await setSetting(db, key, value);
  }
  await db.audit("settings", "settings", "all");
  redirect(flashUrl(HERE, "ok", "Settings saved"));
}

type Json = Record<string, unknown>;
const s = (v: unknown, max = 2000) => (typeof v === "string" ? v.slice(0, max) : v === null || v === undefined ? null : String(v).slice(0, max));
const n = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : Number.isFinite(Number(v)) && v !== "" && v !== null ? Number(v) : 0);

/**
 * Imports private planning data (launch plan, monthly targets, message templates, routes) from a JSON file.
 * The files live in your private blueprint folder — never in the public repository.
 */
export async function importSeed(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");

  let text = String(formData.get("json") ?? "").trim();
  const file = formData.get("file");
  if (file instanceof File && file.size > 0) {
    if (file.size > 1_000_000) redirect(flashUrl(HERE, "err", "File too large (max 1 MB)."));
    text = await file.text();
  }
  if (!text) redirect(flashUrl(HERE, "err", "Choose a JSON file or paste JSON."));

  let data: Json;
  try {
    data = JSON.parse(text);
  } catch {
    redirect(flashUrl(HERE, "err", "That is not valid JSON."));
  }

  const done: string[] = [];

  if (Array.isArray(data.plan_items)) {
    let added = 0;
    for (const raw of data.plan_items as Json[]) {
      const title = s(raw.title, 400);
      if (!title) continue;
      const exists = await db.first("SELECT id FROM plan_items WHERE title = ? AND COALESCE(phase,'') = ?", title, s(raw.phase) ?? "");
      if (exists) continue;
      await db.insert("plan_items", { phase: s(raw.phase, 120), week: n(raw.week), position: n(raw.position), title, target: s(raw.target, 200) });
      added++;
    }
    done.push(`${added} plan items`);
  }

  if (Array.isArray(data.kpi_targets)) {
    let count = 0;
    for (const raw of data.kpi_targets as Json[]) {
      const month = n(raw.month);
      if (!month) continue;
      const row = {
        month,
        label: s(raw.label, 40),
        gbv_cents: n(raw.gbv_cents),
        bookings: n(raw.bookings),
        b2b_accounts: n(raw.b2b_accounts),
        suppliers: n(raw.suppliers),
        seo_pages: n(raw.seo_pages),
        sessions: n(raw.sessions),
        fixed_cents: n(raw.fixed_cents),
        notes: s(raw.notes, 400),
      };
      const existing = await db.first<{ id: string }>("SELECT id FROM kpi_targets WHERE month = ?", month);
      if (existing) await db.update("kpi_targets", existing.id, row);
      else await db.insert("kpi_targets", row);
      count++;
    }
    done.push(`${count} monthly targets`);
  }

  if (Array.isArray(data.templates)) {
    let count = 0;
    for (const raw of data.templates as Json[]) {
      const key = s(raw.key, 80);
      const body = s(raw.body, 6000);
      if (!key || !body) continue;
      const row = { key, title: s(raw.title, 200) ?? key, channel: s(raw.channel, 30), segment: s(raw.segment, 60), body };
      const existing = await db.first<{ id: string }>("SELECT id FROM templates WHERE key = ?", key);
      if (existing) await db.update("templates", existing.id, row);
      else await db.insert("templates", row);
      count++;
    }
    done.push(`${count} templates`);
  }

  if (Array.isArray(data.routes)) {
    let count = 0;
    for (const raw of data.routes as Json[]) {
      const name = s(raw.name, 200);
      if (!name) continue;
      const slug = s(raw.slug, 120);
      const row = { name, slug, from_label: s(raw.from_label, 120), to_label: s(raw.to_label, 120), distance_km: n(raw.distance_km), duration_min: n(raw.duration_min), toll_cents: n(raw.toll_cents) };
      const existing = slug ? await db.first<{ id: string }>("SELECT id FROM routes WHERE slug = ?", slug) : null;
      if (existing) await db.update("routes", existing.id, row);
      else await db.insert("routes", row);
      count++;
    }
    done.push(`${count} routes`);
  }

  if (done.length === 0) redirect(flashUrl(HERE, "err", "Nothing to import. Expected keys: plan_items, kpi_targets, templates, routes."));
  await db.audit("seed_import", "settings", "seed", { done });
  redirect(flashUrl(HERE, "ok", `Imported: ${done.join(", ")}`));
}
