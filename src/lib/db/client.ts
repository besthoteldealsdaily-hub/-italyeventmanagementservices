import { getCloudflareContext } from "@opennextjs/cloudflare";
import { migrations } from "./migrations";

/* Minimal D1 typings (avoids pulling in the full Workers types package). */
export type Row = Record<string, unknown>;
export type Param = string | number | null | undefined;

interface D1Result<T> {
  results: T[];
  meta: { last_row_id: number; changes: number };
}
interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  all<T = Row>(): Promise<D1Result<T>>;
  first<T = Row>(): Promise<T | null>;
  run(): Promise<D1Result<Row>>;
}
interface D1Database {
  prepare(query: string): D1Statement;
  batch(statements: D1Statement[]): Promise<D1Result<Row>[]>;
}

const IDENT = /^[a-z_][a-z0-9_]*$/;
const ident = (name: string) => {
  if (!IDENT.test(name)) throw new Error(`Invalid SQL identifier: ${name}`);
  return name;
};
const clean = (params: Param[]) => params.map((p) => (p === undefined ? null : p));

export const newId = () => crypto.randomUUID();
export const nowIso = () => new Date().toISOString();

/** Human-friendly reference such as Q-260919-3FA9C1 */
export function makeRef(prefix: string): string {
  const d = new Date();
  const ymd = `${String(d.getUTCFullYear()).slice(2)}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  const bytes = crypto.getRandomValues(new Uint8Array(3));
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  return `${prefix}-${ymd}-${hex}`;
}

/** Unguessable token for public links (quote acceptance, vouchers, reviews). */
export function makeToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(18));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export class Db {
  constructor(private readonly d1: D1Database) {}

  async all<T = Row>(sql: string, ...params: Param[]): Promise<T[]> {
    const r = await this.d1.prepare(sql).bind(...clean(params)).all<T>();
    return r.results ?? [];
  }

  async first<T = Row>(sql: string, ...params: Param[]): Promise<T | null> {
    return (await this.d1.prepare(sql).bind(...clean(params)).first<T>()) ?? null;
  }

  async run(sql: string, ...params: Param[]): Promise<{ changes: number; lastId: number }> {
    const r = await this.d1.prepare(sql).bind(...clean(params)).run();
    return { changes: r.meta?.changes ?? 0, lastId: r.meta?.last_row_id ?? 0 };
  }

  async scalar(sql: string, ...params: Param[]): Promise<number> {
    const row = await this.first<Row>(sql, ...params);
    const v = row ? Object.values(row)[0] : 0;
    return Number(v ?? 0);
  }

  /** Runs several statements atomically. Each entry is [sql, ...params]. */
  async batch(statements: [string, ...Param[]][]): Promise<void> {
    if (statements.length === 0) return;
    await this.d1.batch(statements.map(([sql, ...params]) => this.d1.prepare(sql).bind(...clean(params))));
  }

  /** Builds an INSERT (adds id and created_at when the table has them and they are missing) — for use in batch(). */
  insertStmt(table: string, data: Row, opts: { noId?: boolean } = {}): { id: string; stmt: [string, ...Param[]] } {
    const row: Row = { ...data };
    const id = opts.noId ? "" : String(row.id ?? newId());
    if (!opts.noId) row.id = id;
    if (row.created_at === undefined && !NO_CREATED_AT.has(table)) row.created_at = nowIso();
    const cols = Object.keys(row).map(ident);
    const sql = `INSERT INTO ${ident(table)} (${cols.join(", ")}) VALUES (${cols.map(() => "?").join(", ")})`;
    return { id, stmt: [sql, ...cols.map((c) => row[c] as Param)] };
  }

  /** Inserts a row and returns its id. */
  async insert(table: string, data: Row, opts: { noId?: boolean } = {}): Promise<string> {
    const { id, stmt } = this.insertStmt(table, data, opts);
    await this.run(...stmt);
    return id;
  }

  async update(table: string, id: string, data: Row): Promise<void> {
    const cols = Object.keys(data).map(ident);
    if (cols.length === 0) return;
    const sql = `UPDATE ${ident(table)} SET ${cols.map((c) => `${c} = ?`).join(", ")} WHERE id = ?`;
    await this.run(sql, ...cols.map((c) => data[c] as Param), id);
  }

  async remove(table: string, id: string): Promise<void> {
    await this.run(`DELETE FROM ${ident(table)} WHERE id = ?`, id);
  }

  async byId<T = Row>(table: string, id: string): Promise<T | null> {
    return this.first<T>(`SELECT * FROM ${ident(table)} WHERE id = ?`, id);
  }

  async audit(action: string, entity: string, entityId: string, detail?: unknown) {
    await this.run(
      "INSERT INTO audit_log (action, entity, entity_id, detail, created_at) VALUES (?, ?, ?, ?, ?)",
      action,
      entity,
      entityId,
      detail === undefined ? null : JSON.stringify(detail),
      nowIso(),
    );
  }
}

// Tables without a created_at column (insert() must not add one).
const NO_CREATED_AT = new Set([
  "settings", "kpi_targets", "audit_log", "login_attempts", "outreach_log", "quote_items", "booking_items", "payment_schedules",
]);

/* ───────────── connection + automatic migrations ───────────── */

let ready: Promise<void> | null = null;

async function migrate(d1: D1Database) {
  await d1.prepare("CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY, applied_at TEXT)").run();
  const done = new Set((await d1.prepare("SELECT name FROM _migrations").all<{ name: string }>()).results.map((r) => r.name));
  for (const m of migrations) {
    if (done.has(m.name)) continue;
    await d1.batch([
      ...m.statements.map((s) => d1.prepare(s)),
      d1.prepare("INSERT OR IGNORE INTO _migrations (name, applied_at) VALUES (?, ?)").bind(m.name, nowIso()),
    ]);
  }
}

/** Returns the database, or null when no D1 binding named DB exists (database not enabled yet). */
export async function getDb(): Promise<Db | null> {
  let d1: D1Database | undefined;
  try {
    const { env } = await getCloudflareContext({ async: true });
    d1 = (env as unknown as { DB?: D1Database }).DB;
  } catch {
    return null;
  }
  if (!d1) return null;
  ready ??= migrate(d1).catch((e) => {
    ready = null; // retry on the next request
    throw e;
  });
  await ready;
  return new Db(d1);
}

export async function isDbEnabled(): Promise<boolean> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return Boolean((env as unknown as { DB?: unknown }).DB);
  } catch {
    return false;
  }
}
