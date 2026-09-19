"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb, nowIso } from "@/lib/db/client";

export async function togglePlanItem(id: string) {
  await requireAdmin();
  const db = await getDb();
  if (!db) redirect("/admin");
  const item = await db.byId<{ done_at: string | null }>("plan_items", id);
  if (item) await db.update("plan_items", id, { done_at: item.done_at ? null : nowIso() });
  redirect("/admin/plan");
}
