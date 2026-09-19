import type { Metadata } from "next";
import { ButtonLink, CheckList, Container, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Partners: Trade Desk & Supplier Application",
  description:
    "Trade rates for travel agencies, wedding planners and event agencies — and how transport, hotel and venue suppliers join our vetted network in Italy.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <Container className="py-16 sm:py-24">
      <Eyebrow>Partners</Eyebrow>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold sm:text-5xl">Two ways to work with us</h1>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <section id="trade" className="rounded-xl border border-line bg-white p-8">
          <h2 className="text-2xl font-semibold">Trade desk</h2>
          <p className="mt-2 text-muted">
            For travel agencies, advisors, wedding planners and event agencies who need a reliable ground partner in Italy.
          </p>
          <div className="mt-6">
            <CheckList
              items={[
                "Net rates by route and vehicle class — you set your markup",
                "24/7 dispatch contact on every voucher",
                "White-label vouchers on request",
                "One consolidated invoice per month",
                "Backup-vehicle process for every booking",
              ]}
            />
          </div>
          <ButtonLink href="/request-a-quote?service=trade" className="mt-8">
            Request the trade rate sheet
          </ButtonLink>
        </section>

        <section id="supplier" className="rounded-xl border border-line bg-white p-8">
          <h2 className="text-2xl font-semibold">Become a supplier</h2>
          <p className="mt-2 text-muted">
            We work with licensed NCC and coach operators, hotels, venues, caterers and licensed guides. We give recurring
            work, a fixed rate card and clear payment terms — and expect a high standard in return.
          </p>
          <p className="mt-6 text-sm font-semibold">What we ask for before we send work</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted marker:text-accent">
            <li>Company registration extract (visura camerale) and a valid DURC</li>
            <li>The relevant authorisation — for example your NCC municipal authorisation, or bus-operator authorisation</li>
            <li>Vehicle registration documents for each vehicle offered</li>
            <li>Insurance certificates, including passenger cover</li>
            <li>For guides: proof of enrolment on the national register</li>
            <li>A rate card and your emergency contact</li>
          </ul>
          <ButtonLink href="/request-a-quote?service=supplier" variant="dark" className="mt-8">
            Apply as a supplier
          </ButtonLink>
        </section>
      </div>
    </Container>
  );
}
