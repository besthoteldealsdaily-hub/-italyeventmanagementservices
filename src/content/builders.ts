import type { ContentPage, Fact, Faq, QuoteService, Section } from "./types";

export const UPDATED = "2026-09-19";

/** Adds the boilerplate fields every published page needs. */
export function page(p: Omit<ContentPage, "status" | "updated"> & { updated?: string }): ContentPage {
  return { status: "published", updated: UPDATED, ...p };
}

/* ───────────────────────── ROUTES ───────────────────────── */

interface RouteInput {
  slug: string;
  from: string;
  to: string;
  /** e.g. "about 225 km" */
  km: string;
  /** e.g. "about 2.5–3 hours" */
  drive: string;
  road: string;
  /** Alternative public transport, one line (kept honest: no prices) */
  alt?: string;
  pickups: string;
  dropoffs: string;
  access: string;
  /** [place, why it is worth a stop] */
  stops: [string, string][];
  insight: { heading: string; text: string };
  vehicles?: string;
  extraFaq?: Faq[];
  parent: { slug: string; label: string };
  tags: string[];
  related: string[];
  nav?: string;
  service?: QuoteService;
  areaServed?: string[];
  /** Overrides the default "Private Transfer" wording, e.g. "Private Driver" */
  noun?: string;
  /** Full H1 override, e.g. for cruise-port pages */
  h1?: string;
}

const clip = (s: string, max: number) => (s.length <= max ? s : s.slice(0, max - 1).replace(/[\s,;:–—-]+\S*$/, "") + "…");

export function route(i: RouteInput): ContentPage {
  const noun = i.noun ?? "Private Transfer";
  const h1 = i.h1 ?? `${i.from} to ${i.to} ${noun}`;
  const titleWithTail = `${h1} | Fixed Price`;
  const first = i.stops[0]?.[0];

  const facts: Fact[] = [
    { label: "Distance", value: i.km },
    { label: "Drive time", value: `${i.drive} without stops (traffic-dependent)` },
    { label: "Main road", value: i.road },
    ...(i.alt ? [{ label: "Public-transport alternative", value: i.alt }] : []),
    { label: "Common pick-ups", value: i.pickups },
    { label: "Common drop-offs", value: i.dropoffs },
    { label: "Access", value: i.access },
  ];

  const sections: Section[] = [
    {
      heading: `Worth a stop between ${i.from} and ${i.to}`,
      bullets: i.stops.map(([name, why]) => `${name} — ${why}`),
    },
    { heading: i.insight.heading, paragraphs: [i.insight.text] },
    {
      heading: "Which vehicle?",
      paragraphs: [
        i.vehicles ??
          "We match the vehicle to your group and luggage: a sedan for up to 3 passengers, a van for up to 7, a minibus for larger groups. Tell us how many large suitcases you have and we will size it properly.",
      ],
    },
  ];

  const faqs: Faq[] = [
    {
      q: `How long does the ${i.from} to ${i.to} transfer take?`,
      a: `${i.drive[0].toUpperCase()}${i.drive.slice(1)} without stops. Traffic, weather and time of day can add to that, so we plan the pick-up time with a buffer for connections.`,
    },
    {
      q: "Can we stop on the way?",
      a: `Yes. ${first ? `Popular stops are ${i.stops.map((s) => s[0]).join(", ")}.` : ""} We agree the stop time in advance so the rest of your schedule stays predictable, and price it separately from the direct transfer.`,
    },
    {
      q: "Where will the driver pick us up and drop us off?",
      a: `${i.access} Your voucher shows the exact meeting point and the drop-off point before you travel.`,
    },
    {
      q: "Is the price per person?",
      a: "No — per vehicle. Tolls and parking are included in our fixed price; any city access fee or extra stop is shown as a separate line before you confirm.",
    },
    ...(i.extraFaq ?? []),
  ];

  return page({
    slug: i.slug,
    kind: "route",
    title: titleWithTail.length <= 60 ? titleWithTail : h1,
    description: clip(
      `Private transfer from ${i.from} to ${i.to} with a licensed driver: ${i.km}, ${i.drive}. Fixed all-inclusive price, optional stops. Request a quote.`,
      160,
    ),
    h1,
    nav: i.nav ?? `${i.from} to ${i.to}`,
    lead: `Door to door from ${i.from} to ${i.to} — ${i.drive} on the ${i.road}, with space for your luggage${first ? ` and the option to stop at ${first}` : ""}.`,
    parent: i.parent,
    tags: i.tags,
    facts,
    included: [
      "Licensed operator and insured vehicle",
      `Fixed all-inclusive price: ${i.road.toLowerCase().includes("toll") || i.road.toLowerCase().includes("motorway") ? "motorway tolls, " : ""}parking and waiting`,
      "Vehicle sized to your group and luggage",
      "Optional stops with an agreed time budget",
      "Driver details 24 hours before pick-up; dispatch contact throughout",
    ],
    sections,
    faqs,
    related: i.related,
    cta: { label: "Get a fixed price for this route", service: i.service ?? "transfer" },
    serviceType: "City-to-city private transfer",
    areaServed: i.areaServed ?? [i.from, i.to],
  });
}

/* ───────────────────────── AIRPORTS ───────────────────────── */

interface AirportInput {
  slug: string;
  /** e.g. "Milan Malpensa (MXP)" */
  airport: string;
  short: string;
  h1: string;
  title: string;
  description: string;
  lead: string;
  facts: Fact[];
  /** [destination, typical time] */
  journeys: [string, string][];
  arrival: string[];
  insight: { heading: string; text: string };
  faqs: Faq[];
  parent?: { slug: string; label: string };
  tags: string[];
  related: string[];
  areaServed: string[];
  nav?: string;
}

export function airport(i: AirportInput): ContentPage {
  return page({
    slug: i.slug,
    kind: "airport",
    title: i.title,
    description: i.description,
    h1: i.h1,
    nav: i.nav ?? i.short,
    lead: i.lead,
    parent: i.parent,
    tags: i.tags,
    facts: i.facts,
    included: [
      "Meet-and-greet at arrivals with your name sign",
      "Flight tracking — we adjust for delays",
      "60 minutes of free waiting after landing",
      "Fixed price agreed in advance (tolls and parking included)",
      "Child seats and extra luggage space on request",
    ],
    sections: [
      { heading: "How your arrival works", bullets: i.arrival },
      { heading: "Typical journey times", bullets: i.journeys.map(([to, t]) => `${to}: ${t}`) },
      { heading: i.insight.heading, paragraphs: [i.insight.text] },
    ],
    faqs: i.faqs,
    related: i.related,
    cta: { label: "Get a fixed price", service: "transfer" },
    serviceType: "Airport transfer",
    areaServed: i.areaServed,
  });
}
