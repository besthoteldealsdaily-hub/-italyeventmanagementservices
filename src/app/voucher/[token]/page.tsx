import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db/client";
import { fmtDateTime } from "@/lib/dates";
import { site } from "@/config/site";
import DocShell from "@/components/DocShell";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: { absolute: "Your voucher | Italy Event Management Services" }, robots: { index: false, follow: false } };

type Props = { params: Promise<{ token: string }> };

/** Customer voucher: service details and OUR dispatch contact. Never shows prices, costs or supplier phone numbers. */
export default async function VoucherPage({ params }: Props) {
  const { token } = await params;
  const db = await getDb();
  if (!db) notFound();
  const b = await db.first<Record<string, string | null>>("SELECT id, ref, title, customer_name, status, payment_status, notes FROM bookings WHERE token = ?", token);
  if (!b) notFound();

  const items = await db.all<Record<string, string | number | null>>(
    `SELECT bi.description, bi.pickup, bi.dropoff, bi.pickup_at, bi.pax, bi.bags, bi.flight_no, bi.notes, bi.supplier_status,
            v.plate AS plate, v.class AS vehicle_class, d.name AS driver_name
     FROM booking_items bi LEFT JOIN vehicles v ON v.id = bi.vehicle_id LEFT JOIN drivers d ON d.id = bi.driver_id
     WHERE bi.booking_id = ? ORDER BY bi.position, bi.pickup_at`,
    b.id as string,
  );
  const cancelled = b.status === "cancelled";
  const unpaid = b.payment_status === "unpaid";
  const dispatch = site.contact.phone ?? (site.contact.whatsapp ? `+${site.contact.whatsapp}` : null);

  return (
    <DocShell>
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">Service voucher · {b.ref}</p>
      <h1 className="mt-1 font-serif text-3xl font-semibold">{b.title}</h1>
      <p className="mt-1 text-sm text-muted">Guest: {b.customer_name}</p>

      {cancelled && <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">This booking has been cancelled — the voucher is no longer valid.</p>}
      {!cancelled && unpaid && <p className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">Provisional — this voucher becomes valid once your payment has been received.</p>}

      {!cancelled && (
        <div className="mt-6 space-y-4">
          {items.map((it, i) => (
            <section key={i} className="rounded-xl border border-line bg-white p-5">
              <h2 className="font-serif text-lg font-semibold">{String(it.description)}</h2>
              <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                {it.pickup_at && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Date &amp; time (Italy)</dt>
                    <dd>{fmtDateTime(String(it.pickup_at))}</dd>
                  </div>
                )}
                {it.pickup && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Pick-up</dt>
                    <dd>{String(it.pickup)}</dd>
                  </div>
                )}
                {it.dropoff && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Drop-off</dt>
                    <dd>{String(it.dropoff)}</dd>
                  </div>
                )}
                {it.flight_no && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Flight</dt>
                    <dd>{String(it.flight_no)}</dd>
                  </div>
                )}
                {(it.pax || it.bags) && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Passengers / bags</dt>
                    <dd>
                      {it.pax ?? "–"} / {it.bags ?? "–"}
                    </dd>
                  </div>
                )}
                {(it.plate || it.driver_name) && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Vehicle &amp; driver</dt>
                    <dd>
                      {[it.vehicle_class, it.plate, it.driver_name ? `driver ${String(it.driver_name).split(" ")[0]}` : null].filter(Boolean).join(" · ")}
                    </dd>
                  </div>
                )}
              </dl>
              {it.notes && <p className="mt-3 rounded bg-sand/60 p-2 text-sm">{String(it.notes)}</p>}
            </section>
          ))}
        </div>
      )}

      {!cancelled && (
        <section className="mt-6 rounded-xl border border-accent/40 bg-white p-5 text-sm">
          <h2 className="font-serif text-lg font-semibold">24/7 support</h2>
          <p className="mt-1">Contact us — not the driver — for any change, delay or problem, and we will act immediately.</p>
          <p className="mt-2 font-medium">
            {dispatch ? `Dispatch: ${dispatch}` : `Email: ${site.contact.email}`}
            {site.contact.whatsapp && (
              <>
                {" · "}
                <a className="text-accent underline" href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`Booking ${b.ref}`)}`}>
                  WhatsApp
                </a>
              </>
            )}
          </p>
          <p className="mt-2 text-xs text-muted">Quote your booking reference {b.ref}. Please keep your phone on and be at the meeting point on time.</p>
        </section>
      )}
    </DocShell>
  );
}
