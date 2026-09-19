import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { getEntity } from "@/lib/admin/entities";
import { displayValue, loadRefOptions } from "@/lib/admin/crud";
import { eur } from "@/lib/money";
import { A, btnCls, Flash, inputCls, PageHead, SetupNeeded, TableWrap, tdCls, thCls, EmptyRow, btnGhostCls } from "@/components/admin/ui";

type Props = {
  params: Promise<{ entity: string }>;
  searchParams: Promise<{ q?: string; ok?: string; err?: string }>;
};

export default async function EntityListPage({ params, searchParams }: Props) {
  await requireAdmin();
  const { entity: key } = await params;
  const entity = getEntity(key);
  if (!entity) notFound();
  const db = await getDb();
  if (!db) return <SetupNeeded />;

  const { q = "", ok, err } = await searchParams;
  const term = q.trim().slice(0, 80);
  const where = term ? `WHERE ${entity.search.map((c) => `${c} LIKE ?`).join(" OR ")}` : "";
  const rows = await db.all(
    `SELECT * FROM ${entity.table} ${where} ORDER BY ${entity.order} LIMIT 300`,
    ...(term ? entity.search.map(() => `%${term}%`) : []),
  );
  const refs = await loadRefOptions(db, entity);
  const cols = entity.fields.filter((f) => f.list);

  return (
    <>
      <PageHead
        title={entity.plural}
        sub={entity.intro}
        actions={
          <Link href={`/admin/data/${entity.key}/new`} className={btnCls}>
            + Add {entity.label.toLowerCase()}
          </Link>
        }
      />
      <Flash ok={ok} err={err} />
      <form className="mb-4 flex gap-2" role="search">
        <input name="q" defaultValue={term} placeholder="Search…" className={`${inputCls} max-w-xs`} aria-label="Search" />
        <button className={btnGhostCls}>Search</button>
        {term && (
          <Link href={`/admin/data/${entity.key}`} className={btnGhostCls}>
            Clear
          </Link>
        )}
      </form>
      <TableWrap>
        <table className="w-full">
          <thead>
            <tr>
              {cols.map((f) => (
                <th key={f.name} className={thCls}>
                  {f.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.length === 0 && <EmptyRow cols={cols.length} />}
            {rows.map((r) => (
              <tr key={String(r.id)}>
                {cols.map((f, i) => {
                  const shown = displayValue(f, r[f.name], refs);
                  const text = f.type === "money" ? eur(Number(r[f.name] ?? 0)) : f.type === "select" ? shown.replace(/_/g, " ") : shown;
                  return (
                    <td key={f.name} className={tdCls}>
                      {i === 0 ? <A href={`/admin/data/${entity.key}/${String(r.id)}`}>{text}</A> : text}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
      {rows.length >= 300 && <p className="mt-2 text-xs text-muted">Showing the first 300 rows — use search to narrow down.</p>}
    </>
  );
}
