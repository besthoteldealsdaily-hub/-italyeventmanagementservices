import type { Metadata } from "next";
import { ButtonLink, CheckList, Container, Eyebrow } from "@/components/ui";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Italy Event Management Services",
  description:
    "A boutique Italian logistics and event-management company coordinating transport, accommodation and events through vetted local partners.",
  path: "/about",
});

export default function AboutPage() {
  const c = site.company;
  return (
    <Container narrow className="py-16 sm:py-24">
      <Eyebrow>About</Eyebrow>
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">We make Italy run on time</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        {site.name} is a boutique Italian logistics and event-management company. We coordinate transport, accommodation
        and events across Rome, Milan, Tuscany, the Lakes and the Amalfi Coast through a vetted network of licensed local
        partners — for destination-wedding planners, travel agencies, event agencies and corporate teams.
      </p>

      <h2 className="mt-14 text-2xl font-semibold">How we work</h2>
      <div className="mt-5 space-y-4 leading-relaxed text-muted">
        <p>
          We don&apos;t own vehicles or venues. That is a deliberate choice: it lets us choose the best licensed operator
          for each route and event rather than filling our own fleet. Every partner is checked for licences and insurance
          before they receive work, and we keep backups for every vehicle class.
        </p>
        <p>
          You get one contract, one dispatch team and one invoice — and a team accountable for the result. Prices are
          fixed and itemised, so what you are quoted is what you pay.
        </p>
      </div>

      <h2 className="mt-14 text-2xl font-semibold">What you can expect</h2>
      <div className="mt-5">
        <CheckList
          items={[
            `A fixed, itemised quote ${site.responseSla}`,
            "Licensed and insured operators — verified, not assumed",
            "A named dispatch contact on every voucher, reachable around the clock",
            "A backup-vehicle process for every job",
            "Clear deposit and cancellation terms before you pay",
          ]}
        />
      </div>

      {(c.legalName || c.vatId || c.rea || c.registeredOffice) && (
        <>
          <h2 className="mt-14 text-2xl font-semibold">Company details</h2>
          <dl className="mt-5 divide-y divide-line rounded-lg border border-line bg-white text-sm">
            {[
              ["Legal name", c.legalName],
              ["Registered office", c.registeredOffice],
              ["VAT number (P.IVA)", c.vatId],
              ["REA", c.rea],
              ["Share capital", c.shareCapital],
              ["PEC", c.pec],
            ]
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className="grid gap-1 px-5 py-3 sm:grid-cols-[12rem_1fr]">
                  <dt className="font-semibold text-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
          </dl>
        </>
      )}

      <div className="mt-14">
        <ButtonLink href="/request-a-quote">Request a quote</ButtonLink>
      </div>
    </Container>
  );
}
