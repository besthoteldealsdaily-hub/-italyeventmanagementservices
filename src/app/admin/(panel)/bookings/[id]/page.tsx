import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db/client";
import { ENTITIES } from "@/lib/admin/entities";
import { loadRefOptions } from "@/lib/admin/crud";
import { bookingTotals, getSettings, paidCents } from "@/lib/admin/stats";
import { suggestedRefund } from "@/lib/admin/refunds";
import { fmtDate, fmtDateTime, todayRome } from "@/lib/dates";
import { centsToInput, eur, pct } from "@/lib/money";
import { absoluteUrl } from "@/config/site";
import { stripeEnabled } from "@/lib/stripe";
import EntityForm from "@/components/admin/EntityForm";
import ConfirmButton from "@/components/admin/ConfirmButton";
import NotesPanel from "@/components/admin/NotesPanel";
import { A, Badge, btnCls, btnDangerCls, btnGhostCls, Card, EmptyRow, Flash, inputCls, labelCls, PageHead, SetupNeeded, StatusBadge, SubmitButton, TableWrap, tdCls, thCls } from "@/components/admin/ui";
import { saveEntity } from "../../data/actions";
import { addTask, toggleTask } from "../../common-actions";
import { cancelBooking, completeBooking, emailBookingLink, generatePayouts, issueInvoice, markRefundDone, rebuildSchedule, recordPayment, refundViaStripe } from "../actions";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string; err?: string }> };

const Th = ({ children }: { children: React.ReactNode }) => <th className={thCls}>{children}</th>;

export default async function BookingDetail({ params, searchParams }: Props) {
  await requireAdmin();
  const { id } = await params;
  const db = await getDb();
  if (!db) return <SetupNeeded />;
  const booking = await db.byId<Record<string, string | null>>("bookings", id);
  if (!booking) notFound();
  const sp = await searchParams;
  const here = `/admin/bookings/${id}`;
  const today = todayRome();
  const cancelled = booking.status === "cancelled";

  const [items, schedule, payments, refunds, invoices, payouts, incidents, tasks, review, totals, paid, settings] = await Promise.all([
    db.all<Record<string, string | number | null>>(
      "SELECT bi.*, s.legal_name AS supplier_name FROM booking_items bi LEFT JOIN suppliers s ON s.id = bi.supplier_id WHERE bi.booking_id = ? ORDER BY bi.position, bi.pickup_at",
      id,
    ),
    db.all<{ id: string; milestone: string; due_date: string; amount_cents: number; status: string }>("SELECT * FROM payment_schedules WHERE booking_id = ? ORDER BY due_date, rowid", id),
    db.all<{ id: string; provider: string; provider_ref: string | null; amount_cents: number; status: string; paid_at: string | null }>("SELECT * FROM payments WHERE booking_id = ? ORDER BY paid_at DESC, created_at DESC", id),
    db.all<{ id: string; amount_cents: number; status: string; provider_ref: string | null }>("SELECT * FROM refunds WHERE booking_id = ? ORDER BY created_at DESC", id),
    db.all<{ id: string; number: string; total_cents: number; sdi_status: string; issued_on: string }>("SELECT * FROM invoices WHERE booking_id = ? ORDER BY issued_on", id),
    db.all<{ id: string; supplier_name: string; amount_cents: number; due_on: string; status: string }>(
      "SELECT p.*, s.legal_name AS supplier_name FROM supplier_payouts p LEFT JOIN suppliers s ON s.id = p.supplier_id WHERE p.booking_id = ? ORDER BY p.due_on",
      id,
    ),
    db.all<{ id: string; type: string; severity: number; resolved_at: string | null }>("SELECT id, type, severity, resolved_at FROM incidents WHERE booking_id = ? ORDER BY reported_at DESC", id),
    db.all<{ id: string; title: string; due_at: string | null; done_at: string | null }>(
      "SELECT id, title, due_at, done_at FROM tasks WHERE entity_type = 'booking' AND entity_id = ? ORDER BY done_at IS NOT NULL, due_at",
      id,
    ),
    db.first<{ token: string; rating: number | null }>("SELECT token, rating FROM reviews WHERE booking_id = ?", id),
    bookingTotals(db, id),
    paidCents(db, id),
    getSettings(db),
  ]);
  const balance = totals.gross - paid;
  const entity = ENTITIES.bookings;
  const refs = await loadRefOptions(db, entity);
  const suggestion = cancelled ? null : await suggestedRefund(db, id);
  const payUrl = absoluteUrl(`/pay/${booking.token}`);
  const voucherUrl = absoluteUrl(`/voucher/${booking.token}`);
  const org = booking.organization_id ? await db.byId<{ vat_id: string | null }>("organizations", booking.organization_id) : null;
  const readyForPayout = booking.payment_status === "paid" && booking.status === "completed";
  const unconfirmed = items.filter((i) => i.supplier_status !== "confirmed" && i.supplier_status !== "done").length;

  return (
    <>
      <PageHead
        title={`${booking.ref} — ${booking.title}`}
        sub={`${booking.customer_name} · ${fmtDateTime(booking.service_start)}`}
        actions={
          <>
            <StatusBadge status={booking.status} />
            <StatusBadge status={booking.payment_status} />
            <Link href="/admin/bookings" className="text-sm font-medium text-accent hover:underline">
              ← All bookings
            </Link>
          </>
        }
      />
      <Flash ok={sp.ok} err={sp.err} />

      {!cancelled && unconfirmed > 0 && (
        <p className="mb-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-950">
          {unconfirmed} line(s) have no confirmed supplier yet. Never release the voucher until every supplier has confirmed in writing.
        </p>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <Card title="Service lines" action={!cancelled && <Link href={`/admin/data/booking_items/new?booking_id=${id}&return=${encodeURIComponent(here)}`} className={btnCls}>+ Add line</Link>}>
            <TableWrap>
              <table className="w-full">
                <thead>
                  <tr>
                    <Th>Service</Th>
                    <Th>When</Th>
                    <Th>Supplier</Th>
                    <Th>Status</Th>
                    <Th>Total</Th>
                    <Th>Cost</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {items.length === 0 && <EmptyRow cols={6} />}
                  {items.map((it) => {
                    const net = Math.round(Number(it.qty ?? 1) * Number(it.price_cents ?? 0));
                    return (
                      <tr key={String(it.id)}>
                        <td className={tdCls}>
                          <A href={`/admin/data/booking_items/${String(it.id)}?return=${encodeURIComponent(here)}`}>{String(it.description)}</A>
                          {(it.pickup || it.dropoff) && (
                            <span className="block text-xs text-muted">
                              {String(it.pickup ?? "")} → {String(it.dropoff ?? "")}
                            </span>
                          )}
                        </td>
                        <td className={tdCls}>{fmtDateTime(String(it.pickup_at ?? ""))}</td>
                        <td className={tdCls}>{String(it.supplier_name ?? "—")}</td>
                        <td className={tdCls}>
                          <StatusBadge status={String(it.supplier_status ?? "requested")} />
                        </td>
                        <td className={tdCls}>{eur(net + Math.round((net * Number(it.vat_rate ?? 0)) / 100))}</td>
                        <td className={`${tdCls} text-muted`}>{eur(Math.round(Number(it.qty ?? 1) * Number(it.cost_cents ?? 0)))}</td>
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
              <dt className="pt-2 text-muted">Received</dt>
              <dd className="pt-2 text-right">{eur(paid)}</dd>
              <dt className="font-semibold">Balance</dt>
              <dd className={`text-right font-semibold ${balance > 0 ? "text-red-700" : "text-green-700"}`}>{eur(balance)}</dd>
              <dt className="pt-2 text-muted">Our cost</dt>
              <dd className="pt-2 text-right text-muted">{eur(totals.cost)}</dd>
              <dt className="text-muted">Margin</dt>
              <dd className="text-right">
                {eur(totals.margin)} ({pct(totals.margin, totals.net)})
              </dd>
            </dl>
          </Card>

          <Card title="Payments">
            <TableWrap>
              <table className="w-full">
                <thead>
                  <tr>
                    <Th>Milestone</Th>
                    <Th>Due</Th>
                    <Th>Amount</Th>
                    <Th>Status</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {schedule.length === 0 && <EmptyRow cols={4} text="No payment schedule." />}
                  {schedule.map((s) => (
                    <tr key={s.id}>
                      <td className={tdCls}>{s.milestone}</td>
                      <td className={`${tdCls} ${s.status !== "paid" && s.due_date < today ? "font-semibold text-red-700" : ""}`}>{fmtDate(s.due_date)}</td>
                      <td className={tdCls}>{eur(s.amount_cents)}</td>
                      <td className={tdCls}>{s.status === "paid" ? <StatusBadge status="paid" /> : s.due_date < today ? <Badge tone="red">overdue</Badge> : <Badge tone="amber">due</Badge>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrap>

            {payments.length > 0 && (
              <ul className="mt-4 space-y-1 text-sm">
                {payments.map((p) => (
                  <li key={p.id} className="flex flex-wrap justify-between gap-2 rounded border border-line px-3 py-1.5">
                    <span>
                      {eur(p.amount_cents)} · {p.provider.replace(/_/g, " ")}
                      {p.provider_ref ? ` · ${p.provider_ref}` : ""}
                    </span>
                    <span className="text-muted">{fmtDate(p.paid_at)}</span>
                  </li>
                ))}
              </ul>
            )}

            {!cancelled && balance > 0 && (
              <form action={recordPayment.bind(null, id)} className="mt-5 grid gap-3 sm:grid-cols-5">
                <label className="sm:col-span-1">
                  <span className={labelCls}>Amount €</span>
                  <input name="amount" inputMode="decimal" required placeholder={centsToInput(balance)} className={`${inputCls} mt-1`} />
                </label>
                <label>
                  <span className={labelCls}>Method</span>
                  <select name="method" className={`${inputCls} mt-1`} defaultValue="bank_transfer">
                    <option value="bank_transfer">Bank transfer</option>
                    <option value="card_terminal">Card terminal</option>
                    <option value="cash">Cash</option>
                    <option value="paypal">PayPal</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label>
                  <span className={labelCls}>Reference</span>
                  <input name="reference" className={`${inputCls} mt-1`} />
                </label>
                <label>
                  <span className={labelCls}>Date</span>
                  <input name="date" type="date" defaultValue={today} className={`${inputCls} mt-1`} />
                </label>
                <div className="flex items-end">
                  <SubmitButton pendingText="Saving…">Record payment</SubmitButton>
                </div>
              </form>
            )}

            {!cancelled && (
              <form action={rebuildSchedule.bind(null, id)} className="mt-4 flex flex-wrap items-end gap-2 text-sm">
                <label>
                  <span className={labelCls}>Rebuild unpaid schedule — deposit %</span>
                  <input name="deposit_pct" inputMode="numeric" placeholder={settings.deposit_pct} className={`${inputCls} mt-1 w-28`} />
                </label>
                <button className={btnGhostCls}>Rebuild</button>
              </form>
            )}
          </Card>

          {!cancelled && suggestion && (
            <Card title="Cancel booking">
              <p className="text-sm text-muted">
                Refund suggestion per the public cancellation policy — {Math.round(suggestion.hours)} h before the first service. Edit the amount if the quote states other supplier terms.
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {suggestion.lines.map((l, i) => (
                  <li key={i} className="flex justify-between gap-3 rounded border border-line px-3 py-1.5">
                    <span>
                      {l.description} <span className="text-muted">— {l.band}</span>
                    </span>
                    <span>{l.percent === null ? "manual" : `${l.percent}% = ${eur(l.cents)}`}</span>
                  </li>
                ))}
              </ul>
              <form action={cancelBooking.bind(null, id)} className="mt-4 grid gap-3 sm:grid-cols-3">
                <label>
                  <span className={labelCls}>Refund to customer €</span>
                  <input name="refund" inputMode="decimal" defaultValue={centsToInput(suggestion.cents)} className={`${inputCls} mt-1`} />
                </label>
                <label>
                  <span className={labelCls}>Supplier penalty we owe €</span>
                  <input name="penalty" inputMode="decimal" defaultValue="0.00" className={`${inputCls} mt-1`} />
                </label>
                <label>
                  <span className={labelCls}>Reason</span>
                  <input name="reason" className={`${inputCls} mt-1`} />
                </label>
                <div className="sm:col-span-3">
                  <ConfirmButton className={btnDangerCls} message="Cancel this booking? Supplier payouts are cancelled and a refund is queued.">
                    Cancel booking &amp; queue refund
                  </ConfirmButton>
                </div>
              </form>
            </Card>
          )}

          {refunds.length > 0 && (
            <Card title="Refunds">
              <ul className="space-y-2 text-sm">
                {refunds.map((r) => (
                  <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded border border-line px-3 py-2">
                    <span>
                      {eur(r.amount_cents)} <StatusBadge status={r.status === "done" ? "done" : "pending"} />
                      {r.provider_ref ? <span className="text-muted"> · {r.provider_ref}</span> : null}
                    </span>
                    {r.status !== "done" && (
                      <span className="flex flex-wrap gap-2">
                        <form action={markRefundDone.bind(null, id, r.id)} className="flex gap-2">
                          <input name="reference" placeholder="Bank ref" className={`${inputCls} w-32`} aria-label="Refund reference" />
                          <button className={btnGhostCls}>Mark refunded</button>
                        </form>
                        {stripeEnabled() && (
                          <form action={refundViaStripe.bind(null, id, r.id)}>
                            <button className={btnGhostCls}>Refund via Stripe</button>
                          </form>
                        )}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card title="Booking details">
            <EntityForm entity={entity} row={booking} refs={refs} action={saveEntity.bind(null, "bookings", id)} returnTo={here} />
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Customer links">
            <div className="space-y-3 text-sm">
              <div>
                <p className={labelCls}>Payment page {stripeEnabled() ? "(card + bank)" : "(bank transfer)"}</p>
                <input readOnly value={payUrl} className={`${inputCls} mt-1 text-xs`} aria-label="Payment link" />
                <form action={emailBookingLink.bind(null, id, "pay")} className="mt-1">
                  <button className={btnGhostCls}>Email payment link</button>
                </form>
              </div>
              <div>
                <p className={labelCls}>Voucher</p>
                <input readOnly value={voucherUrl} className={`${inputCls} mt-1 text-xs`} aria-label="Voucher link" />
                <form action={emailBookingLink.bind(null, id, "voucher")} className="mt-1">
                  <button className={btnGhostCls}>Email voucher</button>
                </form>
              </div>
              {review && (
                <div>
                  <p className={labelCls}>Review request {review.rating ? `— rated ${review.rating}/5` : ""}</p>
                  <form action={emailBookingLink.bind(null, id, "review")} className="mt-1">
                    <button className={btnGhostCls}>Email review request</button>
                  </form>
                </div>
              )}
            </div>
          </Card>

          <Card title="Progress">
            <div className="flex flex-col gap-2">
              {!cancelled && booking.status !== "completed" && (
                <form action={completeBooking.bind(null, id)}>
                  <ConfirmButton className={`${btnCls} w-full`} message="Mark the service as completed?">
                    Mark completed
                  </ConfirmButton>
                </form>
              )}
              <form action={generatePayouts.bind(null, id)}>
                <button className={`${btnGhostCls} w-full`}>Create supplier payouts</button>
              </form>
              {readyForPayout && <p className="text-xs text-green-700">Paid and completed — payouts are ready to release.</p>}
              {!readyForPayout && !cancelled && <p className="text-xs text-muted">Pay suppliers only after the customer has paid and the service is complete.</p>}
            </div>
          </Card>

          <Card title="Invoice">
            {invoices.length > 0 ? (
              <ul className="space-y-1 text-sm">
                {invoices.map((inv) => (
                  <li key={inv.id}>
                    <A href={`/admin/invoices/${inv.id}`}>{inv.number}</A> · {eur(inv.total_cents)} · {inv.sdi_status.replace(/_/g, " ")}
                  </li>
                ))}
              </ul>
            ) : (
              !cancelled && (
                <form action={issueInvoice.bind(null, id)} className="space-y-2 text-sm">
                  <label className="block">
                    <span className={labelCls}>Bill to</span>
                    <input name="customer_name" defaultValue={booking.customer_name ?? ""} className={`${inputCls} mt-1`} />
                  </label>
                  <label className="block">
                    <span className={labelCls}>VAT ID / Codice fiscale</span>
                    <input name="customer_vat" defaultValue={org?.vat_id ?? ""} className={`${inputCls} mt-1`} />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Address</span>
                    <textarea name="customer_address" rows={2} className={`${inputCls} mt-1`} />
                  </label>
                  <label className="block">
                    <span className={labelCls}>VAT regime</span>
                    <select name="vat_regime" defaultValue={settings.vat_regime} className={`${inputCls} mt-1`}>
                      <option value="ordinary">Ordinary (VAT itemised)</option>
                      <option value="margin_74ter">Art. 74-ter margin scheme</option>
                    </select>
                  </label>
                  <SubmitButton className="w-full" pendingText="Issuing…">
                    Create invoice record
                  </SubmitButton>
                </form>
              )
            )}
          </Card>

          <Card title="Supplier payouts">
            <ul className="space-y-1 text-sm">
              {payouts.length === 0 && <li className="text-muted">None yet.</li>}
              {payouts.map((p) => (
                <li key={p.id} className="flex justify-between gap-2">
                  <span>
                    {p.supplier_name} · {eur(p.amount_cents)} · due {fmtDate(p.due_on)}
                  </span>
                  <StatusBadge status={p.status} />
                </li>
              ))}
            </ul>
            {payouts.length > 0 && (
              <p className="mt-2 text-xs">
                <A href="/admin/payouts">Manage payouts →</A>
              </p>
            )}
          </Card>

          <Card title="Incidents" action={<Link className="text-sm font-medium text-accent hover:underline" href={`/admin/data/incidents/new?booking_id=${id}&return=${encodeURIComponent(here)}`}>+ Log</Link>}>
            <ul className="space-y-1 text-sm">
              {incidents.length === 0 && <li className="text-muted">No incidents.</li>}
              {incidents.map((i) => (
                <li key={i.id}>
                  <A href={`/admin/data/incidents/${i.id}?return=${encodeURIComponent(here)}`}>{i.type.replace(/_/g, " ")}</A> · severity {i.severity} · {i.resolved_at ? "resolved" : "open"}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <Card title="Checklist (SOP)" className="mt-6">
        <ul className="space-y-1.5 text-sm">
          {tasks.length === 0 && <li className="text-muted">No tasks. They are created automatically when a booking is converted from a quote.</li>}
          {tasks.map((t) => (
            <li key={t.id}>
              <form action={toggleTask.bind(null, t.id)} className="flex items-center gap-2">
                <input type="hidden" name="return" value={here} />
                <button className={`h-5 w-5 shrink-0 rounded border ${t.done_at ? "border-green-600 bg-green-600 text-white" : "border-line bg-white"}`} aria-label={t.done_at ? "Mark as not done" : "Mark as done"}>
                  {t.done_at ? "✓" : ""}
                </button>
                <span className={t.done_at ? "text-muted line-through" : ""}>{t.title}</span>
                <span className="ml-auto text-xs text-muted">{fmtDateTime(t.due_at)}</span>
              </form>
            </li>
          ))}
        </ul>
        <form action={addTask.bind(null, "booking", id, here)} className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input name="title" required placeholder="Add a task…" className={inputCls} aria-label="Task" />
          <input name="due_at" type="datetime-local" className={`${inputCls} sm:w-56`} aria-label="Due" />
          <SubmitButton pendingText="Adding…">Add</SubmitButton>
        </form>
      </Card>

      <NotesPanel db={db} entityType="booking" entityId={id} returnPath={here} />
    </>
  );
}
