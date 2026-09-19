import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db/client";
import { isAdmin } from "@/lib/auth";
import { fmtDate, fmtDateTime, todayRome } from "@/lib/dates";
import { eur } from "@/lib/money";
import { quoteTotals } from "@/lib/admin/stats";
import DocShell from "@/components/DocShell";
import SubmitButton from "@/components/admin/SubmitButton";
import { acceptQuote } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: { absolute: "Your quote | Italy Event Management Services" }, robots: { index: false, follow: false } };

type Props = { params: Promise<{ token: string }>; searchParams: Promise<{ accepted?: string; err?: string }> };

export default async function PublicQuote({ params, searchParams }: Props) {
  const { token } = await params;
  const db = await getDb();
  if (!db) notFound();
  const q = await db.first<Record<string, string | null>>("SELECT * FROM quotes WHERE token = ?", token);
  if (!q) notFound();
  const admin = await isAdmin();
  if (q.status === "draft" && !admin) notFound();

  const sp = await searchParams;
  const items = await db.all<Record<string, string | number | null>>("SELECT * FROM quote_items WHERE quote_id = ? ORDER BY position, rowid", q.id as string);
  const totals = await quoteTotals(db, q.id as string);
  const expired = q.status === "expired" || (q.status === "sent" && q.valid_until && q.valid_until < todayRome());
  const accepted = q.status === "accepted";

  return (
    <DocShell>
      {q.status === "draft" && <p className="mb-4 rounded-md bg-amber-100 p-3 text-sm text-amber-900">Preview — this quote has not been sent to the customer yet.</p>}
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">Quote {q.ref}</p>
      <h1 className="mt-1 font-serif text-3xl font-semibold">{q.title}</h1>
      <p className="mt-1 text-sm text-muted">
        Prepared for {q.contact_name}
        {q.valid_until && ` · valid until ${fmtDate(q.valid_until)}`}
      </p>

      {sp.err && <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">{sp.err}</p>}
      {(accepted || sp.accepted) && (
        <p role="status" className="mt-4 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-900">
          <strong>Thank you — quote accepted{q.accepted_name ? ` by ${q.accepted_name}` : ""}.</strong> We will now confirm your booking and send you the payment details. Your services are
          secured once the deposit or payment is received.
        </p>
      )}
      {expired && <p className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">This quote has expired. Please contact us and we will refresh it.</p>}

      <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-white">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <thead className="bg-sand/60 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">VAT</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {items.map((it) => {
              const net = Math.round(Number(it.qty ?? 1) * Number(it.unit_price_cents ?? 0));
              const vat = Math.round((net * Number(it.vat_rate ?? 0)) / 100);
              return (
                <tr key={String(it.id)}>
                  <td className="px-4 py-3">
                    {String(it.description)}
                    {it.service_date && <span className="block text-xs text-muted">{fmtDateTime(String(it.service_date))}</span>}
                  </td>
                  <td className="px-4 py-3">{String(it.qty)}</td>
                  <td className="px-4 py-3">{eur(Number(it.unit_price_cents))}</td>
                  <td className="px-4 py-3">{String(it.vat_rate)}%</td>
                  <td className="px-4 py-3 text-right">{eur(net + vat)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <dl className="ml-auto grid max-w-xs grid-cols-2 gap-y-1 border-t border-line p-4 text-sm">
          <dt className="text-muted">Net</dt>
          <dd className="text-right">{eur(totals.net)}</dd>
          <dt className="text-muted">VAT</dt>
          <dd className="text-right">{eur(totals.vat)}</dd>
          <dt className="font-semibold">Total</dt>
          <dd className="text-right text-lg font-semibold">{eur(totals.gross)}</dd>
        </dl>
      </div>

      {q.public_notes && (
        <section className="mt-6 rounded-xl border border-line bg-white p-5 text-sm">
          <h2 className="font-serif text-lg font-semibold">Notes</h2>
          <p className="mt-2 whitespace-pre-wrap">{q.public_notes}</p>
        </section>
      )}

      {q.status === "sent" && !expired && (
        <form action={acceptQuote.bind(null, token)} className="mt-6 space-y-3 rounded-xl border border-line bg-white p-5">
          <h2 className="font-serif text-lg font-semibold">Accept this quote</h2>
          <label className="block text-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Your full name</span>
            <input name="name" required minLength={2} autoComplete="name" className="mt-1 block w-full rounded-md border border-line px-3 py-2" />
          </label>
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" name="agree" required className="mt-1 h-4 w-4 accent-accent" />
            <span>
              I accept this quote and the{" "}
              <Link href="/terms" target="_blank" className="text-accent underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/cancellation-policy" target="_blank" className="text-accent underline">
                Cancellation Policy
              </Link>{" "}
              (version {q.terms_version ?? "current"}).
            </span>
          </label>
          <SubmitButton pendingText="Recording…">Accept quote</SubmitButton>
          <p className="text-xs text-muted">Your name, the time and your IP address are recorded as proof of acceptance.</p>
        </form>
      )}
    </DocShell>
  );
}
