import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { fmtDateTime } from "@/lib/dates";
import { SERVICE_OPTIONS } from "@/lib/quote-options";
import { A, EmptyRow, PageHead, SetupNeeded, StatusBadge, TableWrap, tdCls, thCls } from "@/components/admin/ui";

const TABS = ["open", "new", "contacted", "quoted", "won", "lost", "spam", "all"] as const;

type Props = { searchParams: Promise<{ status?: string }> };

export default async function LeadsPage({ searchParams }: Props) {
  await requireAdmin();
  const db = await getDb();
  if (!db) return <SetupNeeded />;

  const { status = "open" } = await searchParams;
  const tab = (TABS as readonly string[]).includes(status) ? status : "open";
  const where = tab === "all" ? "" : tab === "open" ? "WHERE status IN ('new','contacted','quoted')" : "WHERE status = ?";
  const rows = await db.all<{
    id: string; ref: string; name: string; company: string; email: string; service: string; status: string; created_at: string; first_response_at: string | null;
  }>(`SELECT id, ref, name, company, email, service, status, created_at, first_response_at FROM leads ${where} ORDER BY created_at DESC LIMIT 300`, ...(tab === "all" || tab === "open" ? [] : [tab]));

  return (
    <>
      <PageHead title="Leads" sub="Website quote requests and supplier applications. Aim to reply within one hour in business hours." />
      <nav className="mb-4 flex flex-wrap gap-2" aria-label="Lead filter">
        {TABS.map((t) => (
          <Link
            key={t}
            href={`/admin/leads?status=${t}`}
            className={`rounded-full border px-3 py-1 text-sm ${t === tab ? "border-accent bg-accent text-white" : "border-line bg-white hover:border-ink"}`}
          >
            {t}
          </Link>
        ))}
      </nav>
      <TableWrap>
        <table className="w-full">
          <thead>
            <tr>
              <th className={thCls}>Ref</th>
              <th className={thCls}>Name</th>
              <th className={thCls}>Service</th>
              <th className={thCls}>Status</th>
              <th className={thCls}>Received</th>
              <th className={thCls}>Replied</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.length === 0 && <EmptyRow cols={6} text="No leads here." />}
            {rows.map((l) => (
              <tr key={l.id}>
                <td className={tdCls}>
                  <A href={`/admin/leads/${l.id}`}>{l.ref}</A>
                </td>
                <td className={tdCls}>
                  {l.name}
                  {l.company ? <span className="text-muted"> · {l.company}</span> : null}
                </td>
                <td className={tdCls}>{SERVICE_OPTIONS.find((o) => o.value === l.service)?.label ?? l.service}</td>
                <td className={tdCls}>
                  <StatusBadge status={l.status} />
                </td>
                <td className={tdCls}>{fmtDateTime(l.created_at.slice(0, 16))}</td>
                <td className={tdCls}>
                  {l.first_response_at ? `${Math.max(0, Math.round((Date.parse(l.first_response_at) - Date.parse(l.created_at)) / 60000))} min` : "–"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </>
  );
}
