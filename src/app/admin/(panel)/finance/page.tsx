import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { addDays, nextMonthStart, shiftYm, todayRome } from "@/lib/dates";
import { eur, pct, toCents } from "@/lib/money";
import { getSettings, RECEIVABLES_SQL } from "@/lib/admin/stats";
import { A, Badge, btnGhostCls, Card, EmptyRow, Kpi, PageHead, SetupNeeded, TableWrap, tdCls, thCls } from "@/components/admin/ui";

type Props = { searchParams: Promise<{ month?: string }> };

const LINE_AGG = `
  COALESCE(SUM(ROUND(COALESCE(i.qty,1) * COALESCE(i.price_cents,0))), 0) AS net,
  COALESCE(SUM(ROUND(COALESCE(i.qty,1) * COALESCE(i.price_cents,0) * COALESCE(i.vat_rate,0) / 100.0)), 0) AS vat,
  COALESCE(SUM(ROUND(COALESCE(i.qty,1) * COALESCE(i.cost_cents,0))), 0) AS cost`;

const shiftMonth = shiftYm;

export default async function FinancePage({ searchParams }: Props) {
  await requireAdmin();
  const db = await getDb();
  if (!db) return <SetupNeeded />;
  const sp = await searchParams;
  const month = /^\d{4}-(0[1-9]|1[0-2])$/.test(sp.month ?? "") ? (sp.month as string) : todayRome().slice(0, 7);
  const from = `${month}-01`;
  const to = nextMonthStart(from);
  const settings = await getSettings(db);

  const [bookings, byType, cash, commissions, incidents, penalties, receivables, payables, trend, held] = await Promise.all([
    db.all<{ id: string; ref: string; title: string; customer_name: string; net: number; vat: number; cost: number }>(
      `SELECT b.id, b.ref, b.title, b.customer_name, ${LINE_AGG} FROM bookings b LEFT JOIN booking_items i ON i.booking_id = b.id
       WHERE b.status != 'cancelled' AND b.created_at >= ? AND b.created_at < ? GROUP BY b.id ORDER BY b.created_at DESC`,
      from,
      to,
    ),
    db.all<{ service_type: string | null; net: number; cost: number; n: number }>(
      `SELECT i.service_type AS service_type, COALESCE(SUM(ROUND(COALESCE(i.qty,1) * COALESCE(i.price_cents,0))),0) AS net,
              COALESCE(SUM(ROUND(COALESCE(i.qty,1) * COALESCE(i.cost_cents,0))),0) AS cost, COUNT(*) AS n
       FROM booking_items i JOIN bookings b ON b.id = i.booking_id
       WHERE b.status != 'cancelled' AND b.created_at >= ? AND b.created_at < ? GROUP BY i.service_type ORDER BY net DESC`,
      from,
      to,
    ),
    db.first<{ total: number; fees: number; card: number; card_n: number }>(
      `SELECT COALESCE(SUM(amount_cents),0) AS total, COALESCE(SUM(fee_cents),0) AS fees,
              COALESCE(SUM(CASE WHEN provider IN ('stripe','card_terminal') THEN amount_cents ELSE 0 END),0) AS card,
              COALESCE(SUM(CASE WHEN provider IN ('stripe','card_terminal') AND fee_cents = 0 THEN 1 ELSE 0 END),0) AS card_n
       FROM payments WHERE status = 'paid' AND paid_at >= ? AND paid_at < ?`,
      from,
      to,
    ),
    db.scalar("SELECT COALESCE(SUM(amount_cents),0) FROM commissions WHERE created_at >= ? AND created_at < ?", from, to),
    db.scalar("SELECT COALESCE(SUM(extra_cost_cents),0) FROM incidents WHERE reported_at >= ? AND reported_at < ?", from, to),
    db.scalar("SELECT COALESCE(SUM(supplier_penalty_cents),0) FROM cancellations WHERE created_at >= ? AND created_at < ?", from, to),
    db.scalar(RECEIVABLES_SQL),
    db.scalar("SELECT COALESCE(SUM(amount_cents),0) FROM supplier_payouts WHERE status = 'pending'"),
    db.all<{ m: string; net: number; cost: number; n: number }>(
      `SELECT substr(b.created_at,1,7) AS m, ${LINE_AGG}, COUNT(DISTINCT b.id) AS n
       FROM bookings b LEFT JOIN booking_items i ON i.booking_id = b.id WHERE b.status != 'cancelled' AND b.created_at >= ? AND b.created_at < ?
       GROUP BY m ORDER BY m`,
      `${shiftMonth(month, -5)}-01`,
      to,
    ),
    // Customer money held: everything collected, minus refunds paid, minus supplier payouts already paid.
    db.scalar(
      `SELECT COALESCE((SELECT SUM(amount_cents) FROM payments WHERE status = 'paid'), 0)
            - COALESCE((SELECT SUM(amount_cents) FROM refunds WHERE status = 'done'), 0)
            - COALESCE((SELECT SUM(amount_cents) FROM supplier_payouts WHERE status = 'paid'), 0)`,
    ),
  ]);

  const net = bookings.reduce((a, b) => a + b.net, 0);
  const gross = bookings.reduce((a, b) => a + b.net + b.vat, 0);
  const cost = bookings.reduce((a, b) => a + b.cost, 0);
  const margin = net - cost;
  const feePct = Number(settings.card_fee_pct) || 0;
  const feeFixed = toCents(settings.card_fee_fixed);
  const fees = (cash?.fees ?? 0) + Math.round(((cash?.card ?? 0) * feePct) / 100) + (cash?.card_n ?? 0) * feeFixed;
  const contribution = margin - fees - commissions - incidents - penalties;
  const fixed = toCents(settings.fixed_costs_monthly);
  const result = contribution - fixed;
  const target = toCents(settings.target_net_monthly);
  const minMargin = Number(settings.min_margin_pct) || 0;
  const progress = target > 0 ? Math.max(0, Math.min(100, Math.round((result / target) * 100))) : 0;
  const trendMax = Math.max(1, ...trend.map((t) => t.net));

  return (
    <>
      <PageHead
        title="Finance & profit"
        sub="Revenue is counted when a booking is created (cancelled bookings excluded). Contribution = gross margin minus estimated card fees, commissions, incident costs and supplier penalties."
        actions={
          <>
            <Link href={`/admin/finance?month=${shiftMonth(month, -1)}`} className={btnGhostCls}>← {shiftMonth(month, -1)}</Link>
            <span className="px-2 text-sm font-semibold">{month}</span>
            <Link href={`/admin/finance?month=${shiftMonth(month, 1)}`} className={btnGhostCls}>{shiftMonth(month, 1)} →</Link>
            <a href={`/admin/export/payments?month=${month}`} className={btnGhostCls}>Payments CSV</a>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Gross booking value (incl. VAT)" value={eur(gross)} hint={`${bookings.length} booking(s)`} />
        <Kpi label="Net revenue (ex-VAT)" value={eur(net)} />
        <Kpi label="Gross margin" value={eur(margin)} hint={pct(margin, net)} tone={margin > 0 ? "good" : "warn"} />
        <Kpi label="Contribution" value={eur(contribution)} hint={pct(contribution, net)} tone={contribution > 0 ? "good" : "warn"} />
        <Kpi label="Cash received this month" value={eur(cash?.total ?? 0)} />
        <Kpi label="Still to collect (all bookings)" value={eur(receivables)} />
        <Kpi label="Supplier payouts pending" value={eur(payables)} />
        <Kpi
          label="Cash cover"
          value={eur(held - payables)}
          hint={`Customer money held ${eur(held)} vs supplier payables ${eur(payables)}${held < payables ? " — do NOT release supplier deposits" : ""}`}
          tone={held < payables ? "warn" : "good"}
        />
        <Kpi label="Result after fixed costs" value={eur(result)} hint={fixed ? `fixed costs ${eur(fixed)}` : "set fixed costs in Settings"} tone={result > 0 ? "good" : "warn"} />
      </div>

      <Card title={`Progress to monthly net target (${eur(target)})`} className="mt-6">
        <div className="h-3 overflow-hidden rounded-full bg-sand" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-sm text-muted">
          {progress}% — result {eur(result)} of {eur(target)}. Estimates: card fees {eur(fees)} (at {feePct}% + €{settings.card_fee_fixed} per card payment unless recorded), commissions {eur(commissions)}, incidents{" "}
          {eur(incidents)}, supplier penalties {eur(penalties)}. Taxes and social contributions are not included — ask your accountant.
        </p>
      </Card>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card title="Margin by service">
          <TableWrap>
            <table className="w-full">
              <thead>
                <tr>
                  <th className={thCls}>Service</th>
                  <th className={thCls}>Lines</th>
                  <th className={thCls}>Revenue</th>
                  <th className={thCls}>Margin</th>
                  <th className={thCls}>%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {byType.length === 0 && <EmptyRow cols={5} text="No bookings this month." />}
                {byType.map((r) => (
                  <tr key={r.service_type ?? "none"}>
                    <td className={tdCls}>{(r.service_type ?? "unspecified").replace(/_/g, " ")}</td>
                    <td className={tdCls}>{r.n}</td>
                    <td className={tdCls}>{eur(r.net)}</td>
                    <td className={tdCls}>{eur(r.net - r.cost)}</td>
                    <td className={tdCls}>{pct(r.net - r.cost, r.net)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Card>

        <Card title="Last 6 months (net revenue)">
          <ul className="space-y-2 text-sm">
            {trend.length === 0 && <li className="text-muted">No data yet.</li>}
            {trend.map((t) => (
              <li key={t.m} className="grid grid-cols-[4.5rem_1fr_9rem] items-center gap-3">
                <span className="text-muted">{t.m}</span>
                <span className="h-3 overflow-hidden rounded bg-sand">
                  <span className="block h-full bg-accent" style={{ width: `${Math.round((t.net / trendMax) * 100)}%` }} />
                </span>
                <span className="text-right">
                  {eur(t.net)} · {pct(t.net - t.cost, t.net)}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Bookings this month" className="mt-6">
        <TableWrap>
          <table className="w-full">
            <thead>
              <tr>
                <th className={thCls}>Booking</th>
                <th className={thCls}>Customer</th>
                <th className={thCls}>Revenue</th>
                <th className={thCls}>Cost</th>
                <th className={thCls}>Margin</th>
                <th className={thCls}>%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {bookings.length === 0 && <EmptyRow cols={6} text="No bookings created this month." />}
              {bookings.map((b) => {
                const m = b.net - b.cost;
                const low = b.net > 0 && (m / b.net) * 100 < minMargin;
                return (
                  <tr key={b.id}>
                    <td className={tdCls}>
                      <A href={`/admin/bookings/${b.id}`}>{b.ref}</A>
                    </td>
                    <td className={tdCls}>{b.customer_name}</td>
                    <td className={tdCls}>{eur(b.net)}</td>
                    <td className={tdCls}>{eur(b.cost)}</td>
                    <td className={tdCls}>{eur(m)}</td>
                    <td className={tdCls}>
                      {pct(m, b.net)} {low && <Badge tone="red">below {minMargin}%</Badge>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableWrap>
      </Card>
      <p className="mt-3 text-xs text-muted">Range {from} → {addDays(to, -1)}.</p>
    </>
  );
}
