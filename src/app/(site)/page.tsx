import Link from "next/link";
import type { Metadata } from "next";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import PageCards from "@/components/PageCards";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { site, whatsappLink } from "@/config/site";
import { getGuides, getPublishedPage, hrefFor } from "@/content/registry";
import type { ContentPage, Faq } from "@/content/types";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Italy Event Management, Hotels & Transportation",
  description:
    "Event management, group hotel bookings and private transportation across Italy: airport transfers, corporate events, weddings and DMC. Request a fixed quote.",
  path: "/",
});

const services = [
  {
    title: "Event management",
    text: "Logistics-led events: transport waves, hotel blocks, venues and on-site coordination through vetted partners.",
    slug: "event-management-italy",
  },
  {
    title: "Hotels and group accommodation",
    text: "Room blocks and group rates negotiated with hotels and villas, with clear cut-off dates and terms.",
    slug: "hotels",
  },
  {
    title: "Transportation",
    text: "Airport and city-to-city transfers, chauffeurs by the hour or day, minivans, minibuses and coaches for groups.",
    slug: "transportation",
  },
  {
    title: "Conferences and MICE",
    text: "Delegate arrivals, venue shuttles and hotel blocks for conferences and exhibitions.",
    slug: "conferences-mice-italy",
  },
  {
    title: "Corporate travel",
    text: "Delegations, roadshows and executive visits, with one consolidated monthly invoice.",
    slug: "corporate-travel-italy",
  },
  {
    title: "Destination weddings",
    text: "Guest shuttles, couple cars and accommodation blocks — with a backup vehicle on standby.",
    slug: "destination-weddings-italy",
  },
  {
    title: "Tours and day trips",
    text: "Private day trips with a driver and, through licensed partners, nationally qualified guides.",
    slug: "private-tours-italy",
  },
  {
    title: "Group travel and DMC services",
    text: "Coaches, hotels and guides for tour groups, schools, sports teams and faith groups.",
    slug: "group-travel-italy",
  },
];

const audiences = [
  { title: "Wedding planners", text: "Guest logistics with a backup vehicle and one coordinator on the day.", slug: "for-wedding-planners" },
  { title: "Travel agencies and advisors", text: "Net-rate ground handling with a 24/7 contact and one monthly invoice.", slug: "for-travel-agencies" },
  { title: "Event and MICE agencies", text: "Shuttle waves, hotel blocks and on-site dispatch for your Italy programmes.", slug: "for-event-agencies" },
  { title: "Tour operators", text: "Coaches, hotel blocks and licensed guides with access permits handled.", slug: "for-tour-operators" },
  { title: "Corporate teams", text: "Executive transfers, delegations and offsites, handled end to end.", slug: "for-corporate-travel-managers" },
];

const steps = [
  { n: "1", title: "Tell us what you need", text: "Route or event, dates, guests and luggage. Two minutes." },
  { n: "2", title: "Get a fixed quote", text: `Itemised, all-inclusive, usually ${site.responseSla}.` },
  { n: "3", title: "Confirm and pay", text: "Secure card link or bank transfer. Deposits for groups and events." },
  { n: "4", title: "We run it", text: "Vouchers, driver details, live dispatch and a backup plan — 24/7." },
];

const destinationSlugs = ["rome", "milan", "florence", "venice", "naples", "amalfi-coast", "lake-como", "tuscany"];

const routeSlugs = [
  "rome-airport-transfer",
  "rome-to-florence-transfer",
  "rome-to-amalfi-coast-transfer",
  "rome-to-naples-transfer",
  "florence-to-venice-transfer",
  "malpensa-to-lake-como-transfer",
];

const differentiators = [
  { title: "Licensed, insured partners", text: "We book licensed operators and check licences and insurance before anyone receives work." },
  { title: "Fixed, itemised prices", text: "Tolls, parking, waiting and city fees are shown as lines — no surprises on the day." },
  { title: "Experienced local coordinators", text: "A named contact in each city who knows the venues, hotels and access rules." },
  { title: "24/7 dispatch, one contact", text: `Reply ${site.responseSla}, and a single dispatch number on every voucher.` },
  { title: "A backup for every job", text: "If a vehicle fails, dispatch redirects a pre-approved backup from our network." },
  { title: "Transparent quotations", text: "Every quote is itemised — service, supplier cost basis and any city fees, shown as separate lines." },
  { title: "B2B net rates", text: "Agencies and planners get net rates by route and vehicle class, with one consolidated invoice." },
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

function livePages(slugs: string[]): ContentPage[] {
  return slugs.map((s) => getPublishedPage(s)).filter((p): p is ContentPage => Boolean(p));
}

function CardLink({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <Link
      href={hrefFor(slug)}
      className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition hover:border-accent hover:shadow-md"
    >
      {children}
    </Link>
  );
}

export default function Home() {
  const wa = whatsappLink("Hello, I'd like a quote for a transfer/event in Italy.");
  const guides = getGuides().slice(0, 3);
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />

      {/* HERO */}
      <section className="bg-ink text-white">
        <Container className="py-20 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">Italy · Events · Hotels · Transportation</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-6xl">
            Italy Event Management, Hotels &amp; Transportation
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Complete event, accommodation and transportation services across Italy for corporate groups, travel
            agencies, weddings and international visitors — vetted local partners, fixed prices and one point of
            contact, from an airport transfer to a 200-guest event in Rome, Milan, Tuscany and the Lakes.
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
            <ButtonLink href={hrefFor("for-travel-agencies")} variant="outline" className="!border-white/40 !text-white hover:!bg-white/10">
              Get trade net rates
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* PROCESS PROOF */}
      <section className="border-b border-line bg-white">
        <Container className="py-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Why work with us</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d) => (
            <div key={d.title}>
              <p className="font-semibold">{d.title}</p>
              <p className="mt-1 text-sm text-muted">{d.text}</p>
            </div>
            ))}
          </div>
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
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <CardLink key={s.title} slug={s.slug}>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{s.text}</p>
                <span className="mt-4 text-sm font-semibold text-accent group-hover:underline">Learn more →</span>
              </CardLink>
            ))}
          </div>
          <p className="mt-8">
            <Link href="/services" className="font-semibold text-accent hover:underline">
              See all services →
            </Link>
          </p>
        </Container>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="bg-sand/50 py-20">
        <Container>
          <SectionHeading eyebrow="Who we work with" title="Built for professionals who can't afford a missed pick-up" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {audiences.map((a) => (
              <CardLink key={a.title} slug={a.slug}>
                <h3 className="text-base font-semibold">{a.title}</h3>
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

      {/* DESTINATIONS */}
      <section className="bg-sand/50 py-20">
        <Container>
          <SectionHeading eyebrow="Where we operate" title="Rome first — and the destinations people actually travel to" />
          <div className="mt-10">
            <PageCards pages={livePages(destinationSlugs)} />
          </div>
          <p className="mt-8">
            <Link href="/destinations" className="font-semibold text-accent hover:underline">
              All destinations, airports and routes →
            </Link>
          </p>
        </Container>
      </section>

      {/* POPULAR ROUTES */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Popular routes" title="Fixed price, all-inclusive" lead="Tell us the date and group size; we reply with a fixed quote." />
          <div className="mt-10">
            <PageCards pages={livePages(routeSlugs)} />
          </div>
        </Container>
      </section>

      {/* GUIDES */}
      {guides.length > 0 && (
        <section className="bg-sand/50 py-20">
          <Container>
            <SectionHeading eyebrow="Guides" title="Real numbers and access rules, with sources" />
            <div className="mt-10">
              <PageCards pages={guides} />
            </div>
            <p className="mt-8">
              <Link href="/guides" className="font-semibold text-accent hover:underline">
                All guides →
              </Link>
            </p>
          </Container>
        </section>
      )}

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
