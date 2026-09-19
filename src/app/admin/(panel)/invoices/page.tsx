import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { fmtDate, todayRome } from "@/lib/dates";
import { eur } from "@/lib/money";
import { A, btnGhostCls, EmptyRow, PageHead, SetupNeeded, TableWrap, tdCls, thCls } from "@/components/admin/ui";

type Props = { searchParams: Promise<{ year?: string }> };

export default async function InvoicesPage({ searchParams }: Props) {
  await requireAdmin();
  const db = await getDb();
  if (!db) return <SetupNeeded />;
  const { year: y } = await searchParams;
  const year = /^\d{4}$/.test(y ?? "") ? (y as string) : todayRome().slice(0, 4);
  const rows = await db.all<{ id: string; number: string; issued_on: string; customer_name: string; net_cents: number; vat_cents: number; total_cents: number; vat_regime: string; sdi_status: string }>(
    "SELECT id, number, issued_on, customer_name, net_cents, vat_cents, total_cents, vat_regime, sdi_status FROM invoices WHERE number LIKE ? ORDER BY number DESC",
    `${year}/%`,
  );
  const total = rows.reduce((a, r) => a + r.total_cents, 0);
  const notSent = rows.filter((r) => r.sdi_status === "not_sent").length;

  return (
    <>
      <PageHead
        title={`Invoices ${year}`}
        sub="Internal invoice records with sequential numbering. Send the legally valid electronic invoice (FatturaPA via SDI) through your accountant or e-invoicing provider, then record its status here."
        actions={
          <a className={btnGhostCls} href={`/admin/export/invoices?year=${year}`}>
            Download CSV for accountant
          </a>
        }
      />
      <nav className="mb-4 flex gap-2 text-sm" aria-label="Year">
        {[Number(year) - 1, Number(year), Number(year) + 1].map((yy) => (
          <Link key={yy} href={`/admin/invoices?year=${yy}`} className={`rounded-full border px-3 py-1 ${String(yy) === year ? "border-accent bg-accent text-white" : "border-line bg-white"}`}>
            {yy}
          </Link>
        ))}
      </nav>
      <p className="mb-3 text-sm text-muted">
        {rows.length} invoice(s) · total {eur(total)}
        {notSent > 0 && <span className="ml-2 font-semibold text-amber-800">· {notSent} not yet sent to SDI</span>}
      </p>
      <TableWrap>
        <table className="w-full">
          <thead>
            <tr>
              <th className={thCls}>Number</th>
              <th className={thCls}>Date</th>
              <th className={thCls}>Customer</th>
              <th className={thCls}>Net</th>
              <th className={thCls}>VAT</th>
              <th className={thCls}>Total</th>
              <th className={thCls}>SDI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.length === 0 && <EmptyRow cols={7} text="No invoices this year." />}
            {rows.map((r) => (
              <tr key={r.id}>
                <td className={tdCls}>
                  <A href={`/admin/invoices/${r.id}`}>{r.number}</A>
                </td>
                <td className={tdCls}>{fmtDate(r.issued_on)}</td>
                <td className={tdCls}>{r.customer_name}</td>
                <td className={tdCls}>{eur(r.net_cents)}</td>
                <td className={tdCls}>{r.vat_regime === "margin_74ter" ? "74-ter" : eur(r.vat_cents)}</td>
                <td className={tdCls}>{eur(r.total_cents)}</td>
                <td className={tdCls}>{r.sdi_status.replace(/_/g, " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </>
  );
}
