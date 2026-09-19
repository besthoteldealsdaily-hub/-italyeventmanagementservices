import { airport } from "../builders";
import type { ContentPage } from "../types";

/**
 * Airport pages (Rome Fiumicino lives in published.ts).
 * Passenger figures (2025) come from Assaeroporti/ENAC data; drive times are typical, traffic-dependent estimates.
 */

const ROME = { slug: "rome", label: "Rome" };
const MILAN = { slug: "milan", label: "Milan" };
const NAPLES = { slug: "naples", label: "Naples" };

export const airportPages: ContentPage[] = [
  airport({
    slug: "ciampino-airport-transfer",
    airport: "Rome Ciampino (CIA)",
    short: "Ciampino Airport",
    title: "Ciampino Airport Transfer to Rome | Private Driver",
    description:
      "Private transfers from Rome Ciampino airport to your hotel or station. Fixed price, flight tracking and meet-and-greet, including late-night arrivals.",
    h1: "Ciampino Airport Transfers",
    lead:
      "A licensed driver waiting when you land at Rome's second airport — including the late-night and very early flights that Ciampino is known for.",
    parent: ROME,
    tags: ["rome"],
    facts: [
      { label: "Airport", value: "Rome Ciampino (CIA), about 15 km south-east of central Rome" },
      { label: "Typical drive to the centre", value: "About 30–45 minutes, depending on traffic" },
      { label: "Traffic profile", value: "Mainly low-cost carriers, with many early-morning and late-night arrivals" },
      { label: "Bigger neighbour", value: "Fiumicino (FCO), Italy's busiest airport, lies about 30 km to the west" },
    ],
    journeys: [
      ["Rome city centre and Termini station", "about 30–45 minutes"],
      ["Vatican area hotels", "about 45–60 minutes"],
      ["Castelli Romani (Frascati)", "about 20–30 minutes"],
      ["Civitavecchia cruise port", "about 1 hour 15 minutes to 1 hour 30 minutes"],
      ["Naples", "about 2 hours 30 minutes"],
    ],
    arrival: [
      "Send your flight number and hotel address; we reply with a fixed price, including any night supplement, before you book.",
      "Your driver waits in the arrivals hall with a sign showing your name; the exact meeting point is on your voucher.",
      "We track the flight, so an early or delayed landing does not cost you a missed pick-up.",
      "Your driver helps with luggage and confirms the drop-off point before setting off.",
    ],
    insight: {
      heading: "Late arrivals and small-hours flights",
      text: "Many Ciampino flights land after midnight or before dawn, when public options are thinner and negotiating with an unfamiliar driver is the last thing you want. A pre-booked driver means the price, the vehicle and the drop-off are settled before you fly — and someone is waiting whatever time you land.",
    },
    faqs: [
      {
        q: "Is Ciampino far from central Rome?",
        a: "No. It is roughly 15 km from the centre, so the drive is usually 30–45 minutes. Fiumicino is further away, about 30 km on the other side of the city.",
      },
      {
        q: "Are night arrivals more expensive?",
        a: "A night supplement can apply between late evening and early morning. We quote it as a separate line before you confirm, so the total is known in advance.",
      },
      {
        q: "Can you also take us from Ciampino to the cruise port or to Naples?",
        a: "Yes. Civitavecchia is about 1 hour 15 minutes to 1 hour 30 minutes away and Naples about 2 hours 30 minutes; both are common requests.",
      },
      {
        q: "What if my flight lands early?",
        a: "We monitor arrival times and adjust the pick-up. Your driver is at the arrivals hall when you come through.",
      },
    ],
    related: ["rome-airport-transfer", "rome-to-civitavecchia-cruise-port-transfer", "rome-to-naples-transfer", "rome"],
    areaServed: ["Rome", "Lazio"],
  }),

  airport({
    slug: "milan-airport-transfer",
    airport: "Milan airports (Malpensa, Linate, Bergamo)",
    short: "Milan Airports",
    title: "Milan Airport Transfer: Malpensa, Linate & Bergamo",
    description:
      "Private transfers from Milan Malpensa, Linate and Bergamo airports to Milan, the lakes and beyond. Fixed price, meet-and-greet, flight tracking.",
    h1: "Milan Airport Transfers",
    lead:
      "Three airports serve Milan, and they are very different distances from the city. We meet you at the right one, with a fixed price and a driver who knows the routes.",
    parent: MILAN,
    tags: ["milan"],
    facts: [
      { label: "Malpensa (MXP)", value: "31.2 million passengers in 2025 (+8.6%); about 50 km north-west of central Milan" },
      { label: "Bergamo (BGY)", value: "16.9 million passengers in 2025; about 45 km north-east of Milan, mostly low-cost carriers" },
      { label: "Linate (LIN)", value: "Milan's city airport, close to the centre — typically 20–30 minutes by road" },
      {
        label: "City access charge",
        value: "Milan's central Area C zone charges vehicles to enter (a €7.50 ticket on weekdays, extended to weekends in 2026). We itemise any charge that applies to your route.",
      },
    ],
    journeys: [
      ["Malpensa to central Milan", "about 50–70 minutes"],
      ["Linate to central Milan", "about 20–30 minutes"],
      ["Bergamo to central Milan", "about 50–70 minutes"],
      ["Malpensa to Lake Como", "about 50–60 minutes"],
      ["Malpensa to Lake Maggiore (Stresa)", "about 45–60 minutes"],
    ],
    arrival: [
      "Tell us your airline and flight number; we confirm which airport and terminal to meet you at.",
      "Your driver waits in the arrivals hall with your name sign; the meeting point is on your voucher.",
      "Malpensa has two terminals (T1 and T2), so we check which one your flight uses.",
      "We track the flight and adjust the pick-up if it lands early or late.",
    ],
    insight: {
      heading: "Check which Milan airport you are flying into",
      text: "Airlines advertise 'Milan' for all three airports, but Malpensa and Bergamo are 45–50 km away. That matters for timing, price and connections to the lakes, so we always confirm the airport code with you before quoting.",
    },
    faqs: [
      {
        q: "Which Milan airport is closest to the city centre?",
        a: "Linate, which is a short drive from the centre. Malpensa and Bergamo are each roughly 45–50 km away.",
      },
      {
        q: "Can you collect us at Malpensa and take us to Lake Como?",
        a: "Yes — Lake Como is roughly 50–60 minutes from Malpensa, and we run arrival waves for groups and weddings arriving on different flights.",
      },
      {
        q: "Do I pay the Area C charge?",
        a: "Only where it applies to your vehicle and route. Any charge is shown as its own line in your quote, so there are no surprises.",
      },
      {
        q: "Can you meet a flight into Bergamo?",
        a: "Yes. Bergamo mainly serves low-cost flights, often at unsociable hours; we track the flight and adjust the pick-up.",
      },
    ],
    related: ["malpensa-airport-transfer", "bergamo-airport-transfer", "milan-to-lake-como-transfer", "milan"],
    areaServed: ["Milan", "Lombardy"],
  }),

  airport({
    slug: "malpensa-airport-transfer",
    airport: "Milan Malpensa (MXP)",
    short: "Malpensa Airport",
    title: "Malpensa Airport Transfer | Milan, Lake Como & Maggiore",
    description:
      "Private transfers from Milan Malpensa airport to Milan, Lake Como, Lake Maggiore and beyond. Fixed price, meet-and-greet, flight tracking, group arrival waves.",
    h1: "Malpensa Airport Transfers",
    lead:
      "Malpensa is Milan's main international airport and the gateway to the Italian lakes. A driver at arrivals, a fixed price and a plan for the last stretch to your hotel or villa.",
    parent: MILAN,
    tags: ["milan", "lake-como"],
    facts: [
      { label: "Airport", value: "Milan Malpensa (MXP) — 31.2 million passengers in 2025, up 8.6% on 2024" },
      { label: "Terminals", value: "Terminal 1 and Terminal 2; we meet you at the one your flight uses" },
      { label: "Distance", value: "About 50 km north-west of central Milan" },
      { label: "Train option", value: "The Malpensa Express rail link runs to central Milan in roughly 40–55 minutes; a private transfer is door to door" },
    ],
    journeys: [
      ["Central Milan", "about 50–70 minutes"],
      ["Como", "about 50–60 minutes"],
      ["Lake Maggiore (Stresa)", "about 45–60 minutes"],
      ["Bellagio", "about 1 hour 45 minutes to 2 hours 15 minutes"],
      ["Turin", "about 1 hour 30 minutes"],
    ],
    arrival: [
      "Send your flight number and destination; we reply with a fixed price and confirm the terminal.",
      "Your driver meets you inside arrivals with a sign; the exact point is on your voucher.",
      "For groups on different flights we run arrival waves and share the schedule with the planner.",
      "We track every flight and adjust the pick-up, so early or late landings do not break the plan.",
    ],
    insight: {
      heading: "The lakes and weddings start at Malpensa",
      text: "Most guests arriving for Lake Como and Lake Maggiore weddings and events fly into Malpensa. A shared shuttle or arrival wave is usually faster and calmer than individual rides, and it puts everyone at the venue when the day's timeline needs them. Tell us your guest list and flights and we will build the plan.",
    },
    faqs: [
      {
        q: "How far is Malpensa from Milan?",
        a: "About 50 km. By road it is typically 50–70 minutes to the centre, depending on traffic.",
      },
      {
        q: "Which terminal will my driver meet me at?",
        a: "Malpensa has Terminal 1 and Terminal 2. Your voucher confirms the exact meeting point after we have your flight details.",
      },
      {
        q: "Can you take us directly to Lake Como or Lake Maggiore?",
        a: "Yes. Como is roughly 50–60 minutes and Stresa on Lake Maggiore roughly 45–60 minutes. For hotels on the lake shore we confirm the last stretch and any restricted zones beforehand.",
      },
      {
        q: "Do you handle group arrivals?",
        a: "Yes. We schedule minibuses and vans in waves around flight times and keep the planner informed.",
      },
    ],
    related: ["malpensa-to-lake-como-transfer", "malpensa-to-bellagio-transfer", "malpensa-to-milan-and-lake-como-options", "milan-airport-transfer", "lake-como-wedding-transport"],
    areaServed: ["Milan", "Lake Como", "Lake Maggiore"],
  }),

  airport({
    slug: "bergamo-airport-transfer",
    airport: "Milan Bergamo (BGY)",
    short: "Bergamo Airport",
    title: "Bergamo Airport Transfer | Milan, Lakes & Bergamo",
    description:
      "Private transfers from Milan Bergamo (Orio al Serio) airport to Milan, Bergamo, Lake Iseo, Lake Como and Lake Garda. Fixed price, flight tracking.",
    h1: "Bergamo Airport Transfers",
    lead:
      "Bergamo is a low-cost hub often sold as 'Milan' — but it is about 45 km away. A driver at arrivals gets you to Milan, the lakes or Bergamo's old town without the guesswork.",
    parent: MILAN,
    tags: ["milan", "lake-como"],
    facts: [
      { label: "Airport", value: "Milan Bergamo (BGY), also called Orio al Serio — 16.9 million passengers in 2025" },
      { label: "Distance", value: "About 45 km north-east of central Milan; Bergamo city is roughly 5 km away" },
      { label: "Traffic profile", value: "Mostly low-cost carriers, with many early and late flights" },
      { label: "Lakes nearby", value: "Lake Iseo, the eastern arm of Lake Como (Lecco) and Lake Garda are all within about 1–1.5 hours" },
    ],
    journeys: [
      ["Bergamo old town (Città Alta)", "about 10–15 minutes"],
      ["Central Milan", "about 50–70 minutes"],
      ["Lake Iseo", "about 40–50 minutes"],
      ["Lecco and eastern Lake Como", "about 45–60 minutes"],
      ["Sirmione (Lake Garda)", "about 1 hour"],
    ],
    arrival: [
      "Confirm your flight number and destination; we reply with a fixed price, including any night supplement.",
      "Your driver waits in arrivals with a name sign; details are on your voucher.",
      "We track the flight, so a delay or early landing is handled automatically.",
      "For groups we schedule vehicles in waves around the flight times.",
    ],
    insight: {
      heading: "Bergamo is convenient for Iseo, Lecco and the old town",
      text: "If your plans are at Lake Iseo, the eastern side of Lake Como, or Bergamo's medieval upper town, this airport can be closer than Malpensa. For central Milan it is a long ride after a late flight, so a pre-booked driver removes the last-minute search for a ride.",
    },
    faqs: [
      {
        q: "Is Bergamo airport in Milan?",
        a: "No. It is in Orio al Serio, about 45 km north-east of Milan. It is much closer to Bergamo city and to Lake Iseo.",
      },
      {
        q: "How long does it take to reach central Milan?",
        a: "Usually 50–70 minutes by road, depending on traffic and time of day.",
      },
      {
        q: "Can you take us to Lake Garda or Verona?",
        a: "Yes. Sirmione is about an hour away and Verona a little over an hour by motorway.",
      },
      {
        q: "Do you serve very early or very late flights?",
        a: "Yes. Night supplements, when they apply, are quoted in advance so the total is known before you book.",
      },
    ],
    related: ["milan-airport-transfer", "malpensa-airport-transfer", "milan-to-verona-transfer", "milan"],
    areaServed: ["Bergamo", "Milan", "Lombardy"],
  }),

  airport({
    slug: "venice-airport-transfer",
    airport: "Venice Marco Polo (VCE)",
    short: "Venice Airport",
    title: "Venice Airport Transfer | Marco Polo & Treviso",
    description:
      "Private transfers from Venice Marco Polo and Treviso airports to Piazzale Roma, Mestre and the Veneto, with optional water-taxi legs. Fixed price.",
    h1: "Venice Airport Transfers",
    lead:
      "Venice is car-free, so the airport transfer is really two parts — the road and the water. We plan both, with a fixed price and a named drop-off point.",
    parent: { slug: "venice", label: "Venice" },
    tags: ["venice"],
    facts: [
      { label: "Airports", value: "Venice Marco Polo (VCE) at Tessera, and Treviso (TSF), used mainly by low-cost airlines" },
      { label: "Road link", value: "Cars and vans reach Piazzale Roma or Tronchetto in roughly 20–30 minutes; the historic centre itself has no roads" },
      { label: "By water", value: "Water taxis and public lagoon boats run directly from the airport and reach most canal-side hotels" },
      {
        label: "Day-visitor fee",
        value: "In 2026 Venice charged day-trippers an access fee on 60 trial dates between 3 April and 26 July (€5 if booked at least four days ahead, €10 later). Check the official site for current dates and exemptions.",
      },
    ],
    journeys: [
      ["Piazzale Roma or Tronchetto (end of the road)", "about 20–30 minutes"],
      ["Mestre station and hotels", "about 15–20 minutes"],
      ["Treviso", "about 30–35 minutes"],
      ["Padua", "about 45 minutes"],
      ["Verona", "about 1 hour 15 minutes to 1 hour 30 minutes"],
    ],
    arrival: [
      "Tell us your hotel or address; we confirm whether the last leg is by road, boat or on foot.",
      "Your driver or boat captain meets you at arrivals; the exact point is on your voucher.",
      "For hotels off the main canals we plan the walking distance and luggage handling with you.",
      "We track your flight and adjust the pick-up automatically.",
    ],
    insight: {
      heading: "Water taxi, public boat or road and vaporetto?",
      text: "There are three ways into Venice. A private water taxi takes you across the lagoon to a dock near your hotel, which is the most direct and the most expensive. The public airport boats are cheaper, with fixed stops and slower journeys. The road option ends at Piazzale Roma, from where you take a vaporetto or walk. We recommend based on your hotel's location and how much luggage you have.",
    },
    faqs: [
      {
        q: "Can a car take me to my hotel in Venice?",
        a: "No. Vehicles stop at Piazzale Roma or Tronchetto. From there you continue by water taxi, vaporetto or on foot. We can pre-book a water-taxi leg with a partner.",
      },
      {
        q: "How far is Treviso airport from Venice?",
        a: "Treviso is about 30–35 minutes from Mestre and is used mainly by low-cost airlines. We serve it as well as Marco Polo.",
      },
      {
        q: "Does the Venice access fee apply to me?",
        a: "The fee has applied to day-trippers on set dates. If you are staying overnight, check the official Venice access-fee site for your dates and any exemptions.",
      },
      {
        q: "Can you take us onward to the Dolomites or Verona?",
        a: "Yes — Verona is about 1 hour 15 minutes to 1 hour 30 minutes away, and the Dolomites are a longer scenic drive that we can plan as a day or a transfer.",
      },
    ],
    related: ["florence-to-venice-transfer", "milan-to-venice-transfer", "rome-to-venice-transfer", "venice"],
    areaServed: ["Venice", "Veneto"],
  }),

  airport({
    slug: "naples-airport-transfer",
    airport: "Naples Capodichino (NAP)",
    short: "Naples Airport",
    title: "Naples Airport Transfer | Amalfi Coast, Sorrento, Pompeii",
    description:
      "Private transfers from Naples airport to Naples, Sorrento, Positano, Amalfi and Pompeii. Fixed price, meet-and-greet, flight tracking, local-permit drivers.",
    h1: "Naples Airport Transfers",
    lead:
      "Naples is the gateway to Pompeii, Sorrento and the Amalfi Coast. A licensed driver at arrivals, a fixed price and a plan for the winding last stretch.",
    parent: NAPLES,
    tags: ["naples", "amalfi-coast"],
    facts: [
      { label: "Airport", value: "Naples Capodichino (NAP) — 13.3 million passengers in 2025, up 4.9%" },
      { label: "Distance", value: "About 5–6 km from central Naples, typically 15–25 minutes" },
      { label: "To Sorrento", value: "About 48 km, roughly 1 hour 15 minutes" },
      { label: "To Positano and Amalfi", value: "About 61 km (roughly 1 hour 30 minutes) to Positano and 68 km (roughly 1 hour 40 minutes) to Amalfi" },
    ],
    journeys: [
      ["Naples city centre and Napoli Centrale", "about 15–25 minutes"],
      ["Naples cruise port", "about 20–30 minutes"],
      ["Pompeii", "about 40–50 minutes"],
      ["Sorrento", "about 1 hour 15 minutes"],
      ["Positano and Amalfi", "about 1 hour 30 minutes to 1 hour 40 minutes"],
    ],
    arrival: [
      "Send your flight number and hotel; we reply with a fixed price and explain the last-mile plan for the Coast.",
      "Your driver meets you in arrivals with a sign; the exact point is on your voucher.",
      "We track the flight and adjust the pick-up if it lands early or late.",
      "For the Amalfi Coast we use drivers who know the access rules and permits.",
    ],
    insight: {
      heading: "Arrive with the last ferry and bus in mind",
      text: "Late arrivals can miss the last ferries and buses along the coast, and stopping at a station or port with heavy luggage is stressful. A pre-booked driver removes the timetable: you go door to door, whatever time you land. Avoid unofficial offers of a ride at arrivals; a booked, licensed transfer is simpler and safer.",
    },
    faqs: [
      {
        q: "How long does it take to reach the Amalfi Coast from Naples airport?",
        a: "Roughly 1 hour 15 minutes to Sorrento, 1 hour 30 minutes to Positano and 1 hour 40 minutes to Amalfi, longer in peak season.",
      },
      {
        q: "Can we stop at Pompeii on the way?",
        a: "Yes. It adds roughly two to three hours including entry; we can hold your luggage in the vehicle while you visit.",
      },
      {
        q: "Do you also serve the Naples cruise port?",
        a: "Yes. The port is about 20–30 minutes from the airport, and we time the pick-up to your all-aboard time.",
      },
      {
        q: "Can the driver reach my hotel on the Amalfi Coast?",
        a: "Often yes, but some hotels sit on steps or pedestrian paths. We confirm the last few hundred metres with the hotel before you travel.",
      },
    ],
    related: ["naples-to-amalfi-coast-transfer", "naples-to-sorrento-transfer", "naples-to-pompeii-transfer", "naples"],
    areaServed: ["Naples", "Campania", "Amalfi Coast"],
  }),

  airport({
    slug: "pisa-airport-transfer",
    airport: "Pisa Galileo Galilei (PSA)",
    short: "Pisa Airport",
    title: "Pisa Airport Transfer | Florence, Tuscany & Cinque Terre",
    description:
      "Private transfers from Pisa airport to Florence, Lucca, Siena, Chianti, the Cinque Terre and Tuscan villas. Fixed price, meet-and-greet, flight tracking.",
    h1: "Pisa Airport Transfers",
    lead:
      "Pisa is the main gateway to Tuscany for many visitors. A driver at arrivals takes you straight to your villa, hotel or town — no train changes, no taxi queue.",
    parent: { slug: "tuscany", label: "Tuscany" },
    tags: ["tuscany", "florence"],
    facts: [
      { label: "Airport", value: "Pisa Galileo Galilei (PSA), a short drive from Pisa city and its Leaning Tower" },
      { label: "Why it matters", value: "It serves far more international routes than Florence's small airport, so many Tuscan trips start here" },
      { label: "Florence", value: "About 85 km, roughly 1 hour" },
      { label: "Villa country", value: "Chianti, Siena and Val d'Orcia are 1.5–2 hours away, with no public transport to most estates" },
    ],
    journeys: [
      ["Pisa city centre", "about 10 minutes"],
      ["Lucca", "about 30 minutes"],
      ["Florence", "about 1 hour"],
      ["La Spezia and the Cinque Terre gateways", "about 1 hour 10 minutes"],
      ["Siena", "about 1 hour 45 minutes"],
    ],
    arrival: [
      "Tell us your flight number and your villa or hotel address; we reply with a fixed price.",
      "Your driver waits in arrivals with a name sign; the meeting point is on your voucher.",
      "For rural villas we confirm the final approach road and, if needed, the key-holder or host.",
      "We track the flight and adjust the pick-up automatically.",
    ],
    insight: {
      heading: "Villa arrival days and changeover weekends",
      text: "Many Tuscan villas rent from Saturday to Saturday, so arrivals and departures cluster on the same day and the roads and vehicles fill up. If you are travelling on a changeover day, book early. For weddings and larger groups we run arrival waves so everyone reaches the villa in a sensible order.",
    },
    faqs: [
      {
        q: "Is Pisa or Florence the better airport for Tuscany?",
        a: "Pisa has more international flights and is about an hour from Florence. Florence's airport is closer to the city but smaller. We serve both; Pisa is often the practical choice.",
      },
      {
        q: "Can you take us directly to a villa in Chianti or Val d'Orcia?",
        a: "Yes. Send us the address and we will price the exact route and confirm the last stretch of road.",
      },
      {
        q: "Do you offer a stop at Lucca or the Leaning Tower?",
        a: "Yes. Lucca is about 30 minutes from the airport and the Leaning Tower is minutes from it; we build stops into the plan and price them separately.",
      },
      {
        q: "Can you serve the Cinque Terre from Pisa?",
        a: "Yes — La Spezia and Levanto are about 1 hour 10 minutes away. The villages themselves are largely car-free, so we plan the drop-off around your lodging.",
      },
    ],
    related: ["florence-to-cinque-terre-transfer", "florence-to-chianti-private-driver", "tuscany-wedding-transport", "tuscany"],
    areaServed: ["Pisa", "Tuscany", "Florence"],
  }),
];
