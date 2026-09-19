import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { addDays, daysFromToday, fmtDate, todayRome } from "@/lib/dates";
import { checklist, type DocState } from "@/lib/admin/onboarding";
import { A, Badge, Card, EmptyRow, PageHead, SetupNeeded, StatusBadge, TableWrap, tdCls, thCls } from "@/components/admin/ui";

const TONE: Record<DocState, "green" | "amber" | "red" | "gray"> = { ok: "green", expiring: "amber", expired: "red", unverified: "amber", missing: "red" };

export default async function DocumentsPage() {
  await requireAdmin();
  const db = await getDb();
  if (!db) return <SetupNeeded />;
  const today = todayRome();
  const in30 = addDays(today, 30);
  const in60 = addDays(today, 60);

  const [suppliers, docs, vehicles, drivers] = await Promise.all([
    db.all<{ id: string; legal_name: string; type: string; status: string }>("SELECT id, legal_name, type, status FROM suppliers WHERE status IN ('prospect','active','paused') ORDER BY legal_name COLLATE NOCASE"),
    db.all<{ supplier_id: string; doc_type: string; valid_to: string | null; verified_at: string | null }>("SELECT supplier_id, doc_type, valid_to, verified_at FROM supplier_documents"),
    db.all<{ id: string; supplier_id: string; legal_name: string; plate: string; insurance_expiry: string }>(
      "SELECT v.id, v.supplier_id, s.legal_name, v.plate, v.insurance_expiry FROM vehicles v JOIN suppliers s ON s.id = v.supplier_id WHERE v.insurance_expiry IS NOT NULL AND v.insurance_expiry != '' AND v.insurance_expiry <= ? ORDER BY v.insurance_expiry",
      in60,
    ),
    db.all<{ id: string; supplier_id: string; legal_name: string; name: string; cap_expiry: string }>(
      "SELECT d.id, d.supplier_id, s.legal_name, d.name, d.cap_expiry FROM drivers d JOIN suppliers s ON s.id = d.supplier_id WHERE d.cap_expiry IS NOT NULL AND d.cap_expiry != '' AND d.cap_expiry <= ? ORDER BY d.cap_expiry",
      in60,
    ),
  ]);

  const rows = suppliers.map((s) => {
    const list = checklist(s.type, docs.filter((d) => d.supplier_id === s.id), today, in30);
    return { s, list, ready: list.every((r) => r.state === "ok" || r.state === "expiring") };
  });

  const expiry = (date: string) => {
    const left = daysFromToday(date);
    return <span className={left < 0 ? "font-semibold text-red-700" : left <= 30 ? "text-amber-800" : ""}>{fmtDate(date)} ({left < 0 ? `${-left} d ago` : `${left} d`})</span>;
  };

  return (
    <>
      <PageHead
        title="Supplier compliance"
        sub="A supplier is ready to receive bookings only when every required document is on file, verified with the issuing body, and in date. Suppliers below are checked against the standard list for their type."
      />

      <Card title="Onboarding checklist by supplier">
        <TableWrap>
          <table className="w-full">
            <thead>
              <tr>
                <th className={thCls}>Supplier</th>
                <th className={thCls}>Type</th>
                <th className={thCls}>Status</th>
                <th className={thCls}>Required documents</th>
                <th className={thCls}>Ready?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.length === 0 && <EmptyRow cols={5} text="No suppliers yet — add them under Network → Suppliers." />}
              {rows.map(({ s, list, ready }) => (
                <tr key={s.id}>
                  <td className={tdCls}>
                    <A href={`/admin/data/suppliers/${s.id}`}>{s.legal_name}</A>
                  </td>
                  <td className={tdCls}>{(s.type ?? "").replace(/_/g, " ")}</td>
                  <td className={tdCls}>
                    <StatusBadge status={s.status} />
                  </td>
                  <td className={tdCls}>
                    <div className="flex flex-wrap gap-1">
                      {list.map((r) => (
                        <span key={r.doc} title={r.validTo ? `valid to ${r.validTo}` : undefined}>
                          <Badge tone={TONE[r.state]}>
                            {r.doc.replace(/_/g, " ")}: {r.state}
                          </Badge>
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className={tdCls}>{ready ? <Badge tone="green">ready</Badge> : <Badge tone="red">not ready</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Card>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card title="Vehicle insurance expiring (60 days)">
          <TableWrap>
            <table className="w-full">
              <tbody className="divide-y divide-line">
                {vehicles.length === 0 && <EmptyRow cols={3} text="Nothing expiring." />}
                {vehicles.map((v) => (
                  <tr key={v.id}>
                    <td className={tdCls}>
                      <A href={`/admin/data/vehicles/${v.id}`}>{v.plate}</A>
                    </td>
                    <td className={tdCls}>{v.legal_name}</td>
                    <td className={tdCls}>{expiry(v.insurance_expiry)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Card>
        <Card title="Driver certificates expiring (60 days)">
          <TableWrap>
            <table className="w-full">
              <tbody className="divide-y divide-line">
                {drivers.length === 0 && <EmptyRow cols={3} text="Nothing expiring." />}
                {drivers.map((d) => (
                  <tr key={d.id}>
                    <td className={tdCls}>
                      <A href={`/admin/data/drivers/${d.id}`}>{d.name}</A>
                    </td>
                    <td className={tdCls}>{d.legal_name}</td>
                    <td className={tdCls}>{expiry(d.cap_expiry)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </Card>
      </div>
    </>
  );
}
