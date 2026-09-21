import type { ContentPage } from "../types";

/**
 * PUBLISHED PAGES
 * ----------------
 * Rules:
 *  - A page is only published if it carries real, unique data. No name-swap templates.
 *  - Facts tagged [V] come from the cited research; anything marked "typically"/"about"
 *    is an operational estimate you must confirm with your suppliers before launch.
 *  - Set `updated` every time a human re-checks the facts.
 *  - Prices are intentionally NOT published until you have signed supplier rate cards.
 */

const UPDATED = "2026-09-19";

export const publishedPages: ContentPage[] = [
  // ───────────────────────── SERVICES ─────────────────────────
  {
    slug: "group-transportation-italy",
    kind: "service",
    status: "published",
    nav: "Group transportation",
    tags: [],
    title: "Group Transportation in Italy | Minibus & Coach Hire",
    description:
      "Minivan, minibus and coach transport for groups in Italy — weddings, corporate events, tours. Fixed prices, access-rule planning, backup vehicles.",
    h1: "Group Transportation in Italy",
    lead:
      "Minivans, minibuses and coaches for wedding guests, corporate teams and tour groups — planned around Italian access rules and run by a dispatch team you can reach 24/7.",
    parent: { slug: "transportation", label: "Transportation" },
    facts: [
      { label: "Vehicle classes", value: "Minivan (up to 7 passengers), minibus (16–35 seats), coach (50+ seats)" },
      { label: "Typical uses", value: "Airport arrival waves, hotel–venue shuttles, day tours, multi-day group logistics" },
      {
        label: "How market quotes are usually built",
        value: "Per vehicle and trip, or per day; driver, fuel, tolls, insurance and VAT are normally included. We itemise parking, waiting time and night supplements up front.",
      },
      {
        label: "Access rules we plan around",
        value: "Rome Centro Storico ZTL, Milan Area C (charged by vehicle length for NCC vehicles over 9 seats), Amalfi Coast ZTLs and alternate-plate rules",
      },
    ],
    included: [
      "Licensed, insured operator for every vehicle",
      "Named dispatcher and 24/7 contact number on your voucher",
      "Route, timing and access-permit planning",
      "Backup-vehicle process if a vehicle fails",
      "One quote, one contract, one invoice",
    ],
    sections: [
      {
        heading: "How we plan group transport",
        bullets: [
          "Arrival waves: we split guests by flight and size vehicles to real luggage, not just seat counts.",
          "Right-sizing: a 50-seat coach is often the wrong answer in a historic centre — two minibuses can be faster and cheaper to run.",
          "Access: we check ZTL, coach-parking and municipal fees for every stop before we quote.",
          "Buffers: we build in loading time and contingency, especially for evening returns and cruise or train connections.",
          "Contingency: tiered backup suppliers are on call for the day.",
        ],
      },
      {
        heading: "Minivan, minibus or coach?",
        paragraphs: [
          "Minivans suit up to 7 guests and tight streets. Minibuses (16–35 seats) are the workhorse for weddings and small corporate groups. Coaches (50+ seats) make sense for large single-route movements — airport to hotel, or a tour with few stops — where parking and access are simple.",
        ],
      },
      {
        heading: "What changes the price",
        bullets: [
          "Vehicle size and date (peak season and fair weeks are more expensive)",
          "Hours and distance, including waiting time",
          "City access fees and parking",
          "Night or early-morning supplements",
          "Extras: greeter/host, luggage vehicle, guide",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you own the vehicles?",
        a: "No. We book licensed local operators and audit them before they receive work. You get one contract and one invoice from us.",
      },
      {
        q: "How far ahead should we book?",
        a: "As early as you know your dates — especially for May–October weddings and fair weeks in Milan, Verona and Bologna. We can often help at short notice, but choice narrows.",
      },
      {
        q: "Can you handle several vehicles arriving on different flights?",
        a: "Yes. We build a vehicle-wave schedule around flight times and brief every driver on the plan.",
      },
      {
        q: "What if a vehicle breaks down?",
        a: "Our dispatch team redirects a backup vehicle from a pre-approved supplier. Every voucher carries the dispatch number.",
      },
      {
        q: "Do you offer coaches with guides?",
        a: "We can add licensed guides — Italy requires guides to be nationally qualified — as a separate line item.",
      },
    ],
    related: ["lake-como-wedding-transport", "rome-corporate-events", "rome-airport-transfer", "for-wedding-planners"],
    cta: { label: "Get a group transport quote", service: "group" },
    serviceType: "Group ground transportation",
    areaServed: ["Italy"],
    updated: UPDATED,
  },

  // ───────────────────────── AIRPORT ─────────────────────────
  {
    slug: "rome-airport-transfer",
    kind: "airport",
    status: "published",
    nav: "Rome airport (FCO)",
    tags: ["rome"],
    title: "Rome Airport Transfer: Fiumicino & Ciampino Private Driver",
    description:
      "Private transfers from Rome Fiumicino and Ciampino airports to your hotel. Fixed price agreed in advance, meet-and-greet, flight tracking. Request a quote.",
    h1: "Rome Airport Transfers",
    lead:
      "A licensed private driver waiting at arrivals — price agreed in advance, flight monitored, vehicle sized to your group and luggage.",
    parent: { slug: "rome", label: "Rome" },
    facts: [
      { label: "Airports served", value: "Rome Fiumicino (FCO) and Rome Ciampino (CIA)" },
      { label: "Fiumicino traffic", value: "50.9 million passengers in 2025 — Italy's busiest airport, and the first to pass 50 million" },
      { label: "Typical drive to the centre", value: "About 45–60 minutes from Fiumicino, depending on traffic" },
      { label: "For comparison: official taxi flat fare", value: "€55 from Fiumicino to anywhere inside the Aurelian Walls" },
      {
        label: "Historic-centre access",
        value: "Licensed NCC vehicles are among the categories authorised in Rome's Centro Storico ZTL; final drop-off depends on street access at your hotel.",
      },
    ],
    included: [
      "Meet-and-greet at arrivals with your name sign",
      "Flight tracking — we adjust for delays",
      "60 minutes of free waiting after landing",
      "Fixed price agreed in advance (tolls and parking included)",
      "Child seats and extra luggage space on request",
    ],
    sections: [
      {
        heading: "Private transfer or taxi?",
        paragraphs: [
          "A taxi is a good option for one or two travellers with light luggage. A private transfer makes sense when you are a group, arrive late, have plenty of luggage, need child seats, or simply want the price and the pick-up point settled before you fly.",
        ],
      },
      {
        heading: "How it works",
        bullets: [
          "Send your flight number and hotel address — we reply with a fixed price.",
          "Confirm online and pay; you receive a voucher with your driver's details 24 hours before pick-up.",
          "Your driver meets you at arrivals; we track the flight and stay reachable on WhatsApp throughout.",
        ],
      },
    ],
    faqs: [
      {
        q: "Where will my driver meet me?",
        a: "Inside the arrivals hall with a sign showing your name. Exact instructions are on your voucher.",
      },
      {
        q: "What happens if my flight is delayed?",
        a: "We monitor your flight and adjust the pick-up time at no extra charge; the driver will be there when you land.",
      },
      {
        q: "Do you also serve Ciampino?",
        a: "Yes — Fiumicino and Ciampino, both directions, plus Rome train stations and the Civitavecchia cruise port.",
      },
      {
        q: "Can the driver take us directly to our hotel in the historic centre?",
        a: "Licensed NCC vehicles can enter the Centro Storico ZTL, but some streets are pedestrian-only. Your driver will drop you at the closest permitted point and we tell you exactly where beforehand.",
      },
      {
        q: "How do I pay?",
        a: "By card through a secure link, or by bank transfer for business accounts. You pay after we confirm availability and price.",
      },
    ],
    related: ["rome-to-florence-transfer", "rome-to-amalfi-coast-transfer", "group-transportation-italy"],
    cta: { label: "Get a fixed price", service: "transfer" },
    serviceType: "Airport transfer",
    areaServed: ["Rome", "Lazio"],
    updated: UPDATED,
  },

  // ───────────────────────── ROUTES ─────────────────────────
  {
    slug: "rome-to-florence-transfer",
    kind: "route",
    status: "published",
    nav: "Rome to Florence",
    tags: ["rome", "florence", "tuscany"],
    title: "Rome to Florence Private Transfer — Door-to-Door Driver",
    description:
      "Private door-to-door transfer from Rome to Florence with a licensed driver. Fixed all-inclusive price, optional stops in Orvieto or Siena. Request a quote.",
    h1: "Rome to Florence Private Transfer",
    lead:
      "Door to door between Rome and Florence — with your luggage, your group and, if you like, a stop in Orvieto or Siena on the way.",
    parent: { slug: "rome", label: "Rome" },
    facts: [
      { label: "Distance", value: "About 275–285 km via the A1 motorway" },
      { label: "Drive time", value: "About 3 hours without stops (traffic-dependent)" },
      { label: "Alternative", value: "High-speed train between the city-centre stations takes roughly 1.5 hours" },
      { label: "Tolls", value: "A1 motorway tolls apply and are included in our fixed price" },
      { label: "Common pick-ups", value: "Fiumicino and Ciampino airports, Rome Termini station, Rome hotels" },
      { label: "Common drop-offs", value: "Florence hotels and villas, Santa Maria Novella station, Tuscany countryside" },
      { label: "City access", value: "Florence's historic centre is a restricted-traffic zone; your driver drops at the closest permitted point." },
    ],
    included: [
      "Licensed operator and insured vehicle",
      "Fixed all-inclusive price: tolls, parking, waiting",
      "Vehicle to fit your group and luggage: sedan, van or minibus",
      "Optional sightseeing stops with a set time budget",
      "Driver details 24 hours before pick-up; dispatch contact throughout",
    ],
    sections: [
      {
        heading: "When a private transfer beats the train",
        bullets: [
          "Groups of 3+ or lots of luggage",
          "Hotel or villa outside central Florence (Chianti, Val d'Orcia, hill-town weddings)",
          "You want to stop on the way — Orvieto, Siena or a winery",
          "Early or late timings the train doesn't serve",
          "You need child seats or a wheelchair-accessible vehicle",
        ],
      },
      {
        heading: "Adding a stop",
        paragraphs: [
          "A stop in Orvieto or Siena typically adds one to two hours depending on how long you stay. Tell us your arrival time and we will suggest a plan and price it separately from the direct transfer.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does the transfer take?",
        a: "Around three hours without stops. Traffic on the A1 near Rome and Florence can add time, particularly on Friday and Sunday afternoons.",
      },
      {
        q: "Is the price per person?",
        a: "No — per vehicle. You choose a sedan, van or minibus depending on group size and luggage.",
      },
      {
        q: "Can we go to a hotel outside Florence?",
        a: "Yes. Send us the address and we will price the exact route.",
      },
      {
        q: "Can we make a stop on the way?",
        a: "Yes — Orvieto and Siena are popular. We agree the stop time in advance so the schedule stays predictable.",
      },
    ],
    related: ["rome-airport-transfer", "rome-to-amalfi-coast-transfer", "group-transportation-italy"],
    cta: { label: "Get a fixed price for this route", service: "transfer" },
    serviceType: "City-to-city private transfer",
    areaServed: ["Rome", "Florence", "Tuscany"],
    updated: UPDATED,
  },
  {
    slug: "rome-to-amalfi-coast-transfer",
    kind: "route",
    status: "published",
    nav: "Rome to Amalfi Coast",
    tags: ["rome", "amalfi-coast", "naples"],
    title: "Rome to Amalfi Coast Private Transfer | Positano & Sorrento",
    description:
      "Private transfer from Rome to Amalfi, Positano, Ravello or Sorrento with a licensed driver who knows Amalfi Coast access rules. Fixed price.",
    h1: "Rome to Amalfi Coast Private Transfer",
    lead:
      "A single, comfortable drive from Rome to Positano, Amalfi, Ravello or Sorrento — planned around the Coast's narrow roads, access rules and municipal fees.",
    parent: { slug: "rome", label: "Rome" },
    facts: [
      { label: "Distance", value: "About 265–275 km, depending on the destination town" },
      { label: "Drive time", value: "About 3.5–4.5 hours (traffic- and destination-dependent)" },
      {
        label: "Access rules",
        value: "Traffic restrictions and an alternate-licence-plate scheme apply across eleven Amalfi Coast municipalities from Vietri sul Mare to Positano",
      },
      {
        label: "Municipal fees",
        value: "Some towns charge entry, parking or loading fees (for example Positano and Ravello). They vary by season — we itemise them in your quote.",
      },
      { label: "Vehicle types", value: "Sedans, vans and small minibuses — large coaches are impractical on the Coast road" },
      { label: "Common stops", value: "Naples, Pompeii, Herculaneum, Caserta" },
    ],
    included: [
      "Licensed operator with the right access for the Coast",
      "Fixed price with tolls; municipal fees itemised",
      "Vehicle size matched to luggage — hotels on the Coast often have steps and narrow lanes",
      "Optional stop at Pompeii or Naples",
      "Driver details 24 hours before pick-up and dispatch contact throughout",
    ],
    sections: [
      {
        heading: "Why access rules matter on the Amalfi Coast",
        paragraphs: [
          "Roads along the Coast are narrow and heavily restricted in summer. Some municipalities use alternate-plate rules and permits; drivers based outside the area may not be able to reach your hotel. We plan the last kilometres with local operators so you are not left on a roadside with your luggage.",
        ],
      },
      {
        heading: "Direct drive or with a stop?",
        bullets: [
          "Direct: fastest, ideal after a flight.",
          "Pompeii stop: adds roughly two to three hours including entry — book tickets in advance.",
          "Naples arrival: if you arrive by train or plane in Naples, ask for the shorter Naples–Coast transfer instead.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which vehicle do you recommend?",
        a: "For up to 3 passengers with luggage, a sedan. For 4–7 passengers, a van. We rarely recommend minibuses on the Coast unless your hotel is easily accessible.",
      },
      {
        q: "Are municipal fees included in the price?",
        a: "We show them as separate lines so you see exactly what is charged and why.",
      },
      {
        q: "Can we be dropped exactly at the hotel door?",
        a: "Often yes, but some hotels sit on pedestrian-only paths. We confirm the last-mile plan with the hotel before your trip.",
      },
      {
        q: "Is the drive suitable for people who get carsick?",
        a: "The final stretch of the Coast road is winding. Tell us and we will plan breaks and suggest an experienced driver.",
      },
    ],
    related: ["rome-airport-transfer", "rome-to-florence-transfer", "group-transportation-italy"],
    cta: { label: "Get a fixed price for this route", service: "transfer" },
    serviceType: "City-to-city private transfer",
    areaServed: ["Rome", "Naples", "Amalfi Coast"],
    updated: UPDATED,
  },

  // ───────────────────────── VERTICALS ─────────────────────────
  {
    slug: "lake-como-wedding-transport",
    kind: "vertical",
    status: "published",
    nav: "Lake Como weddings",
    tags: ["lake-como", "milan"],
    title: "Lake Como Wedding Transport: Guest Shuttles & Couple Car",
    description:
      "Guest shuttles, couple car and airport arrival waves for Lake Como weddings. Fixed prices, backup vehicle on standby, one coordinator on the day.",
    h1: "Lake Como Wedding Transportation",
    lead:
      "Guest shuttles, the couple's car and airport arrival waves — planned for the lake's narrow roads and delivered by one coordinator on the day, with a backup vehicle on standby.",
    parent: { slug: "lake-como", label: "Lake Como" },
    facts: [
      {
        label: "Main gateway",
        value: "Milan Malpensa: 31.2 million passengers in 2025 (+8.6%); Linate and Bergamo are alternatives",
      },
      { label: "Destination weddings in Italy", value: "15,100+ weddings of foreign couples in 2024, with about 960,000 guests" },
      { label: "Average guests per wedding", value: "About 64 (960,000 guests ÷ 15,100 weddings)" },
      { label: "Planner involvement", value: "Professional planners were used in 46.3% of foreign weddings" },
      { label: "Typical fleet for a 50-guest evening return", value: "Two 19-seat minibuses plus a sedan for the couple (as a rough guide — we size from your guest list)" },
    ],
    included: [
      "Airport arrival waves from Malpensa, Linate or Bergamo",
      "Hotel-to-venue shuttle loops and late-night returns",
      "Couple car (sedan or luxury vehicle) with decoration on request",
      "Backup vehicle on standby during the event",
      "One coordinator and one dispatch number for the planner",
      "Fixed price, deposit and balance schedule agreed in advance",
    ],
    sections: [
      {
        heading: "What we plan for",
        bullets: [
          "Arrival day: guests on many flights — we group them into waves and match vehicle sizes.",
          "Lakeside roads: narrow lanes, restricted zones and limited parking in many villages.",
          "Ceremony timing: shuttle loops sized so guests are never late — or stranded late at night.",
          "Boats: where the plan needs a boat leg, we coordinate with licensed boat operators.",
          "The return: late-night departures, weather changes and delays are built into the plan.",
        ],
      },
      {
        heading: "How we work with planners",
        paragraphs: [
          "Send your guest list, venues and timeline. Within 24 hours you receive a logistics plan with vehicles, timings and a fixed price. We take care of supplier confirmations, briefings and on-the-day coordination, so you can focus on the couple.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many vehicles do we need?",
        a: "It depends on guest numbers, distance between venues and how tightly the schedule runs. Send us the guest list and timeline and we will propose a fleet plan.",
      },
      {
        q: "Can you handle guests coming from different hotels?",
        a: "Yes. We build a loop schedule and share it with the planner and drivers.",
      },
      {
        q: "Do you also arrange hotel room blocks?",
        a: "Yes, for wedding parties we source and negotiate group accommodation with hotels and villas, quoted separately.",
      },
      {
        q: "What if a vehicle fails on the day?",
        a: "A backup vehicle from a pre-approved operator is on standby and our dispatch team is reachable throughout.",
      },
      {
        q: "How do deposits work?",
        a: "Typically a deposit at booking and the balance about 14 days before the wedding. The schedule is shown in your quote.",
      },
    ],
    related: ["group-transportation-italy", "lake-como-wedding-planning", "for-wedding-planners", "rome-to-florence-transfer"],
    cta: { label: "Request a wedding logistics plan", service: "wedding" },
    serviceType: "Wedding guest transportation",
    areaServed: ["Lake Como", "Lombardy"],
    updated: UPDATED,
  },
  {
    slug: "rome-corporate-events",
    kind: "vertical",
    status: "published",
    nav: "Rome corporate events",
    tags: ["rome"],
    title: "Rome Corporate Events | Venues, Catering & Hotel Blocks",
    description:
      "Corporate event management in Rome: venue and catering sourcing, AV, hotel room blocks, guest transport and on-site coordination through vetted partners.",
    h1: "Corporate Events in Rome",
    lead:
      "Venue, catering, hotel blocks, guest transport and on-site coordination for meetings, offsites and conferences in Rome — built from vetted local partners, priced transparently, coordinated by one team.",
    parent: { slug: "rome", label: "Rome" },
    facts: [
      {
        label: "Rome as a meetings destination",
        value: "Ninth in the world for international association meetings — 114 in 2024 (ICCA)",
      },
      { label: "Well-known venues", value: "Including the La Nuvola convention centre; we also source hotel meeting rooms and historic venues" },
      { label: "How we quote", value: "Itemised supplier costs plus a clear management fee — you see every line" },
      { label: "Typical scope", value: "Group airport transfers, hotel room blocks, meeting rooms, dinners, guided activities, on-site staff" },
    ],
    included: [
      "Venue, catering and AV sourcing through vetted partners",
      "Hotel room blocks with negotiated terms",
      "Transfers and shuttle waves for every guest arrival",
      "On-site coordinator and dispatch desk",
      "One budget sheet and one invoice",
    ],
    sections: [
      {
        heading: "What we handle — and what we don't",
        paragraphs: [
          "We coordinate the whole event: venue, catering, AV, accommodation, transport and on-site management, each delivered by a specialist we source and manage. Creative production — staging design, content and creative direction — stays with specialist suppliers or your own agency, and we work alongside them.",
        ],
      },
      {
        heading: "A typical small offsite",
        bullets: [
          "Hotel block for 10–15 rooms over two nights",
          "Meeting room with AV and coffee breaks",
          "Group dinner in a local restaurant or private venue",
          "Airport transfers and an activity with a licensed guide",
          "Quoted within a few working days once we have dates, guest numbers and budget range",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you work with event agencies?",
        a: "Yes. Many clients are agencies who need a reliable operating partner or a second pair of hands in Rome.",
      },
      {
        q: "How do payments and cancellations work?",
        a: "Events are billed in stages — typically 30% at contract, 40% about 60 days before and 30% about 14 days before — mirrored to supplier terms. Details are in each quote.",
      },
      {
        q: "Can you find the venue for us?",
        a: "Yes, through vetted partners. We ask for capacity and safety documentation before recommending any venue.",
      },
      {
        q: "What group sizes do you handle?",
        a: "From 10–20 guests up to several hundred. Larger events are staged with supplier deposits paid directly where possible.",
      },
    ],
    related: ["corporate-events-italy", "event-services-italy", "rome-hotel-booking", "rome-mice-services", "group-transportation-italy"],
    cta: { label: "Request an event quote", service: "event" },
    serviceType: "Corporate event management",
    areaServed: ["Rome", "Lazio"],
    updated: UPDATED,
  },

  // ───────────────────────── INDUSTRY (B2B) ─────────────────────────
  {
    slug: "for-wedding-planners",
    kind: "industry",
    status: "published",
    nav: "Wedding planners",
    tags: [],
    title: "Guest Logistics for Destination Wedding Planners in Italy",
    description:
      "Ground partner for Italian destination weddings: guest shuttles, couple car, hotel blocks, a backup vehicle on standby and one coordinator on the day.",
    h1: "Guest Logistics for Wedding Planners",
    lead:
      "Shuttles, couple car and hotel blocks for your Italian weddings — with a backup vehicle on standby and one coordinator who knows your timeline.",
    parent: { slug: "services", label: "Services" },
    facts: [
      { label: "Market context", value: "15,100+ foreign weddings in Italy in 2024; planners were involved in 46.3% of them" },
      { label: "Response time", value: "Sample logistics plan within 24 hours of receiving guest list and timeline" },
      { label: "Coverage", value: "Rome hub with Tuscany and Amalfi Coast routes; Milan and Lake Como being added" },
    ],
    included: [
      "Guest shuttle and arrival-wave planning",
      "Couple car and VIP transfers",
      "Hotel room blocks with clear cut-off and attrition terms",
      "Backup vehicle on standby during the event",
      "One dispatch number for you, the venue and the drivers",
      "Planner rates on request",
    ],
    sections: [
      {
        heading: "How we work with you",
        bullets: [
          "Send guest numbers, venues and timeline",
          "Receive a logistics plan and fixed quote within 24 hours",
          "Confirm; we brief suppliers and produce vouchers and a run-of-show",
          "On the day, one coordinator and one dispatch line",
          "After the event, a short report and one consolidated invoice",
        ],
      },
      {
        heading: "Commercial terms",
        paragraphs: [
          "Planner rates are available on request. If you resell to couples, we can agree a referral or net-rate structure. Deposit and balance schedules are set per wedding and mirrored to supplier terms.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will the couple ever see our pricing?",
        a: "Only if you want them to. We can work fully white-label with your branding on vouchers and communication.",
      },
      {
        q: "What happens if a driver doesn't show up?",
        a: "We redirect a backup vehicle from a pre-approved supplier, and dispatch stays in touch with you until it's resolved.",
      },
      {
        q: "Can you handle weddings outside Rome?",
        a: "Yes — we start with the Rome hub and corridors to Tuscany and the Amalfi Coast, and are adding Milan and Lake Como. Ask us about other regions.",
      },
    ],
    related: ["lake-como-wedding-transport", "group-transportation-italy", "for-travel-agencies"],
    cta: { label: "Send a wedding for a logistics plan", service: "wedding" },
    serviceType: "Wedding logistics for planners",
    areaServed: ["Italy"],
    updated: UPDATED,
  },
  {
    slug: "for-travel-agencies",
    kind: "industry",
    status: "published",
    nav: "Travel agencies",
    tags: [],
    title: "Italy Ground Handling for Travel Agencies | Net Rates",
    description:
      "Private transfers, chauffeur days and group transport across Italy at net rates — 24/7 contact, one consolidated invoice. For agencies and advisors.",
    h1: "Italy Ground Handling for Travel Agencies",
    lead:
      "Private transfers, chauffeur days and group transport across Italy at net rates — with a 24/7 contact and one consolidated invoice.",
    parent: { slug: "services", label: "Services" },
    facts: [
      { label: "Coverage", value: "Rome hub with Florence/Tuscany and Naples/Amalfi Coast routes; Milan and Lake Como being added" },
      { label: "Rates", value: "Net rates by route and vehicle class — you set your own markup" },
      { label: "Quotes", value: "Replies within 1 hour on business days" },
      { label: "Invoicing", value: "One consolidated e-invoice per month" },
    ],
    included: [
      "Net-rate sheet for your most common routes",
      "24/7 dispatch contact on every voucher",
      "Backup-vehicle process",
      "White-label vouchers on request",
      "Consolidated monthly invoice",
    ],
    sections: [
      {
        heading: "How trade accounts work",
        bullets: [
          "Ask for the rate sheet and we set up your account",
          "Send any Italy transfer or day-hire request and receive a fixed quote",
          "We take care of supplier confirmation, vouchers and dispatch",
          "New accounts prepay their first bookings; payment terms are agreed at onboarding",
        ],
      },
      {
        heading: "Why agencies use a local ground partner",
        paragraphs: [
          "Local suppliers, access rules (ZTL, permits), coach parking and nationally licensed guides are hard to manage remotely. We give you one accountable contact for the whole ground leg.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you handle hotels and tours?",
        a: "We source group accommodation and, through licensed partners, private day trips. Individual hotel bookings are quoted on request.",
      },
      {
        q: "Can you invoice in USD or GBP?",
        a: "We can discuss it at onboarding. Our default is EUR.",
      },
      {
        q: "How do you protect my client relationship?",
        a: "Vouchers and communication can be fully white-label, and our suppliers do not contact your clients outside the agreed service.",
      },
    ],
    related: ["for-wedding-planners", "group-transportation-italy", "rome-to-amalfi-coast-transfer"],
    cta: { label: "Request the trade rate sheet", service: "trade" },
    serviceType: "Ground handling for travel agencies",
    areaServed: ["Italy"],
    updated: UPDATED,
  },

  // ───────────────────────── CITY ─────────────────────────
  {
    slug: "rome",
    kind: "city",
    status: "published",
    nav: "Rome",
    tags: ["rome"],
    title: "Rome — Transfers, Chauffeurs, Group Transport & Events",
    description:
      "Ground services in Rome: airport transfers, private drivers, city-to-city routes, group transport and corporate events, run by a local dispatch team.",
    h1: "Ground Services in Rome",
    lead:
      "Airport transfers, private drivers, routes to Tuscany and the Amalfi Coast, group transport and corporate events — coordinated from Rome.",
    parent: { slug: "destinations", label: "Destinations" },
    facts: [
      { label: "Main airports", value: "Fiumicino (50.9 million passengers in 2025) and Ciampino" },
      { label: "Tourism spend", value: "Lazio received €10.2 billion in foreign visitor spending — about 18% of Italy's total" },
      { label: "Meetings", value: "Ninth in the world for international association meetings (114 in 2024)" },
      { label: "Access", value: "Rome's Centro Storico is a restricted-traffic zone; licensed NCC vehicles are among the authorised categories" },
    ],
    sections: [
      {
        heading: "What we do in Rome",
        bullets: [
          "Airport and station transfers, meet-and-greet",
          "Private drivers by the hour or day, including day trips",
          "Routes from Rome to Florence, Tuscany, Naples and the Amalfi Coast",
          "Group transport: minivans, minibuses and coaches",
          "Corporate events and MICE: transport waves, hotel blocks, venue sourcing",
          "Italy DMC-layer services for foreign agencies and event teams based in Rome",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you have a physical office in Rome?",
        a: "Our dispatch team works from Rome and is reachable 24/7 through the number on your voucher.",
      },
      {
        q: "Can you help with a cruise arrival at Civitavecchia?",
        a: "Yes — Civitavecchia transfers are a core service. Send us the ship, arrival time and party size.",
      },
    ],
    related: [
      "rome-airport-transfer",
      "rome-to-florence-transfer",
      "rome-hotel-booking",
      "rome-corporate-events",
      "rome-mice-services",
      "rome-chauffeur-service",
      "rome-group-transportation",
      "ciampino-airport-transfer",
      "rome-to-amalfi-coast-transfer",
      "rome-to-naples-transfer",
    ],
    cta: { label: "Request a quote for Rome", service: "other" },
    serviceType: "Ground transportation and events",
    areaServed: ["Rome", "Lazio"],
    updated: UPDATED,
  },
];
