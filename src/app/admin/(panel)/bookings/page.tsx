import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { fmtDateTime, todayRome } from "@/lib/dates";
import { eur } from "@/lib/money";
import { A, EmptyRow, Flash, PageHead, SetupNeeded, StatusBadge, TableWrap, tdCls, thCls } from "@/components/admin/ui";

const TABS = ["upcoming", "pending_payment", "in_progress", "completed", "cancelled", "all"] as const;
type Props = { searchParams: Promise<{ status?: string; ok?: string; err?: string }> };

export default async function BookingsPage({ searchParams }: Props) {
  await requireAdmin();
  const db = await getDb();
  if (!db) return <SetupNeeded />;
  const sp = await searchParams;
  const tab = (TABS as readonly string[]).includes(sp.status ?? "") ? (sp.status as string) : "upcoming";
  const today = todayRome();

  let where = "";
  const params: string[] = [];
  if (tab === "upcoming") {
    where = "WHERE b.status IN ('pending_payment','confirmed','in_progress') AND (b.service_start IS NULL OR substr(b.service_start,1,10) >= ?)";
    params.push(today);
  } else if (tab !== "all") {
    where = "WHERE b.status = ?";
    params.push(tab);
  }
  const rows = await db.all<{
    id: string; ref: string; title: string; customer_name: string; service_start: string | null; status: string; payment_status: string; gross: number; paid: number;
  }>(
    `SELECT b.id, b.ref, b.title, b.customer_name, b.service_start, b.status, b.payment_status,
       COALESCE((SELECT SUM(ROUND(COALESCE(qty,1) * COALESCE(price_cents,0) * (1 + COALESCE(vat_rate,0) / 100.0))) FROM booking_items WHERE booking_id = b.id), 0) AS gross,
       COALESCE((SELECT SUM(amount_cents) FROM payments WHERE booking_id = b.id AND status = 'paid'), 0)
         - COALESCE((SELECT SUM(amount_cents) FROM refunds WHERE booking_id = b.id AND status = 'done'), 0) AS paid
     FROM bookings b ${where} ORDER BY ${tab === "upcoming" ? "b.service_start" : "b.created_at DESC"} LIMIT 300`,
    ...params,
  );

  return (
    <>
      <PageHead title="Bookings" sub="Bookings are created from accepted quotes — open a quote and choose “Convert to booking”." />
      <Flash ok={sp.ok} err={sp.err} />
      <nav className="mb-4 flex flex-wrap gap-2" aria-label="Booking filter">
        {TABS.map((t) => (
          <Link
            key={t}
            href={`/admin/bookings?status=${t}`}
            className={`rounded-full border px-3 py-1 text-sm ${t === tab ? "border-accent bg-accent text-white" : "border-line bg-white hover:border-ink"}`}
          >
            {t.replace(/_/g, " ")}
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
              <th className={thCls}>Start</th>
              <th className={thCls}>Total</th>
              <th className={thCls}>Paid</th>
              <th className={thCls}>Status</th>
              <th className={thCls}>Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.length === 0 && <EmptyRow cols={8} text="No bookings here." />}
            {rows.map((b) => (
              <tr key={b.id}>
                <td className={tdCls}>
                  <A href={`/admin/bookings/${b.id}`}>{b.ref}</A>
                </td>
                <td className={tdCls}>{b.title}</td>
                <td className={tdCls}>{b.customer_name}</td>
                <td className={tdCls}>{fmtDateTime(b.service_start)}</td>
                <td className={tdCls}>{eur(b.gross)}</td>
                <td className={tdCls}>{eur(b.paid)}</td>
                <td className={tdCls}>
                  <StatusBadge status={b.status} />
                </td>
                <td className={tdCls}>
                  <StatusBadge status={b.payment_status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </>
  );
}
