import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db/client";
import { amountDueNow, getSettings } from "@/lib/admin/stats";
import { fmtDate, fmtDateTime, todayRome } from "@/lib/dates";
import { eur } from "@/lib/money";
import { stripeEnabled } from "@/lib/stripe";
import DocShell from "@/components/DocShell";
import SubmitButton from "@/components/admin/SubmitButton";
import { startCheckout } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: { absolute: "Payment | Italy Event Management Services" }, robots: { index: false, follow: false } };

type Props = { params: Promise<{ token: string }>; searchParams: Promise<{ paid?: string; cancelled?: string; err?: string }> };

export default async function PayPage({ params, searchParams }: Props) {
  const { token } = await params;
  const db = await getDb();
  if (!db) notFound();
  const b = await db.first<Record<string, string | null>>("SELECT * FROM bookings WHERE token = ?", token);
  if (!b) notFound();
  const sp = await searchParams;
  const id = b.id as string;

  const [{ gross, paid, due }, schedule, items, settings] = await Promise.all([
    amountDueNow(db, id),
    db.all<{ milestone: string; due_date: string; amount_cents: number; status: string }>("SELECT milestone, due_date, amount_cents, status FROM payment_schedules WHERE booking_id = ? ORDER BY due_date, rowid", id),
    db.all<{ description: string; pickup_at: string | null }>("SELECT description, pickup_at FROM booking_items WHERE booking_id = ? ORDER BY position, pickup_at", id),
    getSettings(db),
  ]);
  const cancelled = b.status === "cancelled";
  const today = todayRome();
  const bank = settings.bank_iban;

  return (
    <DocShell>
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">Booking {b.ref}</p>
      <h1 className="mt-1 font-serif text-3xl font-semibold">{b.title}</h1>
      <p className="mt-1 text-sm text-muted">{b.customer_name}</p>

      {sp.paid && <p role="status" className="mt-4 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-900">Thank you — your payment is being confirmed. This page updates within a minute, and you will receive your voucher.</p>}
      {sp.cancelled && <p role="status" className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">Payment was cancelled — nothing was charged.</p>}
      {sp.err && <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">{sp.err}</p>}
      {cancelled && <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">This booking has been cancelled. Please contact us if you have any questions.</p>}

      <section className="mt-6 rounded-xl border border-line bg-white p-5">
        <ul className="space-y-1 text-sm">
          {items.map((i, k) => (
            <li key={k}>
              {i.description}
              {i.pickup_at && <span className="text-muted"> — {fmtDateTime(i.pickup_at)}</span>}
            </li>
          ))}
        </ul>
        <dl className="mt-4 grid max-w-xs grid-cols-2 gap-y-1 border-t border-line pt-4 text-sm">
          <dt className="text-muted">Total</dt>
          <dd className="text-right">{eur(gross)}</dd>
          <dt className="text-muted">Paid</dt>
          <dd className="text-right">{eur(paid)}</dd>
          <dt className="font-semibold">Outstanding</dt>
          <dd className="text-right font-semibold">{eur(Math.max(gross - paid, 0))}</dd>
        </dl>
        {schedule.length > 0 && (
          <table className="mt-4 w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="py-1">Payment</th>
                <th className="py-1">Due</th>
                <th className="py-1 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {schedule.map((s, i) => (
                <tr key={i}>
                  <td className="py-1.5">{s.milestone}</td>
                  <td className={`py-1.5 ${s.status !== "paid" && s.due_date < today ? "font-semibold text-red-700" : ""}`}>{fmtDate(s.due_date)}</td>
                  <td className="py-1.5 text-right">{s.status === "paid" ? "paid ✓" : eur(s.amount_cents)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {!cancelled && due <= 0 && gross > 0 && <p className="mt-6 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-900">Paid in full — thank you. Your voucher will follow by email.</p>}

      {!cancelled && due > 0 && (
        <section className="mt-6 space-y-6">
          <div className="rounded-xl border border-line bg-white p-5">
            <h2 className="font-serif text-lg font-semibold">Amount due now: {eur(due)}</h2>
            {stripeEnabled() ? (
              <form action={startCheckout.bind(null, token)} className="mt-3">
                <SubmitButton pendingText="Redirecting…">Pay {eur(due)} by card</SubmitButton>
                <p className="mt-2 text-xs text-muted">Secure payment by Stripe. We never see your card details.</p>
              </form>
            ) : (
              <p className="mt-2 text-sm text-muted">Card payment is not enabled — please pay by bank transfer below.</p>
            )}
          </div>

          {bank && (
            <div className="rounded-xl border border-line bg-white p-5 text-sm">
              <h2 className="font-serif text-lg font-semibold">Or pay by bank transfer</h2>
              <dl className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-[10rem_1fr]">
                <dt className="text-muted">Account holder</dt>
                <dd>{settings.bank_beneficiary || "—"}</dd>
                <dt className="text-muted">IBAN</dt>
                <dd className="font-mono">{bank}</dd>
                {settings.bank_bic && (
                  <>
                    <dt className="text-muted">BIC / SWIFT</dt>
                    <dd className="font-mono">{settings.bank_bic}</dd>
                  </>
                )}
                <dt className="text-muted">Amount</dt>
                <dd>{eur(due)}</dd>
                <dt className="text-muted">Reference</dt>
                <dd className="font-mono font-semibold">{b.ref}</dd>
              </dl>
              <p className="mt-3 text-xs text-muted">Please include the reference so we can match your payment. Bank transfers are confirmed manually within one working day.</p>
            </div>
          )}
        </section>
      )}
    </DocShell>
  );
}
