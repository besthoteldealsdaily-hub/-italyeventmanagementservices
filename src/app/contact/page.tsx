import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { site, whatsappLink } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact | Italy Event Management Services",
  description: "Email, WhatsApp and phone contact for quotes, urgent requests and trade accounts across Italy.",
  path: "/contact",
});

export default function ContactPage() {
  const wa = whatsappLink("Hello, I'd like to speak about a transfer/event in Italy.");
  return (
    <Container narrow className="py-16 sm:py-24">
      <Eyebrow>Contact</Eyebrow>
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Talk to our team</h1>
      <p className="mt-5 text-lg text-muted">
        For quotes, use the form — it gets you a fixed price fastest. For anything urgent, message or call.
      </p>

      <dl className="mt-10 divide-y divide-line rounded-lg border border-line bg-white">
        <div className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr]">
          <dt className="font-semibold text-muted">Email</dt>
          <dd>
            <a className="underline" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
          </dd>
        </div>
        {site.contact.phone && (
          <div className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr]">
            <dt className="font-semibold text-muted">Phone</dt>
            <dd>
              <a className="underline" href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>
                {site.contact.phone}
              </a>
            </dd>
          </div>
        )}
        {wa && (
          <div className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr]">
            <dt className="font-semibold text-muted">WhatsApp</dt>
            <dd>
              <a className="underline" href={wa} target="_blank" rel="noopener noreferrer">
                Message us on WhatsApp
              </a>
            </dd>
          </div>
        )}
        <div className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr]">
          <dt className="font-semibold text-muted">Response time</dt>
          <dd>Quotes {site.responseSla}. Urgent same-day requests: WhatsApp or phone.</dd>
        </div>
        <div className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr]">
          <dt className="font-semibold text-muted">On-trip support</dt>
          <dd>Every voucher carries a dispatch number that is answered around the clock.</dd>
        </div>
      </dl>

      <div className="mt-10">
        <ButtonLink href="/request-a-quote">Request a quote</ButtonLink>
      </div>
    </Container>
  );
}
