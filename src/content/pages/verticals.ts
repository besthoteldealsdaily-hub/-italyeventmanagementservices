import { page } from "../builders";
import type { ContentPage } from "../types";

/** City × service pages (Lake Como weddings and Rome corporate events live in published.ts). */

const ROME = { slug: "rome", label: "Rome" };
const MILAN = { slug: "milan", label: "Milan" };
const FLORENCE = { slug: "florence", label: "Florence" };
const TUSCANY = { slug: "tuscany", label: "Tuscany" };
const AMALFI = { slug: "amalfi-coast", label: "Amalfi Coast" };

export const verticalPages: ContentPage[] = [
  page({
    slug: "milan-mice-services",
    kind: "vertical",
    title: "Milan MICE Services: Delegate Transport & Hotel Blocks",
    description:
      "MICE logistics in Milan: delegate transfers, shuttle loops to the venue, hotel blocks with clear terms and on-site coordination through vetted partners.",
    h1: "MICE Services in Milan",
    nav: "Milan MICE",
    lead:
      "Delegate arrivals, venue shuttles, hotel blocks and on-site coordination for meetings, conferences and exhibitions in Italy's business capital.",
    parent: MILAN,
    tags: ["milan"],
    facts: [
      { label: "Milan as a meetings city", value: "Fourteenth in the world for international association meetings (100 in 2024, up from 29th) and third globally for average attendees per meeting" },
      { label: "Venues", value: "Conference centres such as MiCo, the Fieramilano Rho fair grounds and hotel congress facilities" },
      { label: "Market context", value: "Italy is second in the world for international association meetings, with 635 in 2024" },
      { label: "Access", value: "Milan's Area C charge and city restrictions are built into shuttle plans" },
    ],
    included: [
      "Delegate arrival waves from Malpensa, Linate and Bergamo",
      "Shuttle loops between hotels and the venue, timed to the programme",
      "Hotel blocks with clear cut-off dates and attrition terms",
      "VIP and speaker transfers with named drivers",
      "On-site dispatch desk and backup vehicles",
    ],
    sections: [
      {
        heading: "Logistics, not production",
        paragraphs: [
          "We are the transport and accommodation spine of your event: getting delegates in and out, between hotels and venues, and to dinners. For staging, AV and content we work with specialist partners or alongside your own agency.",
        ],
      },
      {
        heading: "A typical conference shuttle plan",
        bullets: [
          "Airport waves grouped by flight arrival windows",
          "Morning hotel-to-venue loops with a fixed frequency",
          "Evening returns and dinner transfers, with late-night buffers",
          "A dispatch desk that adjusts loops when sessions overrun",
        ],
      },
    ],
    faqs: [
      {
        q: "What size of event do you handle?",
        a: "From 20-person meetings to several hundred delegates. Larger events use staged supplier deposits and an on-site team.",
      },
      {
        q: "Do you take care of hotel blocks?",
        a: "Yes. We negotiate rooms with hotels, agree cut-off and attrition terms and manage the rooming list.",
      },
      {
        q: "Can you work with our PCO or event agency?",
        a: "Yes — many clients are agencies who need reliable ground logistics as a specialist partner.",
      },
    ],
    related: ["milan", "conferences-mice-italy", "milan-corporate-events", "milan-hotel-booking"],
    cta: { label: "Request a MICE quote", service: "event" },
    serviceType: "MICE logistics",
    areaServed: ["Milan", "Lombardy"],
  }),

  page({
    slug: "tuscany-wedding-transport",
    kind: "vertical",
    title: "Tuscany Wedding Transportation: Guest Shuttles & Cars",
    description:
      "Guest shuttles, couple car and arrival waves for Tuscany villa weddings. Fixed prices, backup vehicle on standby, one coordinator on the day. Request a plan.",
    h1: "Tuscany Wedding Transportation",
    nav: "Tuscany weddings",
    lead:
      "Villa weddings in Tuscany depend on transport: guests spread across hotels, rural lanes and a ceremony that starts on time. We plan the shuttles so it does.",
    parent: TUSCANY,
    tags: ["tuscany", "florence"],
    facts: [
      { label: "Where couples marry", value: "Central Italy (Tuscany, Umbria, Lazio) accounts for 31.3% of foreign wedding requests" },
      { label: "Average wedding size", value: "About 64 guests (960,000 guests across 15,100+ foreign weddings in 2024)" },
      { label: "Planner involvement", value: "Professional planners are used in 46.3% of foreign weddings" },
      { label: "Gateways", value: "Pisa and Florence airports, Florence's station and Rome for guests continuing south" },
      { label: "Villa changeovers", value: "Many villa rentals change over on Saturdays, so arrivals cluster on the same day" },
    ],
    included: [
      "Airport and station arrival waves",
      "Hotel-to-villa shuttle loops timed to the ceremony",
      "Couple car with decoration on request",
      "Late-night returns and a backup vehicle on standby",
      "One coordinator and one dispatch number for the planner",
    ],
    sections: [
      {
        heading: "What we plan for in Tuscany",
        bullets: [
          "Unpaved estate lanes that rule out coaches; we use vans and small minibuses where needed",
          "Heat and dust in summer: vehicles arranged with air-conditioning and water",
          "Guests staying in different towns and hotels, each with its own pick-up loop",
          "The gap between ceremony, photos and dinner, when shuttles must be ready but not idle",
          "The late-night return, when guests leave in waves",
        ],
      },
      {
        heading: "How we work with your planner",
        paragraphs: [
          "Send us the guest list, hotels, villa address and timeline. We propose the fleet, the loop schedule and a fixed price within a day, and we look after supplier confirmations, briefings and the day itself.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can a minibus reach our villa?",
        a: "Often, but not always. We check the approach road with the property and choose vehicles that fit, sometimes with a smaller shuttle for the last stretch.",
      },
      {
        q: "Do you also arrange hotel blocks?",
        a: "Yes — group accommodation for wedding parties, negotiated with hotels and villas and quoted separately.",
      },
      {
        q: "What happens if a vehicle fails?",
        a: "A backup vehicle from a pre-approved operator is on standby, and our dispatch team is reachable throughout.",
      },
    ],
    related: ["lake-como-wedding-transport", "for-wedding-planners", "pisa-airport-transfer", "tuscany"],
    cta: { label: "Request a wedding logistics plan", service: "wedding" },
    serviceType: "Wedding guest transportation",
    areaServed: ["Tuscany"],
  }),

  page({
    slug: "amalfi-coast-wedding-transport",
    kind: "vertical",
    title: "Amalfi Coast Wedding Transportation: Guest Shuttles",
    description:
      "Wedding guest shuttles, couple cars and small-minibus loops for Amalfi Coast weddings, planned around ZTLs, alternate plates and municipal fees.",
    h1: "Amalfi Coast Wedding Transportation",
    nav: "Amalfi weddings",
    lead:
      "A wedding on the Coast is a logistics puzzle of narrow roads, restricted zones and steps. We solve it with the right vehicles, local permits and a clear timeline.",
    parent: AMALFI,
    tags: ["amalfi-coast", "naples"],
    facts: [
      { label: "South and islands", value: "Southern Italy and the islands account for 29.3% of foreign wedding requests" },
      { label: "Road rules", value: "Eleven Coast towns apply restrictions and an alternate-plate scheme; some charge entry, parking and loading fees" },
      { label: "Vehicles", value: "Coaches are impractical; we use sedans, vans and small minibuses with drivers who hold local permits" },
      { label: "Season", value: "May to October is the peak, and June to September is the hardest for road capacity" },
    ],
    included: [
      "Arrival waves from Naples airport and station",
      "Hotel-to-venue shuttles with the right vehicle size for each stretch",
      "Couple car and luxury vehicle options",
      "Municipal fees itemised and permits coordinated with local operators",
      "Backup vehicle and one coordinator on the day",
    ],
    sections: [
      {
        heading: "What makes Coast weddings different",
        bullets: [
          "Steps and pedestrian paths between the road and many venues",
          "Access rules that vary by town and time of day",
          "Evening returns when the road is at its most crowded",
          "Weather and sea conditions that affect boat legs",
        ],
      },
      {
        heading: "Boats and roads together",
        paragraphs: [
          "Sometimes the best plan combines a road transfer with a short boat crossing. We coordinate the timing with licensed boat operators so guests do not wait on a pier or miss the ceremony.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can guests be dropped at the venue door?",
        a: "Sometimes; some venues sit on steps or footpaths. We confirm the last few hundred metres with the venue and plan the walk.",
      },
      {
        q: "Do you use large minibuses?",
        a: "Not usually. Small minibuses and vans are more reliable on the Coast; we add loops rather than bigger vehicles.",
      },
    ],
    related: ["amalfi-coast", "naples-to-amalfi-coast-transfer", "amalfi-coast-alternate-license-plates", "for-wedding-planners"],
    cta: { label: "Request a wedding logistics plan", service: "wedding" },
    serviceType: "Wedding guest transportation",
    areaServed: ["Amalfi Coast", "Campania"],
  }),

  page({
    slug: "rome-chauffeur-service",
    kind: "vertical",
    title: "Rome Chauffeur Service: Hourly & Full-Day Drivers",
    description:
      "Private chauffeurs in Rome by the hour or day: Vatican, Appian Way, Castelli Romani and Ostia Antica. E-Class and V-Class vehicles, fixed price.",
    h1: "Rome Chauffeur Service",
    nav: "Rome chauffeur",
    lead:
      "A private driver for Rome by the hour or day — for meetings, sightseeing and day trips — in a comfortable sedan or van, with one fixed price.",
    parent: ROME,
    tags: ["rome"],
    facts: [
      { label: "Typical booking", value: "Hourly with a three-hour minimum, or a full day of 8–10 hours" },
      { label: "Vehicles", value: "Mercedes E-Class or similar (up to 3 passengers) and V-Class or similar (up to 7 passengers)" },
      { label: "Historic centre", value: "Licensed NCC vehicles are among the categories authorised in Rome's Centro Storico ZTL" },
      { label: "Day-trip ideas", value: "The Vatican and Appian Way, Castelli Romani, Ostia Antica, Tivoli and Civitavecchia" },
    ],
    included: [
      "Licensed, insured chauffeur and vehicle",
      "Fixed price for the agreed hours and distance",
      "Waiting time, fuel, tolls and parking included as quoted",
      "Water and phone chargers on board",
      "Extensions possible on the day, at the quoted hourly rate",
    ],
    sections: [
      {
        heading: "Hourly or full-day?",
        paragraphs: [
          "For meetings with fixed times, hourly is the most flexible: the car waits and you pay for the time. For sightseeing days and day trips, a full-day price is better value and lets the chauffeur plan around traffic and closing times.",
        ],
      },
      {
        heading: "A well-planned Rome day",
        bullets: [
          "Vatican Museums and St Peter's early, before the crowds and the heat",
          "The Appian Way and catacombs on a quieter afternoon",
          "Castelli Romani for lunch, a lake and a wine estate",
          "Ostia Antica, a well-preserved Roman port town close to Fiumicino",
        ],
      },
    ],
    faqs: [
      {
        q: "Can we extend the day?",
        a: "Yes, at the hourly rate stated in your quote, subject to the driver's availability.",
      },
      {
        q: "Does the chauffeur speak English?",
        a: "We request English-speaking drivers as standard. Tell us if you need another language and we will try to match.",
      },
      {
        q: "Can you arrange guides and tickets?",
        a: "Yes — nationally licensed guides and entry tickets through partners, as separate lines on your quote.",
      },
    ],
    related: ["rome", "hourly-chauffeur-italy", "private-chauffeur-italy", "rome-airport-transfer"],
    cta: { label: "Get a chauffeur quote", service: "chauffeur" },
    serviceType: "Private chauffeur",
    areaServed: ["Rome", "Lazio"],
  }),

  page({
    slug: "milan-chauffeur-service",
    kind: "vertical",
    title: "Milan Chauffeur Service: Executive & Day Drivers",
    description:
      "Executive chauffeurs in Milan by the hour or day for meetings, fairs and Lake Como days. E-Class and V-Class vehicles, fixed price, flexible hours.",
    h1: "Milan Chauffeur Service",
    nav: "Milan chauffeur",
    lead:
      "Executive drivers for Milan: airport arrivals, back-to-back meetings, fair days and day trips to the lakes — with a fixed price and punctual, discreet drivers.",
    parent: MILAN,
    tags: ["milan"],
    facts: [
      { label: "Typical booking", value: "Hourly with a three-hour minimum, or a full day of 8–10 hours" },
      { label: "Vehicles", value: "Mercedes E-Class or similar (up to 3 passengers) and V-Class or similar (up to 7 passengers)" },
      { label: "City access", value: "The Area C zone charges vehicles to enter (a €7.50 ticket on weekdays, extended to weekends in 2026); charges that apply are itemised" },
      { label: "Day-trip ideas", value: "Lake Como, Bergamo, Verona and Franciacorta wineries" },
    ],
    included: [
      "Licensed, insured chauffeur and vehicle",
      "Fixed price for agreed hours and distance",
      "Flight tracking for airport arrivals",
      "Wi-Fi and phone chargers on request",
      "Extensions on the day at the quoted hourly rate",
    ],
    sections: [
      {
        heading: "For meetings, fairs and delegations",
        paragraphs: [
          "Milan is a city of back-to-back appointments. A dedicated chauffeur removes parking, Area C and taxi waiting from your day, and can hold the car outside a venue between meetings. During fair weeks — Design Week, fashion weeks and the major trade fairs — reserve early: vehicles are scarce.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can we book a chauffeur for several days?",
        a: "Yes. A multi-day booking with the same driver is common for delegations and roadshows.",
      },
      {
        q: "Can you do airport pickups and a full day together?",
        a: "Yes. We combine the arrival and the day into one booking and one price.",
      },
    ],
    related: ["milan", "hourly-chauffeur-italy", "milan-fair-transfers", "milan-to-lake-como-transfer"],
    cta: { label: "Get a chauffeur quote", service: "chauffeur" },
    serviceType: "Private chauffeur",
    areaServed: ["Milan", "Lombardy"],
  }),

  page({
    slug: "florence-chauffeur-service",
    kind: "vertical",
    title: "Florence Chauffeur Service: Day Drivers for Tuscany",
    description:
      "Private chauffeurs in Florence by the hour or day: Chianti, Siena, San Gimignano, Pisa and Lucca. E-Class and V-Class vehicles at a fixed price.",
    h1: "Florence Chauffeur Service",
    nav: "Florence chauffeur",
    lead:
      "A private driver for Florence and the Tuscan hills — Chianti, Siena, San Gimignano and beyond — with wine, lunch and views planned around a realistic timeline.",
    parent: FLORENCE,
    tags: ["florence", "tuscany"],
    facts: [
      { label: "Typical booking", value: "A full day of 8–10 hours, or hourly with a three-hour minimum for city use" },
      { label: "Vehicles", value: "Mercedes E-Class or similar (up to 3 passengers) and V-Class or similar (up to 7 passengers)" },
      { label: "City access", value: "Florence's historic centre is restricted-traffic; the driver stops at the closest permitted point" },
      { label: "Day-trip ideas", value: "Chianti wine road, Siena and San Gimignano, Pisa and Lucca, Cinque Terre (a long day)" },
    ],
    included: [
      "Licensed, insured chauffeur and vehicle",
      "Fixed price for the agreed day",
      "Advice on realistic timings and best stops",
      "Tasting reservations and lunch bookings through partners",
      "Designated driver for wine days",
    ],
    sections: [
      {
        heading: "Three classic Tuscan days",
        bullets: [
          "Chianti: two estate visits, lunch and the wine road, about 8 hours",
          "Siena and San Gimignano: two hill towns in one day, about 9–10 hours",
          "Pisa and Lucca: the Leaning Tower and Lucca's walls, about 8 hours",
        ],
      },
    ],
    faqs: [
      {
        q: "How many stops fit in a day?",
        a: "Usually two to three. Tuscany's roads are slow, and lunch takes longer than you plan.",
      },
      {
        q: "Can you collect us from Pisa or Rome and drive us to Florence with stops?",
        a: "Yes — a combined transfer and sightseeing day is a popular option.",
      },
    ],
    related: ["florence", "florence-to-chianti-private-driver", "tuscany-private-driver", "rome-to-siena-transfer"],
    cta: { label: "Get a chauffeur quote", service: "chauffeur" },
    serviceType: "Private chauffeur",
    areaServed: ["Florence", "Tuscany"],
  }),

  page({
    slug: "tuscany-private-driver",
    kind: "vertical",
    title: "Tuscany Private Driver: Multi-Day & Day Hire",
    description:
      "Private drivers across Tuscany for villa stays, wine days and multi-day itineraries: Chianti, Val d'Orcia, Siena, San Gimignano. Fixed price, flexible hours.",
    h1: "Tuscany Private Driver",
    nav: "Tuscany driver",
    lead:
      "Tuscany's best places have no public transport. A private driver takes you from your villa to the wine estate and back — with no parking, no narrow-lane stress and no designated-driver dilemma.",
    parent: TUSCANY,
    tags: ["tuscany", "florence"],
    facts: [
      { label: "Typical booking", value: "Full-day hire of 8–10 hours, or several days with the same driver" },
      { label: "Vehicles", value: "V-Class or similar (up to 7 passengers) for winding roads; two vehicles or a minibus for larger groups" },
      { label: "Wine days", value: "Tastings mean the driver drives; we help with reservations and lunch" },
      { label: "Villa week", value: "Many guests use a driver for arrival day, one or two day trips and departure" },
    ],
    included: [
      "A driver who knows the estate lanes and hill-town parking",
      "Fixed price for each day, with hours and km agreed",
      "Advice on realistic itineraries",
      "Reservations for tastings and lunch through partners",
      "One contact for the whole stay",
    ],
    sections: [
      {
        heading: "Three loops that work",
        bullets: [
          "Val d'Orcia: Montalcino, Pienza and Montepulciano — vines, cypress lanes and pecorino",
          "Chianti: Greve, Castellina and a wine estate — the classic wine road",
          "Siena and San Gimignano: two medieval hill towns with time for lunch",
        ],
      },
      {
        heading: "Multi-day and villa stays",
        paragraphs: [
          "For a week in a villa we usually suggest a driver for the arrival and departure transfers and for one or two day trips, rather than for every day. Guests enjoy the villa the rest of the week. We tailor the plan to your group and budget.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can the driver stay with us all week?",
        a: "Yes, but most guests book selected days. We propose a schedule that fits your villa week.",
      },
      {
        q: "Can you find a driver who speaks another language?",
        a: "We request English-speaking drivers as standard. Tell us your language and we will try to match.",
      },
    ],
    related: ["tuscany", "florence-to-chianti-private-driver", "rome-to-siena-transfer", "tuscany-wedding-transport"],
    cta: { label: "Get a driver quote", service: "chauffeur" },
    serviceType: "Private chauffeur",
    areaServed: ["Tuscany"],
  }),

  page({
    slug: "amalfi-coast-private-driver",
    kind: "vertical",
    title: "Amalfi Coast Private Driver: Day Trips & Coast Tours",
    description:
      "A private driver on the Amalfi Coast for day trips: Positano, Amalfi, Ravello, Pompeii and boat-and-road days. Local permits, fixed price.",
    h1: "Amalfi Coast Private Driver",
    nav: "Amalfi driver",
    lead:
      "A driver who knows the Coast's access rules, parking and hidden viewpoints — so your day is spent enjoying it, not in traffic or looking for a space.",
    parent: AMALFI,
    tags: ["amalfi-coast", "naples"],
    facts: [
      { label: "Typical day", value: "8–10 hours: Positano, Amalfi and Ravello, or Pompeii plus one coastal town" },
      { label: "Vehicles", value: "Sedans, vans and small minibuses — large coaches don't work on the Coast road" },
      { label: "Access", value: "Restrictions and an alternate-plate scheme apply across eleven towns; municipal fees vary by town and season" },
      { label: "Alternative", value: "Public buses and ferries run along the Coast, with luggage and timings to manage" },
    ],
    included: [
      "A driver with local permits and knowledge",
      "Fixed price with municipal fees itemised",
      "Flexible stops and a realistic timeline",
      "Advice on beaches, restaurants and boat trips",
      "One contact throughout the day",
    ],
    sections: [
      {
        heading: "Making the most of the day",
        bullets: [
          "Start early: the Coast road is quietest before 10:00",
          "Keep to two or three towns: distances are short but slow",
          "Consider a boat leg to avoid a section of road, weather permitting",
          "Book lunch in advance in high season",
        ],
      },
    ],
    faqs: [
      {
        q: "Can we combine Pompeii and the Coast?",
        a: "Yes, and it is a popular plan. Pompeii in the morning, then the Coast in the afternoon; it makes for a long day, so start early.",
      },
      {
        q: "Are municipal fees included?",
        a: "They are shown as separate lines, so you see what is charged and why.",
      },
    ],
    related: ["amalfi-coast", "naples-to-amalfi-coast-transfer", "rome-to-amalfi-coast-transfer", "amalfi-coast-alternate-license-plates"],
    cta: { label: "Get a driver quote", service: "chauffeur" },
    serviceType: "Private chauffeur",
    areaServed: ["Amalfi Coast", "Campania"],
  }),

  page({
    slug: "rome-group-transportation",
    kind: "vertical",
    title: "Rome Group Transportation: Minibus & Coach Hire",
    description:
      "Minivans, minibuses and coaches for groups in Rome: airport waves, hotel shuttles, Vatican and Civitavecchia runs. Access-rule planning and backup vehicles.",
    h1: "Group Transportation in Rome",
    nav: "Rome groups",
    lead:
      "Minivans, minibuses and coaches for tour groups, weddings and corporate teams in Rome — planned around the historic centre's rules and the city's traffic.",
    parent: ROME,
    tags: ["rome"],
    facts: [
      { label: "Airport scale", value: "Fiumicino handled 50.9 million passengers in 2025, so arrival waves need timing and staging" },
      { label: "Centro Storico", value: "Licensed NCC vehicles are among the categories authorised in the ZTL; coaches follow separate rules, which we check with the city's mobility agency" },
      { label: "Cruise runs", value: "The Civitavecchia port is about 1 hour to 1 hour 15 minutes away; groups need buffers around all-aboard times" },
      { label: "Vehicle classes", value: "Minivan (up to 7), minibus (16–35 seats) and coach (50+ seats)" },
    ],
    included: [
      "Licensed and insured operators",
      "Route, drop-off and parking planning for Rome's restricted zones",
      "Arrival waves and staging at the airport",
      "Named dispatcher and backup vehicles",
      "One quote and one invoice",
    ],
    sections: [
      {
        heading: "Rome's access rules in practice",
        paragraphs: [
          "Rome restricts vehicles in the historic centre, and large coaches follow separate permits and designated drop-off and parking points. The city's mobility agency publishes the current rules for the ZTL; we build them into the plan and schedule drop-offs so your group walks the shortest legal distance.",
        ],
      },
      {
        heading: "Common Rome group movements",
        bullets: [
          "Fiumicino to hotels, in waves matched to arrivals",
          "Hotel to the Vatican and back, timed to entry slots",
          "Rome to Civitavecchia for cruise embarkation",
          "Day trips to Orvieto, Assisi, Tivoli and the Castelli Romani",
        ],
      },
    ],
    faqs: [
      {
        q: "Can a coach go into the centre of Rome?",
        a: "Coaches are subject to permits and designated drop-off and parking points. We check the current rules and plan your stops accordingly.",
      },
      {
        q: "Can you move a large group from the airport at once?",
        a: "Yes, with several vehicles staged together or with staggered waves for flights that land apart.",
      },
    ],
    related: ["rome", "group-transportation-italy", "rome-airport-transfer", "rome-to-civitavecchia-cruise-port-transfer"],
    cta: { label: "Get a group transport quote", service: "group" },
    serviceType: "Group ground transportation",
    areaServed: ["Rome", "Lazio"],
  }),

  page({
    slug: "milan-fair-transfers",
    kind: "vertical",
    title: "Milan Fair Transfers: Fieramilano Rho Shuttles",
    description:
      "Trade-fair transport in Milan: airport arrivals, hotel-to-Rho shuttles, VIP transfers and dinner runs for Salone del Mobile, EICMA, MICAM and other fairs.",
    h1: "Milan Trade-Fair Transfers",
    nav: "Milan fairs",
    lead:
      "Fair weeks fill Milan's hotels and clog its roads. We plan the shuttles, the airport waves and the evening returns so exhibitors and buyers arrive and leave on time.",
    parent: MILAN,
    tags: ["milan"],
    facts: [
      { label: "Major fairs", value: "Salone del Mobile (each April), MIDO, EICMA, Lineapelle, MICAM, MIPEL, Tuttofood and BIT at Fieramilano Rho" },
      { label: "Fair site", value: "Fieramilano is at Rho, north-west of the city, reached by road, rail and metro" },
      { label: "Airports", value: "Malpensa (31.2 million passengers in 2025), Linate and Bergamo serve fair travellers" },
      { label: "City access", value: "Area C charging and city restrictions apply in central Milan and are itemised where relevant" },
    ],
    included: [
      "Airport arrivals for exhibitors and buyers",
      "Hotel-to-Rho shuttle loops on a fixed timetable",
      "VIP and buyer transfers with named drivers",
      "Evening returns and dinner runs",
      "A dispatch desk for changes during the fair",
    ],
    sections: [
      {
        heading: "Why book fair transport early",
        paragraphs: [
          "In fair weeks hotels sell out, taxis are scarce and vehicles are heavily booked. Reserving the fleet before you book flights protects your schedule and lets us hold backups. A fair-week shuttle typically runs on a fixed loop, with extra vehicles at the start and end of each day.",
        ],
      },
      {
        heading: "Typical fair transport plan",
        bullets: [
          "Airport arrival waves on the two days before opening",
          "Morning loops from the main hotel clusters to the fair gates",
          "Evening return loops timed to the fair's closing",
          "Dinner and showroom transfers for VIP guests",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you handle single visitors or only groups?",
        a: "Both. We run shared shuttles for teams and private chauffeurs for individual buyers and VIPs.",
      },
      {
        q: "How far ahead should we book?",
        a: "As soon as your dates are set — for the biggest fairs, several months ahead.",
      },
    ],
    related: ["milan", "milan-mice-services", "milan-event-transportation", "milan-chauffeur-service"],
    cta: { label: "Get a fair-transport quote", service: "group" },
    serviceType: "Trade-fair transportation",
    areaServed: ["Milan", "Lombardy"],
  }),

  page({
    slug: "rome-event-transportation",
    kind: "vertical",
    title: "Rome Event Transportation: Guest Shuttles & VIP Cars",
    description:
      "Event transport in Rome: guest shuttle waves, VIP cars and coaches for galas, conferences and launches, planned around the ZTL. Backup vehicles included.",
    h1: "Event Transportation in Rome",
    nav: "Rome events",
    lead:
      "Guest shuttles, VIP cars and late-night returns for galas, conferences and launches in Rome — planned around historic-centre access and event timelines.",
    parent: ROME,
    tags: ["rome"],
    facts: [
      { label: "Venues", value: "Congress centres such as La Nuvola, hotels, palaces and open-air venues across the city" },
      { label: "Centro Storico", value: "Licensed NCC vehicles are among the authorised categories; evening drop-offs are planned around the closest permitted point" },
      { label: "Meetings scale", value: "Rome ranks ninth in the world for international association meetings, with 114 in 2024" },
      { label: "Vehicle classes", value: "Sedans and vans for VIPs, minibuses and coaches for guest waves" },
    ],
    included: [
      "Vehicle-wave schedules for arrivals, departures and shuttles",
      "VIP and speaker transfers with named drivers",
      "Staging plans and drop-off points for each venue",
      "On-site coordinator and dispatch desk",
      "Backup vehicles and a contingency plan",
    ],
    sections: [
      {
        heading: "Designing the wave schedule",
        paragraphs: [
          "The hardest part of event transport is the end: everyone wants to leave at once. We plan late-night returns as staggered waves, hold vehicles in a staging area near the venue and give a coordinator authority to release them as guests appear. That keeps the pick-up point calm and prevents long waits.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you handle evening galas in the historic centre?",
        a: "Yes. We plan the drop-off and pick-up points around access rules and the venue's layout.",
      },
      {
        q: "Do you supply hosts or staff?",
        a: "Through vetted partners: hosts, hostesses and interpreters, as separate lines on your quote.",
      },
    ],
    related: ["rome", "rome-corporate-events", "event-transportation-italy", "rome-group-transportation"],
    cta: { label: "Request an event transport plan", service: "event" },
    serviceType: "Event transportation",
    areaServed: ["Rome", "Lazio"],
  }),

  page({
    slug: "milan-event-transportation",
    kind: "vertical",
    title: "Milan Event Transportation: Launches, Galas & VIP Cars",
    description:
      "Event transport in Milan for launches, galas and fashion or design week programmes: guest shuttles, VIP cars and late-night returns. Backup vehicles included.",
    h1: "Event Transportation in Milan",
    nav: "Milan events",
    lead:
      "Guest shuttles, VIP cars and late-night returns for launches, galas and design-week programmes in Milan — with backup vehicles and one dispatch desk.",
    parent: MILAN,
    tags: ["milan"],
    facts: [
      { label: "Event calendar", value: "Design Week and the Salone del Mobile in April, fashion weeks and major trade fairs through the year" },
      { label: "Meetings scale", value: "Milan ranks fourteenth in the world for international association meetings, with 100 in 2024" },
      { label: "City access", value: "Area C charges vehicles to enter central Milan (a €7.50 ticket, weekday hours, extended to weekends in 2026)" },
      { label: "Vehicle classes", value: "Sedans and luxury vehicles for VIPs, vans, minibuses and coaches for guest waves" },
    ],
    included: [
      "Guest shuttle loops between hotels and event venues",
      "VIP, talent and speaker transfers with named drivers",
      "Late-night return waves and staging near the venue",
      "Area C and access charges itemised",
      "On-site coordinator, dispatch desk and backup vehicles",
    ],
    sections: [
      {
        heading: "Launches and design-week programmes",
        paragraphs: [
          "Milan's event weeks stack multiple venues and receptions in a single night. We map the venues, staging areas and drop-off points, then set a shuttle loop that keeps guests moving without idling vehicles in front of venues. A coordinator on site adjusts the plan as the evening changes.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you support multiple venues in one evening?",
        a: "Yes. We plan a loop between venues and hold staging areas at the busiest ones.",
      },
      {
        q: "Do you provide luxury vehicles?",
        a: "Yes, through partners: S-Class or equivalent sedans and V-Class vehicles for VIP guests.",
      },
    ],
    related: ["milan", "milan-fair-transfers", "milan-mice-services", "milan-corporate-events"],
    cta: { label: "Request an event transport plan", service: "event" },
    serviceType: "Event transportation",
    areaServed: ["Milan", "Lombardy"],
  }),

  page({
    slug: "rome-hotel-booking",
    kind: "vertical",
    title: "Rome Hotel Booking | Group Rates & Room Blocks",
    description:
      "Group hotel booking in Rome: room blocks for corporate events, weddings and tour groups near the centro storico or the fair and conference districts.",
    h1: "Hotel Booking in Rome",
    nav: "Rome hotels",
    lead:
      "Room blocks and corporate rates in Rome, proposed near your venue or itinerary — from boutique hotels in the centro storico to larger properties near La Nuvola and the station.",
    parent: ROME,
    tags: ["rome"],
    facts: [
      { label: "Where hotels cluster", value: "Boutique and mid-size hotels in the centro storico; larger group properties near Termini station and the EUR/La Nuvola congress district" },
      { label: "Access for guests", value: "Centro storico hotels sit inside the ZTL; we confirm the closest permitted drop-off before your group arrives" },
      { label: "Typical group", value: "10+ rooms for weddings and corporate events; larger tour-group blocks for coach itineraries" },
      { label: "Season", value: "Spring and autumn are the busiest for both leisure and events; request room blocks early for those windows" },
    ],
    included: [
      "Hotel and villa proposals matched to your venue or itinerary",
      "Negotiated block rates with clear cut-off and attrition terms",
      "Rooming-list management",
      "Coordinated airport, station and venue transfers",
      "One contract and one invoice alongside your transport",
    ],
    sections: [
      {
        heading: "Choosing a district in Rome",
        paragraphs: [
          "A centro storico hotel puts guests within walking distance of most sights and evening venues, but every vehicle drop-off happens at the edge of the restricted zone. Hotels near Termini or EUR give easier coach and vehicle access and suit larger groups or events at La Nuvola. We propose both options where relevant so you can weigh walkability against ease of transport.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you propose hotels close to La Nuvola for a conference?",
        a: "Yes — we prioritise EUR-district hotels for La Nuvola events and show shuttle time in the proposal.",
      },
      {
        q: "Do centro storico hotels work for a coach tour?",
        a: "Usually with a short walk from the nearest permitted drop-off; we flag this before you book so it is not a surprise on arrival.",
      },
      {
        q: "Can this be combined with airport transfers and event transport?",
        a: "Yes, on one invoice alongside the room block.",
      },
    ],
    related: ["rome", "hotel-group-bookings-italy", "rome-corporate-events", "for-travel-agencies"],
    cta: { label: "Request Rome hotel rates", service: "hotel-block" },
    serviceType: "Hotel booking",
    areaServed: ["Rome", "Lazio"],
  }),

  page({
    slug: "milan-corporate-events",
    kind: "vertical",
    title: "Milan Corporate Events | Offsites, Launches & Retreats",
    description:
      "Corporate event management in Milan: offsites, product launches and retreats with hotel blocks, transport and venue sourcing through vetted partners.",
    h1: "Corporate Event Management in Milan",
    nav: "Milan corporate events",
    lead:
      "Offsites, product launches and leadership retreats in Milan — hotel blocks, transport and venue sourcing run by one team, separate from our fair-week and delegate-transport services.",
    parent: MILAN,
    tags: ["milan"],
    facts: [
      { label: "Distinct from fair transport", value: "This is for company-run events (offsites, launches, retreats), not trade-fair delegate transport, which is covered separately" },
      { label: "Meetings scale", value: "Milan ranks fourteenth in the world for international association meetings, with 100 in 2024" },
      { label: "Venue districts", value: "Porta Nuova and CityLife for modern venues, the Navigli and Brera areas for smaller, characterful spaces" },
      { label: "City access", value: "Area C charges apply to central venues and are itemised on the quote" },
    ],
    included: [
      "Hotel blocks near the chosen venue",
      "Venue sourcing through vetted partners",
      "Transport waves and shuttle loops",
      "On-site coordinator and dispatch desk",
      "One budget sheet and one invoice",
    ],
    sections: [
      {
        heading: "Why this is separate from our fair and delegate pages",
        paragraphs: [
          "Milan also hosts major trade fairs and international conferences, which we cover with dedicated fair-transport and MICE-logistics services built around Fieramilano Rho and delegate schedules. A company offsite, product launch or leadership retreat has a different shape — a single client, a chosen venue and a guest list you control — so we plan it as its own scope rather than fitting it into a fair-week template.",
        ],
      },
    ],
    faqs: [
      {
        q: "How is this different from your MICE or fair-transport services?",
        a: "Those are built around trade fairs and multi-organisation conferences with fixed external schedules. This service is for events your company runs and controls end to end.",
      },
      {
        q: "Can you suggest a venue, or only work with one we've already booked?",
        a: "Both — we can propose venue options against your brief, or plan around a venue you have already chosen.",
      },
    ],
    related: ["milan", "milan-mice-services", "milan-hotel-booking", "corporate-events-italy", "milan-event-transportation"],
    cta: { label: "Request a Milan event quote", service: "event" },
    serviceType: "Corporate event management",
    areaServed: ["Milan", "Lombardy"],
  }),

  page({
    slug: "milan-hotel-booking",
    kind: "vertical",
    title: "Milan Hotel Booking | Group & Corporate Rates",
    description:
      "Group and corporate hotel booking in Milan: room blocks near Fieramilano Rho, the city centre or Porta Nuova, with clear cut-off and attrition terms.",
    h1: "Hotel Booking in Milan",
    nav: "Milan hotels",
    lead:
      "Room blocks and corporate rates in Milan, proposed against your event, fair or itinerary — with fair-week availability checked well ahead of the dates that matter.",
    parent: MILAN,
    tags: ["milan"],
    facts: [
      { label: "Fair-week pressure", value: "Hotels sell out during Salone del Mobile, fashion weeks and major Fieramilano fairs; blocks for those weeks need early requests" },
      { label: "Where hotels cluster", value: "Near Fieramilano Rho for exhibitors, central Milan and Porta Nuova for corporate and leisure groups" },
      { label: "City access", value: "Area C charges apply to vehicles entering the central zone; itemised where it affects your group" },
      { label: "Typical group", value: "10+ rooms for corporate events and weddings; larger blocks for fair-week exhibitor teams" },
    ],
    included: [
      "Hotel proposals near Fieramilano Rho or the city centre",
      "Negotiated block rates with clear cut-off and attrition terms",
      "Rooming-list management",
      "Coordinated airport and Rho-fair shuttle transport",
      "One contract and one invoice alongside your transport",
    ],
    sections: [
      {
        heading: "Booking around Milan's fair calendar",
        paragraphs: [
          "Milan's hotel market moves with its trade-fair and fashion calendar: rates and availability during Salone del Mobile or a major fashion week are nothing like an ordinary week. If your dates overlap with a known fair, we flag it early and recommend booking rooms before flights, since fair-week blocks are the first to sell out.",
        ],
      },
    ],
    faqs: [
      {
        q: "How early should we book for Salone del Mobile or fashion week?",
        a: "As soon as dates are fixed — these weeks are Milan's tightest for hotel availability, often months ahead.",
      },
      {
        q: "Can you propose hotels close to Fieramilano Rho?",
        a: "Yes, and we show the shuttle time to the fair gates in the proposal.",
      },
      {
        q: "Do you handle the shuttle between the hotel and the fair or venue?",
        a: "Yes, on the same invoice as the room block.",
      },
    ],
    related: ["milan", "milan-fair-transfers", "milan-corporate-events", "hotel-group-bookings-italy"],
    cta: { label: "Request Milan hotel rates", service: "hotel-block" },
    serviceType: "Hotel booking",
    areaServed: ["Milan", "Lombardy"],
  }),

  page({
    slug: "florence-event-management",
    kind: "vertical",
    title: "Florence Event Management | Corporate Events & Weddings",
    description:
      "Event management in Florence and Tuscany: hotel blocks, transport and venue sourcing for corporate events, weddings and retreats through vetted partners.",
    h1: "Event Management in Florence",
    nav: "Florence events",
    lead:
      "Corporate offsites, retreats and wedding-style events in Florence and the Tuscan countryside — hotel blocks, transport and venue sourcing run by one team.",
    parent: FLORENCE,
    tags: ["florence", "tuscany"],
    facts: [
      { label: "Venue range", value: "From historic city venues to countryside villas and estates in Chianti and the Val d'Orcia" },
      { label: "Access", value: "Florence's historic centre is a restricted-traffic zone; event vehicles and load-in are planned around the closest permitted point" },
      { label: "Meetings scale", value: "Florence is one of six Italian cities in the world's top 100 for international association meetings" },
      { label: "Arrival", value: "Most guests arrive via Pisa or Rome airport, or by train to Santa Maria Novella station" },
    ],
    included: [
      "Hotel and villa blocks for the guest list",
      "Venue sourcing through vetted partners, in the city or the countryside",
      "Transport waves from Pisa, Rome or the station",
      "On-site coordinator and dispatch desk",
      "One budget sheet and one invoice",
    ],
    sections: [
      {
        heading: "City venue or countryside villa",
        paragraphs: [
          "A historic city venue keeps guests within a short walk of hotels and evening plans, but load-in for production or catering has to work around the restricted-traffic zone. A countryside villa or estate in Chianti or the Val d'Orcia gives more room and easier vehicle access, at the cost of a longer transfer for guests staying in the city. We plan the transport around whichever you choose — including the last kilometres, which are where a local driver matters most.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you manage an event at a countryside villa, not just in the city?",
        a: "Yes — villas and estates across Tuscany are a regular part of this service, with guest transport planned for the longer transfer.",
      },
      {
        q: "How do you handle vehicle access for load-in at a historic venue?",
        a: "We confirm permitted access windows and the closest drop-off point with the venue before your event, so there are no surprises on the day.",
      },
      {
        q: "Can hotel blocks and transport be arranged for the whole guest list?",
        a: "Yes, on one invoice, whether guests are staying in the city or in the countryside.",
      },
    ],
    related: ["florence", "florence-hotel-booking", "florence-chauffeur-service", "event-management-italy", "corporate-events-italy"],
    cta: { label: "Request a Florence event quote", service: "event" },
    serviceType: "Event management",
    areaServed: ["Florence", "Tuscany"],
  }),

  page({
    slug: "florence-hotel-booking",
    kind: "vertical",
    title: "Florence Hotel Booking | Group Rates & Villa Stays",
    description:
      "Group hotel and villa booking in Florence and Tuscany: room blocks for weddings, corporate events and tour groups, with clear cut-off and attrition terms.",
    h1: "Hotel Booking in Florence",
    nav: "Florence hotels",
    lead:
      "Room blocks in the city and villa stays in the Tuscan countryside, proposed against your event or itinerary — with the last-mile access to each property checked in advance.",
    parent: FLORENCE,
    tags: ["florence", "tuscany"],
    facts: [
      { label: "Two kinds of property", value: "City hotels within the restricted-traffic centre, and villas or agriturismi across Chianti, the Val d'Orcia and the wider countryside" },
      { label: "Access", value: "City hotels are checked against the restricted zone; countryside properties are checked for coach and vehicle access before they go on a proposal" },
      { label: "Typical group", value: "10+ rooms for weddings and corporate events; villa exclusives for wedding parties wanting one shared property" },
      { label: "Season", value: "May to October is peak for weddings and villa stays; request blocks well ahead for that window" },
    ],
    included: [
      "City hotel and countryside villa proposals",
      "Negotiated block rates with clear cut-off and attrition terms",
      "Rooming-list management",
      "Coordinated transfers from Pisa, Rome or the station",
      "One contract and one invoice alongside your transport",
    ],
    sections: [
      {
        heading: "Booking a villa exclusive vs. a city hotel block",
        paragraphs: [
          "For a wedding party that wants to stay together, a single villa or estate booked exclusively is often simpler than a room block spread across a city hotel — but it needs its own transport plan, since guests are further from restaurants and evening venues. A city hotel block suits guests who want to walk to dinner and explore between events. We usually propose both so you can compare.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you book an entire villa for our wedding party?",
        a: "Yes — exclusive villa bookings are a regular request, alongside the guest transport plan that comes with staying outside the city.",
      },
      {
        q: "Are countryside properties checked for coach access?",
        a: "Yes. A villa or agriturismo without workable vehicle access is not proposed for a group booking.",
      },
      {
        q: "Can this include transfers from Pisa or Rome airport?",
        a: "Yes, on the same invoice as the room block.",
      },
    ],
    related: ["florence", "florence-event-management", "wedding-accommodation-italy", "hotel-group-bookings-italy"],
    cta: { label: "Request Florence hotel rates", service: "hotel-block" },
    serviceType: "Hotel booking",
    areaServed: ["Florence", "Tuscany"],
  }),
];
