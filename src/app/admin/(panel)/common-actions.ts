"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb, nowIso } from "@/lib/db/client";
import { adminPath, flashUrl } from "@/lib/admin/urls";

/** Free-text note attached to any record (lead, quote, booking, prospect…). Appears in the record's history. */
export async function addNote(entityType: string, entityId: string, returnPath: string, formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const body = String(formData.get("body") ?? "").trim().slice(0, 4000);
  const channel = String(formData.get("channel") ?? "note").slice(0, 20);
  const path = adminPath(returnPath);
  if (!body) redirect(flashUrl(path, "err", "Write something first."));
  await db.insert("communications", { entity_type: entityType, entity_id: entityId, channel, direction: "internal", body });
  redirect(flashUrl(path, "ok", "Note added"));
}

export async function toggleTask(id: string, formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const task = await db.byId<{ done_at: string | null }>("tasks", id);
  if (task) await db.update("tasks", id, { done_at: task.done_at ? null : nowIso() });
  redirect(adminPath(formData.get("return"), "/admin/tasks"));
}

export async function addTask(entityType: string, entityId: string, returnPath: string, formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const title = String(formData.get("title") ?? "").trim().slice(0, 300);
  const dueRaw = String(formData.get("due_at") ?? "").trim();
  const path = adminPath(returnPath, "/admin/tasks");
  if (!title) redirect(flashUrl(path, "err", "Task title is required."));
  await db.insert("tasks", { entity_type: entityType || null, entity_id: entityId || null, kind: "manual", title, due_at: dueRaw || null });
  redirect(flashUrl(path, "ok", "Task added"));
}
