import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PageCards from "@/components/PageCards";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { getGuide, getGuides } from "@/content/registry";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Guides: Events, Weddings & Travel in Italy",
  description:
    "Practical guides on planning weddings, corporate events and conferences in Italy, plus transfer costs, access rules and hotel group bookings, with sources.",
  path: "/guides",
});

const groups: { title: string; text: string; slugs: string[] }[] = [
  {
    title: "Weddings in Italy",
    text: "Legal ceremonies, budgets, venues, timing and traditions for destination weddings.",
    slugs: [
      "getting-married-in-italy-civil-religious-symbolic",
      "destination-wedding-budget-italy",
      "how-to-choose-a-wedding-venue-in-italy",
      "best-time-to-get-married-in-italy",
      "destination-wedding-weekend-schedule-italy",
      "italian-wedding-traditions-guide",
    ],
  },
  {
    title: "Corporate events, conferences and MICE",
    text: "Planning, timing and buying guides for corporate events, galas, conferences and retreats.",
    slugs: [
      "how-to-plan-a-corporate-event-in-italy",
      "how-to-plan-a-conference-in-italy",
      "how-to-plan-a-gala-dinner-in-italy",
      "corporate-retreat-planning-italy",
      "best-months-for-events-in-italy",
      "how-to-choose-an-event-management-company-in-italy",
    ],
  },
  {
    title: "Event production and planning",
    text: "Catering, lighting, AV, décor, music, staff, photography, permits and budgets.",
    slugs: [
      "event-catering-in-italy-guide",
      "event-lighting-for-villas-and-historic-venues",
      "conference-av-checklist-italy",
      "event-decor-and-flowers-in-italy",
      "music-and-entertainment-for-events-in-italy",
      "event-staff-and-security-planning-italy",
      "event-photography-and-video-brief",
      "event-permits-and-licences-italy",
      "event-budget-guide-italy",
    ],
  },
  {
    title: "Transport and access",
    text: "Transfer costs, airport options, restricted-traffic zones and guest transport.",
    slugs: [
      "how-much-does-a-private-transfer-cost-in-italy",
      "rome-ztl-guide-for-groups-and-coaches",
      "amalfi-coast-alternate-license-plates",
      "ncc-vs-taxi-italy",
      "fiumicino-airport-to-rome-options",
      "malpensa-to-milan-and-lake-como-options",
      "destination-wedding-guest-transport-checklist",
    ],
  },
  {
    title: "Hotels and destination services",
    text: "Group hotel bookings and choosing a destination management company.",
    slugs: ["italy-hotel-group-booking-guide", "what-is-an-italy-dmc"],
  },
];

export default function GuidesIndex() {
  const grouped = new Set(groups.flatMap((g) => g.slugs));
  const rest = getGuides().filter((g) => !grouped.has(g.slug));
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <Container className="py-14 sm:py-20">
        <Eyebrow>Guides</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold sm:text-5xl">Practical guides for planning events and weddings in Italy</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Checklists, budgets and rules for weddings, corporate events and event production, plus transfer, hotel and access
          guides — with sources wherever we quote figures.
        </p>
        {groups.map((g) => {
          const pages = g.slugs.map((s) => getGuide(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
          if (!pages.length) return null;
          return (
            <section key={g.title} className="mt-14">
              <h2 className="text-2xl font-semibold">{g.title}</h2>
              <p className="mt-2 max-w-2xl text-muted">{g.text}</p>
              <div className="mt-6">
                <PageCards pages={pages} />
              </div>
            </section>
          );
        })}
        {rest.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-semibold">More guides</h2>
            <div className="mt-6">
              <PageCards pages={rest} />
            </div>
          </section>
        )}
        <div className="mt-12">
          <ButtonLink href="/request-a-quote">Request a quote</ButtonLink>
        </div>
      </Container>
    </>
  );
}
