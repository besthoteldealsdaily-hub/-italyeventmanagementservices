import { page } from "../builders";
import type { ContentPage } from "../types";

/** Hotel, event, corporate, wedding, tour and group service pages. */

export const eventServicePages: ContentPage[] = [
  page({
    slug: "hotel-group-bookings-italy",
    kind: "service",
    title: "Group Hotel Bookings in Italy | Room Blocks & Group Rates",
    description:
      "Group hotel accommodation in Italy: negotiated room blocks and rates for weddings, corporate teams and tour groups, with clear cut-off and attrition terms.",
    h1: "Group Hotel Bookings in Italy",
    nav: "Group hotel bookings",
    lead:
      "Room blocks and group rates negotiated with hotels and villas for 10 to several hundred rooms — with clear terms, one rooming list and one contact.",
    parent: { slug: "hotels", label: "Hotels" },
    tags: [],
    facts: [
      { label: "How it works", value: "Request-based: we source proposals from hotels that fit your dates and budget; there is no public rate search" },
      { label: "Typical group", value: "10+ rooms for weddings, corporate teams, incentive trips and tour groups" },
      { label: "Key terms", value: "Cut-off date (when unbooked rooms are released), attrition (how far the block may shrink) and cancellation schedule" },
      { label: "Seasonality", value: "Summer is the peak: roughly 46% of overnight stays fall in July–September, so blocks for that period need early requests" },
    ],
    included: [
      "Proposals from suitable hotels and villas",
      "Negotiated group rates and clear written terms",
      "Rooming-list and change management",
      "Coordination with transport and events",
      "One contract path and one invoice",
    ],
    sections: [
      {
        heading: "How a room block works",
        bullets: [
          "You send dates, room count, room types and budget range",
          "We request proposals and compare rates, terms and locations",
          "You choose; the hotel holds the block until the cut-off date",
          "Guests book into the block, or you send a rooming list",
          "Unbooked rooms are released at cut-off, within the attrition allowance",
        ],
      },
      {
        heading: "What to watch for in a group contract",
        paragraphs: [
          "The rate is only part of the deal. Read the attrition clause, the cancellation schedule and the payment schedule; a low rate with a strict attrition clause can cost more than a slightly higher rate with flexibility. Tourist tax is charged separately by the hotel; we show it as its own line.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many rooms count as a group?",
        a: "Usually ten or more. Smaller requests are quoted as individual bookings on request.",
      },
      {
        q: "Do you show hotel prices online?",
        a: "No. Group rates depend on dates, size and terms, so we quote each request.",
      },
      {
        q: "Can you add transport and events?",
        a: "Yes. Accommodation, transfers and event logistics can be managed together, with separate lines and one invoice.",
      },
    ],
    related: [
      "wedding-accommodation-italy",
      "corporate-hotel-booking-italy",
      "tour-group-hotel-booking-italy",
      "event-management-italy",
      "for-corporate-travel-managers",
      "italy-hotel-group-booking-guide",
    ],
    cta: { label: "Request group accommodation", service: "hotel-block" },
    serviceType: "Group hotel accommodation",
    areaServed: ["Italy"],
  }),

  page({
    slug: "wedding-accommodation-italy",
    kind: "service",
    title: "Wedding Accommodation in Italy | Guest Room Blocks",
    description:
      "Room blocks and villa stays for wedding guests in Italy: Lake Como, Tuscany, the Amalfi Coast and more. Negotiated rates, cut-off dates, rooming lists.",
    h1: "Wedding Accommodation in Italy",
    nav: "Wedding accommodation",
    lead:
      "Guest rooms and villa stays for your wedding party — negotiated with hotels and villas, with clear cut-off dates and rooming lists.",
    parent: { slug: "hotels", label: "Hotels" },
    tags: [],
    facts: [
      { label: "Average wedding", value: "About 64 guests, many travelling from abroad and needing rooms for several nights" },
      { label: "Where", value: "Lake Como, Tuscany, the Amalfi Coast, Rome, Umbria and Puglia" },
      { label: "Typical approach", value: "A block at one or two hotels near the venue, with guests booking individually within a cut-off window" },
      { label: "Peak season", value: "May to October; popular weekends book out many months ahead" },
    ],
    included: [
      "Hotel and villa proposals near your venue",
      "Negotiated block rates and clear terms",
      "Guest booking link or rooming list",
      "Cut-off reminders and change management",
      "Coordination with guest transport",
    ],
    sections: [
      {
        heading: "Blocks that suit real weddings",
        paragraphs: [
          "Guests arrive and leave on different days and want different budgets. We propose a spread — a main hotel, a budget option and, for the couple's family, a villa or premium hotel — and coordinate the shuttles between them so nobody depends on a taxi at midnight.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can guests book themselves?",
        a: "Yes, through a booking link or by quoting the block reference, within the cut-off date.",
      },
      {
        q: "What happens to unbooked rooms?",
        a: "They are released at cut-off, subject to the attrition allowance in the contract.",
      },
    ],
    related: ["destination-weddings-italy", "wedding-transportation-italy", "hotel-group-bookings-italy", "for-wedding-planners"],
    cta: { label: "Request wedding accommodation", service: "hotel-block" },
    serviceType: "Wedding accommodation",
    areaServed: ["Italy"],
  }),

  page({
    slug: "event-management-italy",
    kind: "service",
    title: "Event Management in Italy | Logistics-Led Events",
    description:
      "Event management in Italy with logistics at the core: transport, hotel blocks, venue and catering sourcing and on-site coordination through vetted partners.",
    h1: "Event Management in Italy",
    nav: "Event management",
    lead:
      "We run the logistics spine of your event — transport, accommodation and coordination — and bring in vetted partners for venues, catering and production.",
    parent: { slug: "services", label: "Services" },
    tags: [],
    facts: [
      { label: "Market", value: "Italy hosted 367,981 business events in 2024 (+8.2%) with 29.3 million participants, worth about €11.7 billion in direct contribution" },
      { label: "Our role", value: "Logistics-led: transport, hotel blocks, venue and supplier sourcing, on-site coordination" },
      { label: "Pricing", value: "Itemised supplier costs plus a clear management fee, with your budget shown line by line" },
      { label: "Payment schedule", value: "Typically 30% at contract, 40% about 60 days before and 30% about 14 days before, mirrored to suppliers" },
    ],
    included: [
      "Programme and budget planning",
      "Transport and hotel-block management",
      "Venue, catering and AV sourcing through vetted partners",
      "On-site coordination and dispatch",
      "One budget sheet and one invoice",
    ],
    sections: [
      {
        heading: "Three typical scopes",
        bullets: [
          "Small offsite: about 20 guests, a hotel block, a meeting room, a group dinner and a guided activity",
          "Corporate event: 50–100 guests over two nights with a venue, a gala dinner and coach transfers",
          "Premium programme: 100–300 guests with a villa or palace venue, multiple dinners, experiences and a full on-site team",
        ],
      },
      {
        heading: "What we outsource and why",
        paragraphs: [
          "Venues, caterers, AV and décor are best delivered by specialists who hold the permits and know the site. We source and manage them so you deal with one team, and we ask each supplier for the safety and licensing documents that apply.",
        ],
      },
    ],
    faqs: [
      {
        q: "How far ahead should we plan an event?",
        a: "For 50+ guests, allow eight to twelve weeks; larger or peak-season events benefit from more.",
      },
      {
        q: "Do you handle creative production?",
        a: "Through specialist partners or alongside your own creative agency; we focus on logistics.",
      },
      {
        q: "Do you manage events outside Rome?",
        a: "Yes — Milan, Florence, Tuscany, Lake Como and the Amalfi Coast, using local suppliers vetted the same way in every city.",
      },
      {
        q: "Can you source the venue, not just the logistics around it?",
        a: "Yes, through vetted partners: congress centres, hotels, palaces and villas, proposed against your budget and guest count.",
      },
      {
        q: "Can you manage transport for 100+ guests?",
        a: "Yes — arrival waves, shuttle loops and coach transport are planned by group size, with backup vehicles held for every job.",
      },
      {
        q: "Can hotel accommodation, transport and the event itself be booked together?",
        a: "Yes. That is the core of the service: one team, one budget sheet and one invoice across all three.",
      },
    ],
    related: ["corporate-events-italy", "conferences-mice-italy", "incentive-travel-italy", "for-event-agencies", "how-to-plan-a-corporate-event-in-italy"],
    cta: { label: "Request an event quote", service: "event" },
    serviceType: "Event management",
    areaServed: ["Italy"],
  }),

  page({
    slug: "corporate-events-italy",
    kind: "service",
    title: "Corporate Events in Italy | Offsites & Company Retreats",
    description:
      "Corporate events in Italy: offsites, retreats, team events and gala dinners with hotel blocks, transport and venues through vetted partners. Request a quote.",
    h1: "Corporate Events in Italy",
    nav: "Corporate events",
    lead:
      "Offsites, retreats and gala dinners in Rome, Milan, Tuscany and the Lakes — with accommodation, transport and venues organised by one team.",
    parent: { slug: "event-management-italy", label: "Event management" },
    tags: [],
    facts: [
      { label: "Typical formats", value: "Leadership offsites, sales meetings, retreats, product launches and gala dinners" },
      { label: "Group sizes", value: "From 10–20 guests to 300" },
      { label: "Destinations", value: "Rome, Milan, Lake Como, Tuscany and the Amalfi Coast" },
      { label: "Lead time", value: "Eight to twelve weeks for 50+ guests; less for small offsites, more for peak season" },
    ],
    included: [
      "Hotel blocks and meeting rooms",
      "Venue and catering sourcing through partners",
      "Transport waves and shuttles",
      "Activities with licensed guides and providers",
      "On-site coordination",
    ],
    sections: [
      {
        heading: "How we build a corporate event",
        bullets: [
          "Brief: objectives, guest numbers, dates, budget range",
          "Options: two or three venue and hotel combinations",
          "Proposal: an itemised budget with fee and supplier costs",
          "Contract and deposits, mirrored to suppliers",
          "Run: coordinator on site, dispatch desk for transport",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you organise team-building or activities?",
        a: "Yes — cooking classes, wine experiences, guided tours and more through licensed partners.",
      },
      {
        q: "What happens if the guest count changes?",
        a: "Hotel blocks have attrition allowances and venues have minimums; we manage the changes against those terms and tell you the impact early.",
      },
    ],
    related: ["rome-corporate-events", "event-management-italy", "incentive-travel-italy", "conferences-mice-italy"],
    cta: { label: "Request a corporate event quote", service: "event" },
    serviceType: "Corporate events",
    areaServed: ["Italy"],
  }),

  page({
    slug: "conferences-mice-italy",
    kind: "service",
    title: "Conferences & MICE in Italy | Delegate Logistics",
    description:
      "Conference and MICE logistics in Italy: delegate transfers, hotel blocks, venue shuttles and on-site coordination for meetings, conferences and exhibitions.",
    h1: "Conferences and MICE in Italy",
    nav: "Conferences & MICE",
    lead:
      "Delegate arrivals, hotel blocks, venue shuttles and on-site coordination for conferences and exhibitions across Italy.",
    parent: { slug: "event-management-italy", label: "Event management" },
    tags: [],
    facts: [
      { label: "Italy in the market", value: "Second in the world for international association meetings, with 635 in 2024; six Italian cities are in the global top 100" },
      { label: "Leading cities", value: "Rome ninth (114 meetings) and Milan fourteenth (100 meetings, up from 29th)" },
      { label: "Growth", value: "Collective and MICE trips are growing about three times faster than routine business trips" },
      { label: "Our scope", value: "Delegate transport, hotel blocks, VIP handling and on-site logistics; content and production through partners" },
    ],
    included: [
      "Delegate arrival and departure waves",
      "Hotel blocks with cut-off and attrition management",
      "Venue shuttles timed to the programme",
      "VIP and speaker transfers",
      "Hosts, registration and interpreters through partners",
    ],
    sections: [
      {
        heading: "Fair and conference weeks",
        paragraphs: [
          "Milan, Verona, Bologna and Rimini host major fairs; Rome and Milan host large conferences. In those weeks hotels fill and vehicles are scarce, so blocks and fleets should be reserved before flights are booked. Book early and we hold backups.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you work with our PCO?",
        a: "Yes — many clients are PCOs or agencies who need a specialist logistics partner in Italy.",
      },
      {
        q: "Can you provide registration desks and hosts?",
        a: "Through vetted partners, quoted as separate lines.",
      },
    ],
    related: ["milan-mice-services", "for-event-agencies", "milan-fair-transfers", "hotel-group-bookings-italy"],
    cta: { label: "Request a MICE quote", service: "event" },
    serviceType: "Conference and MICE logistics",
    areaServed: ["Italy"],
  }),

  page({
    slug: "corporate-travel-italy",
    kind: "service",
    title: "Corporate Travel in Italy | Delegations & Roadshows",
    description:
      "Inbound corporate travel in Italy: delegation handling, executive transfers, roadshows and offsites, with hotel blocks and one consolidated invoice.",
    h1: "Corporate Travel in Italy",
    nav: "Corporate travel",
    lead:
      "Ground handling for delegations, roadshows and executive visits: airport meet-and-greet, chauffeurs, hotel blocks and meeting logistics.",
    parent: { slug: "event-management-italy", label: "Event management" },
    tags: [],
    facts: [
      { label: "Focus", value: "Inbound corporate travel to Italy — delegations, roadshows, offsites, incentive groups" },
      { label: "Market context", value: "Domestic business travel fell about 3% in 2025 while inbound business trips and event-driven travel grew" },
      { label: "What we are not", value: "A travel management company; we complement your TMC on the ground" },
      { label: "Invoicing", value: "One consolidated monthly e-invoice with booking-level detail" },
    ],
    included: [
      "Airport meet-and-greet and executive chauffeurs",
      "Hotel blocks and corporate rates on request",
      "Multi-city vehicle coordination",
      "A named dispatcher and 24/7 contact",
      "Monthly reporting",
    ],
    sections: [
      {
        heading: "A single accountable partner on the ground",
        paragraphs: [
          "Your TMC books flights and hotels; we take care of the movement between them and the logistics around meetings and events. That means fewer ad hoc bookings, consistent vehicles and invoices that match your cost centres.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you replace our TMC?",
        a: "No. We work alongside it, receiving requests from your TMC or your travel desk.",
      },
      {
        q: "Can you manage a whole delegation visit?",
        a: "Yes — transport, accommodation, meetings support and evening events, coordinated by one team.",
      },
    ],
    related: ["for-corporate-travel-managers", "corporate-transportation-italy", "corporate-events-italy", "hotel-group-bookings-italy"],
    cta: { label: "Request a corporate quote", service: "trade" },
    serviceType: "Corporate travel ground services",
    areaServed: ["Italy"],
  }),

  page({
    slug: "incentive-travel-italy",
    kind: "service",
    title: "Incentive Travel in Italy | Group Programmes & Experiences",
    description:
      "Incentive travel programmes in Italy: multi-city itineraries, unique venues, gala dinners and experiences, with transport, hotels and licensed partners.",
    h1: "Incentive Travel in Italy",
    nav: "Incentive travel",
    lead:
      "Reward trips for teams and top performers: unique venues, experiences and seamless logistics from arrival to departure.",
    parent: { slug: "event-management-italy", label: "Event management" },
    tags: [],
    facts: [
      { label: "Typical programme", value: "3–5 nights in one or two destinations with a welcome dinner, an experience day and a gala evening" },
      { label: "Destinations", value: "Rome, the Amalfi Coast, Tuscany, Lake Como, Venice and Puglia" },
      { label: "Experiences", value: "Cooking classes, wine tastings, private tours, boat days and unique venues" },
      { label: "Delivery", value: "Logistics run by us; experiences and venues delivered by licensed partners" },
    ],
    included: [
      "Programme design and budget",
      "Hotels and transport for the whole group",
      "Experiences with licensed guides and providers",
      "Gala dinner and venue sourcing",
      "On-site team for the duration",
    ],
    sections: [
      {
        heading: "Programmes are built with partners",
        paragraphs: [
          "Incentive travel involves many different licensed providers — hotels, venues, guides, boat operators. We coordinate them and remain the single point of accountability for your group. Multi-day programmes are contracted and insured according to Italian travel regulations; we will explain the structure when we quote.",
        ],
      },
    ],
    faqs: [
      {
        q: "How far ahead should we book an incentive trip?",
        a: "Three to six months for groups of 50 or more, and earlier for peak season.",
      },
      {
        q: "Can you handle groups of 200?",
        a: "Yes, with staged deposits, several hotels and vehicle waves; we discuss the structure during planning.",
      },
    ],
    related: ["corporate-events-italy", "event-management-italy", "group-travel-italy", "hotel-group-bookings-italy"],
    cta: { label: "Request an incentive proposal", service: "event" },
    serviceType: "Incentive travel",
    areaServed: ["Italy"],
  }),

  page({
    slug: "destination-weddings-italy",
    kind: "service",
    title: "Destination Weddings in Italy | Guest Logistics",
    description:
      "Guest logistics for destination weddings in Italy: transport, accommodation blocks and coordination alongside your planner. Lake Como, Tuscany, Amalfi Coast.",
    h1: "Destination Weddings in Italy",
    nav: "Destination weddings",
    lead:
      "We handle the guest logistics of your Italian wedding — transport and accommodation — and work alongside your planner and venue.",
    parent: { slug: "services", label: "Services" },
    tags: [],
    facts: [
      { label: "The market", value: "15,100+ weddings of foreign couples in Italy in 2024, about €931.6 million in direct revenue; the sector reached about €1.1 billion in 2025" },
      { label: "Average budget", value: "€61,500 per wedding in 2024 (+4.2%); catering takes 36%" },
      { label: "Where couples come from", value: "The United States 30.4% of requests, the United Kingdom 20.7%, Germany 8.7%" },
      { label: "What we do", value: "Guest transport and accommodation logistics; we do not plan the ceremony or décor" },
    ],
    included: [
      "Guest transport plans and shuttles",
      "Accommodation blocks at hotels and villas",
      "Couple car and VIP transfers",
      "Coordination with your planner and venue",
      "A backup vehicle and one coordinator on the day",
    ],
    sections: [
      {
        heading: "Working with your planner",
        paragraphs: [
          "Your planner owns the design and the day; we own getting people there and back. Send guest numbers, hotels and the timeline, and we return a logistics plan and fixed quote. We keep the planner in the loop and provide one dispatch number for the day.",
        ],
      },
      {
        heading: "Popular regions",
        bullets: [
          "Lake Como and the Italian lakes",
          "Tuscany and Umbria",
          "The Amalfi Coast and Puglia",
          "Rome and its surroundings",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you plan the whole wedding?",
        a: "No. We focus on guest transport and accommodation. Planners and venues handle the ceremony, décor and catering.",
      },
      {
        q: "Can couples without a planner use you?",
        a: "Yes; we offer a higher level of coordination for couples who are managing the wedding themselves.",
      },
    ],
    related: ["wedding-transportation-italy", "wedding-accommodation-italy", "lake-como-wedding-transport", "for-wedding-planners"],
    cta: { label: "Request a wedding logistics plan", service: "wedding" },
    serviceType: "Destination wedding logistics",
    areaServed: ["Italy"],
  }),

  page({
    slug: "private-tours-italy",
    kind: "service",
    title: "Private Tours in Italy | Driver & Licensed Guide",
    description:
      "Private day tours in Italy with a driver and a nationally licensed guide: Rome, Florence, Tuscany, Pompeii and Amalfi Coast. Fixed price, flexible itinerary.",
    h1: "Private Tours in Italy",
    nav: "Private tours",
    lead:
      "A private vehicle, a driver and — where you want one — a nationally licensed guide, for day trips and city tours planned around your interests.",
    parent: { slug: "services", label: "Services" },
    tags: [],
    facts: [
      { label: "Guides", value: "Only guides enrolled on Italy's national register may work as tourist guides; we book only qualified guides" },
      { label: "Typical day", value: "8–10 hours with two or three stops, lunch and time built in for traffic" },
      { label: "Popular tours", value: "Rome and the Vatican, Pompeii, Chianti and Siena, the Amalfi Coast, Cinque Terre" },
      { label: "Pricing", value: "Vehicle and driver plus the guide's fee and entry tickets, shown as separate lines" },
    ],
    included: [
      "A licensed driver and comfortable vehicle",
      "A licensed guide, where requested, through partners",
      "Entry tickets and reservations as agreed",
      "A realistic itinerary and timeline",
      "One contact throughout the day",
    ],
    sections: [
      {
        heading: "Driver only, or driver and guide?",
        paragraphs: [
          "For scenery, wine estates and towns you are happy to explore alone, a driver alone is enough. For archaeological sites and museums, a licensed guide transforms a visit: Pompeii and the Vatican in particular are much better with expert commentary. We propose the mix for each day.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are your guides licensed?",
        a: "Yes. Italian law requires tourist guides to be nationally qualified, and we work only with enrolled guides.",
      },
      {
        q: "Can you book tickets and skip-the-line entries?",
        a: "We book entries where available, as separate lines on your quote.",
      },
    ],
    related: ["florence-to-chianti-private-driver", "rome-to-pompeii-transfer", "tuscany-private-driver", "amalfi-coast-private-driver"],
    cta: { label: "Plan a private tour", service: "tour" },
    serviceType: "Private tours",
    areaServed: ["Italy"],
  }),

  page({
    slug: "group-travel-italy",
    kind: "service",
    title: "Group Travel in Italy | Coaches, Hotels & Guides",
    description:
      "Group travel logistics in Italy: coaches, group hotel blocks and licensed guides for tour groups, schools, sports teams and faith groups.",
    h1: "Group Travel in Italy",
    nav: "Group travel",
    lead:
      "Transport, accommodation and guides for tour groups, schools, sports teams and faith groups — handled by one team, with access permits planned.",
    parent: { slug: "services", label: "Services" },
    tags: [],
    facts: [
      { label: "Groups we serve", value: "Tour groups, universities and schools, sports teams, parish and pilgrim groups" },
      { label: "Typical size", value: "16 to 60 passengers, with larger groups in several vehicles" },
      { label: "Pilgrim flows", value: "The 2025 Jubilee brought 33.4 million pilgrims to Rome; faith travel to Assisi, Loreto and Rome remains steady" },
      { label: "Season", value: "Spring and autumn for schools and pilgrim groups; summer for tours" },
    ],
    included: [
      "Coaches and minibuses with professional drivers",
      "Group hotel blocks with clear terms",
      "Licensed guides and entry reservations through partners",
      "Access and parking planning for each stop",
      "One quote, one contact",
    ],
    sections: [
      {
        heading: "Planning for group budgets",
        paragraphs: [
          "Groups are price-sensitive and schedule-sensitive. We tell you honestly where a cheaper option costs time or flexibility, propose vehicle sizes that fill well and build a plan with fixed pick-up times. Deposits are typically 30% at contract, with the balance due before travel.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you handle school and sports groups?",
        a: "Yes, including safeguarding-friendly vehicle and driver requirements on request.",
      },
      {
        q: "Can you arrange guides for pilgrim groups?",
        a: "Yes — licensed guides for Rome, Assisi and other sites, booked as separate lines.",
      },
    ],
    related: ["group-transportation-italy", "for-tour-operators", "rome-to-assisi-transfer", "minibus-coach-hire-italy"],
    cta: { label: "Request a group quote", service: "group" },
    serviceType: "Group travel logistics",
    areaServed: ["Italy"],
  }),

  page({
    slug: "italy-dmc-services",
    kind: "service",
    title: "Italy DMC-Style Ground Services | Transport, Hotels, Events",
    description:
      "Destination-management style ground services in Italy for agencies, tour operators and corporates: transport, group hotels and event logistics.",
    h1: "Italy DMC-Style Ground Services",
    nav: "Italy DMC services",
    lead:
      "The local logistics that foreign agencies, tour operators and event teams need in Italy — transport, group accommodation and events — with one accountable team.",
    parent: { slug: "services", label: "Services" },
    tags: [],
    facts: [
      { label: "What a DMC does", value: "A destination management company designs and delivers ground services (hotels, transport, guides, venues, events) for organisers abroad" },
      { label: "Who buys", value: "Foreign travel agencies, tour operators, luxury advisors, incentive houses, event agencies and corporates" },
      { label: "Our scope today", value: "Ground transport, group accommodation and event logistics; multi-day programmes are built with licensed partners" },
      { label: "Contract and invoicing", value: "One contract path, net rates for the trade and one consolidated invoice" },
    ],
    included: [
      "Ground transport across Italy",
      "Group hotel blocks",
      "Licensed guides and experiences through partners",
      "Event logistics and on-site coordination",
      "24/7 dispatch and a backup plan",
    ],
    sections: [
      {
        heading: "Why foreign agencies use a local ground partner",
        bullets: [
          "Local supplier networks and contracted rates",
          "Access rules, permits and coach parking knowledge",
          "Nationally licensed guides",
          "On-the-ground emergency handling in the right time zone",
          "One invoice and one accountable contact",
        ],
      },
      {
        heading: "How we approach new agency partners",
        paragraphs: [
          "We start with the ground layer: transfers, chauffeur days and group transport. As trust builds, we add hotels, guides and event logistics for larger programmes. Trade rates are net, so you set your own markup.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are you a full DMC?",
        a: "We focus on the ground layer today and coordinate full programmes with licensed partners. We are transparent about which parts we deliver directly.",
      },
      {
        q: "How do trade rates work?",
        a: "Net rates by route and vehicle class; you set your own markup. New accounts prepay first bookings, then terms are agreed.",
      },
    ],
    related: ["for-travel-agencies", "for-tour-operators", "for-event-agencies", "group-travel-italy", "what-is-an-italy-dmc"],
    cta: { label: "Request trade rates", service: "trade" },
    serviceType: "Destination management services",
    areaServed: ["Italy"],
  }),

  page({
    slug: "corporate-hotel-booking-italy",
    kind: "service",
    title: "Corporate Hotel Booking in Italy | Company Rates & Blocks",
    description:
      "Corporate hotel accommodation in Italy: negotiated company rates, room blocks for visiting teams and roadshows, and one consolidated monthly invoice.",
    h1: "Corporate Hotel Booking in Italy",
    nav: "Corporate hotel booking",
    lead:
      "Negotiated hotel rates and room blocks for company travel — individual business travellers, visiting teams and multi-city roadshows — billed against your cost centres.",
    parent: { slug: "hotels", label: "Hotels" },
    tags: [],
    facts: [
      { label: "Two different needs", value: "Standing corporate rates for individual travellers, and room blocks for teams of ten or more on the same dates" },
      { label: "Invoicing", value: "One consolidated monthly e-invoice with booking-level detail and cost-centre codes, not a hotel bill per traveller" },
      { label: "Coverage", value: "Rome, Milan, Florence and other Italian cities where your team travels" },
      { label: "Not a public rate", value: "Corporate and block rates are negotiated per account; we do not publish prices online" },
    ],
    included: [
      "Negotiated corporate rates at hotels near your Italy offices or client sites",
      "Room blocks for visiting teams, roadshows and offsites",
      "One point of contact for changes, no-shows and late cancellations",
      "Ground transport between the hotel, the office and the airport",
      "One monthly invoice with cost-centre level detail",
    ],
    sections: [
      {
        heading: "Standing rate vs. one-off block",
        paragraphs: [
          "If your team travels to the same city regularly, a standing corporate rate agreement is usually the better fit: a fixed nightly rate, a cancellation window and priority availability at one or two preferred hotels. If it is a single visit by several people on the same dates — a roadshow, an audit team, a training week — a room block for those specific dates is simpler and often cheaper.",
        ],
      },
      {
        heading: "What we ask before quoting",
        bullets: [
          "Cities and approximate nights per month or per trip",
          "Typical group size when several travellers move together",
          "Hotel category and any preferred chains or locations",
          "Whether you need ground transport included in the same invoice",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you offer rates for individual business travellers, not just groups?",
        a: "Yes. A standing corporate rate agreement works for one traveller at a time, at a hotel near your office or client site; room blocks are for several travellers on the same dates.",
      },
      {
        q: "Can this be billed against our cost centres?",
        a: "Yes — one monthly e-invoice with booking-level detail, coded to the cost centres you specify.",
      },
      {
        q: "Do you handle the airport-to-hotel leg as well?",
        a: "Yes, on the same invoice, so ground transport and accommodation are managed by one team.",
      },
    ],
    related: ["for-corporate-travel-managers", "corporate-travel-italy", "hotel-group-bookings-italy", "milan-hotel-booking", "rome-hotel-booking"],
    cta: { label: "Request corporate hotel rates", service: "hotel-block" },
    serviceType: "Corporate hotel accommodation",
    areaServed: ["Italy"],
  }),

  page({
    slug: "event-hotel-accommodation-italy",
    kind: "service",
    title: "Event Hotel Accommodation in Italy | Delegate Room Blocks",
    description:
      "Hotel room blocks for conference and event delegates in Italy: cut-off dates aligned to the programme, rooming lists and on-site coordination.",
    h1: "Event Hotel Accommodation in Italy",
    nav: "Event hotel accommodation",
    lead:
      "Delegate room blocks timed to your conference or event programme — with cut-off dates, a managed rooming list and hotels close to the venue.",
    parent: { slug: "hotels", label: "Hotels" },
    tags: [],
    facts: [
      { label: "Timing", value: "The cut-off date is set against the programme, not a fixed number of days, so it moves if the event date changes" },
      { label: "Venue proximity", value: "We prioritise hotels within walking distance or a short shuttle ride of the venue" },
      { label: "Rooming list", value: "A single list mapped to delegate names, with updates managed centrally rather than by each traveller" },
      { label: "Overflow", value: "A second or third hotel is held in reserve once the primary block reaches its attrition limit" },
    ],
    included: [
      "Room-block proposals from hotels near the venue",
      "Cut-off date and attrition terms aligned to the event programme",
      "Rooming-list management and delegate change requests",
      "Shuttle transport between hotels and the venue",
      "One invoice alongside the rest of the event budget",
    ],
    sections: [
      {
        heading: "Why event hotel blocks need their own approach",
        paragraphs: [
          "A conference room block is different from a leisure group booking: dates rarely move once a venue is confirmed, delegates book at different times as registrations come in, and the hotel needs to know how many rooms to release if the block is not full by the cut-off. We manage that cut-off actively — not just at signing, but in the weeks before the event, when it matters most.",
        ],
      },
      {
        heading: "Working alongside your PCO or event agency",
        paragraphs: [
          "If a professional conference organiser or event agency runs your registration system, we plug the accommodation and shuttle piece into their programme rather than duplicating it, and report block status to whoever needs it.",
        ],
      },
    ],
    faqs: [
      {
        q: "How close to the venue are the hotels?",
        a: "As close as budget and availability allow; we always show the walking or shuttle time in the proposal.",
      },
      {
        q: "Can you manage the block if registrations run past the cut-off?",
        a: "Yes — we can request an extension or add an overflow hotel if the block is filling.",
      },
      {
        q: "Do you also run the delegate shuttles?",
        a: "Yes, on the same booking, timed to the session schedule rather than a fixed timetable.",
      },
    ],
    related: ["conferences-mice-italy", "milan-mice-services", "event-management-italy", "hotel-group-bookings-italy"],
    cta: { label: "Request event accommodation", service: "hotel-block" },
    serviceType: "Event and conference accommodation",
    areaServed: ["Italy"],
  }),

  page({
    slug: "tour-group-hotel-booking-italy",
    kind: "service",
    title: "Tour Group Hotel Booking in Italy | Rooms for 20+ Travellers",
    description:
      "Hotel booking for tour groups in Italy: schools, sports teams, faith groups and coach tours. Room blocks by twin/triple share, with a single rooming list.",
    h1: "Tour Group Hotel Booking in Italy",
    nav: "Tour group hotel booking",
    lead:
      "Rooms for coach tours, schools, sports teams and faith groups — quoted by room configuration, with one rooming list and terms that match a multi-stop itinerary.",
    parent: { slug: "hotels", label: "Hotels" },
    tags: [],
    facts: [
      { label: "Typical group", value: "20 to 200+ travellers moving together on a multi-city or multi-stop itinerary" },
      { label: "Room mix", value: "Mostly twin and triple share, with a smaller allocation of singles for leaders and chaperones" },
      { label: "Multi-stop terms", value: "Cancellation and attrition terms are agreed per city, since group numbers can change city by city" },
      { label: "Coach access", value: "Hotels are checked for coach parking or a nearby drop-off point before they go on the itinerary" },
    ],
    included: [
      "Room-block proposals by twin/triple/single mix",
      "Terms agreed per city on multi-stop itineraries",
      "One rooming list, updated as numbers are confirmed",
      "Coach parking and drop-off checked in advance",
      "Coordination with coach transport and guided activities",
    ],
    sections: [
      {
        heading: "Booking accommodation across a multi-city tour",
        bullets: [
          "You send the itinerary: cities, nights per city and approximate group size",
          "We propose hotels with coach access, checked against your route",
          "Room mix and rooming list are set once numbers firm up",
          "Cut-off and attrition are agreed per city, not as one blanket term",
          "Coach transport and guide bookings are coordinated to the same schedule",
        ],
      },
    ],
    faqs: [
      {
        q: "Can group size still change after we book?",
        a: "Within the attrition allowance agreed per city, yes — we manage the changes and tell you the impact on price early.",
      },
      {
        q: "Do you handle school trips and chaperone requirements?",
        a: "Yes — room configurations, chaperone-to-student ratios and any safeguarding paperwork requested by the school are handled as part of the booking.",
      },
      {
        q: "Is coach parking checked before you propose a hotel?",
        a: "Yes. A hotel without coach access or a nearby drop-off is not proposed for a coach tour.",
      },
    ],
    related: ["group-travel-italy", "for-tour-operators", "italy-dmc-services", "hotel-group-bookings-italy"],
    cta: { label: "Request tour group accommodation", service: "hotel-block" },
    serviceType: "Group tour accommodation",
    areaServed: ["Italy"],
  }),
];
