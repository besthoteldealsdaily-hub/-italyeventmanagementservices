import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cancellation Policy | Italy Event Management Services",
  description: "Cancellation, change and refund terms for transfers, chauffeur days, group and wedding transport, and events.",
  path: "/cancellation-policy",
  index: false,
});

const rows: [string, string, string, string][] = [
  ["Airport or city-to-city transfer", "24 hours or more before pick-up", "50% refunded between 24 and 6 hours before", "Under 6 hours before, or no-show"],
  ["Chauffeur day (hourly or full day)", "72 hours or more before", "50% refunded between 72 and 24 hours before", "Under 24 hours before"],
  [
    "Wedding and group transport",
    "60 days or more before (deposit refunded, less the administration fee in your quote)",
    "50% refunded between 59 and 30 days before",
    "Under 30 days before",
  ],
  ["Hotel blocks and events", "As set by the hotel or venue and shown in your quote", "As shown in your quote", "As shown in your quote"],
];

export default function CancellationPage() {
  return (
    <LegalPage title="Cancellation Policy" updated="19 September 2026">
      <section>
        <h2>Standard terms</h2>
        <p>
          The table shows our standard terms. If your quote states different terms, the quote applies. Group, wedding
          and event bookings mirror the cancellation terms of the suppliers involved, which are listed in your quote.
        </p>
        <div className="mt-5 overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-sand/60 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Full refund</th>
                <th className="px-4 py-3">Partial refund</th>
                <th className="px-4 py-3">No refund</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line align-top">
              {rows.map((r) => (
                <tr key={r[0]}>
                  <th scope="row" className="px-4 py-3 font-semibold">
                    {r[0]}
                  </th>
                  <td className="px-4 py-3">{r[1]}</td>
                  <td className="px-4 py-3 text-muted">{r[2]}</td>
                  <td className="px-4 py-3 text-muted">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>How to cancel or change a booking</h2>
        <ol>
          <li>
            Email{" "}
            <a className="underline" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>{" "}
            with your booking reference. For cancellations inside 24 hours, also call or message the dispatch number on
            your voucher.
          </li>
          <li>The time of cancellation is the time we receive your written request.</li>
          <li>
            Changes to date, time, pick-up or drop-off are subject to availability. Changes made 24 hours or more before
            a transfer are free of charge; later changes may be treated as a cancellation and a new booking.
          </li>
        </ol>
      </section>

      <section>
        <h2>Refunds</h2>
        <p>
          Refunds are paid to the original payment method within 14 days of your cancellation being confirmed. Bank
          charges on international transfers may be deducted where they are unavoidable.
        </p>
      </section>

      <section>
        <h2>Flights, delays and no-shows</h2>
        <ul>
          <li>For airport pick-ups we track your flight, so delays within the included waiting time cost nothing extra.</li>
          <li>
            If your flight is cancelled or rebooked, tell us as soon as you can. We will try to move your service to the
            new flight; if that is not possible, the standard terms above apply to the time of your notice.
          </li>
          <li>If you do not appear at the agreed time and place and do not reach us, the booking is treated as a no-show.</li>
        </ul>
      </section>

      <section>
        <h2>If we or a supplier cancel</h2>
        <p>
          If we or the supplier cannot provide a service, we will offer an equivalent alternative or refund everything you
          paid for that service.
        </p>
      </section>

      <section>
        <h2>Force majeure</h2>
        <p>
          Where an event outside anyone&apos;s reasonable control (for example severe weather, strikes, road closures or
          public-authority orders) prevents a service, we will re-plan with you where possible or refund the affected
          service, less any costs already incurred that cannot be recovered from suppliers.
        </p>
      </section>
    </LegalPage>
  );
}
