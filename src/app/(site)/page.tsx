import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import { ButtonLink, Check, Container, SectionHeading } from "@/components/ui";
import { site, whatsappLink } from "@/config/site";
import { getGuides, getPublishedPage, hrefFor, pathFor } from "@/content/registry";
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
    text: "Planning, venues, catering, AV and on-site coordination for corporate, luxury and conference events, through vetted suppliers.",
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
    text: "Full planning for your Italian wedding: venue, ceremony, catering, décor, photography, music, guest hotels and transport.",
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

/** Destinations with a real photo — the rest are listed as a compact text line until photos exist for them too. */
const destinationPhotos: Record<string, { src: string; alt: string }> = {
  rome: { src: "/rome-colosseum-private-chauffeur.webp", alt: "A chauffeur greets guests walking toward the Colosseum in Rome at golden hour" },
  milan: { src: "/milan-duomo-private-chauffeur.webp", alt: "A private chauffeur car outside Milan's Duomo at golden hour" },
  florence: { src: "/florence-ponte-vecchio-private-chauffeur.webp", alt: "A private chauffeur near the Ponte Vecchio and Florence's Duomo at golden hour" },
  venice: { src: "/venice-rialto-bridge-private-chauffeur.webp", alt: "The Rialto Bridge and Grand Canal in Venice at golden hour" },
  naples: { src: "/naples-bay-vesuvius-private-chauffeur.webp", alt: "A private chauffeur car overlooking the Bay of Naples and Mount Vesuvius at golden hour" },
};

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
      className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-md"
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
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_70%_55%_at_15%_-10%,rgba(168,72,42,0.14),transparent)]"
        />
        <Container className="!max-w-[1400px] relative py-16 sm:py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-16">
            {/* Content */}
            <div className="motion-safe:animate-[hero-fade-up_650ms_ease-out_both]">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                Italy · Events · Hotels · Transportation
              </p>
              <h1 className="mt-5 font-semibold tracking-tight leading-[1.08] text-[2.75rem] sm:text-[3.25rem] lg:text-[4rem]">
                Italy Event Management, Hotels &amp; Transportation
              </h1>
              <p className="mt-6 max-w-[600px] text-lg leading-relaxed text-white/80">
                Complete event, accommodation and transportation services across Italy for corporate groups, travel
                agencies, weddings and international visitors — with vetted local partners, fixed prices and one
                point of contact, from airport transfers to large-scale events in Rome, Milan, Tuscany and the
                Lakes.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/request-a-quote" className="!h-[52px] w-full !px-6 sm:w-auto">
                  Request a quote
                </ButtonLink>
                <ButtonLink
                  href={hrefFor("for-travel-agencies")}
                  variant="outline"
                  className="!h-[52px] w-full !border-white/30 !px-6 !text-white hover:!bg-white/10 sm:w-auto"
                >
                  Get trade net rates
                </ButtonLink>
              </div>
              <p className="mt-4 text-sm text-white/60">
                Reply {site.responseSla}
                {wa && (
                  <>
                    {" "}
                    ·{" "}
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
                      WhatsApp our team
                    </a>
                  </>
                )}
              </p>

              <p className="mt-8 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/40">
                Vetted local partners · Fixed pricing · One point of contact
              </p>
            </div>

            {/* Visual */}
            <div className="relative mx-auto w-full max-w-[620px] motion-safe:animate-[hero-fade-scale_700ms_ease-out_both] motion-safe:[animation-delay:150ms] lg:mx-0">
              <div className="relative aspect-[7/6] overflow-hidden rounded-[20px] border border-white/10 shadow-lg shadow-black/25">
                <Image
                  src="/luxury-event-transportation-italy.webp"
                  alt="A chauffeur welcoming guests into a private Mercedes V-Class outside a Rome venue at sunset, with St Peter's Basilica in the distance"
                  width={1536}
                  height={1024}
                  priority
                  sizes="(min-width: 1024px) 620px, 90vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PROCESS PROOF */}
      <section className="border-b border-line bg-white">
        <Container className="py-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Why work with us</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d) => (
              <div key={d.title} className="flex gap-3">
                <Check />
                <div>
                  <p className="font-semibold">{d.title}</p>
                  <p className="mt-1 text-sm text-muted">{d.text}</p>
                </div>
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
          <div className="reveal-on-scroll mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <CardLink key={s.title} slug={s.slug}>
                <span className="font-serif text-2xl font-semibold text-accent/50 transition-colors duration-300 group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{s.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:underline">
                  Learn more <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
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
          <ul className="reveal-on-scroll mt-10 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-5">
            {audiences.map((a, i) => (
              <li key={a.title} className="border-t border-line">
                <Link href={hrefFor(a.slug)} className="group flex items-start gap-3 py-5">
                  <span className="font-serif text-xl font-semibold text-accent/50 transition-colors duration-300 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-semibold transition-colors group-hover:text-accent">{a.title}</span>
                    <span className="mt-1 block text-sm text-muted">{a.text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="How it works" title="From request to arrival in four steps" />
          <ol className="reveal-on-scroll mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li
                key={s.n}
                className="rounded-xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md"
              >
                <span className="font-serif text-4xl font-semibold text-accent">{s.n}</span>
                <p className="mt-3 font-semibold">{s.title}</p>
                <p className="mt-1 text-sm text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* EDITORIAL BREAK */}
      <section className="relative">
        <div className="relative h-[420px] w-full sm:h-[500px]">
          <Image
            src="/luxury-villa-arrival-group-transport-italy.webp"
            alt="Guests arriving with luggage at an Italian villa, greeted by chauffeurs and hotel staff"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
        </div>
        <Container className="absolute inset-x-0 bottom-0 pb-10 sm:pb-14">
          <p className="max-w-xl font-serif text-2xl font-semibold leading-snug text-white sm:text-3xl">
            From the airport to the villa gate to a 200-guest gala — transport, hotels and event logistics, one invoice.
          </p>
        </Container>
      </section>

      {/* DESTINATIONS */}
      <section className="bg-sand/50 py-20">
        <Container>
          <SectionHeading eyebrow="Where we operate" title="Rome first — and the destinations people actually travel to" />
          <div className="reveal-on-scroll mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {livePages(destinationSlugs)
              .filter((p) => destinationPhotos[p.slug])
              .map((p) => {
                const photo = destinationPhotos[p.slug];
                return (
                  <Link key={p.slug} href={hrefFor(p.slug)} className="group relative overflow-hidden rounded-2xl">
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="font-serif text-xl font-semibold text-white">{p.nav ?? p.h1}</p>
                      <p className="mt-1 text-sm text-white/75 transition-transform duration-300 group-hover:translate-x-1">
                        View services →
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
          <p className="reveal-on-scroll mt-8 text-sm text-muted">
            Also serving{" "}
            {livePages(destinationSlugs)
              .filter((p) => !destinationPhotos[p.slug])
              .map((p, i, arr) => (
                <span key={p.slug}>
                  <Link href={hrefFor(p.slug)} className="font-semibold text-accent hover:underline">
                    {p.nav ?? p.h1}
                  </Link>
                  {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " and " : ""}
                </span>
              ))}
            .
          </p>
          <p className="mt-4">
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
          <ul className="reveal-on-scroll mt-10 divide-y divide-line border-y border-line">
            {livePages(routeSlugs).map((p) => (
              <li key={p.slug}>
                <Link href={pathFor(p)} className="group flex items-center justify-between gap-6 py-5">
                  <span>
                    <span className="font-serif text-lg font-semibold transition-colors group-hover:text-accent">{p.nav ?? p.h1}</span>
                    <span className="mt-1 block text-sm text-muted">{p.lead}</span>
                  </span>
                  <span className="shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* GUIDES */}
      {guides.length > 0 && (
        <section className="bg-sand/50 py-20">
          <Container>
            <SectionHeading eyebrow="Guides" title="Real numbers and access rules, with sources" />
            <ul className="reveal-on-scroll mt-10 divide-y divide-line border-y border-line">
              {guides.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={pathFor(p)}
                    className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span>
                      <span className="font-serif text-lg font-semibold transition-colors group-hover:text-accent">{p.nav ?? p.h1}</span>
                      <span className="mt-1 block max-w-xl text-sm text-muted">{p.lead}</span>
                    </span>
                    {p.readingMinutes && (
                      <span className="shrink-0 text-xs font-semibold uppercase tracking-widest text-muted">
                        {p.readingMinutes} min read
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
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
          <div className="reveal-on-scroll mt-8">
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
