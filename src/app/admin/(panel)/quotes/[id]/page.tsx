import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { ENTITIES } from "@/lib/admin/entities";
import { loadRefOptions } from "@/lib/admin/crud";
import { quoteTotals } from "@/lib/admin/stats";
import { fmtDate, fmtDateTime } from "@/lib/dates";
import { eur, pct } from "@/lib/money";
import { absoluteUrl } from "@/config/site";
import EntityForm from "@/components/admin/EntityForm";
import ConfirmButton from "@/components/admin/ConfirmButton";
import NotesPanel from "@/components/admin/NotesPanel";
import { A, Badge, btnCls, btnDangerCls, btnGhostCls, Card, EmptyRow, Flash, inputCls, PageHead, SetupNeeded, StatusBadge, TableWrap, tdCls, thCls } from "@/components/admin/ui";
import { saveEntity } from "../../data/actions";
import { convertQuoteToBooking, deleteQuote, emailQuote, setQuoteStatus } from "../actions";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string; err?: string }> };

export default async function QuoteBuilder({ params, searchParams }: Props) {
  await requireAdmin();
  const { id } = await params;
  const db = await getDb();
  if (!db) return <SetupNeeded />;
  const quote = await db.byId<Record<string, string | null>>("quotes", id);
  if (!quote) notFound();
  const sp = await searchParams;

  const entity = ENTITIES.quotes;
  const refs = await loadRefOptions(db, entity);
  const items = await db.all<Record<string, string | number | null>>("SELECT * FROM quote_items WHERE quote_id = ? ORDER BY position, rowid", id);
  const totals = await quoteTotals(db, id);
  const booking = await db.first<{ id: string; ref: string }>("SELECT id, ref FROM bookings WHERE quote_id = ?", id);
  const here = `/admin/quotes/${id}`;
  const publicUrl = absoluteUrl(`/quote/${quote.token}`);
  const editable = quote.status === "draft" || quote.status === "sent";

  return (
    <>
      <PageHead
        title={`${quote.ref} — ${quote.title}`}
        sub={quote.lead_id ? undefined : "Manual quote"}
        actions={
          <>
            <StatusBadge status={quote.status} />
            <Link href="/admin/quotes" className="text-sm font-medium text-accent hover:underline">
              ← All quotes
            </Link>
          </>
        }
      />
      <Flash ok={sp.ok} err={sp.err} />

      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <Card
            title="Lines"
            action={
              editable ? (
                <Link href={`/admin/data/quote_items/new?quote_id=${id}&return=${encodeURIComponent(here)}`} className={btnCls}>
                  + Add line
                </Link>
              ) : undefined
            }
          >
            <TableWrap>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className={thCls}>Description</th>
                    <th className={thCls}>Date</th>
                    <th className={thCls}>Qty</th>
                    <th className={thCls}>Price</th>
                    <th className={thCls}>VAT</th>
                    <th className={thCls}>Line total</th>
                    <th className={thCls}>Cost (internal)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {items.length === 0 && <EmptyRow cols={7} text="No lines yet — add the first one." />}
                  {items.map((it) => {
                    const net = Math.round(Number(it.qty ?? 1) * Number(it.unit_price_cents ?? 0));
                    return (
                      <tr key={String(it.id)}>
                        <td className={tdCls}>
                          <A href={`/admin/data/quote_items/${String(it.id)}?return=${encodeURIComponent(here)}`}>{String(it.description)}</A>
                        </td>
                        <td className={tdCls}>{fmtDateTime(String(it.service_date ?? "")) }</td>
                        <td className={tdCls}>{String(it.qty)}</td>
                        <td className={tdCls}>{eur(Number(it.unit_price_cents))}</td>
                        <td className={tdCls}>{String(it.vat_rate)}%</td>
                        <td className={tdCls}>{eur(net)}</td>
                        <td className={`${tdCls} text-muted`}>{eur(Math.round(Number(it.qty ?? 1) * Number(it.unit_cost_cents ?? 0)))}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </TableWrap>
            <dl className="mt-4 ml-auto grid max-w-xs grid-cols-2 gap-y-1 text-sm">
              <dt className="text-muted">Net</dt>
              <dd className="text-right">{eur(totals.net)}</dd>
              <dt className="text-muted">VAT</dt>
              <dd className="text-right">{eur(totals.vat)}</dd>
              <dt className="font-semibold">Total</dt>
              <dd className="text-right font-semibold">{eur(totals.gross)}</dd>
              <dt className="pt-2 text-muted">Our cost</dt>
              <dd className="pt-2 text-right text-muted">{eur(totals.cost)}</dd>
              <dt className="text-muted">Margin</dt>
              <dd className={`text-right font-medium ${totals.margin <= 0 && items.length ? "text-red-700" : "text-green-700"}`}>
                {eur(totals.margin)} ({pct(totals.margin, totals.net)})
              </dd>
            </dl>
          </Card>

          <EntityForm entity={entity} row={quote} refs={refs} action={saveEntity.bind(null, "quotes", id)} returnTo={here} />
        </div>

        <div className="space-y-6">
          <Card title="Customer link">
            <input readOnly value={publicUrl} className={`${inputCls} text-xs`} aria-label="Customer quote link" />
            <p className="mt-2 text-xs text-muted">The customer sees prices and terms only — never your costs or margin.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={publicUrl} target="_blank" rel="noopener noreferrer" className={btnGhostCls}>
                Preview
              </a>
              <form action={emailQuote.bind(null, id)}>
                <button className={btnGhostCls} disabled={!quote.contact_email}>
                  Email to customer
                </button>
              </form>
            </div>
          </Card>

          <Card title="Status">
            {quote.status === "accepted" && (
              <div className="mb-3 rounded-md bg-green-50 p-3 text-sm text-green-900">
                <p className="font-semibold">Accepted online</p>
                <p>
                  {quote.accepted_name} · {fmtDateTime((quote.accepted_at ?? "").slice(0, 16))} · terms {quote.terms_version}
                </p>
                <p className="text-xs">IP {quote.accepted_ip ?? "–"}</p>
              </div>
            )}
            <p className="text-sm text-muted">Valid until {fmtDate(quote.valid_until)}.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {quote.status !== "sent" && quote.status !== "accepted" && (
                <form action={setQuoteStatus.bind(null, id, "sent")}>
                  <button className={btnGhostCls}>Mark as sent</button>
                </form>
              )}
              {quote.status === "sent" && (
                <>
                  <form action={setQuoteStatus.bind(null, id, "declined")}>
                    <button className={btnGhostCls}>Declined</button>
                  </form>
                  <form action={setQuoteStatus.bind(null, id, "expired")}>
                    <button className={btnGhostCls}>Expired</button>
                  </form>
                </>
              )}
              {(quote.status === "expired" || quote.status === "declined") && (
                <form action={setQuoteStatus.bind(null, id, "draft")}>
                  <button className={btnGhostCls}>Re-open as draft</button>
                </form>
              )}
            </div>
          </Card>

          <Card title="Booking">
            {booking ? (
              <p className="text-sm">
                Converted: <A href={`/admin/bookings/${booking.id}`}>{booking.ref}</A>
              </p>
            ) : (
              <form action={convertQuoteToBooking.bind(null, id)} className="space-y-3 text-sm">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">Deposit % (optional override)</span>
                  <input name="deposit_pct" inputMode="numeric" placeholder="blank = standard schedule for this service" className={`${inputCls} mt-1`} />
                </label>
                {quote.status !== "accepted" && (
                  <label className="flex items-start gap-2">
                    <input type="checkbox" name="accepted_offline" className="mt-0.5 h-4 w-4 accent-accent" />
                    <span>Customer accepted offline (I have their written confirmation)</span>
                  </label>
                )}
                <button className={`${btnCls} w-full`}>Convert to booking</button>
              </form>
            )}
          </Card>

          {!booking && (
            <form action={deleteQuote.bind(null, id)}>
              <ConfirmButton className={btnDangerCls} message="Delete this quote and its lines?">
                Delete quote
              </ConfirmButton>
            </form>
          )}
          {quote.status === "declined" && <Badge tone="red">declined by customer</Badge>}
        </div>
      </div>

      <NotesPanel db={db} entityType="quote" entityId={id} returnPath={here} />
    </>
  );
}
