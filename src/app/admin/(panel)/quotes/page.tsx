import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { fmtDate } from "@/lib/dates";
import { eur } from "@/lib/money";
import { A, btnCls, EmptyRow, Flash, PageHead, SetupNeeded, StatusBadge, TableWrap, tdCls, thCls } from "@/components/admin/ui";
import { createBlankQuote } from "./actions";

const TABS = ["open", "draft", "sent", "accepted", "expired", "declined", "all"] as const;
type Props = { searchParams: Promise<{ status?: string; ok?: string; err?: string }> };

export default async function QuotesPage({ searchParams }: Props) {
  await requireAdmin();
  const db = await getDb();
  if (!db) return <SetupNeeded />;
  const sp = await searchParams;
  const tab = (TABS as readonly string[]).includes(sp.status ?? "") ? (sp.status as string) : "open";
  const where = tab === "all" ? "" : tab === "open" ? "WHERE q.status IN ('draft','sent')" : "WHERE q.status = ?";

  const rows = await db.all<{
    id: string; ref: string; title: string; contact_name: string; status: string; valid_until: string | null; net: number; vat: number;
  }>(
    `SELECT q.id, q.ref, q.title, q.contact_name, q.status, q.valid_until,
       COALESCE((SELECT SUM(ROUND(qty * unit_price_cents)) FROM quote_items WHERE quote_id = q.id), 0) AS net,
       COALESCE((SELECT SUM(ROUND(qty * unit_price_cents * vat_rate / 100.0)) FROM quote_items WHERE quote_id = q.id), 0) AS vat
     FROM quotes q ${where} ORDER BY q.created_at DESC LIMIT 300`,
    ...(tab === "all" || tab === "open" ? [] : [tab]),
  );

  return (
    <>
      <PageHead
        title="Quotes"
        sub="Build a quote, send the customer link, and convert it to a booking once accepted."
        actions={
          <form action={createBlankQuote}>
            <button className={btnCls}>+ New quote</button>
          </form>
        }
      />
      <Flash ok={sp.ok} err={sp.err} />
      <nav className="mb-4 flex flex-wrap gap-2" aria-label="Quote filter">
        {TABS.map((t) => (
          <Link
            key={t}
            href={`/admin/quotes?status=${t}`}
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
              <th className={thCls}>Title</th>
              <th className={thCls}>Customer</th>
              <th className={thCls}>Total (incl. VAT)</th>
              <th className={thCls}>Status</th>
              <th className={thCls}>Valid until</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.length === 0 && <EmptyRow cols={6} text="No quotes here." />}
            {rows.map((q) => (
              <tr key={q.id}>
                <td className={tdCls}>
                  <A href={`/admin/quotes/${q.id}`}>{q.ref}</A>
                </td>
                <td className={tdCls}>{q.title}</td>
                <td className={tdCls}>{q.contact_name}</td>
                <td className={tdCls}>{eur(q.net + q.vat)}</td>
                <td className={tdCls}>
                  <StatusBadge status={q.status} />
                </td>
                <td className={tdCls}>{fmtDate(q.valid_until)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </>
  );
}
