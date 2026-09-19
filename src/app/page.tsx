import Link from "next/link";
import type { Metadata } from "next";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { site, whatsappLink } from "@/config/site";
import { getPublishedPage } from "@/content/registry";
import type { Faq } from "@/content/types";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Italy Event Management Services | Transfers, Hotels & DMC",
  description: site.description,
  path: "/",
});

const services = [
  {
    title: "Transportation",
    text: "Airport and city-to-city transfers, chauffeurs by the hour or day, and minivans, minibuses and coaches for groups.",
    slug: "group-transportation-italy",
  },
  {
    title: "Hotels & group accommodation",
    text: "Room blocks and group rates negotiated with hotels and villas, with clear cut-off dates and terms.",
    slug: "rome-corporate-events",
  },
  {
    title: "Event management",
    text: "Logistics-led events: transport waves, hotel blocks, venues and on-site coordination through vetted partners.",
    slug: "rome-corporate-events",
  },
  {
    title: "Weddings",
    text: "Guest shuttles, couple car and arrival waves for destination weddings — with a backup vehicle on standby.",
    slug: "lake-como-wedding-transport",
  },
  {
    title: "Tours & day trips",
    text: "Private day trips with a driver and, through licensed partners, nationally qualified guides.",
    slug: "rome-to-florence-transfer",
  },
];

const audiences = [
  { title: "Wedding planners", text: "Guest logistics with a backup vehicle and one coordinator on the day.", slug: "for-wedding-planners" },
  { title: "Travel agencies & advisors", text: "Net-rate ground handling with a 24/7 contact and one monthly invoice.", slug: "for-travel-agencies" },
  { title: "Event & MICE agencies", text: "Shuttle waves, hotel blocks and on-site dispatch for your Italy programmes.", slug: "rome-corporate-events" },
  { title: "Corporate teams", text: "Executive transfers, delegations and offsites, handled end to end.", slug: "rome-corporate-events" },
];

const steps = [
  { n: "1", title: "Tell us what you need", text: "Route or event, dates, guests and luggage. Two minutes." },
  { n: "2", title: "Get a fixed quote", text: `Itemised, all-inclusive, usually ${site.responseSla}.` },
  { n: "3", title: "Confirm and pay", text: "Secure card link or bank transfer. Deposits for groups and events." },
  { n: "4", title: "We run it", text: "Vouchers, driver details, live dispatch and a backup plan — 24/7." },
];

const destinations = [
  { name: "Rome", note: "Our hub — airports, city, corporate events", slug: "rome" },
  { name: "Florence & Tuscany", note: "Routes from Rome, villas and weddings", slug: "rome-to-florence-transfer" },
  { name: "Amalfi Coast & Naples", note: "Routes from Rome, local access planning", slug: "rome-to-amalfi-coast-transfer" },
  { name: "Milan & Lake Como", note: "Weddings and corporate logistics", slug: "lake-como-wedding-transport" },
];

const routes = [
  { label: "Rome Fiumicino to your hotel", slug: "rome-airport-transfer" },
  { label: "Rome to Florence", slug: "rome-to-florence-transfer" },
  { label: "Rome to the Amalfi Coast", slug: "rome-to-amalfi-coast-transfer" },
];

const differentiators = [
  { title: "Vetted, licensed partners", text: "We book licensed operators and check licences and insurance before anyone receives work." },
  { title: "Fixed, itemised prices", text: "Tolls, parking, waiting and city fees are shown as lines — no surprises on the day." },
  { title: "A backup for every job", text: "If a vehicle fails, dispatch redirects a pre-approved backup. Every voucher carries the dispatch number." },
  { title: "One team, one invoice", text: "One contract and one consolidated invoice across transport, hotels and events." },
];

const faqs: Faq[] = [
  {
    q: "Do you own vehicles?",
    a: "No. We book licensed local operators and audit them. You get one contract and one invoice from us — and one team accountable for the result.",
  },
  {
    q: "Are your prices fixed?",
    a: "Yes for the routes and services we quote: tolls, parking and waiting are included and any extra is itemised in advance.",
  },
  {
    q: "How fast do I get a quote?",
    a: `We reply ${site.responseSla}. For urgent same-day requests, message us on WhatsApp.`,
  },
  {
    q: "What if the driver doesn't show up?",
    a: "Our dispatch team redirects a backup vehicle from a pre-approved supplier and stays in touch with you until it's resolved.",
  },
  {
    q: "How do deposits and cancellations work?",
    a: "Transfers are paid in full at booking. Groups, weddings and events use a deposit and balance schedule. Cancellation terms are shown in every quote.",
  },
  {
    q: "Do you provide guides?",
    a: "Only nationally licensed guides — Italian law requires guides to hold the national qualification. Guides are added as a separate line item.",
  },
  {
    q: "Can you handle 100+ guests?",
    a: "Yes. We schedule vehicle waves and use on-site coordinators; large events use staged supplier deposits.",
  },
  {
    q: "Do you work with travel agencies at net rates?",
    a: "Yes — ask for the trade rate sheet. Rates are net so you can set your own markup.",
  },
];

function CardLink({ slug, children }: { slug: string; children: React.ReactNode }) {
  // Cards link to a live page when available, otherwise to the quote form.
  const href = getPublishedPage(slug) ? `/${slug}` : "/request-a-quote";
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition hover:border-accent hover:shadow-md"
    >
      {children}
    </Link>
  );
}

export default function Home() {
  const wa = whatsappLink("Hello, I'd like a quote for a transfer/event in Italy.");
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />

      {/* HERO */}
      <section className="bg-ink text-white">
        <Container className="py-20 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">Italy · Transfers · Hotels · Events</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-6xl">
            Event Management and Ground Services Across Italy
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Vetted local partners, fixed prices and one point of contact — from airport transfers and wedding guest
            shuttles to 200-guest corporate events in Rome, Milan, Tuscany and the Lakes.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/request-a-quote">Request a quote — reply {site.responseSla}</ButtonLink>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/40 px-5 py-3 text-sm font-semibold hover:bg-white/10"
              >
                WhatsApp our team
              </a>
            )}
            <ButtonLink
              href={getPublishedPage("for-travel-agencies") ? "/for-travel-agencies" : "/partners"}
              variant="outline"
              className="!border-white/40 !text-white hover:!bg-white/10"
            >
              Get trade net rates
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* PROCESS PROOF */}
      <section className="border-b border-line bg-white">
        <Container className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((d) => (
            <div key={d.title}>
              <p className="font-semibold">{d.title}</p>
              <p className="mt-1 text-sm text-muted">{d.text}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* WHAT WE DO */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Everything that moves, sleeps and gathers your guests in Italy"
            lead="One accountable team across transportation, accommodation and events — built on a network of vetted local suppliers."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <CardLink key={s.title} slug={s.slug}>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-muted">{s.text}</p>
                <span className="mt-4 text-sm font-semibold text-accent group-hover:underline">Learn more →</span>
              </CardLink>
            ))}
          </div>
        </Container>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="bg-sand/50 py-20">
        <Container>
          <SectionHeading
            eyebrow="Who we work with"
            title="Built for professionals who can't afford a missed pick-up"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a) => (
              <CardLink key={a.title} slug={a.slug}>
                <h3 className="text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{a.text}</p>
              </CardLink>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="How it works" title="From request to arrival in four steps" />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="rounded-xl border border-line bg-white p-6">
                <span className="font-serif text-4xl font-semibold text-accent">{s.n}</span>
                <p className="mt-3 font-semibold">{s.title}</p>
                <p className="mt-1 text-sm text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* DESTINATIONS + ROUTES */}
      <section className="bg-sand/50 py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Where we operate" title="Rome first — and the routes people actually travel" />
            <ul className="mt-8 space-y-3">
              {destinations.map((d) => (
                <li key={d.name}>
                  <CardLink slug={d.slug}>
                    <p className="font-semibold">{d.name}</p>
                    <p className="text-sm text-muted">{d.note}</p>
                  </CardLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Popular routes" title="Fixed price, all-inclusive" lead="Tell us the date and group size; we reply with a fixed quote." />
            <ul className="mt-8 space-y-3">
              {routes.map((r) => (
                <li key={r.slug}>
                  <CardLink slug={r.slug}>
                    <p className="font-semibold">{r.label}</p>
                    <p className="text-sm text-muted">Fixed price on request</p>
                  </CardLink>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container narrow>
          <SectionHeading eyebrow="FAQ" title="Straight answers" />
          <div className="mt-8">
            <FaqList faqs={faqs} />
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="bg-ink py-16 text-white">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-semibold">Planning something in Italy?</h2>
            <p className="mt-2 text-white/75">Send the basics. We reply with a fixed quote {site.responseSla}.</p>
          </div>
          <ButtonLink href="/request-a-quote">Request a quote</ButtonLink>
        </Container>
      </section>
    </>
  );
}
