import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { addDays, daysFromToday, fmtDate, fmtDateTime, todayRome } from "@/lib/dates";
import { eur } from "@/lib/money";
import { dashboardStats, syncReminderTasks } from "@/lib/admin/stats";
import { A, Card, EmptyRow, Kpi, PageHead, SetupNeeded, StatusBadge, TableWrap, tdCls, thCls } from "@/components/admin/ui";

export default async function Dashboard() {
  await requireAdmin();
  const db = await getDb();
  if (!db) return <SetupNeeded />;

  const today = todayRome();
  await syncReminderTasks(db, today);
  const s = await dashboardStats(db, today, addDays(today, 7), addDays(today, 30));
  const [leads, upcoming, docs] = await Promise.all([
    db.all<{ id: string; ref: string; name: string; service: string; created_at: string }>(
      "SELECT id, ref, name, service, created_at FROM leads WHERE status = 'new' ORDER BY created_at LIMIT 5",
    ),
    db.all<{ id: string; ref: string; customer_name: string; service_start: string; status: string; payment_status: string }>(
      "SELECT id, ref, customer_name, service_start, status, payment_status FROM bookings WHERE status IN ('confirmed','pending_payment','in_progress') AND substr(service_start,1,10) BETWEEN ? AND ? ORDER BY service_start LIMIT 8",
      today,
      addDays(today, 7),
    ),
    db.all<{ supplier_id: string; legal_name: string; doc_type: string; valid_to: string }>(
      "SELECT d.supplier_id, s.legal_name, d.doc_type, d.valid_to FROM supplier_documents d JOIN suppliers s ON s.id = d.supplier_id WHERE d.valid_to IS NOT NULL AND d.valid_to != '' AND d.valid_to <= ? ORDER BY d.valid_to LIMIT 6",
      addDays(today, 30),
    ),
  ]);

  const ageH = s.oldestLeadHours;

  return (
    <>
      <PageHead title="Dashboard" sub={`Today is ${fmtDate(today)} (Italy time).`} />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="New leads" value={String(s.newLeads)} hint={s.newLeads ? `Oldest waiting ${ageH} h — reply within 1 hour` : "All answered"} tone={ageH >= 2 ? "warn" : undefined} />
        <Kpi label="Quotes out" value={String(s.quotesAwaiting)} hint={`${s.quotesDraft} draft`} />
        <Kpi label="Services next 7 days" value={String(s.upcoming7)} />
        <Kpi label="Still to collect" value={eur(s.receivables)} hint={s.overdueSchedules ? `${s.overdueSchedules} overdue` : "Nothing overdue"} tone={s.overdueSchedules ? "warn" : undefined} />
        <Kpi label="Tasks due" value={String(s.tasksDue)} tone={s.tasksDue ? "warn" : "good"} />
        <Kpi label="Supplier payouts pending" value={String(s.payoutsDue)} />
        <Kpi label="Documents expiring (30 d)" value={String(s.docsExpiring)} hint={s.docsExpired ? `${s.docsExpired} already expired` : undefined} tone={s.docsExpired ? "warn" : undefined} />
        <Kpi label="Open incidents" value={String(s.openIncidents)} tone={s.openIncidents ? "warn" : "good"} />
        <Kpi label="Hotel cut-offs (14 d)" value={String(s.blockCutoffs)} hint="Room blocks to confirm or release" tone={s.blockCutoffs ? "warn" : undefined} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card title="Leads waiting" action={<A href="/admin/leads">All leads →</A>}>
          <TableWrap>
            <table className="w-full">
              <thead>
                <tr>
                  <th className={thCls}>Ref</th>
                  <th className={thCls}>Name</th>
                  <th className={thCls}>Service</th>
                  <th className={thCls}>Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {leads.length === 0 && <EmptyRow cols={4} text="No new leads." />}
                {leads.map((l) => (
                  <tr key={l.id}>
                    <td className={tdCls}>
                      <A href={`/admin/leads/${l.id}`}>{l.ref}</A>
                    </td>
                    <td className={tdCls}>{l.name}</td>
                    <td className={tdCls}>{l.service?.replace(/_/g, " ")}</td>
                    <td className={tdCls}>{fmtDateTime(l.created_at.slice(0, 16))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Card>

        <Card title="Next 7 days" action={<A href="/admin/bookings">All bookings →</A>}>
          <TableWrap>
            <table className="w-full">
              <thead>
                <tr>
                  <th className={thCls}>Booking</th>
                  <th className={thCls}>Customer</th>
                  <th className={thCls}>Start</th>
                  <th className={thCls}>Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {upcoming.length === 0 && <EmptyRow cols={4} text="No services in the next 7 days." />}
                {upcoming.map((b) => (
                  <tr key={b.id}>
                    <td className={tdCls}>
                      <A href={`/admin/bookings/${b.id}`}>{b.ref}</A>
                    </td>
                    <td className={tdCls}>{b.customer_name}</td>
                    <td className={tdCls}>{fmtDateTime(b.service_start)}</td>
                    <td className={tdCls}>
                      <StatusBadge status={b.payment_status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Card>

        <Card title="Supplier documents — expired or expiring" action={<A href="/admin/documents">Compliance →</A>}>
          <TableWrap>
            <table className="w-full">
              <thead>
                <tr>
                  <th className={thCls}>Supplier</th>
                  <th className={thCls}>Document</th>
                  <th className={thCls}>Expires</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {docs.length === 0 && <EmptyRow cols={3} text="Nothing expiring in the next 30 days." />}
                {docs.map((d, i) => {
                  const left = daysFromToday(d.valid_to);
                  return (
                    <tr key={i}>
                      <td className={tdCls}>
                        <A href={`/admin/data/suppliers/${d.supplier_id}`}>{d.legal_name}</A>
                      </td>
                      <td className={tdCls}>{d.doc_type.replace(/_/g, " ")}</td>
                      <td className={`${tdCls} ${left < 0 ? "font-semibold text-red-700" : ""}`}>
                        {fmtDate(d.valid_to)} ({left < 0 ? `${-left} d ago` : `${left} d`})
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableWrap>
        </Card>

        <Card title="Shortcuts">
          <ul className="grid gap-2 text-sm sm:grid-cols-2">
            <li>
              <Link className="text-accent hover:underline" href="/admin/quotes">Quotes</Link>
            </li>
            <li>
              <Link className="text-accent hover:underline" href="/admin/sales">Today&apos;s outreach queue</Link>
            </li>
            <li>
              <Link className="text-accent hover:underline" href="/admin/tasks">Task list</Link>
            </li>
            <li>
              <Link className="text-accent hover:underline" href="/admin/finance">Profit this month</Link>
            </li>
            <li>
              <Link className="text-accent hover:underline" href="/admin/plan">Launch plan &amp; KPIs</Link>
            </li>
            <li>
              <Link className="text-accent hover:underline" href="/admin/settings">Settings &amp; import</Link>
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
}
