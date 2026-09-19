import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { nextMonthStart, shiftYm, todayRome } from "@/lib/dates";
import { eur } from "@/lib/money";
import { getSettings } from "@/lib/admin/stats";
import { getPublishedPages } from "@/content/registry";
import { Badge, btnGhostCls, Card, EmptyRow, PageHead, SetupNeeded, TableWrap, tdCls, thCls } from "@/components/admin/ui";
import { togglePlanItem } from "./actions";

type Item = { id: string; phase: string | null; week: number | null; title: string; target: string | null; done_at: string | null };
type Kpi = { id: string; month: number; label: string; gbv_cents: number; bookings: number; b2b_accounts: number; suppliers: number; seo_pages: number; sessions: number; fixed_cents: number };

export default async function PlanPage() {
  await requireAdmin();
  const db = await getDb();
  if (!db) return <SetupNeeded />;
  const settings = await getSettings(db);
  const [items, kpis] = await Promise.all([
    db.all<Item>("SELECT * FROM plan_items ORDER BY week, position, rowid"),
    db.all<Kpi>("SELECT * FROM kpi_targets ORDER BY month"),
  ]);

  const launch = /^\d{4}-\d{2}/.test(settings.launch_date) ? settings.launch_date.slice(0, 7) : "";
  const currentYm = todayRome().slice(0, 7);
  const publishedPages = getPublishedPages().length;

  // Actuals for each target month (only when a launch date is set).
  const actuals = new Map<number, { gbv: number; bookings: number; b2b: number; suppliers: number }>();
  if (launch) {
    for (const k of kpis) {
      const from = `${shiftYm(launch, k.month - 1)}-01`;
      const to = nextMonthStart(from);
      const [gbv, bookings, b2b, suppliers] = await Promise.all([
        db.scalar(
          `SELECT COALESCE(SUM(ROUND(COALESCE(i.qty,1) * COALESCE(i.price_cents,0) * (1 + COALESCE(i.vat_rate,0) / 100.0))),0)
           FROM booking_items i JOIN bookings b ON b.id = i.booking_id WHERE b.status != 'cancelled' AND b.created_at >= ? AND b.created_at < ?`,
          from,
          to,
        ),
        db.scalar("SELECT COUNT(*) FROM bookings WHERE status != 'cancelled' AND created_at >= ? AND created_at < ?", from, to),
        db.scalar("SELECT COUNT(DISTINCT organization_id) FROM bookings WHERE status != 'cancelled' AND organization_id IS NOT NULL AND created_at >= ? AND created_at < ?", from, to),
        db.scalar("SELECT COUNT(*) FROM suppliers WHERE status = 'active' AND created_at < ?", to),
      ]);
      actuals.set(k.month, { gbv, bookings, b2b, suppliers });
    }
  }

  const byPhase = new Map<string, Item[]>();
  for (const it of items) {
    const key = it.phase ?? "Other";
    byPhase.set(key, [...(byPhase.get(key) ?? []), it]);
  }
  const done = items.filter((i) => i.done_at).length;

  const cell = (actual: number | undefined, target: number, money = false) => {
    if (actual === undefined) return <span className="text-muted">—</span>;
    const ok = target > 0 && actual >= target;
    const fmt = (n: number) => (money ? eur(n) : String(n));
    return (
      <span className={ok ? "font-semibold text-green-700" : ""}>
        {fmt(actual)} <span className="text-xs text-muted">/ {fmt(target)}</span>
      </span>
    );
  };

  return (
    <>
      <PageHead
        title="Launch plan & KPIs"
        sub={items.length ? `${done} of ${items.length} plan items done.` : "Import the launch plan and monthly targets from your private blueprint files in Settings & import."}
        actions={
          <>
            <Link href="/admin/data/plan_items" className={btnGhostCls}>Edit plan</Link>
            <Link href="/admin/data/kpi_targets" className={btnGhostCls}>Edit targets</Link>
          </>
        }
      />

      <Card title="Monthly targets vs actual">
        {!launch && <p className="mb-3 text-sm text-amber-900">Set your launch date in Settings to compare targets with real numbers.</p>}
        <TableWrap>
          <table className="w-full">
            <thead>
              <tr>
                <th className={thCls}>Month</th>
                <th className={thCls}>Revenue (GBV)</th>
                <th className={thCls}>Bookings</th>
                <th className={thCls}>B2B accounts</th>
                <th className={thCls}>Active suppliers</th>
                <th className={thCls}>SEO pages</th>
                <th className={thCls}>Sessions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {kpis.length === 0 && <EmptyRow cols={7} text="No targets yet — import them in Settings." />}
              {kpis.map((k) => {
                const a = actuals.get(k.month);
                const isNow = launch && shiftYm(launch, k.month - 1) === currentYm;
                return (
                  <tr key={k.id} className={isNow ? "bg-accent/5" : ""}>
                    <td className={tdCls}>
                      M{k.month} · {k.label} {isNow && <Badge tone="blue">now</Badge>}
                    </td>
                    <td className={tdCls}>{cell(a?.gbv, k.gbv_cents, true)}</td>
                    <td className={tdCls}>{cell(a?.bookings, k.bookings)}</td>
                    <td className={tdCls}>{cell(a?.b2b, k.b2b_accounts)}</td>
                    <td className={tdCls}>{cell(a?.suppliers, k.suppliers)}</td>
                    <td className={tdCls}>{cell(launch ? (isNow ? publishedPages : undefined) : undefined, k.seo_pages)}</td>
                    <td className={tdCls}>
                      <span className="text-muted">{k.sessions} target · see Search Console/GA4</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableWrap>
        <p className="mt-2 text-xs text-muted">Revenue = gross booking value incl. VAT of bookings created that month. SEO pages shows the live page count for the current month.</p>
      </Card>

      {[...byPhase.entries()].map(([phase, list]) => (
        <Card key={phase} title={phase} className="mt-6">
          <ul className="space-y-2">
            {list.map((it) => (
              <li key={it.id}>
                <form action={togglePlanItem.bind(null, it.id)} className="flex items-start gap-3 text-sm">
                  <button
                    className={`mt-0.5 h-5 w-5 shrink-0 rounded border ${it.done_at ? "border-green-600 bg-green-600 text-white" : "border-line bg-white"}`}
                    aria-label={it.done_at ? "Mark as not done" : "Mark as done"}
                  >
                    {it.done_at ? "✓" : ""}
                  </button>
                  <span className={it.done_at ? "text-muted line-through" : ""}>
                    {it.week ? <span className="mr-2 text-xs font-semibold text-muted">W{it.week}</span> : null}
                    {it.title}
                    {it.target && <span className="ml-2 text-xs text-muted">→ {it.target}</span>}
                  </span>
                </form>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </>
  );
}
