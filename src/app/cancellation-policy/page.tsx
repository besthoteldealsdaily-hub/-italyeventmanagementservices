import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cancellation Policy | Italy Event Management Services",
  description: "Cancellation and refund terms for transfers, chauffeur days, group and wedding transport, and events.",
  path: "/cancellation-policy",
  index: false,
});

const rows: [string, string, string, string][] = [
  ["Airport / city-to-city transfer", "24 hours or more before pick-up", "50% between 24 and 6 hours", "Under 6 hours, or no-show"],
  ["Chauffeur day", "72 hours or more before", "50% between 72 and 24 hours", "Under 24 hours"],
  ["Wedding / group transport", "60 days or more before (deposit refundable less admin fee)", "50% between 59 and 30 days", "Under 30 days (mirrors supplier terms)"],
  ["Hotel blocks and events", "As per the hotel/venue terms shown in your quote", "As per quote", "As per quote"],
];

export default function CancellationPage() {
  return (
    <LegalPage title="Cancellation Policy" updated="19 September 2026 (draft)">
      <section>
        <h2>Standard terms</h2>
        <p>
          The table shows our standard terms. The terms in your quote take precedence. Group, wedding and event bookings
          mirror the cancellation terms of the suppliers involved, which are listed in your quote.
        </p>
        <div className="mt-5 overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-sand/60 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Full refund</th>
                <th className="px-4 py-3">Partial refund</th>
                <th className="px-4 py-3">No refund</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r[0]}>
                  <th scope="row" className="px-4 py-3 font-semibold">{r[0]}</th>
                  <td className="px-4 py-3">{r[1]}</td>
                  <td className="px-4 py-3">{r[2]}</td>
                  <td className="px-4 py-3">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2>If we or a supplier cancel</h2>
        <p>We will offer an equivalent alternative or refund what you paid for the cancelled service.</p>
      </section>
    </LegalPage>
  );
}
