import { page } from "../builders";
import type { ContentPage } from "../types";

/** Corporate, conference and event-buying guides. Market figures are sourced in each guide. */

const GUIDES = { slug: "guides", label: "Guides" };

const MICE_DATA = [
  { label: "ICCA 2024 rankings: Italy second worldwide (Kongres Magazine)", url: "https://kongres-magazine.eu/2025/05/icca-reaffirms-italy-as-europes-top-conference-destination/" },
  { label: "Osservatorio Italiano dei Congressi e degli Eventi 2024 (Federcongressi&eventi)", url: "https://www.federcongressi.it/it/press/cresceilturismocongressualeoice2024/" },
];

export const corporateGuides: ContentPage[] = [
  page({
    slug: "how-to-plan-a-gala-dinner-in-italy",
    kind: "guide",
    title: "How to Plan a Gala Dinner or Awards Night in Italy",
    description:
      "How to plan a corporate gala dinner or awards ceremony in Italy: venue, run of show, stage and AV, catering, entertainment, security and timeline.",
    h1: "How to Plan a Gala Dinner or Awards Night in Italy",
    nav: "Plan a gala dinner",
    lead:
      "A gala looks simple from the seats and is one of the hardest events to run: a fixed guest list, a tight running order and several suppliers who all need the same schedule.",
    parent: GUIDES,
    readingMinutes: 7,
    facts: [
      { label: "Business events in Italy", value: "367,981 business events in 2024 (+8.2%), with 29.3 million participants" },
      { label: "Lead time", value: "For 50+ guests, allow eight to twelve weeks; larger or peak-season events benefit from more" },
      { label: "Allergens", value: "EU rules require information on allergens in food served to guests" },
    ],
    sections: [
      {
        heading: "Start with the purpose and the guest list",
        paragraphs: [
          "A gala for clients, an internal awards night and a charity dinner ask for different rooms and different pacing. Fix the purpose, the number of guests, the budget range and the date before you look at venues. The guest list drives everything else: seating, catering, transport and security.",
        ],
      },
      {
        heading: "Choose the venue against the programme",
        bullets: [
          "Capacity for a seated dinner is lower than for a standing reception. Ask for both numbers",
          "Check where the stage, screens and the awards podium can go, and where the sightlines are blocked",
          "Ask about load-in: historic venues often restrict vehicle access and set times for deliveries",
          "In restricted-traffic zones, plan drop-offs and permits for guests and suppliers",
          "Confirm the kitchen, power and any noise limit before you fall for a room",
        ],
      },
      {
        heading: "Build the run of show",
        bullets: [
          "Arrival and welcome drinks, with registration if guests are named",
          "Seating, welcome speech and first course",
          "Awards or presentations, kept in blocks between courses so the room does not go cold",
          "Main course, entertainment and music",
          "Closing remarks, dessert and dancing or networking",
          "Departure, with transport and coats organised so guests do not queue",
        ],
      },
      {
        heading: "Stage, AV and entertainment",
        paragraphs: [
          "Decide early what the room needs: a stage, a podium, screens for slides or a video, microphones for speakers and a host. Brief the AV supplier and the entertainer on the same running order, and hold a technical rehearsal before the doors open. If music is played, the organiser normally has to arrange the SIAE music licence.",
        ],
      },
      {
        heading: "Catering, dietary needs and allergens",
        paragraphs: [
          "Collect dietary requirements with the RSVP, not on the night. Give the caterer the final list a few days ahead, and ask how allergens will be labelled at each course. For a large seated dinner, agree the service timing per course so that speeches do not collide with the kitchen.",
        ],
      },
      {
        heading: "Guest experience and security",
        bullets: [
          "A welcome desk or host who can answer questions at arrival",
          "A seating plan that puts the right people together, and a printed or digital copy for the hosts",
          "VIP arrival and discretion where needed, planned with the venue",
          "Licensed security providers where the guest list or the venue calls for them, briefed with the rest of the team",
        ],
      },
      {
        heading: "Timeline",
        bullets: [
          "10 to 12 weeks: purpose, budget, date and guest list; shortlist venues",
          "8 to 10 weeks: contract the venue; confirm the concept, entertainment and AV",
          "4 to 6 weeks: catering menu, seating plan, invitations and registration",
          "1 to 2 weeks: final numbers, run of show, supplier briefings and rehearsal schedule",
          "On the night: one coordinator with the running order and every supplier's number",
        ],
      },
      {
        heading: "How we work on galas",
        paragraphs: [
          "We source the venue, catering, AV, hosts and registration staff and, where needed, licensed security through vetted partners, and coordinate them on the night. We own no venues, kitchens or equipment, and each proposal names who is delivering what.",
        ],
      },
    ],
    faqs: [
      {
        q: "How far ahead should we book a gala in Italy?",
        a: "For 50 or more guests allow eight to twelve weeks at least, and more for larger events or peak-season dates in Rome and Milan.",
      },
      {
        q: "Do we need a host or MC?",
        a: "For an awards evening, almost always. A host keeps the running order moving and covers gaps. Book one who is comfortable in your guests' languages.",
      },
      {
        q: "What should be in the run of show?",
        a: "Every timed item from arrival to departure, who is responsible for it and which supplier is affected. Share the same version with the venue, the caterer, the AV team and the entertainers.",
      },
    ],
    related: [
      "corporate-events-italy",
      "event-services-italy",
      "luxury-event-management-italy",
      "how-to-plan-a-corporate-event-in-italy",
      "event-catering-in-italy-guide",
      "conference-av-checklist-italy",
    ],
    cta: { label: "Request an event quote", service: "event" },
    sources: [
      ...MICE_DATA.slice(1),
      { label: "SIAE: licences for private parties", url: "https://www.siae.it/en/licenses/private-parties/" },
      { label: "Regulation (EU) No 1169/2011 on food information to consumers (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2011/1169/oj" },
    ],
  }),

  page({
    slug: "how-to-plan-a-conference-in-italy",
    kind: "guide",
    title: "How to Plan a Conference in Italy: Venue to Registration",
    description:
      "How to plan a conference in Italy: choosing a venue and city, room layouts, AV, registration, speakers, hotel blocks, budget lines and a realistic timeline.",
    h1: "How to Plan a Conference in Italy",
    nav: "Plan a conference",
    lead:
      "Italy is one of the world's leading conference destinations. This guide covers the decisions that matter, from venue and city to registration and hotel blocks.",
    parent: GUIDES,
    readingMinutes: 7,
    facts: [
      { label: "Italy in the market", value: "Second in the world for international association meetings, with 635 in 2024; Rome ninth and Milan fourteenth" },
      { label: "Business events", value: "367,981 business events in 2024 (+8.2%), with 29.3 million participants" },
      { label: "Typical venues", value: "Congress centres such as MiCo in Milan and La Nuvola in Rome, hotel congress facilities, and fair grounds such as Fieramilano Rho" },
    ],
    sections: [
      {
        heading: "Pick the city and the venue together",
        paragraphs: [
          "Rome and Milan have the largest congress infrastructure, Venice suits smaller programmes with a strong setting, and other cities work well for specialist meetings. Choose the city for access and hotel capacity, then the venue for the room layouts your programme needs.",
        ],
      },
      {
        heading: "Rooms and layouts",
        bullets: [
          "A plenary room sized for your peak attendance, with sightlines and screens that work from the back",
          "Breakout rooms that match your parallel sessions, with clear signage between them",
          "A separate area for coffee breaks and exhibitors so that the corridor does not jam",
          "A quiet room for speakers and VIPs",
          "A registration area large enough for the peak arrival wave",
        ],
      },
      {
        heading: "AV and technical needs",
        paragraphs: [
          "List what each room needs before you ask for quotes: screens or LED walls, microphones, interpretation, recording or streaming and technicians. Ask whether the venue requires you to use its in-house AV. Hold a technical check the day before, not on the morning.",
        ],
      },
      {
        heading: "Registration and delegate flow",
        bullets: [
          "Open registration early and collect dietary needs and hotel details with it",
          "Print badges in advance and keep a small stock for late changes",
          "Staff the desk for the arrival peak, with hosts who speak your delegates' languages",
          "Give delegates a single page with the programme, the maps and a contact number",
        ],
      },
      {
        heading: "Hotels and delegate transport",
        paragraphs: [
          "Book the hotel block early, especially in fair weeks, and understand the attrition and cut-off terms before you sign. Plan arrivals in waves by flight window and shuttle loops between the hotels and the venue. Each is a separate decision from the programme itself.",
        ],
      },
      {
        heading: "Budget lines",
        bullets: [
          "Venue hire and rooms",
          "AV, interpretation and technical crew",
          "Catering: breaks, lunches and any dinners",
          "Registration, badges, hosts and interpreters",
          "Hotel blocks and delegate transport",
          "Speaker fees and travel, if you pay them",
          "Management fee and contingency",
        ],
      },
      {
        heading: "Timeline",
        bullets: [
          "12 to 16 weeks or more: date, city, venue and budget",
          "8 to 12 weeks: contracts, hotel block and programme outline",
          "4 to 6 weeks: registration open, catering and AV briefed",
          "1 to 2 weeks: final numbers, badges and supplier briefings",
          "On site: registration desk, room monitors and a coordinator",
        ],
      },
    ],
    faqs: [
      {
        q: "Which Italian city is best for a conference?",
        a: "Rome and Milan have the biggest venues and hotel capacity. Smaller programmes can work better in Venice or another city where the setting matters more than the capacity.",
      },
      {
        q: "Do we need a PCO?",
        a: "For a large or international conference, a PCO or an event partner takes on registration, suppliers and logistics so your team can focus on content. Smaller meetings can be run by an internal team with a local partner.",
      },
      {
        q: "How far ahead should we book?",
        a: "Twelve to sixteen weeks for a mid-sized conference, and more for large events or fair weeks, when venues and hotels fill early.",
      },
    ],
    related: [
      "conferences-mice-italy",
      "rome-mice-services",
      "milan-mice-services",
      "venice-mice-services",
      "conference-av-checklist-italy",
      "best-months-for-events-in-italy",
    ],
    cta: { label: "Request a MICE quote", service: "event" },
    sources: MICE_DATA,
  }),

  page({
    slug: "corporate-retreat-planning-italy",
    kind: "guide",
    title: "Planning a Corporate Retreat or Offsite in Italy",
    description:
      "How to plan a corporate retreat or offsite in Italy: villa or hotel, agenda, activities, connectivity, budget and the mistakes to avoid.",
    h1: "Planning a Corporate Retreat or Offsite in Italy",
    nav: "Plan a retreat",
    lead:
      "A good offsite balances work sessions, shared experiences and free time in a place people remember. Here is how to plan one in Italy.",
    parent: GUIDES,
    readingMinutes: 6,
    facts: [
      { label: "Typical scale", value: "Small offsites of 10 to 20 guests through to programmes of a hundred or more" },
      { label: "Venue range", value: "From historic city venues to countryside villas and estates in Chianti and the Val d'Orcia" },
      { label: "Business events in Italy", value: "367,981 business events in 2024 (+8.2%)" },
    ],
    sections: [
      {
        heading: "Define the purpose first",
        paragraphs: [
          "An offsite for strategy, one for team bonding and one to reward a sales team need different rooms and different agendas. Write down the outcome you want, the number of people, the days and the budget range, then design the venue and the activities around them.",
        ],
      },
      {
        heading: "Choose the setting",
        bullets: [
          "Countryside villa or estate: privacy and space for sessions, with a longer transfer from the airport",
          "Hotel with meeting rooms: simpler logistics and reliable technology, less atmosphere",
          "Historic city venue: walkable evenings and dinners, with restricted traffic to plan around",
          "Lakeside or coastal property: a strong setting, but narrow roads and seasonal crowds",
        ],
      },
      {
        heading: "Shape the agenda",
        bullets: [
          "Work sessions in the mornings, when people are freshest",
          "One shared experience in the afternoon: a cooking class, a wine tasting or a guided visit",
          "A group dinner, with a local flavour, on each evening",
          "Free time that is truly free, so people can rest or explore",
        ],
      },
      {
        heading: "Practical checks",
        bullets: [
          "Wi-Fi and mobile coverage: test both in rural villas before you commit",
          "A meeting room with a screen and enough space for the group",
          "Dietary needs and accessibility for every participant",
          "Travel time from the airport, and the number of transfers you need",
          "A rain plan for any outdoor session or activity",
        ],
      },
      {
        heading: "Budget lines",
        bullets: [
          "Accommodation and meeting rooms",
          "Meals and drinks",
          "Activities, guides and tickets",
          "Transfers and local transport",
          "Coordination and contingency",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Overloading the days so that nobody has time to talk",
          "Choosing a venue for its photographs without checking access and connectivity",
          "Forgetting that Italians eat later than many groups expect, and planning dinners too early",
          "Booking in a fair or holiday week when hotels are full",
        ],
      },
    ],
    faqs: [
      {
        q: "How many people is a typical retreat?",
        a: "From a leadership group of ten to a company offsite of a hundred or more. The venue type changes with the size.",
      },
      {
        q: "How long should an offsite last?",
        a: "Two nights suit most teams: one for arrival and one full working day. Longer stays add activities and cost.",
      },
      {
        q: "What time of year works best?",
        a: "May, June, September and October are the most comfortable for most regions. July and August are hot, and fair weeks fill hotels in Milan, Verona and Bologna.",
      },
    ],
    related: [
      "corporate-events-italy",
      "florence-event-management",
      "incentive-travel-italy",
      "how-to-plan-a-corporate-event-in-italy",
      "best-months-for-events-in-italy",
    ],
    cta: { label: "Request an event quote", service: "event" },
    sources: [MICE_DATA[1]],
  }),

  page({
    slug: "how-to-choose-an-event-management-company-in-italy",
    kind: "guide",
    title: "How to Choose an Event Management Company in Italy",
    description:
      "Twelve questions to ask before hiring an event company in Italy: who delivers what, how fees work, supplier checks, permits, contracts and references.",
    h1: "How to Choose an Event Management Company in Italy",
    nav: "Choosing an event company",
    lead:
      "Two proposals can look alike and work very differently. These twelve questions show what you are actually buying.",
    parent: GUIDES,
    readingMinutes: 6,
    facts: [
      { label: "Business model", value: "Some companies own venues or equipment. Many coordinate independent suppliers. Ask which you are dealing with" },
      { label: "Typical payment schedule", value: "Events are often billed in stages, mirrored to supplier terms; ask to see the schedule before you sign" },
    ],
    sections: [
      {
        heading: "What they do and who delivers it",
        bullets: [
          "1. Do you own any venues, kitchens or equipment, or do you coordinate independent suppliers?",
          "2. For each part of our event, who actually delivers it, and does your proposal name them?",
          "3. Which parts do you produce yourselves, and which do you subcontract?",
        ],
      },
      {
        heading: "How they charge",
        bullets: [
          "4. How is your fee built: a percentage, a fixed fee, or markup on supplier prices?",
          "5. Will supplier costs be itemised, so we can compare them like for like?",
          "6. Which items are excluded, such as VAT, service charges, overtime and permits?",
        ],
      },
      {
        heading: "How they manage risk",
        bullets: [
          "7. What documents do you ask suppliers for before you propose them?",
          "8. Who holds the permits and the insurance for each element of the event?",
          "9. What is the plan if a supplier fails on the day, and who is reachable?",
        ],
      },
      {
        heading: "How they work with you",
        bullets: [
          "10. Who is our single contact, and who is on site with us?",
          "11. What are the payment schedule and the cancellation terms, and do they mirror the suppliers' terms?",
          "12. Can we speak to a client, or see photographs of events you have run?",
        ],
      },
      {
        heading: "Signs of a mismatch",
        bullets: [
          "A proposal that does not say who is delivering the catering, the AV or the décor",
          "A headline price with no itemisation",
          "Claims to own or operate everything from one company, when the services are clearly specialist",
          "No answer on permits, insurance or who is on site",
        ],
      },
      {
        heading: "How we answer these",
        paragraphs: [
          "We coordinate independent specialists and own no venues, kitchens or equipment, and every proposal names who is delivering what. Our quotes show itemised supplier costs plus a clear management fee. We ask each supplier for the safety and licensing documents that apply before proposing them, and deposit schedules mirror the suppliers' terms.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is it better to hire a company that owns its equipment?",
        a: "Not necessarily. A company with its own equipment controls that part of the delivery, while a coordinator can choose the best specialist for each part. What matters is that the proposal is honest about which model it is.",
      },
      {
        q: "Should we compare fees or total prices?",
        a: "Compare totals with the same scope. A low fee with high supplier markups can cost more than a clear management fee on itemised supplier prices.",
      },
      {
        q: "Do we need a local company?",
        a: "For venues, permits, access rules and suppliers, local knowledge saves time and avoids surprises. A local partner matters most for restricted-traffic zones and historic venues.",
      },
    ],
    related: [
      "event-management-italy",
      "event-services-italy",
      "how-to-plan-a-corporate-event-in-italy",
      "event-budget-guide-italy",
      "event-permits-and-licences-italy",
      "for-event-agencies",
    ],
    cta: { label: "Request an event quote", service: "event" },
  }),

  page({
    slug: "best-months-for-events-in-italy",
    kind: "guide",
    title: "Best Months for Events in Italy: Fairs, Heat and Holidays",
    description:
      "The best months for a corporate event or conference in Italy: trade-fair weeks, summer heat, August slowdowns and Christmas, and their effect on hotels.",
    h1: "Best Months for Events in Italy",
    nav: "Best months for events",
    lead:
      "The right date can save money and stress. Fairs fill hotels, August slows suppliers and summer heat changes what works outdoors.",
    parent: GUIDES,
    readingMinutes: 5,
    facts: [
      { label: "Milan in April", value: "The Salone del Mobile is held at Fiera Milano in Rho each April, and hotels across Milan are stretched" },
      { label: "Fair cities", value: "Milan, Verona, Bologna and Rimini host major trade fairs, and Rome and Milan host large conferences" },
      { label: "Seasonality", value: "Tourist arrivals in Italy are highest in the summer months" },
    ],
    sections: [
      {
        heading: "January to March",
        paragraphs: [
          "A workable season for city-based meetings. Milan and Rome have strong event calendars, and outside fashion and fair weeks hotels and venues may have more availability. Outdoor formats need an indoor plan.",
        ],
      },
      {
        heading: "April and May",
        paragraphs: [
          "Attractive weather, but April is the busiest fair month in Milan and Verona. Check the fair calendar before you fix a date. May is a strong month for offsites and conferences across the country.",
        ],
      },
      {
        heading: "June and early July",
        paragraphs: [
          "Long days and warm evenings, good for outdoor dinners and receptions. Book venues and hotels early, and plan for heat in the middle of the day.",
        ],
      },
      {
        heading: "Late July and August",
        paragraphs: [
          "Hot, and many Italians take holiday around 15 August, so some suppliers and offices slow down. Business travel is quieter, but leisure destinations such as the coast and the lakes are at their fullest, so book early for those.",
        ],
      },
      {
        heading: "September and October",
        paragraphs: [
          "Fairs and conferences return after the summer. Book early for Milan and Bologna in fair weeks. The weather is usually comfortable, and rain becomes likelier in late October.",
        ],
      },
      {
        heading: "November to mid-December",
        paragraphs: [
          "A steady season for corporate events, with year-end meetings and Christmas parties. Short days and cooler weather mean indoor formats and earlier evenings.",
        ],
      },
      {
        heading: "Check before you fix a date",
        bullets: [
          "The trade-fair and fashion-week calendar for the city you have chosen",
          "National and local holidays, and school holiday periods for family programmes",
          "Announced transport strikes near your arrival and departure days",
          "The weather risks for any outdoor element",
        ],
      },
    ],
    faqs: [
      {
        q: "When are hotels hardest to book in Milan?",
        a: "During major fairs and fashion weeks, especially the Salone del Mobile in April. Request room blocks early for those weeks.",
      },
      {
        q: "Is August a bad month for events?",
        a: "It is hot and many Italians are on holiday, so it suits few corporate programmes. Incentive and leisure programmes still run, but you should book early.",
      },
      {
        q: "What is the best month for an offsite?",
        a: "May, June, September and October are the most comfortable for most regions, provided you avoid fair weeks in your city.",
      },
    ],
    related: [
      "corporate-events-italy",
      "conferences-mice-italy",
      "how-to-plan-a-conference-in-italy",
      "corporate-retreat-planning-italy",
      "best-time-to-get-married-in-italy",
      "italy-hotel-group-booking-guide",
    ],
    cta: { label: "Request an event quote", service: "event" },
    sources: [
      { label: "Salone del Mobile 2026 (Dezeen Events Guide)", url: "https://www.dezeen.com/eventsguide/2026/04/salone-del-mobile-2026/" },
      { label: "Tourism seasonality in Italy (Statista)", url: "https://www.statista.com/statistics/1135415/monthly-number-of-tourist-arrivals-in-italy/" },
      { label: "Osservatorio Italiano dei Congressi e degli Eventi 2024 (Federcongressi&eventi)", url: "https://www.federcongressi.it/it/press/cresceilturismocongressualeoice2024/" },
    ],
  }),
];
