"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb, type Row } from "@/lib/db/client";
import { getEntity } from "@/lib/admin/entities";
import { countChildren, parseEntityForm } from "@/lib/admin/crud";
import { deleteIfStored, getBucket } from "@/lib/r2";

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
  const bucket = await getBucket();
  const existing: Row | null = id === "new" ? null : await db.byId(entity.table, id);
  const parsed = await parseEntityForm(entity, formData, bucket);
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
    // The new file (if any) was already uploaded — remove it, since the row it was meant for was never saved.
    for (const f of entity.fields) if (f.type === "file" && f.mapsTo && parsed.data[f.mapsTo]) await deleteIfStored(bucket, String(parsed.data[f.mapsTo]));
    redirect(`${here}?err=${encodeURIComponent(msg)}${retQs}`);
  }

  // A freshly replaced upload leaves the old object orphaned — clean it up now that the new one is saved.
  if (existing) {
    for (const f of entity.fields) {
      if (f.type !== "file" || !f.mapsTo || parsed.data[f.mapsTo] === undefined) continue;
      const oldValue = existing[f.mapsTo];
      if (oldValue && oldValue !== parsed.data[f.mapsTo]) await deleteIfStored(bucket, String(oldValue));
    }
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

  const fileTargets = entity.fields.filter((f) => f.type === "file" && f.mapsTo).map((f) => f.mapsTo as string);
  if (fileTargets.length > 0) {
    const row = await db.byId<Row>(entity.table, id);
    if (row) {
      const bucket = await getBucket();
      for (const col of fileTargets) await deleteIfStored(bucket, row[col] ? String(row[col]) : null);
    }
  }

  await db.remove(entity.table, id);
  await db.audit("delete", entity.table, id);
  redirect(flash(safeReturn(formData.get("return")) || `/admin/data/${entity.key}`, "ok", "Deleted"));
}
