import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PageCards from "@/components/PageCards";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { getGuides } from "@/content/registry";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Italy Travel Logistics Guides | Transfers, Weddings, Events",
  description:
    "Practical guides on private transfer costs, Rome and Amalfi Coast access rules, airport options, destination-wedding transport, corporate events and hotel group bookings in Italy.",
  path: "/guides",
});

export default function GuidesIndex() {
  const guides = getGuides();
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
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold sm:text-5xl">Practical guides for moving people in Italy</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Real numbers, access rules and checklists for transfers, weddings, events and group travel — with sources.
        </p>
        <div className="mt-10">
          <PageCards pages={guides} />
        </div>
        <div className="mt-12">
          <ButtonLink href="/request-a-quote">Request a quote</ButtonLink>
        </div>
      </Container>
    </>
  );
}
