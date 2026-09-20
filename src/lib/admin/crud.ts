import type { Db, Row } from "@/lib/db/client";
import { toCents } from "@/lib/money";
import { makeObjectKey, MAX_UPLOAD_BYTES, putObject } from "@/lib/r2";
import type { EntityDef, FieldDef } from "./entities";
import { ENTITIES } from "./entities";

type Bucket = Parameters<typeof putObject>[0];

export interface RefOption {
  id: string;
  label: string;
}

/** Values for <select> fields that point at another table, keyed by field name. */
export async function loadRefOptions(db: Db, entity: EntityDef): Promise<Record<string, RefOption[]>> {
  const out: Record<string, RefOption[]> = {};
  for (const f of entity.fields) {
    if (f.type !== "ref" || !f.ref) continue;
    const rows = await db.all<{ id: string; label: string }>(
      `SELECT id, ${f.ref.label} AS label FROM ${f.ref.table} ORDER BY ${f.ref.label} COLLATE NOCASE LIMIT 500`,
    );
    out[f.name] = rows.map((r) => ({ id: r.id, label: String(r.label ?? r.id) }));
  }
  return out;
}

/**
 * Reads a submitted form into a DB row. File fields are virtual: a chosen file is uploaded to R2 and its
 * key is written into `mapsTo` instead of the file field itself, which is never a real column. Returns an
 * error message when a required field is empty, a file is too large, or storage isn't enabled yet.
 */
export async function parseEntityForm(entity: EntityDef, form: FormData, bucket: Bucket | null): Promise<{ data: Row } | { error: string }> {
  const data: Row = {};
  for (const f of entity.fields) {
    if (f.type === "file") {
      const file = form.get(f.name);
      if (file instanceof File && file.size > 0) {
        if (!bucket) return { error: `${f.label}: file storage is not enabled yet. Ask your developer to add the R2 bucket, or paste a link instead.` };
        if (file.size > MAX_UPLOAD_BYTES) return { error: `${f.label}: that file is too large (max ${Math.floor(MAX_UPLOAD_BYTES / 1024 / 1024)} MB).` };
        const key = makeObjectKey(entity.table, file.name);
        try {
          await putObject(bucket, key, file);
        } catch {
          return { error: `${f.label}: the file could not be uploaded. Please try again.` };
        }
        if (f.mapsTo) data[f.mapsTo] = key;
      }
      continue; // virtual — never written as its own column
    }
    const raw = form.get(f.name);
    const text = typeof raw === "string" ? raw.trim() : "";
    if (f.type === "checkbox") {
      data[f.name] = raw === "on" || raw === "1" ? 1 : 0;
      continue;
    }
    if (f.required && text === "") return { error: `${f.label} is required.` };
    data[f.name] = coerce(f, text);
  }
  return { data };
}

function coerce(f: FieldDef, text: string): string | number | null {
  if (text === "") return f.type === "money" ? 0 : null;
  switch (f.type) {
    case "money":
      return toCents(text);
    case "number": {
      const n = Number(text.replace(",", "."));
      return Number.isFinite(n) ? n : null;
    }
    case "select":
      return f.name === "tier" || f.name === "severity" ? Number(text) : text;
    default:
      return text.slice(0, 4000);
  }
}

/** Child tables that still point at this row (used to block deleting a parent). */
export async function countChildren(db: Db, entity: EntityDef, id: string): Promise<number> {
  let n = 0;
  for (const c of entity.children ?? []) {
    const child = ENTITIES[c.entity];
    if (child) n += await db.scalar(`SELECT COUNT(*) FROM ${child.table} WHERE ${c.fk} = ?`, id);
  }
  return n;
}

export function displayValue(f: FieldDef, value: unknown, refs: Record<string, RefOption[]>): string {
  if (value === null || value === undefined || value === "") return "–";
  if (f.type === "checkbox") return value ? "Yes" : "No";
  if (f.type === "ref") return refs[f.name]?.find((o) => o.id === value)?.label ?? "–";
  return String(value);
}
