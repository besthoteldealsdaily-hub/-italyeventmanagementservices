import { page } from "../builders";
import type { ContentPage } from "../types";

/** Category hub pages. Each lists its child pages as cards (only published ones show). */

export const hubPages: ContentPage[] = [
  page({
    slug: "services",
    kind: "hub",
    title: "Services: Transport, Hotels, Events & Weddings in Italy",
    description:
      "All our services in Italy: transfers and chauffeurs, group transport, hotel blocks, event management and MICE, weddings, tours and B2B ground handling.",
    h1: "Our Services in Italy",
    nav: "All services",
    lead:
      "Transportation, group accommodation, events and weddings — organised by one team and delivered through vetted, licensed local partners.",
    groups: [
      {
        title: "Transportation",
        text: "Transfers, chauffeurs and group vehicles across Italy.",
        slugs: [
          "airport-transfers",
          "city-to-city-transfers-italy",
          "private-chauffeur-italy",
          "hourly-chauffeur-italy",
          "group-transportation-italy",
          "minibus-coach-hire-italy",
          "cruise-port-transfers-italy",
          "vip-transfers-italy",
          "corporate-transportation-italy",
          "event-transportation-italy",
        ],
      },
      {
        title: "Transport for weddings, celebrations and special events",
        text: "Guest transport only — planning, venues and production stay with the host, planner or agency.",
        slugs: [
          "wedding-transportation-italy",
          "lake-como-wedding-transport",
          "tuscany-wedding-transport",
          "amalfi-coast-wedding-transport",
          "marriage-proposal-transfer-italy",
          "birthday-celebration-transport-italy",
          "baby-shower-family-celebration-transport-italy",
          "private-social-event-transport-italy",
          "christmas-corporate-events-italy",
          "product-launch-fashion-event-transport-italy",
          "entertainment-event-transport-italy",
        ],
      },
      {
        title: "Hotels and accommodation",
        text: "Room blocks and group rates negotiated with hotels and villas.",
        slugs: ["hotel-group-bookings-italy", "wedding-accommodation-italy"],
      },
      {
        title: "Event management and MICE",
        text: "Planning, venues, supplier management and on-site coordination for corporate, luxury and conference events.",
        slugs: [
          "event-management-italy",
          "event-services-italy",
          "corporate-events-italy",
          "conferences-mice-italy",
          "luxury-event-management-italy",
          "incentive-travel-italy",
        ],
      },
      {
        title: "Weddings",
        text: "Full-service planning for destination weddings: venue, ceremony, catering, décor, photography, music, guest hotels and transport.",
        slugs: ["destination-weddings-italy", "tuscany-wedding-planning", "lake-como-wedding-planning", "amalfi-coast-wedding-planning"],
      },
      {
        title: "Tours, groups and destination services",
        slugs: [
          "private-tours-italy",
          "group-travel-italy",
          "corporate-travel-italy",
          "italy-dmc-services",
          "cultural-religious-group-transport-italy",
        ],
      },
      {
        title: "For professionals",
        text: "Trade rates and ground handling for agencies, planners and corporate teams.",
        slugs: [
          "for-travel-agencies",
          "for-tour-operators",
          "for-wedding-planners",
          "for-event-agencies",
          "for-corporate-travel-managers",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you own vehicles or hotels?",
        a: "No. We coordinate licensed local operators, hotels and venues and remain your single accountable contact, with one contract and one invoice.",
      },
      {
        q: "How do I get a price?",
        a: "Send a request. Transfers are quoted at a fixed price within an hour on business days; groups and events take longer because they involve several suppliers.",
      },
    ],
    cta: { label: "Request a quote", service: "other" },
    areaServed: ["Italy"],
  }),

  page({
    slug: "transportation",
    kind: "hub",
    title: "Transportation in Italy | Transfers, Chauffeurs & Groups",
    description:
      "Transfers, private chauffeurs, minibuses and coaches across Italy. Fixed prices, licensed operators, access-rule planning and backup vehicles.",
    h1: "Transportation in Italy",
    nav: "Transportation",
    lead:
      "From a single airport pick-up to a 300-guest wedding shuttle plan — licensed drivers, fixed prices and a dispatch team that stays reachable.",
    parent: { slug: "services", label: "Services" },
    groups: [
      {
        title: "Transfers",
        slugs: ["airport-transfers", "city-to-city-transfers-italy", "cruise-port-transfers-italy", "vip-transfers-italy"],
      },
      {
        title: "Chauffeurs",
        slugs: [
          "private-chauffeur-italy",
          "hourly-chauffeur-italy",
          "rome-chauffeur-service",
          "milan-chauffeur-service",
          "florence-chauffeur-service",
          "tuscany-private-driver",
          "amalfi-coast-private-driver",
        ],
      },
      {
        title: "Groups, weddings and events",
        slugs: [
          "group-transportation-italy",
          "minibus-coach-hire-italy",
          "wedding-transportation-italy",
          "event-transportation-italy",
          "corporate-transportation-italy",
          "rome-group-transportation",
        ],
      },
      {
        title: "Celebrations and special occasions",
        slugs: [
          "marriage-proposal-transfer-italy",
          "birthday-celebration-transport-italy",
          "baby-shower-family-celebration-transport-italy",
          "private-social-event-transport-italy",
          "christmas-corporate-events-italy",
          "product-launch-fashion-event-transport-italy",
          "entertainment-event-transport-italy",
          "cultural-religious-group-transport-italy",
        ],
      },
      {
        title: "Airports",
        slugs: [
          "rome-airport-transfer",
          "ciampino-airport-transfer",
          "milan-airport-transfer",
          "malpensa-airport-transfer",
          "bergamo-airport-transfer",
          "venice-airport-transfer",
          "naples-airport-transfer",
          "pisa-airport-transfer",
        ],
      },
      {
        title: "Popular routes",
        slugs: [
          "rome-to-florence-transfer",
          "rome-to-naples-transfer",
          "rome-to-amalfi-coast-transfer",
          "naples-to-amalfi-coast-transfer",
          "florence-to-venice-transfer",
          "milan-to-lake-como-transfer",
          "malpensa-to-lake-como-transfer",
          "milan-to-venice-transfer",
        ],
      },
    ],
    sections: [
      {
        heading: "How our transportation works",
        bullets: [
          "We book licensed operators (NCC and coach companies) and audit them before they receive work",
          "One fixed price per vehicle; tolls and parking included, extras itemised",
          "Vehicle sized to your group and luggage, with backups on call",
          "A named dispatcher and a 24/7 contact on every voucher",
        ],
      },
    ],
    faqs: [
      {
        q: "Are your drivers licensed?",
        a: "The operators we book hold the municipal or regional authorisations required for the service, and we check licences and insurance before they receive work.",
      },
      {
        q: "Do you offer fixed prices?",
        a: "Yes, per vehicle and all-inclusive for the listed routes and services; we itemise any extras before you confirm.",
      },
    ],
    cta: { label: "Get a fixed price", service: "transfer" },
    areaServed: ["Italy"],
  }),

  page({
    slug: "hotels",
    kind: "hub",
    title: "Group Hotels in Italy | Room Blocks & Group Rates",
    description:
      "Group hotel accommodation in Italy: negotiated room blocks for weddings, corporate events and tour groups. Quote-only, with clear cut-off and attrition terms.",
    h1: "Group Hotels and Accommodation",
    nav: "Hotels",
    lead:
      "Room blocks and group rates for weddings, teams and tour groups — negotiated with hotels and villas, quoted on request, with clear terms.",
    parent: { slug: "services", label: "Services" },
    groups: [
      {
        title: "Group accommodation",
        slugs: ["hotel-group-bookings-italy", "wedding-accommodation-italy", "corporate-hotel-booking-italy", "tour-group-hotel-booking-italy"],
      },
      {
        title: "Events that include accommodation",
        slugs: ["event-management-italy", "corporate-events-italy", "incentive-travel-italy", "conferences-mice-italy", "event-hotel-accommodation-italy"],
      },
      {
        title: "Hotel booking by destination",
        slugs: ["rome-hotel-booking", "milan-hotel-booking", "florence-hotel-booking"],
      },
    ],
    sections: [
      {
        heading: "Why we don't show hotel prices online",
        paragraphs: [
          "Group rates depend on dates, room count, terms and hotel availability. We are not a public booking site: we source proposals for your specific request and compare rates and terms so that you can choose with confidence. For single rooms, an ordinary booking site is usually the better tool.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the minimum group size?",
        a: "Ten rooms or more is typical for a room block.",
      },
      {
        q: "Do you also arrange transport for our group?",
        a: "Yes. Accommodation, transfers and event logistics can be managed together.",
      },
      {
        q: "Do you negotiate room blocks and attrition terms on our behalf?",
        a: "Yes — that is the core of the service. We request proposals, negotiate the rate and terms, and manage the block through to the cut-off date.",
      },
      {
        q: "Do you offer corporate rates for individual business travellers, not just group blocks?",
        a: "Yes. A standing corporate rate agreement suits regular individual travel; a room block suits several travellers on the same dates. See our corporate hotel booking page.",
      },
      {
        q: "Can hotel accommodation be booked together with transport and event planning?",
        a: "Yes — one contract and one invoice across accommodation, transport and event logistics.",
      },
    ],
    cta: { label: "Request group accommodation", service: "hotel-block" },
    areaServed: ["Italy"],
  }),

  page({
    slug: "destinations",
    kind: "hub",
    title: "Destinations: Rome, Milan, Florence, Venice, Amalfi & More",
    description:
      "Where we operate in Italy: Rome, Milan, Florence, Venice, Naples, the Amalfi Coast, Lake Como, Tuscany, Bologna and Verona, with airports and routes.",
    h1: "Destinations We Cover",
    nav: "Destinations",
    lead:
      "Rome is our hub, with routes to Florence, Tuscany, Naples and the Amalfi Coast; Milan and the Lakes follow. Explore each destination, its airports and its most-requested routes.",
    groups: [
      {
        title: "Cities and regions",
        slugs: ["rome", "milan", "florence", "venice", "naples", "amalfi-coast", "lake-como", "tuscany", "bologna", "verona"],
      },
      {
        title: "Airports",
        slugs: [
          "rome-airport-transfer",
          "ciampino-airport-transfer",
          "milan-airport-transfer",
          "malpensa-airport-transfer",
          "bergamo-airport-transfer",
          "venice-airport-transfer",
          "naples-airport-transfer",
          "pisa-airport-transfer",
        ],
      },
      {
        title: "Routes from Rome",
        slugs: [
          "rome-to-florence-transfer",
          "rome-to-naples-transfer",
          "rome-to-amalfi-coast-transfer",
          "rome-to-positano-transfer",
          "rome-to-sorrento-transfer",
          "rome-to-pompeii-transfer",
          "rome-to-orvieto-transfer",
          "rome-to-assisi-transfer",
          "rome-to-siena-transfer",
          "rome-to-civitavecchia-cruise-port-transfer",
          "rome-to-venice-transfer",
        ],
      },
      {
        title: "Routes from Florence and Naples",
        slugs: [
          "florence-to-venice-transfer",
          "florence-to-cinque-terre-transfer",
          "florence-to-chianti-private-driver",
          "naples-to-amalfi-coast-transfer",
          "naples-to-positano-transfer",
          "naples-to-sorrento-transfer",
          "naples-to-pompeii-transfer",
          "naples-cruise-port-transfer",
        ],
      },
      {
        title: "Routes from Milan and the lakes",
        slugs: [
          "milan-to-lake-como-transfer",
          "malpensa-to-lake-como-transfer",
          "malpensa-to-bellagio-transfer",
          "milan-to-venice-transfer",
          "milan-to-verona-transfer",
          "milan-to-portofino-transfer",
        ],
      },
    ],
    faqs: [
      {
        q: "Which city is your base?",
        a: "Rome is our operational hub. Milan and Lake Como are next, with local partners in each destination.",
      },
      {
        q: "Can you serve places not listed?",
        a: "Yes. Send us the origin and destination and we will quote the route.",
      },
    ],
    cta: { label: "Request a quote", service: "other" },
    areaServed: ["Italy"],
  }),
];
