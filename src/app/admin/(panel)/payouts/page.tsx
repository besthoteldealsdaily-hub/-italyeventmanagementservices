import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { fmtDate, todayRome } from "@/lib/dates";
import { eur } from "@/lib/money";
import { A, Badge, btnGhostCls, EmptyRow, Flash, inputCls, PageHead, SetupNeeded, StatusBadge, TableWrap, tdCls, thCls } from "@/components/admin/ui";
import { markPayoutPaid } from "./actions";

const TABS = ["pending", "paid", "cancelled", "all"] as const;
type Props = { searchParams: Promise<{ status?: string; ok?: string; err?: string }> };

export default async function PayoutsPage({ searchParams }: Props) {
  await requireAdmin();
  const db = await getDb();
  if (!db) return <SetupNeeded />;
  const sp = await searchParams;
  const tab = (TABS as readonly string[]).includes(sp.status ?? "") ? (sp.status as string) : "pending";
  const today = todayRome();

  const rows = await db.all<{
    id: string; supplier_id: string; supplier_name: string; iban: string | null; booking_id: string; booking_ref: string; amount_cents: number; due_on: string; status: string;
    paid_at: string | null; b_status: string; b_payment: string;
  }>(
    `SELECT p.id, p.supplier_id, s.legal_name AS supplier_name, s.iban, p.booking_id, b.ref AS booking_ref, p.amount_cents, p.due_on, p.status, p.paid_at,
            b.status AS b_status, b.payment_status AS b_payment
     FROM supplier_payouts p LEFT JOIN suppliers s ON s.id = p.supplier_id LEFT JOIN bookings b ON b.id = p.booking_id
     ${tab === "all" ? "" : "WHERE p.status = ?"} ORDER BY p.due_on LIMIT 300`,
    ...(tab === "all" ? [] : [tab]),
  );
  const pendingTotal = rows.filter((r) => r.status === "pending").reduce((a, r) => a + r.amount_cents, 0);

  return (
    <>
      <PageHead
        title="Supplier payouts"
        sub="Pay suppliers only after the customer has paid in full and the service is complete. Create payouts from a booking page."
        actions={
          <a href="/admin/export/payouts" className={btnGhostCls} download>
            Download CSV
          </a>
        }
      />
      <Flash ok={sp.ok} err={sp.err} />
      <nav className="mb-3 flex flex-wrap gap-2" aria-label="Payout filter">
        {TABS.map((t) => (
          <Link key={t} href={`/admin/payouts?status=${t}`} className={`rounded-full border px-3 py-1 text-sm ${t === tab ? "border-accent bg-accent text-white" : "border-line bg-white"}`}>
            {t}
          </Link>
        ))}
      </nav>
      {tab === "pending" && <p className="mb-3 text-sm text-muted">Pending total: <strong>{eur(pendingTotal)}</strong></p>}
      <TableWrap>
        <table className="w-full">
          <thead>
            <tr>
              <th className={thCls}>Supplier</th>
              <th className={thCls}>Booking</th>
              <th className={thCls}>Amount</th>
              <th className={thCls}>Due</th>
              <th className={thCls}>Ready?</th>
              <th className={thCls}>Status / action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.length === 0 && <EmptyRow cols={6} text="No payouts here." />}
            {rows.map((r) => {
              const ready = r.b_payment === "paid" && r.b_status === "completed";
              return (
                <tr key={r.id}>
                  <td className={tdCls}>
                    <A href={`/admin/data/suppliers/${r.supplier_id}`}>{r.supplier_name}</A>
                    {!r.iban && r.status === "pending" && <span className="block text-xs text-red-700">no IBAN on file</span>}
                  </td>
                  <td className={tdCls}>
                    <A href={`/admin/bookings/${r.booking_id}`}>{r.booking_ref}</A>
                  </td>
                  <td className={tdCls}>{eur(r.amount_cents)}</td>
                  <td className={`${tdCls} ${r.status === "pending" && r.due_on < today ? "font-semibold text-red-700" : ""}`}>{fmtDate(r.due_on)}</td>
                  <td className={tdCls}>{r.status !== "pending" ? "–" : ready ? <Badge tone="green">ready</Badge> : <Badge tone="amber">not yet</Badge>}</td>
                  <td className={tdCls}>
                    {r.status === "pending" ? (
                      <form action={markPayoutPaid.bind(null, r.id)} className="flex flex-wrap items-center gap-2">
                        <input name="reference" placeholder="Bank ref" className={`${inputCls} w-28`} aria-label="Payment reference" />
                        {!ready && (
                          <label className="flex items-center gap-1 text-xs">
                            <input type="checkbox" name="override" /> pay anyway
                          </label>
                        )}
                        <button className={btnGhostCls}>Mark paid</button>
                      </form>
                    ) : (
                      <StatusBadge status={r.status} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableWrap>
    </>
  );
}
