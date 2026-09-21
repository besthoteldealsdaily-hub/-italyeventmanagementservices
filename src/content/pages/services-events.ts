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
    related: ["destination-weddings-italy", "wedding-transportation-italy", "baby-shower-family-celebration-transport-italy", "for-wedding-planners"],
    cta: { label: "Request wedding accommodation", service: "hotel-block" },
    serviceType: "Wedding accommodation",
    areaServed: ["Italy"],
  }),

  page({
    slug: "event-management-italy",
    kind: "service",
    title: "Event Management in Italy | Corporate, MICE & Incentive",
    description:
      "Event management in Italy: corporate events, conferences, incentive travel and gala dinners in Rome, Milan, Florence, Lake Como and more, via vetted partners.",
    h1: "Event Management in Italy",
    nav: "Event management",
    lead:
      "We plan and coordinate corporate events, conferences, incentive programmes and gala dinners across Italy — venues, catering, production, staffing, hotels and transport — through vetted partners, with one brief, one budget and one team.",
    parent: { slug: "services", label: "Services" },
    tags: [],
    facts: [
      { label: "Market", value: "Italy hosted 367,981 business events in 2024 (+8.2%) with 29.3 million participants, worth about €11.7 billion in direct contribution" },
      { label: "Our role", value: "End-to-end planning and coordination: brief and budget, venue and supplier sourcing, production management, guest accommodation and transport, and on-site delivery" },
      { label: "Where", value: "Rome, Milan, Florence and Tuscany, Venice, Lake Como, the Amalfi Coast, Naples, Bologna and Verona; Turin, Puglia, Sicily and Sardinia through local partners, case by case" },
      { label: "Lead time", value: "Eight to twelve weeks for 50+ guests; three to six months for incentive programmes of 50 or more; longer for peak summer and trade-fair weeks" },
      { label: "Pricing", value: "Itemised supplier costs plus a clear management fee, with your budget shown line by line" },
      { label: "Payment schedule", value: "Typically 30% at contract, 40% about 60 days before and 30% about 14 days before, mirrored to suppliers" },
    ],
    included: [
      "Concept, programme, budget and timeline planning",
      "Venue, catering, AV and décor sourcing through vetted partners",
      "Production management: supplier briefs, schedules and the run of show",
      "Hosts, registration staff, interpreters and licensed security through partners",
      "Hotel room blocks and group transport, on the same budget",
      "On-site coordination for setup, the event itself and breakdown",
      "One budget sheet, one contract path and one invoice",
    ],
    sections: [
      {
        heading: "Event Management Services in Italy",
        paragraphs: [
          "Every event starts from one brief. From it we build the plan, source the specialists who deliver each part and coordinate them through to the final supplier invoice. We coordinate independent suppliers rather than deliver in-house, and every proposal shows who is providing what.",
        ],
        items: [
          {
            title: "Event planning",
            text: "Event concept and programme development, budget planning, a working timeline and guest management, built from your objectives, dates, guest count and budget range.",
            links: [{ label: "How to plan a corporate event in Italy", slug: "how-to-plan-a-corporate-event-in-italy" }],
          },
          {
            title: "Venue sourcing",
            text: "Two or three options that fit your guest count, dates and budget, compared side by side: hotels, conference centres, villas, palaces, historic venues, private estates and restaurants. We ask each venue for the safety and licensing documents that apply before it is proposed.",
            links: [{ label: "Event services in Italy", slug: "event-services-italy" }],
          },
          {
            title: "Catering",
            text: "Corporate catering, gala dinners, private dining and cocktail receptions from vetted caterers, with Italian regional menus, dietary requirements and service timing written into the supplier contract.",
            links: [{ label: "Event catering in Italy: formats, tastings and contracts", slug: "event-catering-in-italy-guide" }],
          },
          {
            title: "Event production",
            text: "Stage, lighting, sound, screens and presentation equipment sourced from AV and technical suppliers and briefed to one schedule. Creative direction can come from your own agency, and we work alongside it.",
            links: [
              { label: "Conference AV checklist", slug: "conference-av-checklist-italy" },
              { label: "Lighting for villas and historic venues", slug: "event-lighting-for-villas-and-historic-venues" },
            ],
          },
          {
            title: "Staffing",
            text: "Event hosts, registration staff, coordinators, hospitality staff and interpreters through staffing partners, with licensed security providers on request.",
            links: [{ label: "Event staff and security planning", slug: "event-staff-and-security-planning-italy" }],
          },
          {
            title: "Accommodation",
            text: "Hotel sourcing, room blocks with cut-off and attrition terms, VIP accommodation and group bookings, with one rooming list managed centrally.",
            links: [
              { label: "Event hotel accommodation", slug: "event-hotel-accommodation-italy" },
              { label: "Group hotel bookings", slug: "hotel-group-bookings-italy" },
            ],
          },
          {
            title: "Event transportation",
            text: "Airport transfers, executive cars, minivans, minibuses and coaches for arrival waves, hotel-to-venue shuttles and multi-city moves, coordinated with the event schedule.",
            links: [{ label: "Event transportation in Italy", slug: "event-transportation-italy" }],
          },
          {
            title: "On-site management",
            text: "A coordinator on site for setup, supplier coordination, guest registration, schedule management, event-day troubleshooting and breakdown.",
          },
        ],
      },
      {
        heading: "Corporate Event Planning in Italy",
        paragraphs: [
          "We coordinate corporate events across Italy for companies planning meetings, conferences, incentive programmes, gala dinners, product launches and multi-day programmes. Groups run from 10–20 guests to several hundred, in one city or across several.",
        ],
        bullets: [
          "Company and executive meetings: hotel or villa venues with meeting rooms, AV and private dining",
          "Conferences and seminars: venue, registration, AV and delegate logistics",
          "Team building: cooking classes, wine experiences and guided visits through licensed partners",
          "Incentive trips and corporate retreats: multi-day programmes in a setting worth travelling for",
          "Product launches: venue, AV and guest logistics, with creative direction from your agency",
          "Gala dinners and awards ceremonies: venue, stage and AV, seating plan and run of show",
          "Client entertainment: private dinners, receptions and experiences for a smaller guest list",
        ],
        links: [
          { label: "Corporate event management in Italy", slug: "corporate-events-italy" },
          { label: "How to plan a gala dinner or awards night", slug: "how-to-plan-a-gala-dinner-in-italy" },
        ],
      },
      {
        heading: "Conference, Meeting & MICE Planning in Italy",
        paragraphs: [
          "MICE stands for meetings, incentives, conferences and exhibitions. Italy is second in the world for international association meetings, with 635 in 2024, and Rome (ninth, 114 meetings) and Milan (fourteenth, 100) lead the Italian cities.",
          "We coordinate the operating side around your programme. Content, speakers and session design stay with you or your PCO; for exhibitions we support exhibitors and visitors with hotel blocks and fair-week transport.",
        ],
        bullets: [
          "Venue selection: congress centres, fair grounds and hotel congress facilities matched to your delegate numbers",
          "Room layouts: plenary, breakout rooms and catering areas planned around the programme",
          "Registration: check-in flow, badge printing, hosts and interpreters through partners",
          "AV, stage and presentation support: screens, sound and speaker equipment briefed to one schedule",
          "Catering: coffee breaks, lunches and gala evenings timed to the session plan",
          "Accommodation: delegate room blocks near the venue, with cut-off dates aligned to the programme",
          "Transportation: arrival and departure waves, venue shuttles and speaker and VIP transfers",
          "On-site coordination: one team through setup, sessions and breakdown",
        ],
        links: [
          { label: "Conferences & MICE services in Italy", slug: "conferences-mice-italy" },
          { label: "How to plan a conference in Italy", slug: "how-to-plan-a-conference-in-italy" },
          { label: "MICE services in Rome", slug: "rome-mice-services" },
          { label: "MICE services in Milan", slug: "milan-mice-services" },
          { label: "MICE services in Venice", slug: "venice-mice-services" },
        ],
      },
      {
        heading: "Incentive Travel & Corporate Retreats in Italy",
        paragraphs: [
          "Incentive programmes and retreats reward teams and top performers with a place and a programme worth travelling for. A typical programme runs three to five nights in one or two destinations, with a welcome dinner, an experience day and a gala evening. We coordinate the hotels, transport and venues; experiences are delivered by licensed guides and providers, and multi-day programmes are contracted and insured according to Italian travel regulations.",
          "Popular destinations are Tuscany, Lake Como, the Amalfi Coast, Rome, Florence, Venice and Puglia, with Sicily and Sardinia arranged through local partners. Typical programme shapes:",
        ],
        bullets: [
          "A three-day incentive programme around Lake Como: a lakeside hotel, a boat day with a licensed operator and a gala dinner in a villa",
          "A Tuscan wine and food experience for an executive group: estate visits, tastings and a private dinner",
          "A multi-city corporate programme combining Rome and Florence, with a transfer between the two",
          "A coastal programme on the Amalfi Coast, built around narrow roads and small vehicles",
        ],
        links: [
          { label: "Incentive travel in Italy", slug: "incentive-travel-italy" },
          { label: "Planning a corporate retreat or offsite", slug: "corporate-retreat-planning-italy" },
          { label: "Italy DMC services", slug: "italy-dmc-services" },
        ],
      },
      {
        heading: "Event Types We Manage in Italy",
        paragraphs: ["From a 20-person executive dinner to a conference of several hundred delegates, these are the formats we coordinate."],
        items: [
          {
            title: "Corporate events",
            text: "Company and leadership meetings, annual meetings, executive events and networking events.",
            links: [{ label: "Corporate events in Italy", slug: "corporate-events-italy" }],
          },
          {
            title: "Conferences & seminars",
            text: "Conferences, seminars, workshops, panels, business forums and product presentations.",
            links: [{ label: "Conferences & MICE", slug: "conferences-mice-italy" }],
          },
          {
            title: "Incentive travel",
            text: "Team incentive trips, executive retreats, reward programmes and multi-day corporate experiences.",
            links: [{ label: "Incentive travel", slug: "incentive-travel-italy" }],
          },
          {
            title: "Gala & dinner events",
            text: "Gala dinners, awards dinners, corporate dinners, private dining, networking receptions and cocktail events.",
            links: [{ label: "Planning a gala dinner", slug: "how-to-plan-a-gala-dinner-in-italy" }],
          },
          {
            title: "Product & brand events",
            text: "Product launches, brand activations, press and media events and fashion events. We source the venue and AV and run the guest logistics; staging design and creative direction stay with your agency.",
            links: [{ label: "Launch and fashion event transport", slug: "product-launch-fashion-event-transport-italy" }],
          },
          {
            title: "Private & luxury events",
            text: "Private galas, VIP dinners and villa celebrations for families, family offices and premium brands. For birthdays, anniversaries and family gatherings we handle guest transport and accommodation around your own venue or planner.",
            links: [
              { label: "Luxury event management", slug: "luxury-event-management-italy" },
              { label: "Private event transport", slug: "private-social-event-transport-italy" },
            ],
          },
          {
            title: "Destination weddings",
            text: "Full-service wedding planning: venue, ceremony, catering, décor, photography, music, guest hotels and transport.",
            links: [{ label: "Destination wedding planning", slug: "destination-weddings-italy" }],
          },
        ],
      },
      {
        heading: "Event Venues in Italy",
        paragraphs: [
          "Italy's range of venues is one of the reasons to hold an event here. We source venues through vetted partners and compare two or three that fit your guest count, dates and budget, checking capacity, access and safety documentation before anything is proposed.",
        ],
        bullets: [
          "Luxury hotels and conference centres: meeting rooms, ballrooms and reliable technology under one roof",
          "Historic palaces and castles: atmosphere and history, with load-in and capacity to check",
          "Villas and private estates: privacy and space, with narrow access roads to plan around",
          "Museums and cultural sites: subject to the owner's hire rules and opening hours",
          "Restaurants and rooftops: dinners and receptions for smaller groups in the heart of a city",
          "Wine estates and masserie: countryside settings for dinners, retreats and incentive programmes",
          "Beach and lakefront venues: waterside receptions, with a weather and access plan",
          "Industrial and event spaces: flexible open space for launches and larger productions",
        ],
        items: [
          {
            title: "Venues by destination",
            bullets: [
              "Rome: hotels with congress facilities, historic palaces, museums and the La Nuvola convention centre in EUR",
              "Milan: hotels, MiCo and Fieramilano for conferences and exhibitions, and event spaces in Porta Nuova, CityLife, Navigli and Brera",
              "Florence: palazzi, historic city venues and countryside villas",
              "Tuscany: estates, wineries and villas in Chianti and the Val d'Orcia",
              "Lake Como: private villas, luxury hotels and lakefront venues, with boat access planned into the day",
              "Venice: hotels with congress facilities and, in exhibition years, the Biennale pavilions at the Giardini and Arsenale; access is planned by water",
              "Puglia: masserie, estates and coastal venues",
            ],
          },
        ],
        links: [
          { label: "Event services: venues, catering, AV and staff", slug: "event-services-italy" },
          { label: "Event permits and licences in Italy", slug: "event-permits-and-licences-italy" },
        ],
      },
      {
        heading: "Event Transportation in Italy",
        paragraphs: [
          "Ground transport is part of what we coordinate, so guest movement is planned with the event rather than added afterwards: arrival waves matched to flight times, shuttle loops between hotels and the venue and late returns after the gala. Vehicles come from licensed partner operators and are sized to the group and its luggage.",
        ],
        bullets: [
          "Airport transfers and arrival waves timed to flight schedules",
          "Hotel-to-venue shuttles and late-night returns",
          "Executive cars and VIP transfers: Mercedes E-Class or S-Class sedans, or similar",
          "Vans for small groups and VIPs: Mercedes V-Class or Vito, or similar, up to 7 passengers",
          "Minibuses of 16–35 seats and coaches of 50+ seats for group movements",
          "Multi-day and multi-city transportation for incentive programmes and roadshows",
          "Access-aware planning: historic centres and the Amalfi Coast favour smaller vehicles, so large groups there move in several vehicles rather than one coach",
        ],
        links: [
          { label: "Event transportation in Italy", slug: "event-transportation-italy" },
          { label: "Group transportation in Italy", slug: "group-transportation-italy" },
          { label: "Vehicle classes and capacities", href: "/vehicles" },
        ],
      },
      {
        heading: "Popular Event Destinations in Italy",
        paragraphs: [
          "Rome · Milan · Florence · Venice · Lake Como · Tuscany · Amalfi Coast · Naples · Bologna · Turin · Verona · Puglia · Sicily · Sardinia",
          "We also coordinate events in other Italian cities and regions depending on venue availability and supplier requirements. In every destination we use local suppliers vetted the same way; Turin, Puglia, Sicily and Sardinia are arranged case by case through local partners.",
        ],
        items: [
          {
            title: "Rome",
            text: "Corporate meetings, conferences, gala dinners and incentive stays, with the La Nuvola convention centre in EUR, hotel congress facilities and historic venues in the Centro Storico. Rome is ninth in the world for international association meetings, and its restricted-traffic zone shapes every load-in and drop-off.",
            links: [
              { label: "Corporate events in Rome", slug: "rome-corporate-events" },
              { label: "MICE services in Rome", slug: "rome-mice-services" },
              { label: "Event transportation in Rome", slug: "rome-event-transportation" },
            ],
          },
          {
            title: "Milan",
            text: "Business events, conferences and exhibitions around MiCo and Fieramilano Rho, plus launches and fashion-week events in Porta Nuova, CityLife, Navigli and Brera. Fair weeks and Design Week fill hotels, so blocks are reserved early, and the central Area C zone is built into the transport plan.",
            links: [
              { label: "Corporate events in Milan", slug: "milan-corporate-events" },
              { label: "MICE services in Milan", slug: "milan-mice-services" },
              { label: "Event transportation in Milan", slug: "milan-event-transportation" },
            ],
          },
          {
            title: "Florence",
            text: "Executive retreats, luxury dinners and cultural programmes in palazzi and historic venues, or in countryside villas a short drive away. The historic centre is a restricted-traffic zone, so load-in and drop-offs are planned around the closest permitted point.",
            links: [
              { label: "Event management in Florence", slug: "florence-event-management" },
              { label: "Ground services in Florence", slug: "florence" },
            ],
          },
          {
            title: "Venice",
            text: "Incentive programmes, private dinners, conferences and galas in a car-free city. Road transport ends at Piazzale Roma or Tronchetto, so the last stretch is planned by water with licensed local boat partners.",
            links: [
              { label: "MICE services in Venice", slug: "venice-mice-services" },
              { label: "Ground services in Venice", slug: "venice" },
            ],
          },
          {
            title: "Lake Como",
            text: "Executive retreats, villa events and gala dinners, with hotels on both shores. Lakeside roads are narrow and ferries are part of the plan, so guests move in smaller vehicles and by boat coordinated with licensed operators. Malpensa is roughly 50–60 minutes away.",
            links: [{ label: "Ground services at Lake Como", slug: "lake-como" }],
          },
          {
            title: "Tuscany",
            text: "Villa events, corporate retreats, wine experiences and private dinners in Chianti and the Val d'Orcia. Most estates are off public transport and reached by lanes a coach cannot use, so we check the final approach with each property and size the vehicles to fit.",
            links: [{ label: "Ground services in Tuscany", slug: "tuscany" }],
          },
          {
            title: "Amalfi Coast",
            text: "Destination events, incentive programmes and private dinners in a setting with strict access rules: eleven towns apply traffic restrictions and an alternate-plate scheme, and large coaches are impractical on the coast road. Programmes are built around small vehicles and local operators who hold the permits.",
            links: [
              { label: "Ground services on the Amalfi Coast", slug: "amalfi-coast" },
              { label: "Amalfi Coast alternate-plate rules", slug: "amalfi-coast-alternate-license-plates" },
            ],
          },
          {
            title: "Naples",
            text: "Corporate meetings, incentive travel and events around the Bay of Naples. Pompeii is 40–50 minutes away, Sorrento, Positano and Amalfi are roughly 1 hour 15 minutes to 1 hour 40 minutes by road, and Capodichino airport is 5–6 km from the centre.",
            links: [{ label: "Ground services in Naples", slug: "naples" }],
          },
          {
            title: "Bologna",
            text: "Conferences, corporate meetings and trade events around Bologna Fiere, with Cosmoprof each March, in a city that ranks among the world's top 100 for international association meetings. Bologna sits roughly midway between Florence and Milan, which suits multi-city programmes and Motor Valley visits.",
            links: [{ label: "Ground services in Bologna", slug: "bologna" }],
          },
          {
            title: "Turin",
            text: "Corporate meetings, conferences and incentive programmes in a city with a strong automotive and industrial heritage. The Lingotto district and the Savoy royal residences, such as the Reggia di Venaria, are the best-known settings. Arranged through local partners.",
          },
          {
            title: "Verona",
            text: "Corporate events, gala dinners and destination programmes around Veronafiere and the Roman Arena, with Vinitaly each April and a summer opera season. Lake Garda is 30–45 minutes away and Valpolicella wine country is close by.",
            links: [{ label: "Ground services in Verona", slug: "verona" }],
          },
          {
            title: "Puglia",
            text: "Masseria events, corporate retreats, private dinners and incentive programmes in the countryside and on the coast, with Bari and Brindisi as the main airports. Arranged through local partners.",
          },
          {
            title: "Sicily",
            text: "Destination events, incentive travel, corporate retreats and private events on an island with several distinct bases: Palermo, Catania, Taormina and Syracuse. Travel between them takes time, so programmes are built around one or two bases, with local partners delivering venues, transport and experiences.",
          },
          {
            title: "Sardinia",
            text: "Luxury retreats, corporate incentives and seaside events, mostly on the Costa Smeralda and around Cagliari, with the main season running through the warmer months. Guests typically arrive via Olbia or Cagliari airports. Arranged through local partners.",
          },
        ],
      },
      {
        heading: "Event Management Across Italy's Regions",
        paragraphs: [
          "Venue types, access rules and guest arrival routes differ across the country, so we plan each event around the area it is in. Outside the main destinations above, delivery runs through local partners, depending on venue availability and supplier requirements.",
        ],
        items: [
          {
            title: "Northern Italy",
            text: "Milan, Turin, Bologna, Verona, Venice, Lake Como, Lake Garda, the other Italian lakes and the Dolomites. Business events cluster in the trade-fair cities; the lakes and mountains suit retreats and incentive stays.",
          },
          {
            title: "Central Italy",
            text: "Rome, Florence, Tuscany, Siena, Pisa and Umbria: conferences and gala evenings in the capital, and villa retreats, wine estates and hill-town programmes in the countryside. Pisa is the main international gateway for Tuscany.",
          },
          {
            title: "Southern Italy",
            text: "Naples, the Amalfi Coast, Sorrento, Capri, Puglia and Matera: incentive programmes and destination events in coastal and historic settings, where the sea and narrow roads shape the plan. Capri is reached by ferry.",
          },
          {
            title: "The islands",
            text: "Sicily and Sardinia: island programmes are built around flights or ferries and one or two bases, with local partners delivering venues, transport and experiences.",
          },
        ],
      },
      {
        heading: "How We Manage Your Event",
        paragraphs: ["Every event follows the same eight steps, so you always know what happens next and what we need from you."],
        items: [
          {
            title: "1. Tell us about your event",
            text: "Dates, destination, guest count, budget range and objectives. A short call or a written brief is enough to start.",
          },
          {
            title: "2. Build the event brief",
            text: "We turn your requirements into a structured event plan: programme, guest flow, the suppliers needed and the questions still open.",
          },
          {
            title: "3. Source venues and suppliers",
            text: "We compare suitable venues and suppliers on availability, capacity, location and budget, and ask each one for the safety and licensing documents that apply before it is proposed.",
          },
          {
            title: "4. Present the proposal",
            text: "You receive the shortlisted options with estimated costs: an itemised budget with supplier costs and a clear management fee. Proposals follow within a few working days once we have dates, guest numbers and a budget range.",
          },
          {
            title: "5. Confirm suppliers",
            text: "Once you approve, we coordinate contracts, deposits and schedules. Terms are mirrored between your agreement with us and our agreement with each supplier, so there is no gap.",
          },
          {
            title: "6. Prepare the event",
            text: "We brief the suppliers and manage transport, accommodation, production and guest logistics, with one point of contact for every change.",
          },
          {
            title: "7. Manage the event day",
            text: "Our team coordinates setup, suppliers, timings and on-site requirements from load-in to the last guest.",
          },
          {
            title: "8. Close the event",
            text: "We coordinate breakdown and reconcile the final supplier invoices, so you receive one final statement.",
          },
        ],
      },
      {
        heading: "Typical Event Scenarios",
        paragraphs: [
          "Three illustrative examples of how a brief becomes a plan. Numbers, venues and dates change with every client; the structure is what stays consistent.",
        ],
        items: [
          {
            title: "20-person executive retreat",
            text: "Rome: a hotel block, a meeting room with AV, a private dinner, a guided experience with a licensed guide and airport transfers, all under one coordinator.",
            links: [{ label: "Corporate events in Rome", slug: "rome-corporate-events" }],
          },
          {
            title: "80-person corporate event",
            text: "Milan: hotel accommodation, a conference at a hotel or congress venue, a gala dinner, coach or minibus transfers and event staff for registration and hosting.",
            links: [{ label: "Corporate events in Milan", slug: "milan-corporate-events" }],
          },
          {
            title: "150-person incentive programme",
            text: "Lake Como: rooms across one or more lakeside hotels, a lake experience with licensed boat operators, a gala dinner, private transport in smaller vehicles staged in waves and an on-site team for the whole programme.",
            links: [{ label: "Incentive travel in Italy", slug: "incentive-travel-italy" }],
          },
        ],
      },
      {
        heading: "Who We Work With",
        paragraphs: ["Clients come to us with a full brief or a partial plan. We work directly with:"],
        bullets: [
          "Companies and corporate travel teams bringing staff, clients or delegations to Italy, alongside their travel management company",
          "Event agencies and PCOs that need an operating partner on the ground",
          "DMCs, travel agencies and tour operators that need a local partner for the ground layer, at net trade rates",
          "Wedding planners who want guest transport and accommodation handled alongside their design",
          "Private clients, families and family offices planning luxury private events",
        ],
        links: [
          { label: "For event agencies", slug: "for-event-agencies" },
          { label: "For corporate travel managers", slug: "for-corporate-travel-managers" },
          { label: "Italy DMC services", slug: "italy-dmc-services" },
          { label: "For wedding planners", slug: "for-wedding-planners" },
        ],
      },
      {
        heading: "Planning an Event in Italy from Abroad",
        paragraphs: [
          "You don't need to be in Italy to start planning. We coordinate venue research, supplier proposals, accommodation, transport, production and event-day logistics remotely, with vetted local partners delivering on the ground and a dispatch team in Rome reachable 24/7.",
          "Proposals, contracts and budgets are handled by email and call, so decisions can be made across time zones. If you want to see venues before you commit, we can line up the shortlist so that one visit covers them.",
        ],
      },
      {
        heading: "Event Management Costs in Italy",
        paragraphs: [
          "There is no single price for an event in Italy, and we don't sell fixed packages. Cost depends on guest count, destination, venue type, accommodation, catering, production, transport, entertainment and event duration, and on the date, since peak summer and trade-fair weeks raise demand for hotels and venues.",
          "Our quotes are itemised, with supplier costs shown line by line plus a clear management fee. Some costs are easy to miss when comparing quotes:",
        ],
        bullets: [
          "Fixed costs, such as venue hire, AV and the management fee, versus per-guest costs, such as catering, rooms and transport",
          "VAT: hotel accommodation and passenger transport within Italy carry 10%, while the standard rate is 22%, so ask which rate applies to each line",
          "Costs that appear late: the SIAE music licence, overtime, municipal and access fees, supplier travel and weather plans",
          "Payment schedule: typically 30% at contract, 40% about 60 days before and 30% about 14 days before, mirrored to supplier terms",
        ],
        links: [
          { label: "How to build an event budget for Italy", slug: "event-budget-guide-italy" },
          { label: "How to choose an event management company", slug: "how-to-choose-an-event-management-company-in-italy" },
        ],
      },
      {
        heading: "Why Work With One Event Coordination Team?",
        paragraphs: [
          "Instead of coordinating separate venue, catering, AV, transport and accommodation suppliers yourself, you work through one event brief and one coordination team. We manage the moving parts; you keep one contact, one budget sheet and one invoice.",
          "We are an event management company, not a venue, a caterer or an equipment house. Every venue, caterer and AV supplier is an independent specialist we source, brief, contract and manage, and each proposal shows who is delivering what. Creative direction stays with specialist suppliers or your own agency, and we work alongside them.",
        ],
        bullets: [
          "One brief that every supplier works from",
          "Safety and licensing documents requested from each supplier before it is proposed",
          "Contract terms mirrored between your agreement with us and each supplier",
          "A backup vehicle held for every transport job",
          "One point of contact for changes, before and during the event",
        ],
      },
      {
        heading: "Event Management Destinations in Italy",
        afterFaq: true,
        paragraphs: [
          "Each destination page covers airports, access rules and the transport and logistics we coordinate there.",
        ],
        links: [
          { label: "Corporate events in Rome", slug: "rome-corporate-events" },
          { label: "MICE services in Rome", slug: "rome-mice-services" },
          { label: "Corporate events in Milan", slug: "milan-corporate-events" },
          { label: "MICE services in Milan", slug: "milan-mice-services" },
          { label: "Event management in Florence", slug: "florence-event-management" },
          { label: "MICE services in Venice", slug: "venice-mice-services" },
          { label: "Naples", slug: "naples" },
          { label: "Bologna", slug: "bologna" },
          { label: "Verona", slug: "verona" },
          { label: "Lake Como", slug: "lake-como" },
          { label: "Tuscany", slug: "tuscany" },
          { label: "Amalfi Coast", slug: "amalfi-coast" },
        ],
      },
      {
        heading: "Event Services in Italy",
        afterFaq: true,
        links: [
          { label: "Corporate event management", slug: "corporate-events-italy" },
          { label: "Conferences & MICE services", slug: "conferences-mice-italy" },
          { label: "Incentive travel", slug: "incentive-travel-italy" },
          { label: "Event transportation", slug: "event-transportation-italy" },
          { label: "Planning a corporate retreat", slug: "corporate-retreat-planning-italy" },
          { label: "Luxury event management", slug: "luxury-event-management-italy" },
          { label: "Destination wedding planning", slug: "destination-weddings-italy" },
          { label: "Event services: venues, catering, AV and staff", slug: "event-services-italy" },
        ],
      },
    ],
    faqs: [
      {
        q: "Can you organise corporate events anywhere in Italy?",
        a: "Yes. We coordinate events across Italy through local suppliers vetted the same way in every city. What matters is venue availability, supplier coverage and lead time, so we confirm feasibility after the first brief and tell you plainly if a location does not work for your date or budget.",
      },
      {
        q: "Which Italian cities do you cover?",
        a: "Rome, Milan, Florence, Venice, Naples, Bologna, Verona, Lake Como, Tuscany and the Amalfi Coast, plus Turin, Puglia, Sicily and Sardinia through local partners, case by case. If your destination is not on the list, send us the dates and guest count and we will tell you what is possible.",
      },
      {
        q: "Can you arrange accommodation for event guests?",
        a: "Yes. We source hotels and villas near the venue, negotiate room blocks with clear cut-off and attrition terms and manage one rooming list. Accommodation is its own line on the same budget sheet and invoice as the event.",
      },
      {
        q: "Can you arrange airport transfers and group transportation?",
        a: "Yes, through licensed partner operators: sedans, vans, minibuses of 16–35 seats and coaches of 50+ seats, sized to the group and its luggage. Arrival waves, hotel-to-venue shuttles and late returns are planned with the event, with a backup vehicle held for every job.",
      },
      {
        q: "Do you manage multi-day corporate events?",
        a: "Yes. Offsites, incentive trips and multi-city itineraries of three to five nights are a core format. We coordinate hotels, transport, venues and experiences across the days, with a coordinator on site for the duration.",
      },
      {
        q: "Can you organise conferences for 100+ guests?",
        a: "Yes, up to several hundred delegates. We source the venue and AV, run registration and hosts through partners, manage delegate hotel blocks and shuttles and coordinate on site. Content, speakers and session design stay with you or your PCO.",
      },
      {
        q: "Can you arrange gala dinners?",
        a: "Yes. We source the venue and caterer, brief the AV and staging partners, build the run of show and seating plan with you and manage timing on the night. Gala dinners and award ceremonies are a standard part of our corporate event work.",
      },
      {
        q: "Can you source private villas and historic venues?",
        a: "Yes, through vetted partners: villas and estates across Lake Como, Tuscany, the Amalfi Coast and Rome, and palaces and historic venues in city centres. We ask each supplier for the safety and licensing documents that apply and check access, capacity and load-in before a venue is proposed.",
      },
      {
        q: "Do you provide AV and event production?",
        a: "We manage production through specialist partners: stage, lighting, sound, screens and presentation equipment, briefed to one schedule. We do not own equipment, and creative direction can come from your own agency, with us working alongside it.",
      },
      {
        q: "Can you organise incentive travel programmes?",
        a: "Yes. A typical programme runs three to five nights in one or two destinations, with a welcome dinner, an experience day and a gala evening. We coordinate hotels, transport and venues; experiences are delivered by licensed guides and providers.",
      },
      {
        q: "Can you manage events in Tuscany and Lake Como?",
        a: "Yes. Both need access planning: Tuscan estates are often reached by lanes a coach cannot use, and Lake Como has narrow lakeside roads and ferry crossings. We check the final approach with each property and size the vehicles and boat legs to fit.",
      },
      {
        q: "How much does event management in Italy cost?",
        a: "It depends on guest count, destination, venue type, accommodation, catering, production, transport and duration, so we do not publish fixed packages. Every quote is itemised, with supplier costs line by line and a clear management fee, and events are typically billed 30% at contract, 40% about 60 days before and 30% about 14 days before.",
      },
      {
        q: "How far in advance should I book?",
        a: "For 50+ guests allow eight to twelve weeks, and three to six months for an incentive programme of 50 or more. Peak summer and trade-fair weeks, such as the Salone del Mobile in Milan and Vinitaly in Verona, both in April, need earlier planning because hotels and vehicles fill. Small offsites can be organised faster.",
      },
      {
        q: "Can you manage an event if I'm planning from outside Italy?",
        a: "Yes. Most of the coordination can be done remotely: venue research, supplier proposals, accommodation, transport, production and event-day logistics, with local partners delivering on the ground and a dispatch team in Rome reachable 24/7. We work by email and call across time zones.",
      },
    ],
    related: ["event-services-italy", "corporate-events-italy", "conferences-mice-italy", "incentive-travel-italy", "for-event-agencies", "how-to-choose-an-event-management-company-in-italy"],
    cta: { label: "Request an event quote", service: "event" },
    serviceType: "Event management",
    areaServed: ["Italy"],
    sources: [
      { label: "ICCA 2024 rankings: Italy second worldwide (Kongres Magazine)", url: "https://kongres-magazine.eu/2025/05/icca-reaffirms-italy-as-europes-top-conference-destination/" },
      { label: "Osservatorio Italiano dei Congressi e degli Eventi 2024 (Federcongressi&eventi)", url: "https://www.federcongressi.it/it/press/cresceilturismocongressualeoice2024/" },
      { label: "Italy VAT rates (Stripe)", url: "https://stripe.com/resources/more/italy-vat-rate" },
    ],
    updated: "2026-09-21",
  }),

  page({
    slug: "event-services-italy",
    kind: "service",
    title: "Event Services in Italy | Venues, Catering, AV & Staff",
    description:
      "Event services in Italy coordinated by one team: venue sourcing, catering, AV, décor, hosts and security through vetted suppliers, on one budget.",
    h1: "Event Services in Italy",
    nav: "Event services",
    lead:
      "The suppliers behind an event — venues, catering, AV, décor, hosts and security — sourced, briefed and managed by one team, so you deal with one contact instead of six vendors.",
    parent: { slug: "event-management-italy", label: "Event management" },
    tags: [],
    facts: [
      { label: "How it works", value: "We coordinate specialist suppliers rather than deliver in-house: we source, brief, contract and manage them, and you deal with one team" },
      { label: "What we don't own", value: "Venues, kitchens, AV equipment or studios — every supplier is an independent specialist, and the proposal says so" },
      { label: "Supplier checks", value: "We ask each supplier for the safety and licensing documents that apply before proposing them" },
      { label: "Budget", value: "Itemised supplier costs plus a clear management fee, shown line by line on one budget sheet" },
      { label: "Scale", value: "From small offsites of 10–20 guests to conferences of several hundred delegates" },
    ],
    included: [
      "Venue sourcing: congress centres, hotels, palaces and villas, proposed against your budget and guest count",
      "Catering sourcing for group dinners, receptions and gala evenings",
      "AV sourcing for conferences, galas and award ceremonies",
      "Décor and styling through specialist suppliers",
      "Hosts, hostesses, registration staff and interpreters through partners",
      "Licensed security providers through partners, on request",
      "One budget sheet, one contract path and one invoice",
    ],
    sections: [
      {
        heading: "Venues, city by city",
        bullets: [
          "Rome: the EUR district around the La Nuvola congress centre, hotel congress facilities, and historic venues inside the Centro Storico restricted zone",
          "Milan: MiCo and the Fieramilano Rho fair grounds for conferences and exhibitions; Porta Nuova and CityLife for modern venues; Navigli and Brera for smaller, characterful spaces",
          "Florence and Tuscany: historic city venues, or countryside villas and estates in Chianti and the Val d'Orcia",
          "Venice: hotel congress facilities, and the Biennale pavilions at the Giardini and Arsenale in exhibition years — the historic centre has no roads, so access is planned by water",
          "Lake Como, the Amalfi Coast and Tuscany: villas, with narrow access roads built into the plan from the start",
        ],
      },
      {
        heading: "Dinners, receptions and catering",
        paragraphs: [
          "Group dinners in a local restaurant or private venue, receptions and gala evenings are sourced from vetted caterers and venues, with menus and service timing written into the supplier contract so what was agreed is what is delivered.",
        ],
      },
      {
        heading: "AV, registration and staffing",
        paragraphs: [
          "For conferences, galas and award ceremonies we source the AV supplier and the front-of-house team together, so the registration desk, the hosts and the technical setup are briefed to one schedule rather than three.",
        ],
      },
      {
        heading: "What we don't provide ourselves",
        paragraphs: [
          "We are an event management company, not a venue, a caterer or an equipment house. Creative production — staging design, content and creative direction — stays with specialist suppliers or your own agency, and we work alongside them.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you own venues, kitchens or equipment?",
        a: "No. Every venue, caterer and AV supplier is an independent specialist we source and manage, and each proposal shows who is delivering what.",
      },
      {
        q: "How do you check suppliers before proposing them?",
        a: "We ask each supplier for the safety and licensing documents that apply, and compare proposals on price, terms and fit for your guest count before anything is put to you.",
      },
      {
        q: "Can you arrange a photographer, DJ or florist?",
        a: "For weddings, yes: photography, florals and music are part of our wedding planning service. For other events, tell us what is needed. If we can source it through a trusted supplier we will say so and quote it as a separate line, and if we cannot we will tell you plainly.",
      },
      {
        q: "Can transport and hotels be booked with the event?",
        a: "Yes, as separate lines on the same budget sheet and invoice.",
      },
      {
        q: "Do you work outside Rome?",
        a: "Yes — Milan, Florence, Tuscany, Lake Como and the Amalfi Coast, using local suppliers vetted the same way in every city.",
      },
    ],
    related: ["event-management-italy", "corporate-events-italy", "conferences-mice-italy", "luxury-event-management-italy", "destination-weddings-italy", "event-permits-and-licences-italy"],
    cta: { label: "Request an event quote", service: "event" },
    serviceType: "Event management services",
    areaServed: ["Italy"],
  }),

  page({
    slug: "corporate-events-italy",
    kind: "service",
    title: "Corporate Event Management in Italy | Offsites & Retreats",
    description:
      "Corporate event management in Italy: offsites, retreats, team events and gala dinners with hotel blocks, transport and venues through vetted partners.",
    h1: "Corporate Event Management in Italy",
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
      "Stage, AV and run-of-show coordination for gala dinners and award ceremonies",
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
      {
        heading: "Gala dinners and award ceremonies",
        paragraphs: [
          "A gala evening has its own shape: a reception, a seated dinner, an awards segment or speeches, then a close. We build the run-of-show with your team, propose venues with the right stage and AV setup through vetted partners, and manage the seating plan and timing on the night so the programme runs to schedule.",
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
      {
        q: "Can you run an award ceremony or gala dinner with a stage and AV?",
        a: "Yes — we source the venue and AV/staging partners, build the run-of-show with you, and manage the seating plan and timing on the night.",
      },
    ],
    related: ["rome-corporate-events", "event-management-italy", "how-to-plan-a-gala-dinner-in-italy", "corporate-retreat-planning-italy", "incentive-travel-italy", "how-to-plan-a-corporate-event-in-italy"],
    cta: { label: "Request a corporate event quote", service: "event" },
    serviceType: "Corporate events",
    areaServed: ["Italy"],
  }),

  page({
    slug: "christmas-corporate-events-italy",
    kind: "service",
    title: "Christmas & NYE Corporate Party Transport | Italy",
    description:
      "Guest transport for company Christmas parties and New Year's Eve events in Italy: hotel-to-venue shuttles, late-night returns and backup vehicles.",
    h1: "Christmas & New Year's Eve Corporate Party Transport",
    nav: "Christmas & NYE party transport",
    lead:
      "Shuttles, late-night returns and a backup vehicle for the company Christmas party or a New Year's Eve group in Rome, Milan, Florence and beyond — booked early, before the season fills up.",
    parent: { slug: "transportation", label: "Transportation" },
    tags: [],
    facts: [
      { label: "Peak window", value: "Early December through 6 January; city centres run Christmas markets and lights that add to evening traffic" },
      { label: "Booking lead time", value: "6–10 weeks ahead for December weekends; venues and vehicles both book out early in this window" },
      { label: "New Year's Eve", value: "Many Italian city centres close streets around midnight for public celebrations; we plan the drop-off and pick-up point outside the closure zone in advance" },
      { label: "Typical group", value: "20–150 guests for a company party; smaller VIP or board-level NYE bookings also common" },
    ],
    included: [
      "Hotel-to-venue shuttle loops timed to the party or dinner",
      "Late-night return waves, including after-midnight NYE pickups",
      "A backup vehicle held for the evening",
      "Route planning around Christmas-market and NYE street closures",
      "One dispatch number for the whole evening",
    ],
    sections: [
      {
        heading: "Why this season needs earlier planning",
        paragraphs: [
          "December combines Christmas-market crowds, shorter daylight and, on 31 December, city-centre road closures for public celebrations. None of that is a problem if it is planned for — but vehicles and drivers for the popular Friday and Saturday dates in December get booked well before the season starts, so we ask for dates as early as possible.",
        ],
      },
      {
        heading: "A typical evening",
        bullets: [
          "Hotel pickup, timed to the dinner or party start",
          "A held vehicle or driver on standby through the evening for early leavers",
          "A late-night return wave, staggered so guests are not queuing at once",
          "For NYE, a drop-off and pickup point confirmed outside any street-closure zone",
        ],
      },
    ],
    faqs: [
      {
        q: "How early should we book a December date?",
        a: "6–10 weeks ahead for popular Friday and Saturday nights; earlier is safer, since December is our busiest month for evening transport.",
      },
      {
        q: "Can you handle a late finish on New Year's Eve?",
        a: "Yes — we plan for after-midnight pickups and confirm the drop-off point in advance, since many city centres close streets around midnight.",
      },
      {
        q: "Do you cover the whole evening, or just drop-off?",
        a: "Both — a single drop-off, or a held vehicle for the evening with a return wave at the end, whichever your event needs.",
      },
    ],
    related: ["corporate-events-italy", "event-transportation-italy", "group-transportation-italy", "event-management-italy"],
    cta: { label: "Request a Christmas or NYE quote", service: "event" },
    serviceType: "Seasonal corporate event transport",
    areaServed: ["Italy"],
  }),

  page({
    slug: "conferences-mice-italy",
    kind: "service",
    title: "Conferences & MICE Services in Italy | Venues & Delegates",
    description:
      "MICE services in Italy: venue sourcing, registration and hosts, AV, hotel blocks, delegate transport and on-site coordination for conferences and exhibitions.",
    h1: "Conferences & MICE Services in Italy",
    nav: "Conferences & MICE",
    lead:
      "Venue sourcing, registration, AV, hotel blocks, delegate transport and on-site coordination for conferences, meetings and exhibitions across Italy.",
    parent: { slug: "event-management-italy", label: "Event management" },
    tags: [],
    facts: [
      { label: "Italy in the market", value: "Second in the world for international association meetings, with 635 in 2024; six Italian cities are in the global top 100" },
      { label: "Leading cities", value: "Rome ninth (114 meetings) and Milan fourteenth (100 meetings, up from 29th)" },
      { label: "Growth", value: "Collective and MICE trips are growing about three times faster than routine business trips" },
      { label: "Our scope", value: "Venue sourcing, registration and hosts, AV, hotel blocks, delegate transport and on-site coordination; content and speakers stay with you or your PCO" },
    ],
    included: [
      "Venue sourcing: congress centres, fair grounds and hotel congress facilities",
      "Registration desk, badge/check-in flow, hosts and interpreters through partners",
      "AV sourcing for plenaries, breakouts and gala evenings",
      "Hotel blocks with cut-off and attrition management",
      "Delegate arrival and departure waves, venue shuttles and VIP and speaker transfers",
      "On-site coordination for the whole programme",
    ],
    sections: [
      {
        heading: "Fair and conference weeks",
        paragraphs: [
          "Milan, Verona, Bologna and Rimini host major fairs; Rome and Milan host large conferences. In those weeks hotels fill and vehicles are scarce, so blocks and fleets should be reserved before flights are booked. Book early and we hold backups.",
        ],
      },
      {
        heading: "Registration, staffing and the delegate experience",
        paragraphs: [
          "The registration desk is the first thing a delegate sees, so we plan it as part of the event, not an afterthought. Through vetted staffing partners we set up the check-in flow, badge printing and host briefing, and we time it against the same arrival waves as the transport plan, so there's no queue building up at the door while a shuttle unloads outside.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you work with our PCO?",
        a: "Yes. Many clients are PCOs or agencies who need an operating partner on the ground in Italy.",
      },
      {
        q: "Can you provide registration desks and hosts?",
        a: "Yes, through vetted staffing partners: check-in flow, badge printing and host briefing, timed to your delegate arrival waves.",
      },
      {
        q: "Do you design the conference programme itself?",
        a: "No — content, speakers and session design stay with you or your PCO. We run the operating side around the programme: venue, registration, AV, hotel blocks and delegate arrivals.",
      },
    ],
    related: ["rome-mice-services", "milan-mice-services", "venice-mice-services", "how-to-plan-a-conference-in-italy", "conference-av-checklist-italy", "for-event-agencies"],
    cta: { label: "Request a MICE quote", service: "event" },
    serviceType: "Conference and MICE services",
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
      "Ground handling for delegations, roadshows and executive visits: airport meet-and-greet, chauffeurs, hotel blocks and meeting arrangements.",
    parent: { slug: "services", label: "Services" },
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
    title: "Destination Wedding Planning in Italy | Full Service",
    description:
      "Full-service destination wedding planning in Italy: venue, ceremony, catering, décor, photography, music, guest hotels and transport, coordinated by one team.",
    h1: "Destination Wedding Planning in Italy",
    nav: "Destination weddings",
    lead:
      "One team plans your Italian wedding from the first venue search to the last shuttle home: venue, ceremony, catering, décor, photography, music, guest hotels and transport, delivered through vetted local suppliers.",
    parent: { slug: "services", label: "Services" },
    tags: [],
    facts: [
      { label: "The market", value: "15,100+ weddings of foreign couples in Italy in 2024, about €931.6 million in direct revenue; the sector reached about €1.1 billion in 2025" },
      { label: "Average budget", value: "€61,500 per wedding in 2024 (+4.2%); catering takes 36%" },
      { label: "Where couples come from", value: "The United States 30.4% of requests, the United Kingdom 20.7%, Germany 8.7%" },
      { label: "What we do", value: "End-to-end planning and coordination, from the venue and ceremony to guest hotels and transport" },
      { label: "What we don't own", value: "Venues, kitchens, studios or equipment: each part is delivered by an independent local supplier that we source and manage" },
    ],
    included: [
      "A concept, budget and timeline for the whole wedding weekend",
      "Venue search and booking: villas, estates, castles and hotels",
      "Ceremony planning, civil, religious or symbolic, with paperwork steps mapped early",
      "Catering and bar through local caterers",
      "Décor, florals and styling",
      "Photography and video",
      "Music and entertainment",
      "Welcome dinner, rehearsal dinner and farewell brunch, where you want them",
      "Guest hotels and transport for the weekend",
      "A coordinator on site for the wedding days",
    ],
    sections: [
      {
        heading: "How we plan a wedding",
        bullets: [
          "Brief: guest count, budget, dates and the feel you want, agreed on a first call",
          "Venue and date: a shortlist that fits your guest count and ceremony, with availability checked before you commit",
          "Suppliers: proposals from caterers, florists, photographers and musicians, compared on price, terms and fit with your style",
          "Ceremony and paperwork: the steps and deadlines for your nationality and the town hall (comune) involved, coordinated with the venue and the officiant or church",
          "Guests: hotel blocks and a transport plan built from the guest list and the timeline",
          "The weekend: a run of show for each day and a coordinator on site",
        ],
      },
      {
        heading: "Civil, religious or symbolic ceremony",
        paragraphs: [
          "A legally binding ceremony in Italy is either civil, held at the town hall or a venue the comune has approved, or religious, which involves extra paperwork through your parish. A symbolic ceremony has no legal effect and can be held wherever the venue allows, and some couples complete the legal steps at home. The requirements depend on your nationality and on the comune, so we confirm them at the start.",
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
      {
        heading: "Guest hotels and transport",
        paragraphs: [
          "Getting guests from several airports to a villa outside the nearest town is the part everyone remembers. We plan it with the rest of the wedding: hotel blocks with cut-off dates and rooming lists, and shuttles timed to the ceremony and the last dance. Both are also available on their own, on separate pages.",
        ],
      },
      {
        heading: "Already working with a planner?",
        paragraphs: [
          "Then we work alongside them. Your planner keeps the design and the day; we take guest transport and accommodation, share the plan with your planner and provide one dispatch number for the wedding day.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you plan the whole wedding?",
        a: "Yes. We plan and coordinate the whole weekend: venue, ceremony, catering, décor, photography, music, guest hotels and transport, through independent local suppliers that we source, brief and manage.",
      },
      {
        q: "Can we have a legal ceremony in Italy?",
        a: "In most cases, yes. The requirements depend on your nationality and on the town hall (comune) where the ceremony takes place. Religious ceremonies need extra paperwork through your parish, and symbolic ceremonies are not legally binding. We confirm what applies to you at the start and map the deadlines.",
      },
      {
        q: "Do you own the venues or the equipment?",
        a: "No. We don't own venues, kitchens, studios or equipment. Every venue, caterer, florist, photographer and musician is an independent professional we source and manage, and the proposal shows who is delivering what.",
      },
      {
        q: "How far ahead should we start planning?",
        a: "Twelve months ahead is comfortable for a peak-season date, and the best venues for May, June and September book first. A shorter timeline can work for a smaller wedding, and we tell you what is realistic after the first call.",
      },
      {
        q: "Can we book only the guest transport and hotels?",
        a: "Yes. If you already have a planner, or you are organising the wedding yourselves, we can take guest transport and accommodation on their own.",
      },
    ],
    related: ["tuscany-wedding-planning", "lake-como-wedding-planning", "amalfi-coast-wedding-planning", "getting-married-in-italy-civil-religious-symbolic", "destination-wedding-budget-italy", "wedding-accommodation-italy"],
    cta: { label: "Plan my wedding", service: "wedding" },
    serviceType: "Destination wedding planning",
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
    related: ["group-transportation-italy", "cultural-religious-group-transport-italy", "for-tour-operators", "minibus-coach-hire-italy"],
    cta: { label: "Request a group quote", service: "group" },
    serviceType: "Group travel logistics",
    areaServed: ["Italy"],
  }),

  page({
    slug: "luxury-event-management-italy",
    kind: "service",
    title: "Luxury Event Management in Italy | VIP & Discreet",
    description:
      "Luxury event management in Italy for UHNW clients, family offices and premium brands: villas, galas, VIP dinners, discreet security coordination, one contact.",
    h1: "Luxury Event Management in Italy",
    nav: "Luxury events",
    lead:
      "One accountable team across the venue, catering, production, security coordination and on-site management — for clients who need discretion and a backup for everything.",
    parent: { slug: "services", label: "Services" },
    tags: [],
    facts: [
      { label: "What's different here", value: "Same partner network as our standard services, run at luxury tier: S-Class or equivalent sedans, V-Class vans, licensed security and discreet drivers as standard, not an upgrade" },
      { label: "Typical clients", value: "UHNW families, family offices, luxury brands, talent management and premium event agencies" },
      { label: "Scope", value: "Villa and venue sourcing, gala and dinner planning, security through licensed partners, on-site event coordination, with VIP transport and luxury hotel blocks alongside" },
      { label: "Market context", value: "Italy hosted 367,981 business events in 2024 (+8.2%), worth about €11.7 billion in direct contribution — a market with a genuine luxury and UHNW segment" },
    ],
    included: [
      "Villa, palace and luxury venue sourcing and negotiation",
      "Gala and VIP dinner planning: seating, run of show and supplier briefs",
      "Licensed security providers through partners, on request",
      "Luxury vehicles and discreet, briefed drivers, and luxury hotel sourcing, alongside the event",
      "A single named contact across the event, accommodation and transport",
      "A backup plan for every supplier and every vehicle",
    ],
    sections: [
      {
        heading: "Discretion is a process, not a promise",
        paragraphs: [
          "For luxury and UHNW clients, the risk is not usually the main event — it's a driver who doesn't know the route, a hotel that mishandles a guest list, or no backup when a vehicle fails. We brief every driver and supplier, confirm details a day ahead, and hold a backup for every vehicle class, so nothing depends on one person or one car working perfectly.",
        ],
      },
      {
        heading: "What this covers, and what stays with specialists",
        paragraphs: [
          "We plan and coordinate the event: venue, catering, entertainment, styling, production and security are sourced through vetted specialist partners we brief and manage, with VIP transport and accommodation alongside when needed. You deal with one team even though several suppliers are involved.",
        ],
      },
      {
        heading: "Luxury galas and VIP dinners",
        paragraphs: [
          "A private gala or VIP dinner adds guest-list discretion to the usual event work: who is seated near whom, who arrives first, which guests should never be photographed together. We build the seating plan and run-of-show with you, brief the venue and catering partners on the discretion requirements, and keep a coordinator on-site through the evening so the plan holds even as it inevitably shifts.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you handle security directly?",
        a: "Through licensed security providers, quoted as a separate line. We brief them alongside the transport and dispatch teams so everyone works from the same schedule.",
      },
      {
        q: "Can you source a villa, not just a hotel?",
        a: "Yes, through vetted partners across Lake Como, Tuscany, the Amalfi Coast and Rome, with transport and staffing coordinated around it.",
      },
      {
        q: "How is this different from your standard corporate or wedding services?",
        a: "Same network, luxury tier as standard rather than an add-on: discreet drivers, security on request, villa-level accommodation and a single senior contact throughout.",
      },
      {
        q: "Can you manage guest-list discretion for a private gala?",
        a: "Yes — seating plans, arrival order and who should or shouldn't be seated or photographed together are briefed to every venue, catering and security partner in advance.",
      },
    ],
    related: ["event-services-italy", "how-to-plan-a-gala-dinner-in-italy", "vip-transfers-italy", "destination-weddings-italy", "corporate-events-italy"],
    cta: { label: "Request a luxury event proposal", service: "event" },
    serviceType: "Luxury event management",
    areaServed: ["Italy"],
  }),

  page({
    slug: "italy-dmc-services",
    kind: "service",
    title: "Italy DMC Services | Ground Transport, Hotels & Events",
    description:
      "Destination management company services in Italy for agencies, tour operators and corporates: ground transport, group hotels and event logistics.",
    h1: "Italy DMC Services",
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

  page({
    slug: "birthday-celebration-transport-italy",
    kind: "service",
    title: "Birthday & Milestone Celebration Transport | Italy",
    description:
      "Group transport for birthday celebrations in Italy: guest shuttles, a chauffeur for the milestone trip, hotel blocks and a backup vehicle for the night.",
    h1: "Birthday & Milestone Celebration Transport in Italy",
    nav: "Birthday celebration transport",
    lead:
      "The transport side of a birthday trip or party in Italy — guest shuttles, a hotel block if the group is staying, and a driver who knows the venue and the return time. We don't plan the party itself.",
    parent: { slug: "transportation", label: "Transportation" },
    tags: [],
    facts: [
      { label: "What we do", value: "Guest transport, hotel blocks and a chauffeur for the day or evening; venue booking, catering, decor and entertainment stay with the venue or a specialist planner" },
      { label: "Typical booking", value: "A shuttle loop for a restaurant or venue evening, or a full-day chauffeur for a milestone-birthday trip (Tuscany, the Amalfi Coast, Lake Como)" },
      { label: "Group size", value: "From a couple to 40+ guests for a milestone celebration with a hired venue" },
      { label: "Milestone trips", value: "18th, 21st, 30th, 40th, 50th, 60th and 70th birthdays are the most common reasons a group books a multi-day Italy trip through us" },
    ],
    included: [
      "Guest shuttle loops to and from the venue",
      "A chauffeur for a milestone-birthday day trip or multi-day stay",
      "Hotel room blocks for out-of-town guests",
      "A backup vehicle held for the evening",
      "One dispatch number for the group",
    ],
    sections: [
      {
        heading: "What we handle, and what stays with a planner",
        paragraphs: [
          "We are the transport and accommodation layer: getting guests to the venue, back to their hotel, and sized correctly for the group. Venue hire, catering, decor, cake and entertainment are better handled by the venue itself or a dedicated party planner — we don't produce those and won't pretend to.",
        ],
      },
      {
        heading: "A typical milestone-birthday trip",
        bullets: [
          "Airport or station pickup for the group on arrival",
          "A chauffeur for day trips — a vineyard, the coast, a city we haven't visited yet",
          "Evening shuttle to the celebration venue and a late return",
          "A backup vehicle on standby for the night itself",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you book the venue or catering?",
        a: "No — we handle transport and accommodation. We're happy to coordinate timing with a venue or planner you've already booked.",
      },
      {
        q: "Can you arrange transport for just one evening?",
        a: "Yes, a shuttle loop for a single celebration night, or a full itinerary for a multi-day trip — whichever fits.",
      },
      {
        q: "Do you handle large milestone groups?",
        a: "Yes, with minibuses or coaches sized to the group, and hotel blocks negotiated alongside the transport.",
      },
    ],
    related: ["private-social-event-transport-italy", "group-transportation-italy", "hotel-group-bookings-italy", "marriage-proposal-transfer-italy"],
    cta: { label: "Request birthday celebration transport", service: "group" },
    serviceType: "Private celebration transport",
    areaServed: ["Italy"],
  }),

  page({
    slug: "baby-shower-family-celebration-transport-italy",
    kind: "service",
    title: "Baby Shower & Family Celebration Transport | Italy",
    description:
      "Guest transport for baby showers, gender-reveal gatherings and family celebrations in Italy: shuttles, hotel blocks and one coordinator for the day.",
    h1: "Baby Shower & Family Celebration Transport in Italy",
    nav: "Family celebration transport",
    lead:
      "Guest transport and accommodation for a baby shower, gender-reveal gathering or family celebration — the venue, styling and catering stay with the host or venue.",
    parent: { slug: "transportation", label: "Transportation" },
    tags: [],
    facts: [
      { label: "What we do", value: "Guest transport and, for out-of-town family, hotel room blocks; venue styling, catering and games stay with the host or venue" },
      { label: "Typical booking", value: "A shuttle for guests arriving from the airport or a nearby city, or a chauffeur day for a family group visiting for the occasion" },
      { label: "Group size", value: "Usually 10–30 guests" },
      { label: "Common venues", value: "A family home, a villa or agriturismo rental, or a private room at a restaurant" },
    ],
    included: [
      "Guest shuttle to and from the venue",
      "Hotel room blocks for family travelling from abroad",
      "A chauffeur day for the visiting family, if needed",
      "One coordinator for arrival timing",
      "A backup vehicle if the group is large enough to need one",
    ],
    sections: [
      {
        heading: "What we handle, and what stays with the host",
        paragraphs: [
          "We move people and, where needed, put them in a hotel — not decorate the venue or plan the games. If out-of-town family are flying in for a baby shower or christening weekend, we can also handle their airport transfer and a short day trip while they're here.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you help with venue decoration or catering?",
        a: "No — that stays with the host or venue. We handle guest transport and, if needed, accommodation for travelling family.",
      },
      {
        q: "Can you arrange a small shuttle for a private villa?",
        a: "Yes — vans or minibuses sized to your guest list, timed to the event.",
      },
    ],
    related: ["private-social-event-transport-italy", "group-transportation-italy", "wedding-accommodation-italy", "hotel-group-bookings-italy"],
    cta: { label: "Request family celebration transport", service: "group" },
    serviceType: "Private celebration transport",
    areaServed: ["Italy"],
  }),

  page({
    slug: "private-social-event-transport-italy",
    kind: "service",
    title: "Private & Social Event Transport in Italy",
    description:
      "Guest transport for anniversaries, graduations, retirements, family reunions and other private celebrations in Italy, with hotel blocks and a backup vehicle.",
    h1: "Private & Social Event Transport in Italy",
    nav: "Private event transport",
    lead:
      "One transport plan for anniversaries, graduations, retirements, reunions and any private celebration that needs guests moved and, sometimes, housed — sized to your group, not a template.",
    parent: { slug: "transportation", label: "Transportation" },
    tags: [],
    facts: [
      { label: "Occasions we cover", value: "Anniversaries, graduations, retirements, family reunions, welcome and farewell gatherings — any private group event, not just the ones with their own page" },
      { label: "Why one page, not several", value: "The transport need is the same shape for each — a shuttle or chauffeur, sometimes a hotel block — the occasion changes, the logistics don't" },
      { label: "Group size", value: "From a family of six to 80+ for a reunion or milestone anniversary" },
      { label: "Typical booking", value: "A single evening shuttle, or a multi-day itinerary with hotel blocks for a reunion or anniversary trip" },
    ],
    included: [
      "Guest shuttle loops sized to your group",
      "Hotel room blocks where the group is staying over",
      "A chauffeur for day trips built into the occasion",
      "A backup vehicle for the day or evening",
      "One dispatch contact throughout",
    ],
    sections: [
      {
        heading: "Tell us the occasion and the numbers",
        paragraphs: [
          "Whatever the reason for the gathering, the questions are the same: how many guests, where they're staying, what time the venue needs them and when they need to leave. Send us those and we return a fixed transport plan — we don't need a separate page or a different process for a graduation versus a 40th-anniversary trip.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you handle one-off single-evening events?",
        a: "Yes — a shuttle loop for one evening is a common booking, priced separately from multi-day trips.",
      },
      {
        q: "Can you combine transport and hotel blocks?",
        a: "Yes, on one invoice, for reunions and multi-day celebrations where out-of-town guests need rooms.",
      },
      {
        q: "What if our occasion isn't listed?",
        a: "If it's a private group that needs moving and, sometimes, housing, it fits here — tell us the details and we'll quote it.",
      },
    ],
    related: ["birthday-celebration-transport-italy", "group-transportation-italy", "hotel-group-bookings-italy", "group-travel-italy"],
    cta: { label: "Request private event transport", service: "group" },
    serviceType: "Private celebration transport",
    areaServed: ["Italy"],
  }),

  page({
    slug: "product-launch-fashion-event-transport-italy",
    kind: "service",
    title: "Product Launch & Fashion Event Transport | Italy",
    description:
      "Guest and VIP transport for product launches, brand activations and fashion events in Italy: shuttle loops, VIP cars and venue-access planning.",
    h1: "Product Launch & Fashion Event Transport in Italy",
    nav: "Launch & fashion event transport",
    lead:
      "Guest shuttles, VIP cars and venue-access planning for a product launch, brand activation or fashion-week event — we run the transport, your production team or agency runs the show.",
    parent: { slug: "transportation", label: "Transportation" },
    tags: [],
    facts: [
      { label: "What we do", value: "Guest and press arrival waves, VIP and talent transfers, venue-access planning; staging, production and creative direction stay with your agency" },
      { label: "Where this comes up most", value: "Milan, during fashion weeks and design week, and for brand launches in Rome and Milan" },
      { label: "Typical guest list", value: "Press, buyers, influencers and VIP guests, often arriving on a tight schedule around a single show time" },
      { label: "Access planning", value: "Milan's Area C charge and central-Rome ZTL rules are built into the drop-off plan, same as any other event in those cities" },
    ],
    included: [
      "Guest and press arrival waves timed to the show or launch",
      "VIP and talent transfers with named drivers",
      "Venue drop-off and access planning around city restrictions",
      "A dispatch desk for changes during the event",
      "Backup vehicles held for VIP guests",
    ],
    sections: [
      {
        heading: "We run the transport, not the show",
        paragraphs: [
          "A launch or fashion event lives or dies on timing — press arriving before doors close, VIPs not queuing with everyone else. We plan the arrival waves and venue access around your show schedule. Staging, lighting, the runway or the product reveal itself stay with your production team or agency; we don't produce those.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you handle a press list separately from VIP guests?",
        a: "Yes — different arrival waves and, where needed, different vehicle classes for press versus VIP guests.",
      },
      {
        q: "Do you work alongside our production or PR agency?",
        a: "Yes — we plug into their schedule as the transport and access-planning layer rather than duplicating what they do.",
      },
    ],
    related: ["milan-event-transportation", "corporate-events-italy", "vip-transfers-italy", "luxury-event-management-italy"],
    cta: { label: "Request launch event transport", service: "event" },
    serviceType: "Event transportation",
    areaServed: ["Italy"],
  }),

  page({
    slug: "entertainment-event-transport-italy",
    kind: "service",
    title: "Entertainment & Concert Event Transport | Italy",
    description:
      "Guest transport for concerts, festivals and entertainment events in Italy: group shuttles, VIP cars and late-night returns. We move guests, not the show.",
    h1: "Entertainment & Concert Event Transport in Italy",
    nav: "Entertainment event transport",
    lead:
      "Group shuttles and VIP transfers to a concert, festival or entertainment event — timed around the show, with a plan for the crowd at the end of the night.",
    parent: { slug: "transportation", label: "Transportation" },
    tags: [],
    facts: [
      { label: "What we do", value: "Guest and VIP transport to and from the venue; booking the artist, staging or production stays with the promoter or your entertainment agency" },
      { label: "The hard part", value: "The end of the night — everyone leaving a venue at once. We plan staggered pickup waves rather than one queue" },
      { label: "Typical booking", value: "A group shuttle from hotels to a venue, or VIP cars for a smaller guest list around a private performance" },
      { label: "Vehicle classes", value: "Sedans and vans for VIP guests, minibuses and coaches for larger groups" },
    ],
    included: [
      "Hotel-to-venue shuttle loops timed to doors and show start",
      "VIP transfers for a smaller guest list",
      "Staggered late-night return waves",
      "A staging area near the venue for pickup",
      "Backup vehicles for VIP guests",
    ],
    sections: [
      {
        heading: "We move the audience, not the act",
        paragraphs: [
          "Booking artists, staging, sound and production are outside what we do — that stays with the promoter or an entertainment agency. What we do well is getting a group of guests to a venue on time and home again afterwards, which is its own logistics problem once a few hundred people want to leave at the same moment.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you book the artist or entertainment?",
        a: "No — we handle guest transport only. We're glad to coordinate timing with whoever is producing the entertainment.",
      },
      {
        q: "How do you handle everyone leaving at once?",
        a: "Staggered return waves from a staging area near the venue, rather than one queue — planned in advance around the show's expected finish time.",
      },
    ],
    related: ["event-transportation-italy", "milan-event-transportation", "rome-event-transportation", "group-transportation-italy"],
    cta: { label: "Request entertainment event transport", service: "event" },
    serviceType: "Event transportation",
    areaServed: ["Italy"],
  }),

  page({
    slug: "cultural-religious-group-transport-italy",
    kind: "service",
    title: "Cultural & Religious Group Transport in Italy",
    description:
      "Group transport for pilgrimage, faith and cultural-heritage groups in Italy: coaches, hotel blocks and licensed guides, planned around access rules.",
    h1: "Cultural & Religious Group Transport in Italy",
    nav: "Cultural & religious group transport",
    lead:
      "Coaches, hotel blocks and licensed guides for pilgrimage, parish and cultural-heritage groups — the same careful planning we use for any large group, built around the sites you're visiting.",
    parent: { slug: "group-travel-italy", label: "Group travel" },
    tags: [],
    facts: [
      { label: "Pilgrim travel is real demand", value: "The 2025 Jubilee brought 33.4 million pilgrims to Rome; faith travel to Assisi, Loreto and Rome remains steady beyond Jubilee years" },
      { label: "Typical group", value: "Parish groups, diocese trips and faith-based tour groups, usually 20–60 travellers" },
      { label: "What we do", value: "Coaches and minibuses, hotel blocks near the sites, and licensed guides through partners; the spiritual or ceremonial programme stays with your group leader or diocese" },
      { label: "Common routes", value: "Rome's basilicas and the Vatican, Assisi, Loreto, and heritage sites across Tuscany and Umbria" },
    ],
    included: [
      "Coaches and minibuses with professional drivers",
      "Hotel blocks near the sites on your itinerary",
      "Licensed guides and entry reservations through partners",
      "Access and parking planning at each stop",
      "One quote, one contact for the whole group",
    ],
    sections: [
      {
        heading: "Planning around the sites, not just the roads",
        paragraphs: [
          "Basilicas, shrines and heritage sites have their own access rules, crowd patterns and, often, dress-code expectations — we plan arrival times and coach parking around those, not just the fastest route. The spiritual programme, liturgy and any ceremonial elements stay with your group leader or diocese; we handle the ground logistics around them.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you arrange guides for religious sites?",
        a: "Only nationally licensed guides, as Italian law requires — booked as a separate line through partners.",
      },
      {
        q: "Can you plan a multi-site pilgrimage itinerary?",
        a: "Yes — Rome, Assisi and other sites in one trip, with hotel blocks and coach transport planned around each stop.",
      },
    ],
    related: ["group-travel-italy", "rome-to-assisi-transfer", "for-tour-operators", "tour-group-hotel-booking-italy"],
    cta: { label: "Request pilgrimage group transport", service: "group" },
    serviceType: "Group travel logistics",
    areaServed: ["Italy"],
  }),
];
