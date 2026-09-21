import { page } from "../builders";
import type { ContentPage } from "../types";

/** Event planning guides on permits and budgets. General information only; rules vary by comune, venue and event format. */

const GUIDES = { slug: "guides", label: "Guides" };

export const planningGuides: ContentPage[] = [
  page({
    slug: "event-permits-and-licences-italy",
    kind: "guide",
    title: "Event Permits and Licences in Italy: What to Check",
    description:
      "What organisers should check before an event in Italy: who holds the permits, music licences, noise limits, public land, food safety and licensed security.",
    h1: "Event Permits and Licences in Italy: What to Check",
    nav: "Event permits and licences",
    lead:
      "Most events in private venues need few permits from you, but someone must hold each one. Here is what to ask, and who to ask.",
    parent: GUIDES,
    readingMinutes: 6,
    facts: [
      { label: "Rules are local", value: "Permits, noise limits and fees are set by the comune, so requirements differ from one town to the next" },
      { label: "Music", value: "Events with copyrighted music need a licence from SIAE, which the organiser normally arranges" },
      { label: "Security", value: "Guards, stewards and access-control staff are regulated roles and need authorisation" },
    ],
    sections: [
      {
        heading: "The main rule: ask who holds each permit",
        paragraphs: [
          "For an event at a hotel, a villa or a congress centre, the venue usually holds the licences for the building and its normal use. What varies is who is responsible for the rest: music, noise beyond the normal limits, catering, security, structures and any use of public land. Ask the venue and your suppliers to say in writing who holds each one. This guide is general information, not legal advice, and the comune and the venue confirm what applies to you.",
        ],
      },
      {
        heading: "Events in private venues",
        bullets: [
          "Music: check whether an SIAE licence is needed and who arranges it. The organiser normally does",
          "Noise: ask for the local curfew for outdoor music and any limit that applies to amplified sound",
          "Capacity and safety: confirm the venue's capacity limits and its own safety documentation",
          "Structures: tents, stages and lighting rigs may need checks, so ask the venue and the supplier",
        ],
      },
      {
        heading: "Events in public spaces",
        paragraphs: [
          "An event in a street, a square or a park needs authorisation from the comune that manages the space. Depending on the event, that can include permission to occupy public land, a public-performance authorisation, a safety plan and an exception to the local noise limits. Milan's own pages, for example, treat public-land occupation and noise exceptions as separate requests, and ask for the noise request at least 30 days before the start date. Other comuni set their own deadlines, so allow weeks, not days.",
        ],
      },
      {
        heading: "Food and drink",
        paragraphs: [
          "Caterers are food businesses under EU hygiene rules. Ask each one to confirm its registration and how it manages hygiene and allergens, and check that the kitchen arrangements at your venue meet those needs.",
        ],
      },
      {
        heading: "Security and stewards",
        paragraphs: [
          "Private security is regulated in Italy, including stewards and staff who control access at entertainment venues. Use licensed providers, and ask to see the licence. An event company that coordinates security should say clearly that a licensed provider delivers it.",
        ],
      },
      {
        heading: "Historic and protected sites",
        paragraphs: [
          "Historic buildings and public monuments can carry their own rules on access, fixings, photography and the use of open flames, and some sites need permission from their managing authority. Ask early, because approvals can take time.",
        ],
      },
      {
        heading: "A checklist to send your venue and suppliers",
        bullets: [
          "Who holds the music licence, and has it been requested?",
          "What is the outdoor music curfew, and is a sound limiter needed?",
          "Who holds the permits for structures, tents and lighting?",
          "Are the caterer and the security provider registered and licensed?",
          "Does the venue's insurance cover our event, and what does it exclude?",
          "Does any part of the event use public space, and who applies for it?",
        ],
      },
    ],
    faqs: [
      {
        q: "Do we need a permit for a wedding at a villa?",
        a: "The venue usually holds the permits for its own use. You still need to check the music licence, the noise limits and any tent or structure, and to confirm who holds what in writing.",
      },
      {
        q: "How long do permits take?",
        a: "It depends on the comune and the type of permit. Some deadlines are at least 30 days, as in Milan for noise exceptions, so ask early and allow weeks.",
      },
      {
        q: "Who is responsible if something is missing?",
        a: "Usually the organiser, unless a contract says otherwise. That is why the checklist above asks each party to state in writing what it holds.",
      },
    ],
    related: [
      "event-management-italy",
      "event-services-italy",
      "music-and-entertainment-for-events-in-italy",
      "event-staff-and-security-planning-italy",
      "how-to-choose-an-event-management-company-in-italy",
    ],
    cta: { label: "Request an event quote", service: "event" },
    sources: [
      { label: "Exceptions to noise limits for temporary activities (Comune di Milano)", url: "https://www.comune.milano.it/en/servizi/ambiente-e-animali/deroghe-ai-limiti-di-rumore-per-attivita-temporanee" },
      { label: "Request for occupation of public land (Comune di Milano)", url: "https://www2.comune.milano.it/en/-/commercio.-richiesta-di-occupazione-suolo-pubblico" },
      { label: "SIAE: licences for private parties", url: "https://www.siae.it/en/licenses/private-parties/" },
      { label: "Private security in Italy (Polizia di Stato)", url: "https://www.poliziadistato.it/articolo/sicurezza-privata" },
      { label: "Regulation (EC) No 852/2004 on the hygiene of foodstuffs (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2004/852/oj" },
    ],
  }),

  page({
    slug: "event-budget-guide-italy",
    kind: "guide",
    title: "How to Build an Event Budget for Italy",
    description:
      "How to build a realistic event budget for Italy: fixed and per-head costs, VAT, service charges, deposits, contingency and the extras that quotes leave out.",
    h1: "How to Build an Event Budget for Italy",
    nav: "Event budget guide",
    lead:
      "A budget is a list of decisions with numbers attached. Here is how to structure one, compare quotes fairly and avoid the costs that appear late.",
    parent: GUIDES,
    readingMinutes: 6,
    facts: [
      { label: "VAT", value: "Passenger transport within Italy and hotel accommodation are subject to 10% VAT; the standard rate is 22%. Ask which rate applies to each line" },
      { label: "Payment schedule", value: "Events are typically billed in stages, for example 30% at contract, 40% about 60 days before and 30% about 14 days before, mirrored to supplier terms" },
      { label: "Business events in Italy", value: "367,981 business events in 2024 (+8.2%)" },
    ],
    sections: [
      {
        heading: "Start with fixed and per-head costs",
        paragraphs: [
          "Split your budget into costs that do not change with the guest count, such as venue hire, AV and the planner's fee, and costs that scale with each guest, such as catering, rooms and transport. Changing the guest count then updates a clear part of the budget instead of all of it.",
        ],
      },
      {
        heading: "The main lines",
        bullets: [
          "Venue and rooms",
          "Catering and bar",
          "AV, lighting and production",
          "Décor, florals and styling",
          "Entertainment and music, including the licence",
          "Photography and video",
          "Hosts, registration and staff",
          "Security, where needed",
          "Hotels and transport",
          "Coordination or management fee",
          "Contingency",
        ],
      },
      {
        heading: "Compare quotes like for like",
        bullets: [
          "Ask every supplier for an itemised quote in the same structure",
          "Check whether VAT, service charge and overtime are included",
          "Compare what is included in each line: equipment, crew, setup, breakdown and travel",
          "Note deposit schedules and cancellation terms, not only the total",
        ],
      },
      {
        heading: "Costs that appear late",
        bullets: [
          "The SIAE music licence",
          "Overtime when the event runs past the agreed hour",
          "Cleaning, waste and power or a generator at outdoor venues",
          "Municipal fees, access fees and permits, including restricted-traffic zone charges",
          "Supplier travel and accommodation",
          "Weather plans, such as a tent or an indoor fallback",
          "Changes to the guest count after the deadline",
        ],
      },
      {
        heading: "Deposits and cash flow",
        paragraphs: [
          "Mirror the deposit schedule you agree with a client to the suppliers' terms, and never pay a supplier earlier than you are paid. Read hotel contracts for attrition and cancellation clauses before you sign, because they decide how much you owe if numbers fall.",
        ],
      },
      {
        heading: "Contingency",
        paragraphs: [
          "Keep a contingency line for changes. It is not a spare fund to spend on upgrades, but the cushion that absorbs a change of guest count, a price increase or a weather plan.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should quotes include VAT?",
        a: "Ask each supplier to state it clearly. Rates differ by service, so a total price is only comparable if every quote treats VAT the same way.",
      },
      {
        q: "How do we compare a management fee with a markup?",
        a: "Compare total prices for the same scope. A clear fee on itemised supplier prices is easier to check than a markup hidden in a package price.",
      },
      {
        q: "When should we pay deposits?",
        a: "As the contracts say, and in a schedule that mirrors your own income. Ask suppliers to show their payment and cancellation terms before you sign.",
      },
    ],
    related: [
      "event-management-italy",
      "how-to-plan-a-corporate-event-in-italy",
      "destination-wedding-budget-italy",
      "how-to-choose-an-event-management-company-in-italy",
      "event-permits-and-licences-italy",
    ],
    cta: { label: "Request an event quote", service: "event" },
    sources: [
      { label: "Italy VAT rates (Stripe)", url: "https://stripe.com/resources/more/italy-vat-rate" },
      { label: "Osservatorio Italiano dei Congressi e degli Eventi 2024 (Federcongressi&eventi)", url: "https://www.federcongressi.it/it/press/cresceilturismocongressualeoice2024/" },
      { label: "SIAE: licences for private parties", url: "https://www.siae.it/en/licenses/private-parties/" },
    ],
  }),
];
