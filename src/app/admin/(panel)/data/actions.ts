"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { getEntity } from "@/lib/admin/entities";
import { countChildren, parseEntityForm } from "@/lib/admin/crud";

/** Only same-site admin paths are honoured as a "return to" target. */
const safeReturn = (v: FormDataEntryValue | null) => {
  const s = typeof v === "string" ? v : "";
  return s.startsWith("/admin/") && !s.includes("//") && !s.includes("?") ? s : "";
};

const flash = (path: string, kind: "ok" | "err", msg: string) => `${path}?${kind}=${encodeURIComponent(msg)}`;

/** Create (id === "new") or update a row of a config-driven entity. */
export async function saveEntity(entityKey: string, id: string, formData: FormData) {
  await requireAdmin();
  const entity = getEntity(entityKey);
  const db = await getDb();
  if (!entity || !db) redirect("/admin");

  const ret = safeReturn(formData.get("return"));
  const parsed = parseEntityForm(entity, formData);
  const retQs = ret ? `&return=${encodeURIComponent(ret)}` : "";
  const here = id === "new" ? `/admin/data/${entity.key}/new` : `/admin/data/${entity.key}/${id}`;
  if ("error" in parsed) redirect(`${here}?err=${encodeURIComponent(parsed.error)}${retQs}`);

  let savedId = id;
  try {
    if (id === "new") {
      savedId = await db.insert(entity.table, parsed.data);
      await db.audit("create", entity.table, savedId);
    } else {
      await db.update(entity.table, id, parsed.data);
      await db.audit("update", entity.table, id);
    }
  } catch (e) {
    const msg = e instanceof Error && /UNIQUE/i.test(e.message) ? "That value already exists (it must be unique)." : "Could not save. Please try again.";
    redirect(`${here}?err=${encodeURIComponent(msg)}${retQs}`);
  }

  redirect(flash(ret || `/admin/data/${entity.key}/${savedId}`, "ok", "Saved"));
}

export async function deleteEntity(entityKey: string, id: string, formData: FormData) {
  await requireAdmin();
  const entity = getEntity(entityKey);
  const db = await getDb();
  if (!entity || !db) redirect("/admin");

  if ((await countChildren(db, entity, id)) > 0) {
    redirect(flash(`/admin/data/${entity.key}/${id}`, "err", "Remove the related rows first (documents, vehicles, drivers, rates…)."));
  }
  await db.remove(entity.table, id);
  await db.audit("delete", entity.table, id);
  redirect(flash(safeReturn(formData.get("return")) || `/admin/data/${entity.key}`, "ok", "Deleted"));
}
