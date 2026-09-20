import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import { CheckList, Container, Eyebrow } from "@/components/ui";
import { site, whatsappLink } from "@/config/site";
import { isServiceValue } from "@/lib/quote-options";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Request a Quote | Italy Event Management Services",
  description:
    "Tell us your route, group or event in Italy and get a fixed, itemised quote — transfers, chauffeurs, group transport, hotel blocks and events.",
  path: "/request-a-quote",
});

export default async function RequestQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const raw = Array.isArray(params.service) ? params.service[0] : params.service;
  const service = isServiceValue(raw) ? raw : "transfer";
  const wa = whatsappLink("Hello, I'd like a quote for a transfer/event in Italy.");

  return (
    <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_22rem] lg:py-20">
      <div>
        <Eyebrow>Request a quote</Eyebrow>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Tell us what you&apos;re planning</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Send the basics. We reply with a fixed, itemised quote {site.responseSla}.
        </p>
        <div className="mt-8">
          <QuoteForm defaultService={service} />
        </div>
      </div>

      <aside className="space-y-6 lg:pt-24">
        <div className="rounded-xl border border-line bg-white p-6">
          <h2 className="font-serif text-xl font-semibold">What happens next</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-muted marker:font-semibold marker:text-accent">
            <li>We check availability with our vetted partners.</li>
            <li>You receive a fixed quote with inclusions and cancellation terms.</li>
            <li>You confirm and pay securely; we send your voucher.</li>
            <li>Our dispatch team runs it — and stays reachable 24/7.</li>
          </ol>
        </div>

        <div className="rounded-xl border border-line bg-white p-6">
          <h2 className="font-semibold">Every quote includes</h2>
          <div className="mt-3 text-sm">
            <CheckList
              items={[
                "Licensed, insured operators",
                "Tolls and parking (city fees itemised)",
                "Named dispatch contact",
                "Clear cancellation table",
              ]}
            />
          </div>
        </div>

        <div className="rounded-xl border border-line bg-sand/60 p-6 text-sm">
          <p className="font-semibold">Prefer to talk?</p>
          <p className="mt-2 text-muted">
            Email <a className="underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            {wa && (
              <>
                {" "}or{" "}
                <a className="underline" href={wa} target="_blank" rel="noopener noreferrer">
                  message us on WhatsApp
                </a>
              </>
            )}
            .
          </p>
        </div>
      </aside>
    </Container>
  );
}
