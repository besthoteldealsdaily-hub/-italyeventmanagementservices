import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb, type Db, type Row } from "@/lib/db/client";
import { ENTITIES, getEntity, type ChildDef } from "@/lib/admin/entities";
import { displayValue, loadRefOptions } from "@/lib/admin/crud";
import { eur } from "@/lib/money";
import { fileHref } from "@/lib/r2";
import EntityForm from "@/components/admin/EntityForm";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { A, btnCls, btnDangerCls, Card, EmptyRow, Flash, PageHead, SetupNeeded, TableWrap, tdCls, thCls } from "@/components/admin/ui";
import { deleteEntity, saveEntity } from "../../actions";

type Props = {
  params: Promise<{ entity: string; id: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
};

async function ChildCard({ db, def, parentId, here }: { db: Db; def: ChildDef; parentId: string; here: string }) {
  const child = ENTITIES[def.entity];
  if (!child) return null;
  const rows = await db.all(`SELECT * FROM ${child.table} WHERE ${def.fk} = ? ORDER BY ${child.order} LIMIT 200`, parentId);
  const refs = await loadRefOptions(db, child);
  const cols = child.fields.filter((f) => f.list && f.name !== def.fk);
  return (
    <Card
      title={def.label}
      className="mt-6"
      action={
        def.noAdd ? undefined : (
          <Link href={`/admin/data/${child.key}/new?${def.fk}=${parentId}&return=${encodeURIComponent(here)}`} className={btnCls}>
            + Add
          </Link>
        )
      }
    >
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
                  const href = def.linkBase ? `${def.linkBase}/${String(r.id)}` : `/admin/data/${child.key}/${String(r.id)}?return=${encodeURIComponent(here)}`;
                  return (
                    <td key={f.name} className={tdCls}>
                      {i === 0 ? (
                        <A href={href}>{text}</A>
                      ) : f.link && shown !== "–" ? (
                        <a href={fileHref(String(r[f.name]))} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline">
                          View file
                        </a>
                      ) : (
                        text
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </Card>
  );
}

export default async function EntityEditPage({ params, searchParams }: Props) {
  await requireAdmin();
  const { entity: key, id } = await params;
  const entity = getEntity(key);
  if (!entity) notFound();
  const db = await getDb();
  if (!db) return <SetupNeeded />;

  const sp = await searchParams;
  const isNew = id === "new";
  let row: Row = {};
  if (isNew) {
    // Pre-fill fields (e.g. supplier_id) from the query string when adding a child row.
    for (const f of entity.fields) if (sp[f.name] ?? f.default) row[f.name] = sp[f.name] ?? f.default;
  } else {
    const found = await db.byId(entity.table, id);
    if (!found) notFound();
    row = found;
  }

  const rawReturn = sp.return ?? "";
  const returnTo = rawReturn.startsWith("/admin/") && !rawReturn.includes("?") && !rawReturn.includes("//") ? rawReturn : undefined;
  const refs = await loadRefOptions(db, entity);
  const title = isNew ? `New ${entity.label.toLowerCase()}` : String(row[entity.title] || entity.label);
  const here = `/admin/data/${entity.key}/${id}`;

  return (
    <>
      <PageHead
        title={title}
        sub={isNew ? undefined : entity.plural}
        actions={
          <Link href={returnTo ?? `/admin/data/${entity.key}`} className="text-sm font-medium text-accent hover:underline">
            ← Back
          </Link>
        }
      />
      <Flash ok={sp.ok} err={sp.err} />
      <EntityForm entity={entity} row={row} refs={refs} action={saveEntity.bind(null, entity.key, id)} returnTo={returnTo} />

      {!isNew && (entity.children ?? []).map((c) => <ChildCard key={c.entity} db={db} def={c} parentId={id} here={here} />)}

      {!isNew && (
        <form action={deleteEntity.bind(null, entity.key, id)} className="mt-8">
          {returnTo && <input type="hidden" name="return" value={returnTo} />}
          <ConfirmButton className={btnDangerCls} message={`Delete this ${entity.label.toLowerCase()}? This cannot be undone.`}>
            Delete this {entity.label.toLowerCase()}
          </ConfirmButton>
        </form>
      )}
    </>
  );
}
