import { page } from "../builders";
import type { ContentPage } from "../types";

/**
 * Guides live under /guides/[slug]. Figures come from public listings and reports (linked in each guide's Sources).
 * Prices quoted are examples from public listings in 2026, not our prices.
 */

const GUIDES = { slug: "guides", label: "Guides" };

export const guidePages: ContentPage[] = [
  page({
    slug: "how-much-does-a-private-transfer-cost-in-italy",
    kind: "guide",
    title: "How Much Does a Private Transfer Cost in Italy? (2026)",
    description:
      "What private transfers, chauffeurs and coaches cost in Italy in 2026: published price examples, what drives the price and how to compare quotes fairly.",
    h1: "How Much Does a Private Transfer Cost in Italy?",
    nav: "Private transfer costs",
    lead:
      "There is no single price, but there are patterns. Here is what operators publish for common routes in 2026, what moves the price and how to compare quotes properly.",
    parent: GUIDES,
    readingMinutes: 6,
    facts: [
      { label: "Airport benchmark", value: "The official taxi flat fare from Rome Fiumicino to inside the Aurelian Walls is €55; private transfers to the centre are listed from about €50 for a sedan, with vans and luxury cars typically €70–120" },
      { label: "Hourly chauffeur", value: "Published rates of about €80 per hour for an E-Class and €100 per hour for a V-Class, usually with a three-hour minimum" },
      { label: "VAT", value: "Passenger transport within Italy and hotel accommodation are subject to 10% VAT; the standard rate is 22%" },
    ],
    sections: [
      {
        heading: "Published price examples (2026)",
        paragraphs: [
          "The examples below come from operators' public price lists. They are not our prices and they change with season, vehicle and date, but they show the shape of the market.",
        ],
        bullets: [
          "Rome Fiumicino to central Rome by private sedan: from about €50; premium cars around €70; vans €70–120",
          "Rome to Florence, one way: one Rome operator lists €740 for up to four passengers, tolls and parking included; other listings are lower",
          "Rome to the Amalfi Coast: listings around €600–700, for example about €623 to Amalfi",
          "Naples to Sorrento about €150–160, to Positano about €180–200 and to Amalfi about €200–220",
          "Malpensa to Como province: from €1.30 per km at one operator, while another lists €2.40 per km — nearly a two-to-one spread on the same corridor",
          "Coaches (50+ seats): about €800–1,100 per day nationally; a Milan operator lists €1,420 excluding VAT for eight hours and 200 km",
          "Tourist minibuses (30–35 seats) with driver: about €550–800 per day",
        ],
      },
      {
        heading: "What moves the price",
        bullets: [
          "Distance, and whether the driver must return empty",
          "Vehicle class and age",
          "Season and day of the week: weekends and peak months cost more",
          "Night or early-morning supplements",
          "City access fees, parking and tolls",
          "Waiting time and extra stops",
          "Group size and the number of vehicles",
        ],
      },
      {
        heading: "How to compare quotes",
        paragraphs: [
          "A low headline price is meaningless without knowing what it includes. Ask each operator whether tolls, parking, waiting time, night supplements, city access fees and VAT are included, whether the price is per vehicle or per person and what the cancellation terms are. Check that the driver holds the right authorisation (NCC for cars and vans) and that the price shows the vehicle class you need.",
        ],
      },
      {
        heading: "Our approach",
        paragraphs: [
          "We quote per vehicle, all-inclusive for tolls, parking and waiting, and show any city fee or extra stop as its own line before you confirm. That makes comparison simple: the total you see is the total you pay.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a private transfer more expensive than a taxi?",
        a: "Sometimes about the same for short airport runs, and often cheaper per person for groups. The difference is a fixed price agreed in advance and a driver who is waiting for you.",
      },
      {
        q: "Are prices per person?",
        a: "Almost always per vehicle. Compare the vehicle size and luggage capacity, not just the price.",
      },
    ],
    related: ["airport-transfers", "city-to-city-transfers-italy", "ncc-vs-taxi-italy", "rome-airport-transfer"],
    cta: { label: "Get a fixed price", service: "transfer" },
    sources: [
      { label: "Rome airport transfer options and taxi flat fare", url: "https://untolditaly.com/rome-airport-transfers/" },
      { label: "Rome to Florence private transfer prices (RomeCabs)", url: "https://www.romecabs.com/transferservice/rome-to-from-florence-transfers/" },
      { label: "Naples and Rome to the Amalfi Coast prices (Positano.com)", url: "https://www.positano.com/en/private-transfers" },
      { label: "Malpensa to Como per-km price", url: "https://www.ncchauffeur.it/en/private-driver/transfer-malpensa-como/" },
      { label: "Lake Como transfer costs per km", url: "https://www.comodriver.com/en/transfer-services/cost/" },
      { label: "Hourly chauffeur rates (ExpressLimo24)", url: "https://expresslimo24.com/chauffeur-hire/" },
      { label: "Coach hire prices in Italy (Christour)", url: "https://www.christour.it/en/coach-hire-and-bus-rental-in-italy/coach-hire-52-56-seats/" },
      { label: "Coach hire in Milan (WE-BUS)", url: "https://we-bus.com/en/bus-rental-milan.html" },
      { label: "Italy VAT rates (Stripe)", url: "https://stripe.com/resources/more/italy-vat-rate" },
    ],
  }),

  page({
    slug: "rome-ztl-guide-for-groups-and-coaches",
    kind: "guide",
    title: "Rome ZTL Guide for Groups and Coaches",
    description:
      "How Rome's restricted-traffic zones (ZTL) affect groups, coaches and private transfers: who can enter, how drop-offs work and how to plan a group day.",
    h1: "Rome ZTL Guide for Groups and Coaches",
    nav: "Rome ZTL guide",
    lead:
      "Rome's historic centre is a restricted-traffic zone. Here is what that means for private cars, minibuses and coaches, and how to plan drop-offs so your group walks the shortest legal distance.",
    parent: GUIDES,
    readingMinutes: 5,
    sections: [
      {
        heading: "What the ZTL is",
        paragraphs: [
          "A ZTL (zona a traffico limitato) is a zone where only authorised vehicles may enter during set hours. Rome's Centro Storico ZTL covers the historic core, and cameras at the gates record plates automatically. Unauthorised vehicles receive fines by post, sometimes weeks later, which is why visitors driving rental cars are often caught out.",
        ],
      },
      {
        heading: "Who can enter",
        bullets: [
          "Residents and businesses with permits",
          "Licensed taxis",
          "Licensed NCC (private hire with driver) vehicles, which are among the authorised categories",
          "Other categories with specific permits",
        ],
      },
      {
        heading: "Minibuses and coaches",
        paragraphs: [
          "Tourist coaches follow separate rules from cars and vans: permits, designated drop-off points and designated parking areas. Rules and hours change, so we check them with the city's mobility agency before each group day rather than relying on old information. In practice, a coach drops passengers at a permitted point near the centre and the group walks the last stretch; two minibuses can sometimes get closer than one coach.",
        ],
      },
      {
        heading: "Planning a group day around the ZTL",
        bullets: [
          "Ask for the drop-off point before you book, not on the day",
          "Add walking time to your schedule, especially with older guests or luggage",
          "Book timed entries (Vatican Museums, Colosseum) with a buffer",
          "For evening events, confirm the ZTL's evening hours and the venue's own arrangements",
          "Keep the driver's phone number and the dispatch number on hand",
        ],
      },
    ],
    faqs: [
      {
        q: "Can my private transfer drive into the centre?",
        a: "Licensed NCC vehicles are among the authorised categories, but some streets are pedestrian-only, so the last stretch may be on foot.",
      },
      {
        q: "What happens if a coach enters the ZTL without a permit?",
        a: "A camera records the plate and a fine follows. That is why permits and drop-off points are planned in advance.",
      },
    ],
    related: ["rome-group-transportation", "group-transportation-italy", "rome-airport-transfer", "rome"],
    cta: { label: "Plan a group day in Rome", service: "group" },
    sources: [
      { label: "ZTL in the centre — Roma Servizi per la Mobilità", url: "https://romamobilita.it/muoversi-a-roma/ztl-in-centro/" },
      { label: "ZTL Roma: hours, map and permits (Sicurauto)", url: "https://www.sicurauto.it/news/attualita-e-curiosita/ztl-roma-orari-mappa-e-permessi/" },
    ],
  }),

  page({
    slug: "amalfi-coast-alternate-license-plates",
    kind: "guide",
    title: "Amalfi Coast Alternate Licence Plates & Transfer Rules",
    description:
      "How the Amalfi Coast's ZTLs, alternate-plate scheme and municipal fees work, and what they mean for transfers, private drivers and group vehicles.",
    h1: "Amalfi Coast Alternate Licence Plates and Transfer Rules",
    nav: "Amalfi Coast plate rules",
    lead:
      "The Amalfi Coast limits traffic in season, and the rules differ from town to town. Here is how the restrictions work and how to plan your transfer around them.",
    parent: GUIDES,
    readingMinutes: 5,
    sections: [
      {
        heading: "What applies",
        paragraphs: [
          "Traffic restrictions and an alternate-licence-plate scheme apply across eleven municipalities: Vietri sul Mare, Cetara, Maiori, Minori, Ravello, Atrani, Amalfi, Conca dei Marini, Furore, Praiano and Positano. In season, some roads limit non-resident vehicles by the last digit of the plate on certain days, and many towns have ZTLs with cameras that fine unauthorised vehicles automatically.",
        ],
      },
      {
        heading: "Town by town",
        bullets: [
          "Positano: a ZTL with a summer window (reported as 06:30 to midnight) and municipal fees — reported at €5 per entry, €15 per hour of parking and an €8 loading fee",
          "Ravello: a ZTL with a checkpoint fee, reported at €10 per entry",
          "Amalfi: restrictions at peak hours",
          "All towns: rules and fees change by season; always check the current calendar",
        ],
      },
      {
        heading: "What it means for your transfer",
        bullets: [
          "Choose an operator with local permits, not just any driver from Naples or Rome",
          "Sedans, vans and small minibuses work; large coaches do not",
          "Your hotel's access matters: many sit on steps or pedestrian paths",
          "Arrive with time in hand — the last stretch can take an hour or more in peak season",
          "SITA Sud buses and ferries are alternatives, but not door to door with luggage",
        ],
      },
      {
        heading: "How we handle it",
        paragraphs: [
          "We work with local partners who hold the permits and know each hotel's approach. Municipal fees are shown as separate lines in your quote and we confirm the last few hundred metres with your hotel before you travel.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I drive the Amalfi Coast myself?",
        a: "You can, but restrictions, fines, narrow roads and parking make it stressful in season. A local driver with permits is easier.",
      },
      {
        q: "Are the fees the same every year?",
        a: "No. They are set by each municipality and change by season, so verify the current figures before you travel.",
      },
    ],
    related: ["amalfi-coast", "rome-to-amalfi-coast-transfer", "naples-to-amalfi-coast-transfer", "amalfi-coast-wedding-transport"],
    cta: { label: "Get a Coast transfer quote", service: "transfer" },
    sources: [
      { label: "Amalfi Coast ZTL restrictions guide (Cerrato Limo)", url: "https://cerratolimo.com/en/amalfi-coast-ztl-access-guide" },
      { label: "Sistema Amalfi", url: "https://sistema-amalfi.it/pagina.asp?a=1821" },
    ],
  }),

  page({
    slug: "ncc-vs-taxi-italy",
    kind: "guide",
    title: "NCC vs Taxi in Italy: What's the Difference?",
    description:
      "NCC (noleggio con conducente) versus taxi in Italy: how each is licensed, how prices work, ZTL access and how to check that a private driver is legitimate.",
    h1: "NCC vs Taxi in Italy",
    nav: "NCC vs taxi",
    lead:
      "Both take you from A to B, but they are licensed and booked differently. Here is how to tell them apart, and how to check a private driver is legitimate.",
    parent: GUIDES,
    readingMinutes: 4,
    sections: [
      {
        heading: "The difference in one table",
        bullets: [
          "Taxi: hailed at a rank or by phone, metered or on set flat fares, licensed by the municipality",
          "NCC (noleggio con conducente): booked in advance, agreed price, licensed by the municipality that issued the authorisation",
          "Both are regulated by national Law 21/1992; the rules for each are different",
        ],
      },
      {
        heading: "How NCC works",
        paragraphs: [
          "An NCC service is a car with a driver at the customer's disposal, booked in advance through the operator's garage or office (including by digital means), with a price agreed for the trip. The operator holds a municipal authorisation and must have its registered office and garage in the authorising municipality. Italy's Constitutional Court confirmed those rules in 2025 while striking down other restrictions.",
        ],
      },
      {
        heading: "Which should you use?",
        bullets: [
          "Airport arrivals with a group or luggage: NCC, pre-booked",
          "Short hops in a city: a taxi is fine",
          "Long distances or day trips: NCC, for a fixed price",
          "Fixed flat fares exist for some airports; for example Rome Fiumicino to inside the Aurelian Walls is €55 by official taxi",
        ],
      },
      {
        heading: "How to check a private driver",
        bullets: [
          "Ask for the operator's name and NCC authorisation number and where it was issued",
          "Check the vehicle's documents show NCC use and that the insurer covers passengers",
          "Book in advance and get the price and inclusions in writing",
          "Avoid unofficial offers of a ride at the arrivals hall",
        ],
      },
    ],
    faqs: [
      {
        q: "Can an NCC pick me up at the street?",
        a: "No. NCC is booked in advance; picking up passengers on the street is a taxi activity.",
      },
      {
        q: "Are NCC vehicles allowed in ZTLs?",
        a: "In Rome, licensed NCC vehicles are among the authorised categories; rules vary by city.",
      },
    ],
    related: ["how-much-does-a-private-transfer-cost-in-italy", "rome-ztl-guide-for-groups-and-coaches", "airport-transfers", "private-chauffeur-italy"],
    cta: { label: "Book a licensed transfer", service: "transfer" },
    sources: [
      { label: "Law 21/1992 on taxis and NCC (text)", url: "https://www.patente.it/normativa/legge-15-01-1992-n-21-ncc-e-taxi?idc=1203" },
      { label: "Constitutional Court sentence 163/2025", url: "https://www.cortecostituzionale.it/scheda-pronuncia/2025/163" },
      { label: "Analysis of the sentence (LCA Studio Legale)", url: "https://www.lcalex.it/ncc-la-corte-costituzionale-torna-sui-limiti-imposti-ai-titolari-di-autorizzazione/" },
      { label: "Rome airport transfer options and taxi flat fare", url: "https://untolditaly.com/rome-airport-transfers/" },
    ],
  }),

  page({
    slug: "fiumicino-airport-to-rome-options",
    kind: "guide",
    title: "Fiumicino Airport to Rome: All Your Options",
    description:
      "How to get from Rome Fiumicino airport to the city: Leonardo Express, regional train, bus, taxi and private transfer compared by time and convenience.",
    h1: "Fiumicino Airport to Rome — All Your Options",
    nav: "Fiumicino to Rome options",
    lead:
      "Five ways to reach central Rome from Fiumicino, compared honestly: what each does well and when a private transfer is worth it.",
    parent: GUIDES,
    readingMinutes: 5,
    facts: [
      { label: "Distance", value: "About 30 km from central Rome" },
      { label: "Taxi flat fare", value: "€55 to anywhere inside the Aurelian Walls" },
      { label: "Airport size", value: "50.9 million passengers in 2025 — Italy's busiest airport" },
    ],
    sections: [
      {
        heading: "The five options",
        bullets: [
          "Leonardo Express train: non-stop to Roma Termini in about half an hour at a fixed fare; check current price and times with Trenitalia",
          "Regional train (FL1): slower and cheaper, calling at stations such as Trastevere, Ostiense and Tiburtina",
          "Airport buses: several operators run services to Termini and other points in the city",
          "Official taxi: a €55 flat fare to anywhere inside the Aurelian Walls",
          "Private transfer (NCC): from about €50 for a sedan, with vans and larger vehicles at higher prices, meeting you at arrivals",
        ],
      },
      {
        heading: "Which suits which traveller",
        bullets: [
          "One or two people, light bags, hotel near Termini: Leonardo Express",
          "Budget-conscious and flexible: regional train or bus",
          "Late arrival, tired or with children: taxi or private transfer",
          "Group of three or more, lots of luggage, or a hotel in a hard-to-reach street: private transfer, often no more expensive per person",
          "Hotel in the historic centre: an NCC can enter the ZTL, so it may get closer than a taxi can plan to",
        ],
      },
      {
        heading: "What to avoid",
        paragraphs: [
          "Avoid unofficial rides offered at arrivals: they are unlicensed and prices are negotiated on the spot. Use the official taxi rank, or pre-book a licensed driver whose name appears on your voucher.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does the drive take?",
        a: "About 45–60 minutes to the centre, depending on traffic.",
      },
      {
        q: "Is the €55 taxi fare fixed?",
        a: "It is a flat fare for journeys inside the Aurelian Walls; other destinations are metered.",
      },
    ],
    related: ["rome-airport-transfer", "ncc-vs-taxi-italy", "how-much-does-a-private-transfer-cost-in-italy", "ciampino-airport-transfer"],
    cta: { label: "Get a fixed price", service: "transfer" },
    sources: [
      { label: "Rome airport to city centre: all options (Untold Italy)", url: "https://untolditaly.com/rome-airport-transfers/" },
      { label: "Fiumicino to Rome: prices and times (Get Roman Tours)", url: "https://getromantours.com/blog/how-to-get-from-fiumicino-airport-fco-to-rome-city-center-2026-prices-times-real-advice" },
      { label: "Italian airport traffic 2025 (Il Sole 24 Ore)", url: "https://en.ilsole24ore.com/art/airports-2025-over-229-million-passengers-5-per-cent-AIba2mw" },
    ],
  }),

  page({
    slug: "malpensa-to-milan-and-lake-como-options",
    kind: "guide",
    title: "Malpensa to Milan & Lake Como: All Your Options",
    description:
      "Getting from Milan Malpensa airport to central Milan and Lake Como: train, bus, taxi and private transfer compared, with journey times and tips for luggage.",
    h1: "Malpensa to Milan and Lake Como — All Options",
    nav: "Malpensa options",
    lead:
      "Malpensa is 50 km from Milan and the gateway to the lakes. Here is how each option works and when a private transfer earns its keep.",
    parent: GUIDES,
    readingMinutes: 5,
    facts: [
      { label: "Airport size", value: "31.2 million passengers in 2025, up 8.6%" },
      { label: "To Milan", value: "About 50 km; roughly 50–70 minutes by road" },
      { label: "To Como", value: "About 45–55 km; roughly 50–60 minutes by road" },
    ],
    sections: [
      {
        heading: "To central Milan",
        bullets: [
          "Malpensa Express train: to Milan's Centrale and Cadorna stations in roughly 40–55 minutes",
          "Airport buses: to Milano Centrale and other points, subject to traffic",
          "Taxi: available at the rank; metered or fixed by city rules",
          "Private transfer: door to door, meeting you at arrivals",
        ],
      },
      {
        heading: "To Lake Como",
        paragraphs: [
          "There is no direct train to Como from the airport. Options usually involve a change (for instance via Milan or Saronno) or a bus. A private transfer is direct, typically 50–60 minutes to Como, and can continue along the lake to Cernobbio, Menaggio or Bellagio. Published per-km prices on this corridor vary widely, from about €1.30 to about €2.40 per km, so compare what is included.",
        ],
      },
      {
        heading: "To Lake Maggiore",
        paragraphs: [
          "Stresa and the Borromean Islands are close to Malpensa, roughly 45–60 minutes by road. Public options are limited, so most visitors choose a private transfer or a rental car.",
        ],
      },
      {
        heading: "When a private transfer earns its keep",
        bullets: [
          "Groups and families with heavy luggage",
          "Hotels or villas on the lakeshore, not near a station",
          "Late arrivals when public transport is thin",
          "Wedding and event guests arriving on different flights",
        ],
      },
    ],
    faqs: [
      {
        q: "Which terminal do I arrive at?",
        a: "Malpensa has Terminal 1 and Terminal 2. Your airline and flight determine which; we confirm the meeting point on your voucher.",
      },
      {
        q: "Is Lake Como easier from Malpensa or Bergamo?",
        a: "Malpensa is closer to Como; Bergamo is closer to Lecco and the eastern arm of the lake.",
      },
    ],
    related: ["malpensa-airport-transfer", "malpensa-to-lake-como-transfer", "lake-como", "milan-airport-transfer"],
    cta: { label: "Get a fixed price", service: "transfer" },
    sources: [
      { label: "Italian airport traffic 2025 (Il Sole 24 Ore)", url: "https://en.ilsole24ore.com/art/airports-2025-over-229-million-passengers-5-per-cent-AIba2mw" },
      { label: "Malpensa to Como per-km price", url: "https://www.ncchauffeur.it/en/private-driver/transfer-malpensa-como/" },
      { label: "Lake Como transfer costs per km", url: "https://www.comodriver.com/en/transfer-services/cost/" },
    ],
  }),

  page({
    slug: "destination-wedding-guest-transport-checklist",
    kind: "guide",
    title: "Destination Wedding Guest Transport Checklist (Italy)",
    description:
      "A practical checklist for planning guest transport at an Italian destination wedding: timeline, fleet sizing, arrival waves, shuttles and backup planning.",
    h1: "Destination Wedding Guest Transport Checklist",
    nav: "Wedding transport checklist",
    lead:
      "Guest transport is the part of a destination wedding that goes wrong quietly. Use this checklist to plan arrivals, shuttles and the late-night return.",
    parent: GUIDES,
    readingMinutes: 6,
    facts: [
      { label: "The scale", value: "15,100+ foreign weddings in Italy in 2024; about 960,000 guests, or roughly 64 guests per wedding" },
      { label: "Planners", value: "Professional planners were used in 46.3% of foreign weddings" },
      { label: "Season", value: "Peak weekends between May and October book out months ahead" },
    ],
    sections: [
      {
        heading: "12 to 6 months before",
        bullets: [
          "Confirm the venue's road access (surface, width, parking) and any restricted zones",
          "Shortlist the airports and stations your guests will use",
          "Choose hotels and request blocks; note the cut-off dates",
          "Ask a transport partner to review the venue approach and give a fleet estimate",
        ],
      },
      {
        heading: "6 to 3 months before",
        bullets: [
          "Collect guests' arrival dates, flights and hotels",
          "Group guests into arrival waves by airport and time window",
          "Set the shuttle loops between hotels and venue",
          "Agree the deposit schedule and cancellation terms",
        ],
      },
      {
        heading: "The last month",
        bullets: [
          "Freeze the final flight and hotel lists; brief the dispatcher and drivers",
          "Share the run-of-show with the transport coordinator",
          "Send guests a simple transport sheet with pick-up times and a WhatsApp number",
          "Confirm the couple's car and any VIP transfers",
        ],
      },
      {
        heading: "Sizing the fleet (rule of thumb)",
        paragraphs: [
          "A 19-seat minibus typically moves 15–18 guests once luggage and dress-up are considered. For a 50-guest evening return you usually need two such minibuses plus a sedan for the couple; for 100 guests, four to five vehicles staggered in waves. Narrow lanes and unpaved roads change the answer, so validate with a local operator.",
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Assuming a coach can reach the venue",
          "Forgetting the return: everyone leaves at once at midnight",
          "No backup vehicle if one fails",
          "Guests left to organise their own taxis at remote villas",
          "Hotel cut-off dates passing unnoticed",
        ],
      },
    ],
    faqs: [
      {
        q: "How early should we book transport?",
        a: "As soon as the venue and date are confirmed; for peak summer weekends, at least six months ahead.",
      },
      {
        q: "Do guests pay for shuttles?",
        a: "That is up to the couple. Many include shuttles in the wedding budget so guests do not need taxis.",
      },
    ],
    related: ["wedding-transportation-italy", "lake-como-wedding-transport", "tuscany-wedding-transport", "for-wedding-planners"],
    cta: { label: "Request a wedding logistics plan", service: "wedding" },
    sources: [
      { label: "Destination Wedding 2024 data (Sposi Magazine / Centro Studi Turistici)", url: "https://www.sposimagazine.it/news/destination-wedding-italia-2024/" },
      { label: "Wedding tourism in Italy (Qualitytravel)", url: "https://www.qualitytravel.it/wedding-tourism-in-italia-oltre-15mila-matrimoni-nel-2024-e-indotto-vicino-al-miliardo/160483" },
    ],
  }),

  page({
    slug: "how-to-plan-a-corporate-event-in-italy",
    kind: "guide",
    title: "How to Plan a Corporate Event in Italy",
    description:
      "A practical guide to planning a corporate event or offsite in Italy: timeline, budget structure, venue checks, transport, contracts and common pitfalls.",
    h1: "How to Plan a Corporate Event in Italy",
    nav: "Plan a corporate event",
    lead:
      "Italy is one of the world's top meeting destinations. This guide walks through timelines, budget lines, venue checks and the pitfalls that catch first-time organisers.",
    parent: GUIDES,
    readingMinutes: 7,
    facts: [
      { label: "Italy as a destination", value: "Second in the world for international association meetings (635 in 2024); Rome ninth and Milan fourteenth" },
      { label: "Domestic market", value: "367,981 business events in 2024 (+8.2%) and 29.3 million participants" },
    ],
    sections: [
      {
        heading: "Timeline",
        bullets: [
          "12–16 weeks before: confirm objectives, dates, city, guest numbers and budget range",
          "10–12 weeks: shortlist venues and hotels; request proposals",
          "8–10 weeks: sign contracts; pay first deposits; open the hotel block",
          "4–6 weeks: finalise programme, transport waves and catering; collect travel details",
          "1–2 weeks: freeze lists, brief suppliers, confirm every timing",
          "On site: coordinator, dispatch desk, contingency plan",
        ],
      },
      {
        heading: "The main budget lines",
        bullets: [
          "Accommodation and meeting rooms",
          "Catering and dinners",
          "Transport: airport waves, shuttles, VIP cars",
          "Venue hire, AV and production",
          "Activities, guides and entry tickets",
          "Staff, hosts and interpreters",
          "Management fee and contingency",
        ],
      },
      {
        heading: "Venue checks",
        paragraphs: [
          "Ask for evidence of the venue's safety and capacity documentation, its insurance and any licences needed for your kind of event. Larger events and public-entertainment formats may require specific permits held by the venue or organiser; your venue partner should tell you who holds them.",
        ],
      },
      {
        heading: "Contracts and cash flow",
        bullets: [
          "Mirror your client's deposit schedule to supplier terms; never pay a supplier earlier than you are paid",
          "Understand the attrition and cancellation clauses in hotel contracts",
          "Agree what is included in each line and what is extra",
          "Keep a contingency of a few percent for changes",
        ],
      },
      {
        heading: "Pitfalls specific to Italy",
        bullets: [
          "Transport strikes and airline disruption: build buffers for arrivals",
          "Restricted-traffic zones: plan drop-offs and permits",
          "Fair and holiday weeks: hotels and vehicles sell out",
          "Lunch and dinner timings: Italians eat later than most groups expect",
          "Weather: summer heat and shoulder-season rain affect outdoor venues",
        ],
      },
    ],
    faqs: [
      {
        q: "How far ahead should we plan?",
        a: "For 50+ guests, three to four months; for larger or peak-season events, six months or more.",
      },
      {
        q: "Should we use a local partner?",
        a: "For transport, accommodation and venues, yes: local partners know access rules, suppliers and the timing of Italian events.",
      },
    ],
    related: ["event-management-italy", "corporate-events-italy", "conferences-mice-italy", "for-event-agencies"],
    cta: { label: "Request an event quote", service: "event" },
    sources: [
      { label: "ICCA 2024 rankings: Italy second worldwide (Kongres Magazine)", url: "https://kongres-magazine.eu/2025/05/icca-reaffirms-italy-as-europes-top-conference-destination/" },
      { label: "Osservatorio Italiano dei Congressi e degli Eventi 2024 (Federcongressi&eventi)", url: "https://www.federcongressi.it/it/press/cresceilturismocongressualeoice2024/" },
    ],
  }),

  page({
    slug: "italy-hotel-group-booking-guide",
    kind: "guide",
    title: "Italy Hotel Group Booking Guide: Blocks & Attrition",
    description:
      "How group hotel bookings work in Italy: room blocks, cut-off dates, attrition, courtesy rooms and tourist tax, with tips for weddings, events and tour groups.",
    h1: "Italy Hotel Group Booking Guide",
    nav: "Hotel group booking guide",
    lead:
      "Group bookings work differently from individual reservations. Here are the terms that matter, how to read a contract and how to negotiate a better one.",
    parent: GUIDES,
    readingMinutes: 6,
    facts: [
      { label: "Seasonality", value: "Q4 (October–December) is only 14.8% of annual overnight stays, while roughly 46% fall in July–September" },
      { label: "Growth", value: "Non-hotel accommodation grew 6.6% in Q4 2025 against 1.2% for hotels, so alternatives such as villas are increasingly common for groups" },
    ],
    sections: [
      {
        heading: "The terms you need to know",
        bullets: [
          "Room block: rooms held at an agreed rate for your group",
          "Cut-off date: when unbooked rooms are released back to the hotel",
          "Attrition: how far the block can shrink without penalty",
          "Rooming list: the names of guests assigned to rooms",
          "Courtesy rooms: free rooms for organisers, often one per 20–25 paid rooms, if negotiated",
          "Cancellation schedule: how much you pay if the group cancels at each stage",
        ],
      },
      {
        heading: "Tourist tax",
        paragraphs: [
          "Italian municipalities levy a tourist tax per person per night, usually paid at the hotel. It is separate from the room rate and varies by city and hotel category, so it should appear as its own line in your budget.",
        ],
      },
      {
        heading: "How to negotiate",
        bullets: [
          "Offer flexible dates or a shoulder-season window",
          "Bundle meeting rooms, meals or events with rooms",
          "Trade a firmer commitment for a lower attrition penalty",
          "Ask for a longer cut-off; 30–60 days is common",
          "Ask for the rate and the terms in writing, together",
        ],
      },
      {
        heading: "When to consider villas or apartments",
        paragraphs: [
          "For weddings and retreats, villas can house a core group together and add character. Check capacity, bathrooms, road access and local safety documentation, and remember shuttles when guests are spread across several places.",
        ],
      },
    ],
    faqs: [
      {
        q: "How far ahead should we book a block?",
        a: "For summer and fair periods, six to twelve months ahead; for the shoulder season, three to six months.",
      },
      {
        q: "What if fewer guests than expected book?",
        a: "The attrition clause governs it; negotiate a generous allowance and a sensible cut-off.",
      },
    ],
    related: ["hotel-group-bookings-italy", "wedding-accommodation-italy", "event-management-italy", "for-corporate-travel-managers"],
    cta: { label: "Request group accommodation", service: "hotel-block" },
    sources: [
      { label: "ISTAT tourist flows, Q4 2025", url: "https://www.istat.it/comunicato-stampa/flussi-turistici-iv-trimestre-2025/" },
      { label: "Tourism seasonality in Italy (Statista)", url: "https://www.statista.com/statistics/1135415/monthly-number-of-tourist-arrivals-in-italy/" },
    ],
  }),

  page({
    slug: "what-is-an-italy-dmc",
    kind: "guide",
    title: "What Is an Italy DMC and How to Choose One",
    description:
      "What a destination management company (DMC) does in Italy, who uses one, what to ask before you sign and the red flags to avoid when choosing a partner.",
    h1: "What an Italy DMC Does and How to Choose One",
    nav: "What is an Italy DMC?",
    lead:
      "A DMC is a local company that delivers ground services for organisers abroad. Here is what that means in Italy, what to ask before you sign and the red flags to avoid.",
    parent: GUIDES,
    readingMinutes: 6,
    sections: [
      {
        heading: "What a DMC does",
        paragraphs: [
          "A destination management company designs and delivers hotels, transport, guides, venues and events in a destination for outside organisers: foreign agencies, tour operators, corporates and event agencies. In Italy, where each city has its own rules and supplier base, a local partner saves time and reduces risk.",
        ],
      },
      {
        heading: "Who uses one",
        bullets: [
          "Travel agencies and luxury advisors selling Italy trips",
          "Tour operators running groups",
          "Event and MICE agencies",
          "Corporates planning offsites and incentives",
        ],
      },
      {
        heading: "What to ask before you sign",
        bullets: [
          "Which parts of the programme do you deliver yourselves, and which do partners deliver?",
          "What licences and insurance do you hold, and can you show them? Italian travel agencies are regulated regionally, with insurance and insolvency guarantees required for packages",
          "Are all guides on the national register?",
          "How do you vet transport and hotel suppliers, and what is your backup plan?",
          "What is your 24/7 emergency process and who answers?",
          "How do deposits, payments and cancellations work?",
        ],
      },
      {
        heading: "Red flags",
        bullets: [
          "Prices that are far below the market with no explanation",
          "No named contact or emergency number",
          "Reluctance to show licences, insurance or supplier documents",
          "Unlicensed guides",
          "Demands for full prepayment far ahead with no protection",
        ],
      },
      {
        heading: "How DMCs earn money",
        paragraphs: [
          "DMCs typically earn through markups on services, planning or management fees and sometimes supplier commissions. A good DMC is transparent about its structure; a transparent quote with itemised lines and a clear fee is a good sign.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need a DMC for a small group?",
        a: "Not always. For small private trips, a good ground partner with licensed operators may be enough; for larger or multi-city groups, a DMC pays for itself.",
      },
      {
        q: "Is a DMC the same as a tour operator?",
        a: "Not quite. Tour operators sell packages to travellers; DMCs supply ground services to operators, agencies and corporates.",
      },
    ],
    related: ["italy-dmc-services", "for-travel-agencies", "for-tour-operators", "for-event-agencies"],
    cta: { label: "Request trade rates", service: "trade" },
    sources: [
      { label: "Italian Tourism Code, art. 33: definitions", url: "https://www.codicedelturismo.it/titolo-6/art-33-definizioni/" },
      { label: "Regione Lazio: travel agency requirements", url: "https://www.regione.lazio.it/sites/default/files/2021-03/vademecum-agenzie-viaggio.pdf" },
      { label: "National exam for tourist guides (Ministero del Turismo)", url: "https://www.ministeroturismo.gov.it/esame-di-abilitazione-nazionale-guida-turistica-al-via-il-nuovo-esame-per-il-conseguimento-dellabilitazione-nazionale-allesercizio-della-professione-di-guida-turistica-tag-esame-di/" },
    ],
  }),
];
