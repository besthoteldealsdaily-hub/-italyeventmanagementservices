import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { fmtDate } from "@/lib/dates";
import { eur } from "@/lib/money";
import { site } from "@/config/site";
import { Card, Flash, inputCls, PageHead, SetupNeeded, SubmitButton } from "@/components/admin/ui";
import { updateSdi } from "../actions";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string; err?: string }> };

export default async function InvoiceDetail({ params, searchParams }: Props) {
  await requireAdmin();
  const { id } = await params;
  const db = await getDb();
  if (!db) return <SetupNeeded />;
  const inv = await db.byId<Record<string, string | number | null>>("invoices", id);
  if (!inv) notFound();
  const sp = await searchParams;
  const items = inv.booking_id
    ? await db.all<Record<string, string | number | null>>("SELECT * FROM booking_items WHERE booking_id = ? ORDER BY position, pickup_at", String(inv.booking_id))
    : [];
  const booking = inv.booking_id ? await db.byId<{ id: string; ref: string }>("bookings", String(inv.booking_id)) : null;
  const margin = inv.vat_regime === "margin_74ter";

  return (
    <>
      <PageHead
        title={`Invoice ${inv.number}`}
        sub={`Issued ${fmtDate(String(inv.issued_on))}`}
        actions={
          <Link href="/admin/invoices" className="text-sm font-medium text-accent hover:underline">
            ← All invoices
          </Link>
        }
      />
      <Flash ok={sp.ok} err={sp.err} />
      <p className="mb-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950">
        This is an internal invoice record for bookkeeping. It is <strong>not</strong> the legally valid electronic invoice — issue that (FatturaPA via SDI) through your accountant or an
        e-invoicing provider, then record the status below.
      </p>

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <Card>
          <div className="flex flex-wrap justify-between gap-6 text-sm">
            <div>
              <p className="font-serif text-lg font-semibold">{site.name}</p>
              <p className="text-muted">P.IVA / legal details: add in Settings once registered</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Bill to</p>
              <p className="font-medium">{inv.customer_name}</p>
              {inv.customer_vat && <p>VAT / CF: {inv.customer_vat}</p>}
              {inv.customer_address && <p className="whitespace-pre-line">{String(inv.customer_address)}</p>}
            </div>
          </div>

          <table className="mt-6 w-full text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="py-2">Description</th>
                <th className="py-2">Qty</th>
                <th className="py-2 text-right">Amount{margin ? "" : " (net)"}</th>
                {!margin && <th className="py-2 text-right">VAT</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {items.map((it) => {
                const net = Math.round(Number(it.qty ?? 1) * Number(it.price_cents ?? 0));
                const vat = Math.round((net * Number(it.vat_rate ?? 0)) / 100);
                return (
                  <tr key={String(it.id)}>
                    <td className="py-2">{String(it.description)}</td>
                    <td className="py-2">{String(it.qty)}</td>
                    <td className="py-2 text-right">{eur(margin ? net + vat : net)}</td>
                    {!margin && <td className="py-2 text-right">{it.vat_rate}%</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <dl className="mt-4 ml-auto grid max-w-xs grid-cols-2 gap-y-1 text-sm">
            {!margin && (
              <>
                <dt className="text-muted">Net</dt>
                <dd className="text-right">{eur(Number(inv.net_cents))}</dd>
                <dt className="text-muted">VAT</dt>
                <dd className="text-right">{eur(Number(inv.vat_cents))}</dd>
              </>
            )}
            <dt className="font-semibold">Total</dt>
            <dd className="text-right text-lg font-semibold">{eur(Number(inv.total_cents))}</dd>
          </dl>
          {inv.notes && <p className="mt-4 text-xs text-muted">{String(inv.notes)}</p>}
          <p className="mt-6 text-xs text-muted print:hidden">Use your browser’s Print for a PDF copy.</p>
        </Card>

        <div className="space-y-6 print:hidden">
          <Card title="E-invoice status (SDI)">
            <form action={updateSdi.bind(null, id)} className="space-y-2 text-sm">
              <select name="sdi_status" defaultValue={String(inv.sdi_status)} className={inputCls} aria-label="SDI status">
                {["not_sent", "sent", "delivered", "rejected", "not_required"].map((s) => (
                  <option key={s} value={s}>
                    {s.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
              <input name="sdi_id" defaultValue={String(inv.sdi_id ?? "")} placeholder="SDI identifier / provider reference" className={inputCls} />
              <SubmitButton>Save</SubmitButton>
            </form>
          </Card>
          {booking && (
            <Card title="Booking">
              <Link href={`/admin/bookings/${booking.id}`} className="text-sm font-medium text-accent hover:underline">
                {booking.ref}
              </Link>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
