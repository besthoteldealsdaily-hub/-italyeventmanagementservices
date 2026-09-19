import { page } from "../builders";
import type { ContentPage } from "../types";

/** City and region hub pages (Rome lives in published.ts). Every page tagged with a city's slug is listed on that city's page. */

export const cityPages: ContentPage[] = [
  page({
    slug: "milan",
    kind: "city",
    title: "Milan: Transfers, Chauffeurs, Fairs & Corporate Events",
    description:
      "Ground services in Milan: Malpensa, Linate and Bergamo transfers, chauffeurs, fair-week transport and corporate events, run by a local dispatch team.",
    h1: "Ground Services in Milan",
    nav: "Milan",
    lead:
      "Airport transfers, executives and delegations, fair-week shuttles and Lake Como connections — coordinated for Italy's business capital.",
    tags: ["milan"],
    facts: [
      { label: "Airports", value: "Malpensa (31.2 million passengers in 2025, +8.6%), Linate (the city airport) and Bergamo (16.9 million)" },
      { label: "Tourism spend", value: "Lombardy received €9.9 billion in foreign visitor spending, about 17.6% of Italy's total" },
      { label: "Meetings", value: "Fourteenth in the world for international association meetings (100 in 2024, up from 29th) and third for average attendees per meeting" },
      { label: "Trade fairs", value: "Salone del Mobile, MIDO, EICMA, Lineapelle, MICAM and more at Fieramilano Rho" },
      { label: "City access", value: "The central Area C zone charges vehicles to enter (a €7.50 ticket; weekday hours, extended to weekends in 2026)" },
    ],
    sections: [
      {
        heading: "What we do in Milan",
        bullets: [
          "Airport transfers from Malpensa, Linate and Bergamo, including group arrival waves",
          "Executive chauffeurs by the hour or day for delegations and roadshows",
          "Fair-week shuttles between hotels and the Rho and city fair sites",
          "Lake Como, Lake Maggiore, Verona and Venice transfers",
          "Corporate and MICE logistics: transport, hotel blocks and on-site coordination",
        ],
      },
      {
        heading: "Fair weeks change everything",
        paragraphs: [
          "During big fairs and Design Week, hotels fill, taxis are scarce and the roads to the fair sites back up. Vehicles and drivers need to be reserved early, and shuttle timetables should be set around fair opening and closing times. We plan the schedule and hold backups, so your team is not left waiting.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which airport should we use for Milan?",
        a: "Linate is closest to the centre, Malpensa is the main international airport (about 50 km) and Bergamo (about 45 km) serves mostly low-cost flights. We meet you at any of them.",
      },
      {
        q: "Do you handle Area C charges?",
        a: "Where a charge applies to your vehicle and route, we show it as a separate line in the quote.",
      },
      {
        q: "Can you support a corporate event or a delegation visit?",
        a: "Yes — transport waves, hotel blocks, venue sourcing through partners and on-site coordination. Tell us dates, guest numbers and budget range.",
      },
    ],
    related: [
      "milan-airport-transfer",
      "milan-corporate-events",
      "milan-hotel-booking",
      "milan-mice-services",
      "milan-fair-transfers",
      "milan-chauffeur-service",
      "malpensa-airport-transfer",
      "milan-to-lake-como-transfer",
    ],
    cta: { label: "Request a quote for Milan", service: "other" },
    serviceType: "Ground transportation and events",
    areaServed: ["Milan", "Lombardy"],
  }),

  page({
    slug: "florence",
    kind: "city",
    title: "Florence: Transfers, Chauffeurs & Tuscany Day Trips",
    description:
      "Ground services in Florence and Tuscany: transfers from Pisa, Rome and the station, private drivers for Chianti and Siena, groups and weddings.",
    h1: "Ground Services in Florence",
    nav: "Florence",
    lead:
      "Airport and station transfers, private drivers into the Tuscan hills, and group transport for weddings and corporate visits — all planned around Florence's restricted centre.",
    tags: ["florence", "tuscany"],
    facts: [
      { label: "Tourism spend", value: "Tuscany received €5.3 billion in foreign visitor spending, about 9.4% of Italy's total" },
      { label: "Meetings", value: "One of six Italian cities in the world's top 100 for international association meetings" },
      { label: "Airports", value: "Florence's own airport is small; many visitors arrive via Pisa, Rome, Bologna or by train" },
      { label: "City access", value: "The historic centre is a restricted-traffic zone; drivers drop at the closest permitted point" },
    ],
    sections: [
      {
        heading: "What we do in Florence",
        bullets: [
          "Transfers between Florence, Pisa, Rome, Venice and the Cinque Terre",
          "Full-day drivers for Chianti, Siena, San Gimignano and Val d'Orcia",
          "Group transport for weddings and villa stays across Tuscany",
          "Transfers to and from Santa Maria Novella station",
          "Hotel blocks and event logistics through vetted partners",
        ],
      },
      {
        heading: "Arriving by train",
        paragraphs: [
          "Many visitors reach Florence by high-speed train, usually about 1.5 hours from Rome. Your driver can meet you at the station and take you straight to a hotel or a countryside villa; if you are heading beyond the centre, the last kilometres are where a local driver matters most.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can the driver take us to our hotel in the centre?",
        a: "As close as the restricted-traffic zone allows. We confirm the drop-off point in advance so you know exactly where to go.",
      },
      {
        q: "Do you offer full-day drivers for Chianti?",
        a: "Yes. A day booking (8–10 hours) works best for two estate visits and lunch.",
      },
    ],
    related: [
      "rome-to-florence-transfer",
      "florence-hotel-booking",
      "florence-event-management",
      "florence-to-chianti-private-driver",
      "florence-chauffeur-service",
      "tuscany",
      "florence-to-venice-transfer",
      "florence-to-cinque-terre-transfer",
    ],
    cta: { label: "Request a quote for Florence", service: "other" },
    serviceType: "Ground transportation and events",
    areaServed: ["Florence", "Tuscany"],
  }),

  page({
    slug: "venice",
    kind: "city",
    title: "Venice: Airport Transfers, Water Taxis & Veneto Routes",
    description:
      "Ground services for Venice: transfers to Piazzale Roma and Mestre, water-taxi legs through partners, and drivers to the Veneto villas and Dolomites.",
    h1: "Ground Services in Venice",
    nav: "Venice",
    lead:
      "Venice is car-free, so we plan the road and the water together — airport, Piazzale Roma, water taxi and the walk to your door.",
    tags: ["venice"],
    facts: [
      { label: "Tourism spend", value: "Veneto received €6.3 billion in foreign visitor spending, about 11.1% of Italy's total" },
      { label: "Car-free", value: "Road transport ends at Piazzale Roma or Tronchetto; the historic centre has no roads" },
      { label: "Airports", value: "Marco Polo (VCE) and Treviso (TSF)" },
      { label: "Access fee", value: "Day-trippers paid an access fee on 60 trial dates in 2026; check the official site for dates and exemptions" },
    ],
    sections: [
      {
        heading: "What we do around Venice",
        bullets: [
          "Airport transfers to Piazzale Roma, Tronchetto and Mestre",
          "Water-taxi legs to canal-side hotels, arranged through local partners",
          "Transfers to the Veneto, Verona, Padua and the Dolomites",
          "Group and cruise-day logistics",
          "Hotel blocks for weddings and corporate groups",
        ],
      },
      {
        heading: "Why we don't run our own Venice operation",
        paragraphs: [
          "Venice needs local boats, permits and captains. We work with licensed local partners for the water legs and keep the road transfers to and from the mainland under our own dispatch. You get one plan, one voucher and one contact.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can we be dropped at our hotel by car?",
        a: "Only if it is on the mainland side. Hotels in the historic centre are reached by boat or on foot from Piazzale Roma or Tronchetto.",
      },
      {
        q: "Should we stay in Mestre?",
        a: "It can be a practical choice for budget and access, and it is only a short train or bus ride from the lagoon. We can advise based on your group.",
      },
    ],
    related: ["venice-airport-transfer", "rome-to-venice-transfer", "florence-to-venice-transfer", "milan-to-venice-transfer"],
    cta: { label: "Request a quote for Venice", service: "other" },
    serviceType: "Ground transportation",
    areaServed: ["Venice", "Veneto"],
  }),

  page({
    slug: "naples",
    kind: "city",
    title: "Naples: Airport & Cruise Transfers, Pompeii & Amalfi Routes",
    description:
      "Ground services in Naples: airport and cruise-port transfers, Pompeii and Herculaneum excursions, and drivers for Sorrento and the Amalfi Coast.",
    h1: "Ground Services in Naples",
    nav: "Naples",
    lead:
      "Naples is the gateway to Pompeii, Sorrento and the Amalfi Coast. We meet you at the airport or port and take you the rest of the way.",
    tags: ["naples", "amalfi-coast"],
    facts: [
      { label: "Airport", value: "Capodichino (13.3 million passengers in 2025, +4.9%), about 5–6 km from the centre" },
      { label: "Meetings", value: "One of six Italian cities in the world's top 100 for international association meetings" },
      { label: "Sorrento, Positano, Amalfi", value: "About 48 km, 61 km and 68 km from Naples; roughly 1 hour 15 minutes to 1 hour 40 minutes" },
      { label: "Cruise port", value: "A major cruise port next to the historic centre" },
    ],
    sections: [
      {
        heading: "What we do in Naples",
        bullets: [
          "Airport and cruise-port transfers, timed to flight and ship schedules",
          "Pompeii, Herculaneum and Vesuvius excursions",
          "Transfers to Sorrento, Positano, Amalfi and Ravello",
          "Wedding and group logistics along the Coast",
          "Naples-to-Rome and Naples-to-Florence routes",
        ],
      },
      {
        heading: "Choosing drivers with the right permits",
        paragraphs: [
          "For the Amalfi Coast, the driver's local permits matter as much as the vehicle. We use operators who know the access rules and coordinate the last stretch with local partners so you are not left waiting outside a restricted zone.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you pick us up from the cruise ship?",
        a: "Yes. Tell us the ship, terminal and your expected return time; we time the pick-up around all-aboard.",
      },
      {
        q: "Is it worth driving to Pompeii from Naples?",
        a: "It is only 40–50 minutes away and easy to combine with Sorrento or the Coast. We can hold your luggage in the vehicle while you visit.",
      },
    ],
    related: ["naples-airport-transfer", "naples-to-amalfi-coast-transfer", "naples-to-pompeii-transfer", "naples-cruise-port-transfer", "amalfi-coast"],
    cta: { label: "Request a quote for Naples", service: "other" },
    serviceType: "Ground transportation",
    areaServed: ["Naples", "Campania"],
  }),

  page({
    slug: "amalfi-coast",
    kind: "city",
    title: "Amalfi Coast: Private Transfers, Drivers & Weddings",
    description:
      "Transfers, private drivers and wedding transport on the Amalfi Coast, planned around ZTL rules, alternate plates and municipal fees. Request a fixed price.",
    h1: "Ground Services on the Amalfi Coast",
    nav: "Amalfi Coast",
    lead:
      "The Coast is beautiful and hard to drive. We plan around the access rules, choose the right vehicle and coordinate the last stretch with local operators.",
    tags: ["amalfi-coast"],
    facts: [
      { label: "Restricted municipalities", value: "Eleven towns from Vietri sul Mare to Positano apply traffic restrictions and an alternate-plate scheme" },
      { label: "Reported municipal fees", value: "Positano: an entry permit (reported at €5), parking (€15 per hour) and a loading fee (€8); Ravello: a €10 checkpoint fee. Fees change by season." },
      { label: "Public alternative", value: "SITA Sud buses run along the Coast, but not door to door with luggage" },
      { label: "Best season", value: "May to October is the busiest period for holidays and weddings" },
    ],
    sections: [
      {
        heading: "What we do on the Coast",
        bullets: [
          "Transfers from Naples, Sorrento, Salerno and Rome to Positano, Amalfi, Ravello and Praiano",
          "Private drivers by the hour or day, including boat-and-road days",
          "Wedding guest logistics for Coast venues",
          "Vehicles chosen for narrow roads: sedans, vans and small minibuses",
          "Municipal fees and permits itemised in the quote",
        ],
      },
      {
        heading: "Why local knowledge matters here",
        paragraphs: [
          "Access rules change by town, time of day and season, and drivers from outside the area may not be able to reach your hotel. We work with local operators who hold the permits and know each hotel's approach, so your transfer ends at the right door.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can a coach drive the Amalfi Coast?",
        a: "Large coaches are impractical on the Coast road. We use sedans, vans and small minibuses, and plan multi-vehicle waves for groups.",
      },
      {
        q: "What are alternate plates?",
        a: "In season, some Coast roads limit non-resident vehicles by the last digit of the licence plate on certain days. Our partners plan around the calendar.",
      },
    ],
    related: [
      "rome-to-amalfi-coast-transfer",
      "naples-to-amalfi-coast-transfer",
      "amalfi-coast-alternate-license-plates",
      "amalfi-coast-wedding-transport",
      "amalfi-coast-private-driver",
    ],
    cta: { label: "Request a quote for the Coast", service: "other" },
    serviceType: "Ground transportation and weddings",
    areaServed: ["Amalfi Coast", "Campania"],
  }),

  page({
    slug: "lake-como",
    kind: "city",
    title: "Lake Como: Transfers, Weddings & Private Drivers",
    description:
      "Transfers from Malpensa and Milan, wedding guest shuttles, private drivers and boat coordination for Lake Como. Fixed prices, backup vehicles.",
    h1: "Ground Services at Lake Como",
    nav: "Lake Como",
    lead:
      "A lake of narrow roads, ferry timetables and villas with their own rules. We plan the whole journey from Malpensa to your door.",
    tags: ["lake-como", "milan"],
    facts: [
      { label: "Gateway", value: "Malpensa: 31.2 million passengers in 2025; Como is roughly 50–60 minutes away" },
      { label: "Weddings", value: "Italy hosted 15,100+ foreign weddings in 2024; lakeside villas are among the most requested venues" },
      { label: "Roads", value: "Lakeside roads are narrow, Como's centre has a restricted-traffic zone, and parking in villages is limited" },
      { label: "Boats", value: "Ferries and private boats are part of the plan; we coordinate them with licensed boat operators" },
    ],
    sections: [
      {
        heading: "What we do at the lake",
        bullets: [
          "Airport arrival waves from Malpensa, Linate and Bergamo",
          "Wedding guest shuttles, couple cars and late-night returns",
          "Private drivers for villa tours, Bellagio and Varenna days",
          "Hotel blocks and group accommodation on the lake",
          "Corporate incentives and retreats with transport and boat legs",
        ],
      },
      {
        heading: "Road, ferry or both?",
        paragraphs: [
          "The lake has hotels on both shores and ferries between them. Depending on the day and traffic, the fastest route may be by road, by boat, or a mix. We choose the plan that suits your timings and luggage, and coordinate crossings so you are not waiting on a pier.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do guests get from Malpensa to a lake villa?",
        a: "By shared arrival waves or private vehicles, planned around flight times and the villa's timeline.",
      },
      {
        q: "Do you arrange boats?",
        a: "Through licensed boat operators, as part of a transfer or wedding plan.",
      },
    ],
    related: [
      "malpensa-to-lake-como-transfer",
      "malpensa-to-bellagio-transfer",
      "milan-to-lake-como-transfer",
      "lake-como-wedding-transport",
      "malpensa-airport-transfer",
    ],
    cta: { label: "Request a quote for Lake Como", service: "other" },
    serviceType: "Ground transportation and weddings",
    areaServed: ["Lake Como", "Lombardy"],
  }),

  page({
    slug: "tuscany",
    kind: "city",
    title: "Tuscany: Private Drivers, Wedding Transport & Transfers",
    description:
      "Private drivers, wedding guest transport and airport transfers across Tuscany: Pisa, Florence, Siena, Chianti and Val d'Orcia. Fixed prices, backup vehicles.",
    h1: "Ground Services in Tuscany",
    nav: "Tuscany",
    lead:
      "Tuscany's best places have no public transport. A private driver is not a luxury here; it is how you get to the villa, the vineyard and the hill town.",
    tags: ["tuscany", "florence"],
    facts: [
      { label: "Tourism spend", value: "Tuscany received €5.3 billion in foreign visitor spending, about 9.4% of Italy's total" },
      { label: "Weddings", value: "Central Italy (Tuscany, Umbria, Lazio) accounts for 31.3% of foreign wedding requests" },
      { label: "Airports", value: "Pisa is the main international gateway; Florence, Bologna and Rome are alternatives" },
      { label: "Public transport", value: "Most villas, estates and hill towns are off the train and bus network" },
    ],
    sections: [
      {
        heading: "What we do in Tuscany",
        bullets: [
          "Airport and station transfers from Pisa, Florence and Rome to villas and hill towns",
          "Full-day drivers for Chianti, Siena, San Gimignano, Montalcino and Val d'Orcia",
          "Wedding guest shuttles and couple cars for villa weddings",
          "Group transport for retreats and corporate incentives",
          "Hotel and villa room blocks through partners",
        ],
      },
      {
        heading: "Rural roads and estate approaches",
        paragraphs: [
          "Many Tuscan estates are reached by unpaved lanes that a coach cannot use. We check the final approach with the property and choose vehicles that fit, and we plan wine days so the driver, not the guest, drives.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do we need a car in Tuscany?",
        a: "For villas and vineyards, yes — but you do not have to drive it. A private driver takes care of parking, narrow lanes and tastings.",
      },
      {
        q: "Can you serve a wedding in a remote villa?",
        a: "Yes. We confirm the approach road and plan shuttles from your hotels to the villa, with a backup vehicle on standby.",
      },
    ],
    related: [
      "pisa-airport-transfer",
      "florence-to-chianti-private-driver",
      "rome-to-siena-transfer",
      "tuscany-wedding-transport",
      "tuscany-private-driver",
    ],
    cta: { label: "Request a quote for Tuscany", service: "other" },
    serviceType: "Ground transportation and weddings",
    areaServed: ["Tuscany"],
  }),

  page({
    slug: "bologna",
    kind: "city",
    title: "Bologna: Fair Transfers, Chauffeurs & Corporate Groups",
    description:
      "Ground services in Bologna: airport and station transfers, trade-fair transport, chauffeurs and group logistics for Emilia-Romagna and the Motor Valley.",
    h1: "Ground Services in Bologna",
    nav: "Bologna",
    lead:
      "A trade-fair and food capital at the crossroads of northern Italy. We handle airport and station transfers, fair shuttles and day trips into Emilia-Romagna.",
    tags: ["bologna"],
    facts: [
      { label: "Meetings", value: "One of six Italian cities in the world's top 100 for international association meetings" },
      { label: "Trade fairs", value: "Cosmoprof Worldwide Bologna (March) and other major fairs at Bologna Fiere" },
      { label: "Regional draw", value: "Food (tortellini, mortadella, Parmigiano), the Motor Valley car and motorcycle brands, and the porticoed old town" },
      { label: "Crossroads", value: "About midway between Florence and Milan and on the Florence–Venice route" },
    ],
    sections: [
      {
        heading: "What we do in Bologna",
        bullets: [
          "Airport and station transfers, meet-and-greet for delegations",
          "Fair-week shuttles between hotels and Bologna Fiere",
          "Executive chauffeurs for trade visitors and roadshows",
          "Day trips to Modena, Parma and Motor Valley museums",
          "Group logistics through vetted partners",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you cover fair weeks in Bologna?",
        a: "Yes. Hotels and taxis are stretched in fair weeks, so we reserve vehicles early and plan shuttle schedules around the fair's opening hours.",
      },
      {
        q: "Do you offer food or Motor Valley days?",
        a: "Yes — a driver and, through licensed partners, a guide or hosted visit to producers and museums.",
      },
    ],
    related: ["florence-to-venice-transfer", "milan-fair-transfers", "conferences-mice-italy", "milan-mice-services"],
    cta: { label: "Request a quote for Bologna", service: "other" },
    serviceType: "Ground transportation and events",
    areaServed: ["Bologna", "Emilia-Romagna"],
  }),

  page({
    slug: "verona",
    kind: "city",
    title: "Verona: Vinitaly & Opera Transport, Garda Transfers",
    description:
      "Ground services in Verona: airport and station transfers, Vinitaly and fair transport, Arena opera nights, Lake Garda and Valpolicella drivers.",
    h1: "Ground Services in Verona",
    nav: "Verona",
    lead:
      "Home of Vinitaly, an opera season in a Roman arena and the gateway to Lake Garda and the Valpolicella vineyards.",
    tags: ["verona", "milan", "venice"],
    facts: [
      { label: "Vinitaly", value: "Held each April at Veronafiere (12–15 April in 2026)" },
      { label: "Arena", value: "The Roman Arena hosts a summer opera festival that draws large evening crowds" },
      { label: "Lake Garda", value: "Sirmione and Peschiera are 30–45 minutes from Verona" },
      { label: "Restricted centre", value: "Verona's old town is a restricted-traffic zone; the fair district has its own access and parking" },
    ],
    sections: [
      {
        heading: "What we do around Verona",
        bullets: [
          "Airport, station and hotel transfers, including from Milan and Venice",
          "Vinitaly and fair shuttles between hotels and the fair grounds",
          "Arena opera-night transfers timed to the show and the late return",
          "Lake Garda and Valpolicella wine days with a driver",
          "Group and corporate logistics",
        ],
      },
    ],
    faqs: [
      {
        q: "How early should we book for Vinitaly?",
        a: "As soon as you know your dates: hotels fill and vehicles are scarce in fair week.",
      },
      {
        q: "Can you arrange a driver for a wine day?",
        a: "Yes. A full-day booking suits two wineries and lunch, and the driver drives while you taste.",
      },
    ],
    related: ["milan-to-verona-transfer", "milan-to-venice-transfer", "milan-fair-transfers", "venice-airport-transfer"],
    cta: { label: "Request a quote for Verona", service: "other" },
    serviceType: "Ground transportation and events",
    areaServed: ["Verona", "Veneto", "Lake Garda"],
  }),
];
