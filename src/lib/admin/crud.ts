import type { Db, Row } from "@/lib/db/client";
import { toCents } from "@/lib/money";
import type { EntityDef, FieldDef } from "./entities";
import { ENTITIES } from "./entities";

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

/** Reads a submitted form into a DB row. Returns an error message when a required field is empty. */
export function parseEntityForm(entity: EntityDef, form: FormData): { data: Row } | { error: string } {
  const data: Row = {};
  for (const f of entity.fields) {
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
