import type { PageKind, PageStub } from "../types";

/**
 * PLANNED PAGES — the planned first 100 pages.
 * (6 core pages are static routes: /, /about, /contact, /request-a-quote, /partners, /vehicles.)
 * Stubs are NOT routable and NOT in the sitemap. To publish one: add a full ContentPage with the
 * same slug to `published.ts` (it overrides the stub). The rule applies:
 * unique real data or don't publish.
 */

const stub = (kind: PageKind, slug: string, title: string): PageStub => ({
  slug,
  kind,
  status: "draft",
  title,
});

export const stubs: PageStub[] = [
  // Service pages (22)
  stub("service", "airport-transfers", "Airport Transfers in Italy"),
  stub("service", "private-chauffeur-italy", "Private Chauffeur in Italy"),
  stub("service", "hourly-chauffeur-italy", "Hourly Chauffeur in Italy"),
  stub("service", "city-to-city-transfers-italy", "City-to-City Transfers in Italy"),
  stub("service", "group-transportation-italy", "Group Transportation in Italy"),
  stub("service", "minibus-coach-hire-italy", "Minibus & Coach Hire in Italy"),
  stub("service", "wedding-transportation-italy", "Wedding Transportation in Italy"),
  stub("service", "corporate-transportation-italy", "Corporate Transportation in Italy"),
  stub("service", "event-transportation-italy", "Event Transportation in Italy"),
  stub("service", "cruise-port-transfers-italy", "Cruise Port Transfers in Italy"),
  stub("service", "vip-transfers-italy", "VIP Transfers in Italy"),
  stub("service", "hotel-group-bookings-italy", "Group Hotel Bookings in Italy"),
  stub("service", "wedding-accommodation-italy", "Wedding Accommodation in Italy"),
  stub("service", "event-management-italy", "Event Management in Italy"),
  stub("service", "corporate-events-italy", "Corporate Events in Italy"),
  stub("service", "conferences-mice-italy", "Conferences & MICE in Italy"),
  stub("service", "corporate-travel-italy", "Corporate Travel in Italy"),
  stub("service", "incentive-travel-italy", "Incentive Travel in Italy"),
  stub("service", "destination-weddings-italy", "Destination Weddings in Italy"),
  stub("service", "private-tours-italy", "Private Tours in Italy"),
  stub("service", "group-travel-italy", "Group Travel in Italy"),
  stub("service", "italy-dmc-services", "Italy DMC Services"),

  // City hubs (10) — `rome` is published
  stub("city", "rome", "Rome"),
  stub("city", "milan", "Milan"),
  stub("city", "florence", "Florence"),
  stub("city", "venice", "Venice"),
  stub("city", "naples", "Naples"),
  stub("city", "amalfi-coast", "Amalfi Coast"),
  stub("city", "lake-como", "Lake Como"),
  stub("city", "tuscany", "Tuscany"),
  stub("city", "bologna", "Bologna"),
  stub("city", "verona", "Verona"),

  // Airport pages (8)
  stub("airport", "rome-airport-transfer", "Rome Airport Transfer"),
  stub("airport", "ciampino-airport-transfer", "Ciampino Airport Transfer"),
  stub("airport", "milan-airport-transfer", "Milan Airport Transfer"),
  stub("airport", "malpensa-airport-transfer", "Malpensa Airport Transfer"),
  stub("airport", "bergamo-airport-transfer", "Bergamo Airport Transfer"),
  stub("airport", "venice-airport-transfer", "Venice Airport Transfer"),
  stub("airport", "naples-airport-transfer", "Naples Airport Transfer"),
  stub("airport", "pisa-airport-transfer", "Pisa Airport Transfer"),

  // Route pages (25)
  stub("route", "rome-to-florence-transfer", "Rome to Florence Transfer"),
  stub("route", "rome-to-naples-transfer", "Rome to Naples Transfer"),
  stub("route", "rome-to-amalfi-coast-transfer", "Rome to Amalfi Coast Transfer"),
  stub("route", "rome-to-positano-transfer", "Rome to Positano Transfer"),
  stub("route", "rome-to-sorrento-transfer", "Rome to Sorrento Transfer"),
  stub("route", "rome-to-pompeii-transfer", "Rome to Pompeii Transfer"),
  stub("route", "rome-to-orvieto-transfer", "Rome to Orvieto Transfer"),
  stub("route", "rome-to-assisi-transfer", "Rome to Assisi Transfer"),
  stub("route", "rome-to-siena-transfer", "Rome to Siena Transfer"),
  stub("route", "rome-to-civitavecchia-cruise-port-transfer", "Rome to Civitavecchia Cruise Port Transfer"),
  stub("route", "rome-to-venice-transfer", "Rome to Venice Transfer"),
  stub("route", "florence-to-venice-transfer", "Florence to Venice Transfer"),
  stub("route", "florence-to-cinque-terre-transfer", "Florence to Cinque Terre Transfer"),
  stub("route", "florence-to-chianti-private-driver", "Florence to Chianti Private Driver"),
  stub("route", "naples-to-amalfi-coast-transfer", "Naples to Amalfi Coast Transfer"),
  stub("route", "naples-to-positano-transfer", "Naples to Positano Transfer"),
  stub("route", "naples-to-sorrento-transfer", "Naples to Sorrento Transfer"),
  stub("route", "naples-to-pompeii-transfer", "Naples to Pompeii Transfer"),
  stub("route", "naples-cruise-port-transfer", "Naples Cruise Port Transfer"),
  stub("route", "milan-to-lake-como-transfer", "Milan to Lake Como Transfer"),
  stub("route", "malpensa-to-lake-como-transfer", "Malpensa to Lake Como Transfer"),
  stub("route", "malpensa-to-bellagio-transfer", "Malpensa to Bellagio Transfer"),
  stub("route", "milan-to-venice-transfer", "Milan to Venice Transfer"),
  stub("route", "milan-to-verona-transfer", "Milan to Verona Transfer"),
  stub("route", "milan-to-portofino-transfer", "Milan to Portofino Transfer"),

  // City × vertical (14)
  stub("vertical", "rome-corporate-events", "Rome Corporate Events"),
  stub("vertical", "milan-mice-services", "Milan MICE Services"),
  stub("vertical", "lake-como-wedding-transport", "Lake Como Wedding Transport"),
  stub("vertical", "tuscany-wedding-transport", "Tuscany Wedding Transport"),
  stub("vertical", "amalfi-coast-wedding-transport", "Amalfi Coast Wedding Transport"),
  stub("vertical", "rome-chauffeur-service", "Rome Chauffeur Service"),
  stub("vertical", "milan-chauffeur-service", "Milan Chauffeur Service"),
  stub("vertical", "florence-chauffeur-service", "Florence Chauffeur Service"),
  stub("vertical", "tuscany-private-driver", "Tuscany Private Driver"),
  stub("vertical", "amalfi-coast-private-driver", "Amalfi Coast Private Driver"),
  stub("vertical", "rome-group-transportation", "Rome Group Transportation"),
  stub("vertical", "milan-fair-transfers", "Milan Fair Transfers"),
  stub("vertical", "rome-event-transportation", "Rome Event Transportation"),
  stub("vertical", "milan-event-transportation", "Milan Event Transportation"),

  // B2B industry pages (5)
  stub("industry", "for-travel-agencies", "For Travel Agencies"),
  stub("industry", "for-tour-operators", "For Tour Operators"),
  stub("industry", "for-wedding-planners", "For Wedding Planners"),
  stub("industry", "for-event-agencies", "For Event Agencies"),
  stub("industry", "for-corporate-travel-managers", "For Corporate Travel Managers"),

  // Guides (10) — slugs live under /guides/[slug] later; kept here so the plan is tracked
  stub("guide", "how-much-does-a-private-transfer-cost-in-italy", "How Much Does a Private Transfer Cost in Italy?"),
  stub("guide", "rome-ztl-guide-for-groups-and-coaches", "Rome ZTL Guide for Groups and Coaches"),
  stub("guide", "amalfi-coast-alternate-license-plates", "Amalfi Coast Alternate Licence Plates & Transfer Rules"),
  stub("guide", "ncc-vs-taxi-italy", "NCC vs Taxi in Italy"),
  stub("guide", "fiumicino-airport-to-rome-options", "Fiumicino Airport to Rome — All Options"),
  stub("guide", "malpensa-to-milan-and-lake-como-options", "Malpensa to Milan & Lake Como — All Options"),
  stub("guide", "destination-wedding-guest-transport-checklist", "Destination Wedding Guest Transport Checklist"),
  stub("guide", "how-to-plan-a-corporate-event-in-italy", "How to Plan a Corporate Event in Italy"),
  stub("guide", "italy-hotel-group-booking-guide", "Italy Hotel Group Booking Guide"),
  stub("guide", "what-is-an-italy-dmc", "What an Italy DMC Does and How to Choose One"),
];
