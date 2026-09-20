import { page } from "../builders";
import type { ContentPage } from "../types";

/** Transportation service pages (group-transportation-italy lives in published.ts). */

export const transportServicePages: ContentPage[] = [
  page({
    slug: "airport-transfers",
    kind: "service",
    title: "Airport Transfers in Italy | Fixed-Price Private Drivers",
    description:
      "Private airport transfers across Italy: Rome, Milan, Venice, Naples, Pisa and more. Fixed price, meet-and-greet, flight tracking, group arrival waves.",
    h1: "Airport Transfers in Italy",
    nav: "Airport transfers",
    lead:
      "A licensed driver waiting when you land — price agreed in advance, flight monitored, vehicle sized to your group and luggage.",
    parent: { slug: "transportation", label: "Transportation" },
    tags: [],
    facts: [
      { label: "Scale", value: "Italian airports handled 229.7 million passengers in 2025 (+5%); Rome Fiumicino 50.9 million, Milan Malpensa 31.2 million, Naples 13.3 million" },
      { label: "Who flies", value: "63% of passengers use low-cost carriers, so many arrivals are early or late" },
      { label: "Taxi comparison", value: "The official taxi flat fare from Fiumicino to inside Rome's Aurelian Walls is €55; a private transfer adds a fixed price, meet-and-greet and bigger vehicles" },
      { label: "Airports we serve", value: "Rome (FCO, CIA), Milan (MXP, LIN, BGY), Venice (VCE, TSF), Naples (NAP), Pisa (PSA) and more on request" },
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
        heading: "Private transfer, taxi or train?",
        paragraphs: [
          "Taxis and trains work well for one or two travellers with light luggage. A private transfer is better when you are a group, arrive late, have plenty of luggage, need child seats or simply want the price and pick-up point settled before you fly. For weddings and corporate groups, arrival waves keep everyone moving.",
        ],
      },
      {
        heading: "Choose your airport",
        bullets: [
          "Rome: Fiumicino for most international flights, Ciampino for many low-cost ones",
          "Milan: Malpensa (main international), Linate (city), Bergamo (low-cost, about 45 km away)",
          "Venice: Marco Polo, with a water-taxi option, and Treviso for low-cost",
          "Naples: Capodichino, the gateway to Pompeii and the Amalfi Coast",
          "Pisa: the main gateway to Tuscany",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I book an airport transfer?",
        a: "Send your flight number and destination. We reply with a fixed price, and you confirm and pay online; your voucher follows.",
      },
      {
        q: "What if my flight is delayed?",
        a: "We track your flight and adjust the pick-up at no extra charge.",
      },
      {
        q: "Can you handle group arrivals on different flights?",
        a: "Yes. We schedule vehicles in waves around each flight and share the plan with your planner.",
      },
    ],
    related: [
      "rome-airport-transfer",
      "malpensa-airport-transfer",
      "naples-airport-transfer",
      "venice-airport-transfer",
      "pisa-airport-transfer",
      "milan-airport-transfer",
      "fiumicino-airport-to-rome-options",
    ],
    cta: { label: "Get a fixed price", service: "transfer" },
    serviceType: "Airport transfer",
    areaServed: ["Italy"],
  }),

  page({
    slug: "private-chauffeur-italy",
    kind: "service",
    title: "Private Chauffeur in Italy | Hourly & Full-Day Drivers",
    description:
      "Private chauffeurs across Italy: hourly or full-day service in Rome, Milan, Florence, Tuscany and the Amalfi Coast. E-Class and V-Class vehicles, fixed price.",
    h1: "Private Chauffeur in Italy",
    nav: "Private chauffeur",
    lead:
      "A dedicated driver for your day, your week or your whole trip — punctual, discreet and familiar with Italy's restricted zones, roads and parking.",
    parent: { slug: "transportation", label: "Transportation" },
    tags: [],
    facts: [
      { label: "Booking types", value: "Hourly (three-hour minimum), full day (8–10 hours) or multi-day" },
      { label: "Vehicles", value: "E-Class or similar (up to 3 passengers), V-Class or similar (up to 7), luxury vehicles on request" },
      { label: "Where", value: "Rome, Milan, Florence and Tuscany, the Amalfi Coast, the lakes and Venice" },
      { label: "Best for", value: "Business days, sightseeing, wine days, honeymoons and multi-stop itineraries" },
    ],
    included: [
      "Licensed, insured chauffeur and vehicle",
      "Fixed price for the agreed hours and distance",
      "Fuel, tolls and parking as quoted",
      "Water and phone chargers on board",
      "Flexible timings and extensions at the quoted hourly rate",
    ],
    sections: [
      {
        heading: "Why a chauffeur beats a rental car in Italy",
        bullets: [
          "Restricted-traffic zones (ZTL) can bring fines if you drive into them by mistake",
          "Parking in historic centres is scarce and expensive",
          "Wine days need a designated driver",
          "Narrow roads on the Amalfi Coast and in the hills are stressful for visitors",
        ],
      },
    ],
    faqs: [
      {
        q: "Hourly or full-day?",
        a: "Hourly suits meetings and city use. A full-day price is better value for day trips and sightseeing.",
      },
      {
        q: "Do drivers speak English?",
        a: "We request English-speaking drivers as standard; tell us if you need another language.",
      },
      {
        q: "Can the chauffeur wait between meetings?",
        a: "Yes. Waiting is included within the booked hours.",
      },
    ],
    related: ["hourly-chauffeur-italy", "rome-chauffeur-service", "milan-chauffeur-service", "florence-chauffeur-service", "tuscany-private-driver"],
    cta: { label: "Get a chauffeur quote", service: "chauffeur" },
    serviceType: "Private chauffeur",
    areaServed: ["Italy"],
  }),

  page({
    slug: "marriage-proposal-transfer-italy",
    kind: "service",
    title: "Marriage Proposal & Romantic Transfer | Italy",
    description:
      "A discreet private chauffeur for a marriage proposal in Italy: Rome, Lake Como, the Amalfi Coast, Tuscany or Venice. Timed to sunset, backup vehicle held.",
    h1: "Marriage Proposal & Romantic Transfer in Italy",
    nav: "Proposal transfer",
    lead:
      "We get you there on time, at the right light, with a driver briefed to stay out of the way at the right moment. The proposal is yours — we handle the road.",
    parent: { slug: "services", label: "Services" },
    tags: [],
    facts: [
      { label: "Booking type", value: "Hourly, three-hour minimum — enough for the drive, the moment and a slower return" },
      { label: "Vehicles", value: "E-Class or similar, or a luxury vehicle on request" },
      { label: "Where couples propose", value: "Rome's Gianicolo Hill at sunset, a Lake Como lakeside terrace, a Positano or Ravello viewpoint, a Tuscan vineyard at golden hour, a quiet Venice campo away from the main routes" },
      { label: "What we don't stage", value: "The proposal itself — we handle transport, timing and discretion; flowers, champagne and a photographer are arranged through vetted partners on request" },
    ],
    included: [
      "Licensed, insured chauffeur and vehicle",
      "A driver briefed to arrive early, wait discreetly and step back at the right moment",
      "Advice on quiet, scenic spots and the best time of day for light and crowds",
      "A backup vehicle held for the booking",
      "Optional champagne, flowers or a photographer through vetted partners",
    ],
    sections: [
      {
        heading: "Timing matters more than the spot",
        paragraphs: [
          "The same viewpoint that is empty at sunrise can be full of tour groups by mid-morning. We plan the pickup time backwards from the moment you want — golden hour on the Gianicolo, a quiet window on a Positano terrace — so you arrive with the light and the privacy you pictured, not whatever the traffic allows.",
        ],
      },
      {
        heading: "If you want more than the drive",
        paragraphs: [
          "Some couples want champagne on ice, flowers already at the spot, or a photographer capturing the moment from a discreet distance. We can arrange any of these through vetted local partners — quoted as separate lines, confirmed before the day so nothing is a surprise except the proposal itself.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will the driver know what's happening?",
        a: "Yes — we brief the driver in advance so they know to stay discreet, keep their distance at the right moment, and not interrupt.",
      },
      {
        q: "Can you suggest where to propose?",
        a: "Yes, based on your group size, the season and how private you want the moment to be. We don't stage the proposal itself, only the logistics around it.",
      },
      {
        q: "Can you arrange a photographer or flowers?",
        a: "Through vetted partners, as separate lines on your quote, confirmed in advance.",
      },
      {
        q: "What if the weather changes at the last minute?",
        a: "Tell us as early as possible — we can usually propose an indoor or alternative option nearby, or rebook the time of day.",
      },
    ],
    related: ["private-chauffeur-italy", "luxury-event-management-italy", "destination-weddings-italy", "vip-transfers-italy"],
    cta: { label: "Plan a proposal transfer", service: "chauffeur" },
    serviceType: "Private chauffeur",
    areaServed: ["Italy"],
  }),

  page({
    slug: "hourly-chauffeur-italy",
    kind: "service",
    title: "Hourly Chauffeur in Italy | Flexible Car with Driver",
    description:
      "Hourly chauffeur service in Italy for meetings, city days and events. Three-hour minimum, E-Class and V-Class vehicles, waiting included. Request a quote.",
    h1: "Hourly Chauffeur in Italy",
    nav: "Hourly chauffeur",
    lead:
      "Pay for the time you need, with the car waiting between appointments — ideal for meetings, shopping, events and days when your plans are not fixed.",
    parent: { slug: "transportation", label: "Transportation" },
    tags: [],
    facts: [
      { label: "Minimum", value: "Three hours; extensions by the hour on the day, subject to availability" },
      { label: "Vehicles", value: "E-Class or similar (up to 3 passengers) and V-Class or similar (up to 7 passengers)" },
      { label: "Included", value: "Driver, fuel and waiting within the booked hours; tolls and parking as quoted" },
      { label: "Ideal for", value: "Back-to-back meetings, city sightseeing, shopping, evening events" },
    ],
    included: [
      "Licensed, insured chauffeur and vehicle",
      "Waiting time within the booked hours",
      "Flexible route and stops",
      "Extensions on the day at the quoted hourly rate",
      "One dispatch contact for changes",
    ],
    sections: [
      {
        heading: "When hourly makes sense — and when it doesn't",
        paragraphs: [
          "Hourly works when you have fixed appointments and the car should wait. For a long day with fixed stops (say, a Tuscan wine day), a full-day price is usually cheaper than an hourly total. For a simple point-to-point trip, a fixed transfer is the best value. We will tell you which is right for your plan.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is there a minimum booking?",
        a: "Yes, three hours. It keeps the service reliable for the driver and fair for you.",
      },
      {
        q: "Are there km limits?",
        a: "City use has generous limits. For long distances we quote a full-day or transfer price instead.",
      },
      {
        q: "Can I extend on the day?",
        a: "Usually yes, at the hourly rate in your quote, subject to the driver's next commitment.",
      },
    ],
    related: ["private-chauffeur-italy", "rome-chauffeur-service", "milan-chauffeur-service", "corporate-transportation-italy"],
    cta: { label: "Get a chauffeur quote", service: "chauffeur" },
    serviceType: "Hourly chauffeur",
    areaServed: ["Italy"],
  }),

  page({
    slug: "city-to-city-transfers-italy",
    kind: "service",
    title: "City-to-City Transfers in Italy | Private Door-to-Door",
    description:
      "Private city-to-city transfers across Italy: Rome, Florence, Venice, Naples, the Amalfi Coast, Milan and the lakes. Fixed all-inclusive price, optional stops.",
    h1: "City-to-City Transfers in Italy",
    nav: "City-to-city",
    lead:
      "Door to door between Italy's cities, villas and coasts — with your luggage, your group and, if you like, a stop on the way.",
    parent: { slug: "transportation", label: "Transportation" },
    tags: [],
    facts: [
      { label: "Pricing", value: "Per vehicle, fixed and all-inclusive: tolls, parking and waiting; extras itemised" },
      { label: "Popular routes", value: "Rome–Florence, Rome–Naples and the Amalfi Coast, Florence–Venice, Milan–Lake Como" },
      { label: "Train comparison", value: "High-speed trains link the big cities quickly; private transfers win for groups, luggage, villas and stops" },
      { label: "Stops", value: "Orvieto, Siena, Pompeii, Bologna, Verona and Lake Garda are common additions" },
    ],
    included: [
      "Licensed operator and insured vehicle",
      "Fixed all-inclusive price",
      "Vehicle sized to your group and luggage",
      "Optional stops with a time budget",
      "Driver details 24 hours before pick-up and dispatch throughout",
    ],
    sections: [
      {
        heading: "Routes we run most",
        bullets: [
          "Rome to Florence, Siena, Orvieto, Assisi, Naples and the Amalfi Coast",
          "Florence to Venice, Cinque Terre and Chianti",
          "Naples to Sorrento, Positano, Amalfi and Pompeii",
          "Milan to Lake Como, Verona, Venice and Portofino",
        ],
      },
      {
        heading: "Direct or with stops?",
        paragraphs: [
          "A stop turns a transfer into a sightseeing day for a modest amount of extra time. We agree the stop time in advance so the schedule stays predictable, and price the stop as a separate line.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the price per person?",
        a: "No — per vehicle. You choose a sedan, van or minibus depending on group size and luggage.",
      },
      {
        q: "Can you serve routes not listed?",
        a: "Yes. Send us the origin and destination and we will quote the exact route.",
      },
    ],
    related: ["rome-to-florence-transfer", "rome-to-naples-transfer", "florence-to-venice-transfer", "milan-to-lake-como-transfer"],
    cta: { label: "Get a fixed price", service: "transfer" },
    serviceType: "City-to-city private transfer",
    areaServed: ["Italy"],
  }),

  page({
    slug: "minibus-coach-hire-italy",
    kind: "service",
    title: "Minibus & Coach Hire in Italy with Driver",
    description:
      "Minibuses (16–35 seats) and coaches (50+) with driver across Italy for groups, weddings, tours and events. Fixed prices, access-rule planning, backup vehicles.",
    h1: "Minibus and Coach Hire in Italy",
    nav: "Minibus & coach",
    lead:
      "Minibuses and coaches with professional drivers for groups of 16 to 60 and beyond — planned around Italy's restricted zones and parking rules.",
    parent: { slug: "transportation", label: "Transportation" },
    tags: [],
    facts: [
      { label: "Minibus", value: "16–35 seats; the workhorse for weddings, small corporate groups and hotel–venue loops" },
      { label: "Coach", value: "50+ seats for large single-route moves and tours with simple parking" },
      { label: "How quotes are built", value: "Per vehicle and day (often 8 hours and a distance allowance) or per trip, with driver, fuel and tolls normally included" },
      { label: "Limits", value: "Historic centres and the Amalfi Coast restrict large vehicles, so vehicle choice matters" },
    ],
    included: [
      "Licensed operator with the right authorisations",
      "Professional driver, fuel and insurance as quoted",
      "Access, parking and drop-off planning",
      "Backup vehicle process",
      "One quote and one invoice",
    ],
    sections: [
      {
        heading: "Minibus or coach?",
        paragraphs: [
          "A minibus is nimbler, gets closer to venues and hotels and is often the better answer for groups of 16–35. A coach suits large groups on simple routes with dedicated drop-off points. Where the venue has narrow approach roads, two minibuses can outperform one coach.",
        ],
      },
    ],
    faqs: [
      {
        q: "How far ahead should I book a coach?",
        a: "As early as you know your dates. Peak season (May–October) and fair weeks book out quickly.",
      },
      {
        q: "Are parking and driver rest time included?",
        a: "Driving and rest-time rules apply to coach drivers, which affects how many hours a day a vehicle can operate; we plan around them and itemise parking where relevant.",
      },
    ],
    related: ["group-transportation-italy", "rome-group-transportation", "for-tour-operators", "wedding-transportation-italy"],
    cta: { label: "Get a group transport quote", service: "group" },
    serviceType: "Minibus and coach hire",
    areaServed: ["Italy"],
  }),

  page({
    slug: "wedding-transportation-italy",
    kind: "service",
    title: "Wedding Transportation in Italy | Guest Shuttles & Cars",
    description:
      "Wedding guest shuttles, couple cars and arrival waves for destination weddings in Italy: Lake Como, Tuscany, Amalfi Coast and beyond. Backup vehicle included.",
    h1: "Wedding Transportation in Italy",
    nav: "Wedding transportation",
    lead:
      "Guest shuttles, the couple's car and airport arrival waves — planned with your planner and delivered by one coordinator, with a backup vehicle on standby.",
    parent: { slug: "destination-weddings-italy", label: "Destination weddings" },
    tags: [],
    facts: [
      { label: "Market", value: "15,100+ weddings of foreign couples in Italy in 2024, with about 960,000 guests; average spend €61,500" },
      { label: "Average size", value: "About 64 guests per wedding (960,000 ÷ 15,100)" },
      { label: "Planners", value: "Used in 46.3% of foreign weddings" },
      { label: "Most requested regions", value: "Central Italy (Tuscany, Umbria, Lazio) 31.3%; South and islands 29.3%" },
    ],
    included: [
      "Arrival waves from airports and stations",
      "Hotel-to-venue shuttle loops timed to the ceremony",
      "Couple car (sedan or luxury vehicle) with decoration on request",
      "Late-night returns and backup vehicle on standby",
      "One coordinator and one dispatch number for the planner",
    ],
    sections: [
      {
        heading: "Where we work",
        bullets: [
          "Lake Como and the Italian lakes",
          "Tuscany villas and estates",
          "The Amalfi Coast and Naples area",
          "Rome and Umbria",
        ],
      },
      {
        heading: "The plan behind a smooth wedding",
        paragraphs: [
          "We build the transport plan from your guest list, hotels and timeline: how many guests arrive when, which vehicles reach which venue, how long each loop takes and when the last guests go home. The plan becomes a schedule the drivers and your planner share.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you work with couples directly or only planners?",
        a: "Mostly planners, but couples without a planner are welcome; we tailor the level of coordination.",
      },
      {
        q: "What deposit is required?",
        a: "Typically a deposit at booking and the balance about 14 days before the wedding; the schedule is shown in your quote.",
      },
    ],
    related: ["lake-como-wedding-transport", "tuscany-wedding-transport", "amalfi-coast-wedding-transport", "for-wedding-planners", "destination-wedding-guest-transport-checklist"],
    cta: { label: "Request a wedding logistics plan", service: "wedding" },
    serviceType: "Wedding guest transportation",
    areaServed: ["Italy"],
  }),

  page({
    slug: "corporate-transportation-italy",
    kind: "service",
    title: "Corporate Transportation in Italy | Executive Drivers",
    description:
      "Executive transfers, delegations and roadshows in Italy with a rate card, service targets and a monthly consolidated invoice. Chauffeurs, vans and minibuses.",
    h1: "Corporate Transportation in Italy",
    nav: "Corporate transportation",
    lead:
      "Executive transfers, roadshows and delegation visits with a rate card, a named dispatcher and one invoice.",
    parent: { slug: "transportation", label: "Transportation" },
    tags: [],
    facts: [
      { label: "Typical uses", value: "Executive airport transfers, hourly chauffeurs, multi-city roadshows, delegation visits" },
      { label: "Vehicles", value: "E-Class and V-Class or similar, luxury vehicles, minibuses for teams" },
      { label: "Invoicing", value: "One consolidated monthly e-invoice with booking-level detail" },
      { label: "Service targets", value: "Quotes within an hour on business days; incident reports within 24 hours" },
    ],
    included: [
      "A rate card by route and vehicle class",
      "Meet-and-greet and flight tracking",
      "A named dispatcher and 24/7 contact",
      "Cost-centre codes on invoices",
      "Monthly review of volume and performance",
    ],
    sections: [
      {
        heading: "A programme, not a one-off",
        paragraphs: [
          "For teams that visit Italy regularly, a standing agreement removes the friction of booking each trip separately. We agree rates, service targets and reporting once, and each new request follows the same process.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you provide duty-of-care information?",
        a: "Every booking has a named dispatcher, driver details and a 24/7 contact, and incidents are logged.",
      },
      {
        q: "How are payment terms handled?",
        a: "Agreed at onboarding; new accounts prepay the first bookings.",
      },
    ],
    related: ["for-corporate-travel-managers", "hourly-chauffeur-italy", "corporate-travel-italy", "milan-chauffeur-service"],
    cta: { label: "Request a corporate rate card", service: "trade" },
    serviceType: "Corporate transportation",
    areaServed: ["Italy"],
  }),

  page({
    slug: "event-transportation-italy",
    kind: "service",
    title: "Event Transportation in Italy | Guest Shuttles & VIP Cars",
    description:
      "Guest shuttles, VIP cars and late-night returns for events in Italy: conferences, galas, launches. Wave schedules, backup vehicles and on-site dispatch.",
    h1: "Event Transportation in Italy",
    nav: "Event transportation",
    lead:
      "Guest shuttles, VIP cars and late-night returns for conferences, galas and product launches — planned as wave schedules with a dispatch desk on site.",
    parent: { slug: "transportation", label: "Transportation" },
    tags: [],
    facts: [
      { label: "Typical scope", value: "Airport arrival waves, hotel-to-venue loops, VIP transfers, evening returns" },
      { label: "Scale", value: "From 20 to several hundred guests, with vehicles staged near venues" },
      { label: "Coordination", value: "An on-site coordinator and a dispatch desk that adapt to changes" },
      { label: "Cities", value: "Rome and Milan most often, with Florence, Venice, Naples and the lakes" },
    ],
    included: [
      "Vehicle-wave schedules and staging plans",
      "VIP and speaker transfers with named drivers",
      "A coordinator and dispatch desk on site",
      "Backup vehicles and contingency planning",
      "One quote and one invoice",
    ],
    sections: [
      {
        heading: "Why the end of the event is the hard part",
        paragraphs: [
          "Everyone wants to leave at once. We plan late-night returns as staggered waves, hold vehicles in staging areas near the venue and let a coordinator release them as guests appear, so the pick-up point stays calm and no one waits long.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you handle several venues in one evening?",
        a: "Yes. We plan a loop and staging for each venue.",
      },
      {
        q: "Do you supply hosts and interpreters?",
        a: "Through vetted partners, as separate lines on your quote.",
      },
    ],
    related: ["rome-event-transportation", "milan-event-transportation", "entertainment-event-transport-italy", "for-event-agencies"],
    cta: { label: "Request an event transport plan", service: "event" },
    serviceType: "Event transportation",
    areaServed: ["Italy"],
  }),

  page({
    slug: "cruise-port-transfers-italy",
    kind: "service",
    title: "Cruise Port Transfers in Italy | Civitavecchia & Naples",
    description:
      "Cruise-port transfers in Italy: Civitavecchia for Rome, Naples, Venice, Livorno and Genoa. Timed to ship schedules, with luggage handling and shore-day options.",
    h1: "Cruise Port Transfers in Italy",
    nav: "Cruise port transfers",
    lead:
      "Timed to your ship, not just your flight: transfers to and from the cruise terminals at Civitavecchia, Naples and other Italian ports, with luggage and shore days planned.",
    parent: { slug: "transportation", label: "Transportation" },
    tags: [],
    facts: [
      { label: "Rome's cruise port", value: "Civitavecchia, about 80 km from central Rome; roughly 1 hour to 1 hour 15 minutes by road" },
      { label: "Naples", value: "A cruise port next to the historic centre, about 20–30 minutes from the airport" },
      { label: "Other ports", value: "Venice, Livorno (for Florence and Pisa), Genoa and Savona on request" },
      { label: "Timing", value: "Aim to arrive two to three hours before departure; embarkation usually closes about an hour before sailing, so check your cruise line's rules" },
    ],
    included: [
      "Pick-up timed to ship and flight schedules",
      "Luggage handling to the terminal",
      "Drop-off at your ship's terminal, confirmed the day before",
      "Shore-day transport with a set return time",
      "Backup vehicle process",
    ],
    sections: [
      {
        heading: "Ship days are short",
        paragraphs: [
          "Most ships stay in port for eight to ten hours. A Rome round trip from Civitavecchia uses roughly three hours of driving, so plan sightseeing carefully. In Naples, Pompeii or the Amalfi Coast are the practical options, rarely both. We build the plan backwards from your all-aboard time.",
        ],
      },
    ],
    faqs: [
      {
        q: "What if my ship arrives early or my flight is late?",
        a: "We monitor ship and flight timings and adjust the pick-up to keep you on time.",
      },
      {
        q: "Can you collect us after a shore excursion?",
        a: "Yes. Tell us the ship, terminal and expected return time; we schedule the pick-up.",
      },
    ],
    related: ["rome-to-civitavecchia-cruise-port-transfer", "naples-cruise-port-transfer", "rome-airport-transfer", "naples-airport-transfer"],
    cta: { label: "Get a cruise transfer quote", service: "transfer" },
    serviceType: "Cruise port transfer",
    areaServed: ["Civitavecchia", "Naples", "Venice", "Livorno", "Genoa"],
  }),

  page({
    slug: "vip-transfers-italy",
    kind: "service",
    title: "VIP Transfers in Italy | Luxury Cars & Meet-and-Assist",
    description:
      "VIP and delegation transfers in Italy: luxury sedans and vans, meet-and-assist at airports, discreet drivers and coordinated security through licensed partners.",
    h1: "VIP Transfers in Italy",
    nav: "VIP transfers",
    lead:
      "Discreet drivers, luxury vehicles and airport meet-and-assist for executives, delegations and guests who expect more than a standard transfer.",
    parent: { slug: "transportation", label: "Transportation" },
    tags: [],
    facts: [
      { label: "Vehicles", value: "S-Class or equivalent sedans, V-Class vans and luxury minibuses through partners" },
      { label: "Airport assist", value: "Meet-and-assist at arrivals, luggage handling and priority routing where available" },
      { label: "Security", value: "Licensed security providers through partners, on request" },
      { label: "Best for", value: "Delegations, senior executives, talent, weddings and private events" },
    ],
    included: [
      "A named driver and a briefed dispatcher",
      "Pre-arranged meet-and-assist and route planning",
      "Vehicle preferences and amenities as requested",
      "Discreet, on-time service with a backup plan",
      "One contact for changes",
    ],
    sections: [
      {
        heading: "Preparation makes the difference",
        paragraphs: [
          "VIP service is mostly preparation: knowing the arrival details, the route, the alternatives if a road is closed and who greets the guest. We brief the driver and dispatcher, confirm details the day before and stay reachable throughout.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you arrange security?",
        a: "Through licensed security providers, as a separate line on your quote.",
      },
      {
        q: "Can vehicles be specified?",
        a: "Yes — model class, colour and amenities where available; the exact vehicle is confirmed on the voucher.",
      },
    ],
    related: ["luxury-event-management-italy", "private-chauffeur-italy", "corporate-transportation-italy", "wedding-transportation-italy"],
    cta: { label: "Request a VIP transfer", service: "transfer" },
    serviceType: "VIP transfer",
    areaServed: ["Italy"],
  }),
];
