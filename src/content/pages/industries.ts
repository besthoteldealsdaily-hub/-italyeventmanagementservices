import { page } from "../builders";
import type { ContentPage } from "../types";

/** B2B "for professionals" pages (for-wedding-planners and for-travel-agencies live in published.ts). */

export const industryPages: ContentPage[] = [
  page({
    slug: "for-tour-operators",
    kind: "industry",
    title: "Italy Ground Handling for Tour Operators & Groups",
    description:
      "Coaches, minibuses, hotel blocks and licensed guides for tour operators running groups in Italy. Contracted rates, access-rule planning, backup vehicles.",
    h1: "Italy Ground Handling for Tour Operators",
    nav: "Tour operators",
    lead:
      "Coaches, minibuses, group hotel blocks and licensed guides across Italy — with access permits handled, backup vehicles ready and one contact for the whole programme.",
    tags: [],
    facts: [
      { label: "Demand context", value: "Foreign overnight stays in Italy grew 4.3% in 2025, and art and culture cities account for 56.8% of foreign vacation spending" },
      { label: "Typical requests", value: "Airport waves, multi-city coach programmes, cruise-port days and day excursions" },
      { label: "Guides", value: "Only nationally qualified guides on the national register; we book them as separate lines" },
      { label: "Rates", value: "Contracted rates by vehicle class and day; quotes within a day for group requests" },
    ],
    included: [
      "Coach, minibus and minivan capacity across Italy",
      "Group hotel blocks with clear cut-off and attrition terms",
      "Licensed guides and entry tickets through partners",
      "Route, drop-off and parking planning for restricted zones",
      "Backup vehicles and a 24/7 dispatch line",
    ],
    sections: [
      {
        heading: "Where groups get stuck",
        bullets: [
          "Coach access to historic centres and drop-off points that change without notice",
          "Guide availability in peak weeks, and guides who are not on the national register",
          "Hotel allotments that shrink when the cut-off passes",
          "Peak-season vehicle capacity, especially in May–October",
        ],
      },
      {
        heading: "How we work with operators",
        paragraphs: [
          "Send us your programme and group size. We reply with a plan, vehicle options and a fixed quote. New accounts prepay the first bookings; after that, payment terms are agreed at onboarding. Deposits for groups are typically 30% at contract.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you supply tour leaders or only vehicles?",
        a: "Vehicles and drivers are our core. We add licensed local guides and hosts through partners; tour leaders are usually the operator's own.",
      },
      {
        q: "Can you support multi-city programmes?",
        a: "Yes — Rome, Florence, Venice, Naples and the Amalfi Coast, Milan and the Lakes, with local partners in each area.",
      },
      {
        q: "How do you handle coach parking and access permits?",
        a: "We build them into the plan for each stop and confirm the current rules with the relevant local authorities.",
      },
    ],
    related: ["group-travel-italy", "group-transportation-italy", "for-travel-agencies", "rome-group-transportation"],
    cta: { label: "Request a group quote", service: "trade" },
    serviceType: "Ground handling for tour operators",
    areaServed: ["Italy"],
  }),

  page({
    slug: "for-event-agencies",
    kind: "industry",
    title: "Italy Event Logistics for Event & MICE Agencies",
    description:
      "Shuttle waves, hotel blocks, VIP transfers and on-site dispatch for event and MICE agencies in Italy. Vetted suppliers, itemised cost-plus pricing.",
    h1: "Italy Event Logistics for Event Agencies",
    nav: "Event agencies",
    lead:
      "A reliable second pair of hands in Italy: transport, hotel blocks, on-site dispatch and vetted local suppliers — priced transparently, so you can present a clear budget to your client.",
    tags: [],
    facts: [
      { label: "Italy in the meetings market", value: "Second in the world for international association meetings, with 635 in 2024 (ICCA)" },
      { label: "Demand", value: "Collective and MICE trips are growing about three times faster than routine business trips (Politecnico di Milano observatory)" },
      { label: "How we quote", value: "Itemised supplier costs plus a clear management fee" },
      { label: "Payment schedule", value: "Typically 30% at contract, 40% about 60 days before and 30% about 14 days before, mirrored to supplier terms" },
    ],
    included: [
      "Arrival, departure and shuttle-wave schedules",
      "VIP and speaker transfers with named drivers",
      "Hotel blocks with cut-off, attrition and rooming-list management",
      "Venue, catering and AV sourcing through vetted partners",
      "On-site coordinators and a dispatch desk",
    ],
    sections: [
      {
        heading: "What we take off your plate",
        bullets: [
          "Supplier sourcing, vetting and confirmations in Italy",
          "Vehicle schedules that adapt when sessions overrun",
          "Access permits, drop-off points and city fees",
          "Supplier payments and the reconciliation behind them",
        ],
      },
      {
        heading: "What we don't do",
        paragraphs: [
          "We are not a creative production agency. We do not design stages, content or décor; where you need it, we bring specialist partners or work alongside your own creative team.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you be white-label?",
        a: "Yes. Vouchers and communication can carry your branding, and our suppliers do not contact your client outside the agreed service.",
      },
      {
        q: "What is your typical response time to an RFP?",
        a: "Transfers within an hour on business days, groups within a day, and events within a few working days.",
      },
      {
        q: "Do you take supplier deposits from us?",
        a: "Deposit schedules mirror supplier terms. For large items we can have your client pay hotels and venues directly, with us invoicing our fee and logistics.",
      },
    ],
    related: ["conferences-mice-italy", "event-management-italy", "milan-mice-services", "rome-corporate-events"],
    cta: { label: "Send an RFP", service: "event" },
    serviceType: "Event logistics for agencies",
    areaServed: ["Italy"],
  }),

  page({
    slug: "for-corporate-travel-managers",
    kind: "industry",
    title: "Italy Ground Services for Corporate Travel Managers",
    description:
      "Executive transfers, delegations, roadshows and hotel blocks in Italy for corporate travel managers. Rate card, monthly consolidated e-invoice, 24/7 dispatch.",
    h1: "Italy Ground Services for Corporate Travel Managers",
    nav: "Corporate travel managers",
    lead:
      "Predictable transport and accommodation for visiting teams and delegations in Italy — a rate card, service targets and one consolidated monthly invoice.",
    tags: [],
    facts: [
      { label: "Focus", value: "Inbound corporate travel: delegations, roadshows, offsites and incentive groups visiting Italy" },
      { label: "Not a TMC", value: "We complement your travel management company on the ground; we do not replace booking tools or policy engines" },
      { label: "Invoicing", value: "One consolidated monthly e-invoice with booking-level detail and cost-centre codes" },
      { label: "Service targets", value: "Quote replies within an hour on business days; dispatch confirmation within about two hours; incident report within 24 hours" },
    ],
    included: [
      "Rate card by route, vehicle class and hour, valid for the year",
      "Airport meet-and-greet and executive chauffeur services",
      "Roadshow and multi-city vehicle coordination",
      "Group hotel blocks and corporate rates on request",
      "Monthly review of volume, on-time performance and issues",
    ],
    sections: [
      {
        heading: "Why corporates use a ground partner",
        paragraphs: [
          "Corporate travel programmes are often built around flights and hotels, while the ground layer in a destination is left to ad hoc bookings. A single accountable partner gives you consistent vehicles, a named dispatcher, invoices that match your cost centres and a record of every trip.",
        ],
      },
      {
        heading: "Commercial terms",
        bullets: [
          "Payment terms agreed at onboarding — new accounts prepay the first bookings",
          "Optional management fee for fully managed programmes",
          "Rate review each year, with fuel indexation where agreed",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you work with our TMC?",
        a: "Yes. We can receive bookings from your TMC or your travel desk and send confirmations in the format you need.",
      },
      {
        q: "Do you support duty-of-care needs?",
        a: "Every trip has a named dispatcher, driver details and a 24/7 contact, and incidents are logged and reported.",
      },
    ],
    related: ["corporate-travel-italy", "corporate-transportation-italy", "hotel-group-bookings-italy", "for-event-agencies"],
    cta: { label: "Request a corporate rate card", service: "trade" },
    serviceType: "Corporate ground services",
    areaServed: ["Italy"],
  }),
];
