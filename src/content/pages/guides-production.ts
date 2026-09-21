import { page } from "../builders";
import type { ContentPage } from "../types";

/** Event production and support guides: catering, lighting, AV, décor, music, staff and security, photography. */

const GUIDES = { slug: "guides", label: "Guides" };

export const productionGuides: ContentPage[] = [
  page({
    slug: "event-catering-in-italy-guide",
    kind: "guide",
    title: "Event Catering in Italy: Formats, Tastings and Contracts",
    description:
      "How to choose event catering in Italy: seated dinner, buffet, food stations and aperitivo compared, plus tastings, allergens, staffing and contract terms.",
    h1: "Event Catering in Italy: Formats, Tastings and Contracts",
    nav: "Event catering guide",
    lead:
      "Catering is usually the largest cost of an event and the part guests remember. Here is how to compare formats and what to put in the contract.",
    parent: GUIDES,
    readingMinutes: 6,
    facts: [
      { label: "Weddings", value: "Catering takes about 36% of the average foreign wedding budget in Italy" },
      { label: "Food rules", value: "Caterers are food businesses under EU hygiene rules, and EU rules require allergen information for food served to guests" },
      { label: "Timing", value: "Italians eat later than many groups expect, so dinners are planned for the evening rather than the early hours" },
    ],
    sections: [
      {
        heading: "The main formats",
        bullets: [
          "Seated dinner: the most formal, with courses served at the table. Suits galas and weddings, and needs tight service timing",
          "Buffet: flexible and quick, good for large groups, with less ceremony",
          "Food stations: several themed counters, such as pasta, grill and dessert, that let guests move around",
          "Aperitivo or cocktail reception: drinks and small plates, standing, suited to arrivals and networking",
          "Family-style sharing: dishes served on the table to pass around, informal and warm",
        ],
      },
      {
        heading: "Choosing between them",
        paragraphs: [
          "Match the format to the purpose and the space. A speech-heavy gala works best seated, a networking evening in a palazzo works well as an aperitivo with stations, and a wedding often combines a cocktail hour with a seated dinner. Ask the venue whether the kitchen, tents or terrace can support your choice.",
        ],
      },
      {
        heading: "The tasting",
        bullets: [
          "Ask for a tasting of the menu before you sign, or a sample of the dishes you are unsure about",
          "Agree the portion sizes, the number of courses and the timing for each",
          "Check the wine list and the bar package, and what happens when they run out",
          "Confirm the vegetarian, vegan and allergen options with the same care as the main menu",
        ],
      },
      {
        heading: "Allergens, hygiene and paperwork",
        paragraphs: [
          "Ask the caterer to confirm it is a registered food business and how it manages hygiene and allergens. Collect dietary requirements with your RSVP and send the final list well before the event, so the kitchen can plan.",
        ],
      },
      {
        heading: "Staff and service",
        bullets: [
          "Ask for the number of waiters, bar staff and kitchen staff, and how many guests each serves",
          "Confirm the hours: setup, service and breakdown, and any overtime rate",
          "Agree uniforms, languages and who is the person in charge on the night",
        ],
      },
      {
        heading: "What the contract should say",
        bullets: [
          "The menu, the price per head and what is included: glassware, linen, service and bar",
          "The final guest number deadline and how changes are charged",
          "Payment schedule, cancellation terms and any rescheduling policy",
          "VAT and service charge, stated clearly",
          "Who is responsible for the kitchen, power and waste at an outdoor venue",
        ],
      },
    ],
    faqs: [
      {
        q: "How far ahead should we book a caterer?",
        a: "As soon as the venue and date are fixed. For weddings and peak-season events, caterers book early, and menus, tastings and staffing take weeks to organise.",
      },
      {
        q: "Can we bring our own caterer to a villa?",
        a: "Some villas allow it and some require their own list. Ask early, because the kitchen, the fees for outside suppliers and the equipment change the price.",
      },
      {
        q: "How do we handle dietary requirements?",
        a: "Collect them with the RSVP, share the list with the caterer well before the event, and ask how allergens are labelled at each course.",
      },
    ],
    related: [
      "event-services-italy",
      "destination-weddings-italy",
      "how-to-plan-a-gala-dinner-in-italy",
      "event-budget-guide-italy",
      "event-permits-and-licences-italy",
    ],
    cta: { label: "Request an event quote", service: "event" },
    sources: [
      { label: "Destination Wedding 2024 data (Sposi Magazine / Centro Studi Turistici)", url: "https://www.sposimagazine.it/news/destination-wedding-italia-2024/" },
      { label: "Regulation (EC) No 852/2004 on the hygiene of foodstuffs (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2004/852/oj" },
      { label: "Regulation (EU) No 1169/2011 on food information to consumers (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2011/1169/oj" },
    ],
  }),

  page({
    slug: "event-lighting-for-villas-and-historic-venues",
    kind: "guide",
    title: "Event Lighting for Italian Villas and Historic Venues",
    description:
      "How to light an event at an Italian villa or historic venue: uplighting, festoon and fairy lights, chandeliers, published price examples and power limits.",
    h1: "Event Lighting for Italian Villas and Historic Venues",
    nav: "Event lighting guide",
    lead:
      "Villas and palazzi have beautiful walls and little light. Good lighting turns a dark garden into an evening, and bad lighting ruins the photographs.",
    parent: GUIDES,
    readingMinutes: 5,
    facts: [
      { label: "Festoon or string lighting", value: "Published estimate of about €450 to €700 for a dinner or dance-floor area" },
      { label: "Chandeliers", value: "About €250 to €500 each, depending on size and mounting" },
      { label: "Fairy lights", value: "About €1,000 to €10,000 or more, because they need hundreds of metres and a lot of labour" },
      { label: "Uplights", value: "About €100 each, used to highlight architecture and landscape" },
    ],
    sections: [
      {
        heading: "Why lighting matters in historic venues",
        paragraphs: [
          "Lighting lets guests see each other and their food, and it adds atmosphere as natural light fades. Many historic venues have limited built-in lighting and uneven ground, so a lighting plan is part of the design, not an extra. The published price examples in this guide come from one wedding publication and are a guide to the range, not a quote.",
        ],
      },
      {
        heading: "The main types",
        bullets: [
          "Festoon or string lights: warm points of light over a dinner table or dance floor",
          "Chandeliers: suspended from a tree, a pergola or a tent for a formal look",
          "Fairy lights: many small lights along branches or walls, dramatic and labour-heavy",
          "Uplights: small fixtures on the ground that wash walls, columns and trees with colour",
        ],
      },
      {
        heading: "Plan lighting by moment",
        bullets: [
          "Ceremony: natural light where possible, with soft light on the aisle and the officiant",
          "Cocktail hour: uplights on architecture and lit paths so guests move safely",
          "Dinner: warm light on the tables, with no glare in guests' eyes",
          "Dance floor: moving or coloured light that can be dimmed or removed after the party peaks",
        ],
      },
      {
        heading: "What drives the cost",
        bullets: [
          "The site inspection before the event, which can take several hours",
          "Installation on the day, and dismantling and equipment return afterwards",
          "The amount of cable and the power needed, which may mean a generator",
          "The operator who runs the lighting during the event",
        ],
      },
      {
        heading: "Practical tips",
        bullets: [
          "Hire experienced operators, and give them the running order",
          "Avoid backlighting during dinner and the first dance, which can spoil photographs",
          "Ask the venue where fixings and cables are allowed. Many historic venues restrict drilling and attaching things to walls",
          "Choose a venue that needs little extra lighting, and concentrate your budget on the moments that matter",
          "Test the lighting at dusk, not in daylight",
        ],
      },
    ],
    faqs: [
      {
        q: "Do we need a lighting designer?",
        a: "For a large venue, a garden or a formal dinner, a designer or an experienced operator pays for itself. For a small indoor event, simple uplights and candles may be enough.",
      },
      {
        q: "Can lighting be attached to a historic building?",
        a: "Often not. Many historic venues restrict fixings, so ask what is allowed and use freestanding fixtures where it is not.",
      },
      {
        q: "How much should we budget?",
        a: "Published examples range from a few hundred euros for festoon lighting over a table to several thousand for fairy lights. Ask for an itemised quote after a site visit.",
      },
    ],
    related: [
      "event-services-italy",
      "event-decor-and-flowers-in-italy",
      "how-to-choose-a-wedding-venue-in-italy",
      "how-to-plan-a-gala-dinner-in-italy",
      "event-photography-and-video-brief",
    ],
    cta: { label: "Request an event quote", service: "event" },
    sources: [
      { label: "How much does wedding lighting cost in Italy? (La Lista)", url: "https://www.lalista.com/articles/how-much-does-lighting-cost-in-italy" },
    ],
  }),

  page({
    slug: "conference-av-checklist-italy",
    kind: "guide",
    title: "Conference AV Checklist: What to Ask Your Supplier",
    description:
      "A conference AV checklist for Italy: screens and LED walls, microphones, interpretation, streaming, power and load-in, and questions to ask before you book.",
    h1: "Conference AV Checklist: What to Ask Your Supplier",
    nav: "Conference AV checklist",
    lead:
      "Good AV goes unnoticed and bad AV is remembered. Use this checklist to brief a supplier and to test their answers.",
    parent: GUIDES,
    readingMinutes: 5,
    facts: [
      { label: "In-house AV", value: "Many congress venues and hotels have in-house AV, and some require you to use it. Ask before you book an outside supplier" },
      { label: "Historic venues", value: "Access, power and load-in times can be restricted, so AV needs to be planned with the venue early" },
    ],
    sections: [
      {
        heading: "Rooms and displays",
        bullets: [
          "Room size and layout: how many people, and where the sightlines are blocked",
          "Projector or LED wall: what is needed for daylight, and for the size of the room",
          "Screen size and resolution, and the aspect ratio of your slides",
          "Confidence monitors for speakers, and a clock or timer they can see",
        ],
      },
      {
        heading: "Sound",
        bullets: [
          "Microphones: handheld, lapel and headset, and how many you need at once",
          "Speakers sized for the room, and sound checked from the back",
          "Panel discussions: a microphone for each speaker, plus spares",
          "Audience questions: roaming microphones or a fixed one, and who carries it",
          "Backup batteries and a spare microphone at the desk",
        ],
      },
      {
        heading: "Content and presenters",
        bullets: [
          "One speaker desk where all slides are loaded and tested",
          "The file formats you accept, and a deadline for receiving them",
          "Presenter laptops, clickers and adapters, and who provides them",
          "A rehearsal slot for anyone with video or a demonstration",
        ],
      },
      {
        heading: "Languages and streaming",
        bullets: [
          "Interpretation: booths, receivers and interpreters for each language, and where the booths go",
          "Live streaming: internet bandwidth, a wired connection and who monitors it",
          "Recording: what is captured, who owns it and when it is delivered",
        ],
      },
      {
        heading: "Setup, power and crew",
        bullets: [
          "Load-in and load-out times, and any vehicle restrictions at the venue",
          "Power supply and the total load, including any generator",
          "How many technicians are on site, and who is the lead",
          "A technical check the day before, not on the morning of the event",
          "What happens if a piece of equipment fails, and how quickly it is replaced",
        ],
      },
      {
        heading: "Questions to ask the supplier",
        bullets: [
          "Have you worked in this venue before, and what were the constraints?",
          "What is included in the price: equipment, crew, setup, breakdown and travel?",
          "What is your backup plan for the plenary room?",
          "Who is the technical lead for the event?",
        ],
      },
    ],
    faqs: [
      {
        q: "Should we use the venue's in-house AV?",
        a: "It is often simpler and sometimes required. Ask what it includes and whether an outside supplier is allowed, and compare like for like.",
      },
      {
        q: "Do we need simultaneous interpretation?",
        a: "If delegates speak several languages and the sessions matter, yes. It needs booths, receivers and interpreters, so plan it early.",
      },
      {
        q: "When should AV be booked?",
        a: "As soon as the venue and dates are fixed. Popular venues and fair weeks fill quickly, and technical requirements take time to specify.",
      },
    ],
    related: [
      "conferences-mice-italy",
      "event-services-italy",
      "how-to-plan-a-conference-in-italy",
      "how-to-plan-a-gala-dinner-in-italy",
      "event-staff-and-security-planning-italy",
    ],
    cta: { label: "Request a MICE quote", service: "event" },
  }),

  page({
    slug: "event-decor-and-flowers-in-italy",
    kind: "guide",
    title: "Event Décor and Flowers in Italy: Seasons and Styling",
    description:
      "How to plan event décor and flowers in Italy: seasonal blooms, table styling, backdrops, heat and rules at historic venues, plus questions for your florist.",
    h1: "Event Décor and Flowers in Italy: Seasons and Styling",
    nav: "Décor and flowers guide",
    lead:
      "Italian venues carry a lot of character already. The best décor works with the building, the season and the light, not against them.",
    parent: GUIDES,
    readingMinutes: 5,
    facts: [
      { label: "Season", value: "Flowers follow the seasons, and the choice narrows in the coldest and hottest months" },
      { label: "Historic venues", value: "Many restrict open flames, fixings on walls and confetti, so décor has to be planned with the venue" },
      { label: "Who delivers it", value: "Independent florists and stylists deliver décor, and for the events we plan we source and manage them" },
    ],
    sections: [
      {
        heading: "Start with the venue",
        paragraphs: [
          "A frescoed hall, a stone terrace and a modern hotel ballroom need different décor. Look at what the venue already does well, then add only what it lacks: colour, softness, texture or a focal point.",
        ],
      },
      {
        heading: "Flowers by season",
        paragraphs: [
          "Availability varies by year and region, so treat this as a rough guide and ask your florist what is in season on your date.",
        ],
        bullets: [
          "Spring: peonies, ranunculus, sweet peas and lilac, roughly from April to June",
          "Summer: sunflowers, lavender, zinnias and olive branches, with foliage that copes with the heat",
          "Autumn: dahlias, grasses, berries and vine leaves in wine regions",
          "Winter: anemones, hellebores, citrus and evergreen foliage",
          "In Italy chrysanthemums are traditionally linked to funerals and All Saints, so many couples and companies avoid them",
        ],
      },
      {
        heading: "Table styling and installations",
        bullets: [
          "Long tables suit villas and gardens, and round tables suit galas and conferences",
          "Linen, ceramics and glassware set the tone before any flowers arrive",
          "A backdrop or an installation gives guests a focal point and a photograph",
          "Lighting and décor overlap, so plan them together",
        ],
      },
      {
        heading: "Practical points",
        bullets: [
          "Heat: flowers and foliage suffer outdoors in summer, so ask about shade and timing",
          "Delivery and setup time: allow time for access, especially at hill towns and on the coast",
          "Rules: confirm what the venue allows before you plan candles, hanging pieces or confetti",
          "Reuse: ceremony flowers can move to the reception, and centrepieces can double as gifts",
          "Take-down: agree who removes what and when",
        ],
      },
      {
        heading: "Questions for your florist or stylist",
        bullets: [
          "What is in season and available on my date, and what would you avoid?",
          "Have you worked at this venue, and what are its rules?",
          "What is included: delivery, installation, take-down and rental items?",
          "How do you handle heat and weather?",
          "What is the plan if a flower is unavailable?",
        ],
      },
    ],
    faqs: [
      {
        q: "Do we need a florist and a stylist?",
        a: "For a large or formal event, a stylist can coordinate flowers, furniture, linen and installations. For a smaller event, a good florist may handle both.",
      },
      {
        q: "Can we import flowers?",
        a: "Local and seasonal flowers are usually fresher and cheaper, and a good florist can source outside the season if needed. Ask for a quote for each option.",
      },
      {
        q: "How much décor does a historic venue need?",
        a: "Often less than you expect. Let the building do the work, and spend on the moments guests see most: the entrance, the tables and the focal point.",
      },
    ],
    related: [
      "event-services-italy",
      "event-lighting-for-villas-and-historic-venues",
      "destination-weddings-italy",
      "how-to-choose-a-wedding-venue-in-italy",
      "how-to-plan-a-gala-dinner-in-italy",
    ],
    cta: { label: "Request an event quote", service: "event" },
  }),

  page({
    slug: "music-and-entertainment-for-events-in-italy",
    kind: "guide",
    title: "Music for Events in Italy: DJ, Band or Quartet, and SIAE",
    description:
      "Choosing music for an event in Italy: DJ, live band, quartet or folk group, sound and power, outdoor curfews and the SIAE licence organisers must arrange.",
    h1: "Music for Events in Italy: DJ, Band or Quartet, and SIAE",
    nav: "Music and entertainment",
    lead:
      "The right music sets the pace of an evening. In Italy it also comes with a licence, a curfew and a few practical questions.",
    parent: GUIDES,
    readingMinutes: 6,
    facts: [
      { label: "SIAE", value: "SIAE is the Italian society of authors and publishers, and events where copyrighted music is performed need its licence" },
      { label: "Outdoor curfews", value: "Local noise rules often require outdoor music to stop around 11 pm or midnight, depending on the comune and the venue" },
      { label: "Who applies", value: "The organiser of the event normally arranges the licence" },
    ],
    sections: [
      {
        heading: "Match the music to the moment",
        bullets: [
          "Ceremony: a string quartet, harp, guitar or a singer, played softly and with a clear signal for the entrance",
          "Cocktail hour: a jazz trio, a pianist or a light acoustic set that guests can talk over",
          "Dinner: background music at low volume, or none while speeches are running",
          "Party: a DJ, a live band or a DJ with live musicians such as a saxophonist or a percussionist",
          "Traditional touch: a folk group or a tarantella band, if your guests would enjoy it",
        ],
      },
      {
        heading: "DJ or live band",
        paragraphs: [
          "A DJ is flexible, needs less space and is usually cheaper, and can play any genre. A live band brings energy and presence but needs a stage, power and more setup time. Many events combine both: a band for the first hour and a DJ afterwards.",
        ],
      },
      {
        heading: "The SIAE licence",
        paragraphs: [
          "Music at an event is protected by copyright, and in Italy the society SIAE issues the licence for it. The organiser normally has to arrange it, whether the music is live or recorded and whether the event is a wedding, a party or a corporate evening. The venue may already hold one for its own events, so ask. SIAE's pages explain what applies to different kinds of private event, and the fee depends on the event.",
        ],
      },
      {
        heading: "Sound, power and space",
        bullets: [
          "Who supplies the sound system and the backline: the musicians, the venue or a separate supplier",
          "How much power the venue has, and whether a generator is needed",
          "A sound check time that does not collide with the ceremony or dinner setup",
          "A sound limiter, if the venue or the comune requires one",
        ],
      },
      {
        heading: "Curfews and noise",
        paragraphs: [
          "Noise rules are set locally. Outdoor music commonly has to stop around 11 pm or midnight, and a few places are earlier. Ask the venue and the comune for the exact time, tell your musicians, and plan an indoor space for the party to continue if you need one.",
        ],
      },
      {
        heading: "Hosts, MCs and other entertainment",
        bullets: [
          "An MC or host keeps a gala or a wedding moving, and can work in two languages",
          "Performers, dancers or a magician suit corporate evenings and children's entertainment",
          "Brief every performer on the running order and the venue's rules",
        ],
      },
    ],
    faqs: [
      {
        q: "Who pays the SIAE licence?",
        a: "The organiser of the event normally arranges and pays it, not the DJ or the band. Ask the venue whether it already holds a licence, and check SIAE's pages for what applies to your event.",
      },
      {
        q: "Do we need a licence for a private party?",
        a: "SIAE's pages cover private parties and weddings, and events with copyrighted music generally need a licence. Check what applies to your event before you book the music.",
      },
      {
        q: "What time does outdoor music stop?",
        a: "It depends on the comune and the venue, and 11 pm or midnight is common. Confirm it in writing and plan accordingly.",
      },
    ],
    related: [
      "event-services-italy",
      "destination-weddings-italy",
      "italian-wedding-traditions-guide",
      "event-permits-and-licences-italy",
      "how-to-plan-a-gala-dinner-in-italy",
    ],
    cta: { label: "Request an event quote", service: "event" },
    sources: [
      { label: "SIAE: licences for private parties", url: "https://www.siae.it/en/licenses/private-parties/" },
      { label: "SIAE: wedding parties", url: "https://www.siae.it/en/licenses/private-parties/wedding/" },
      { label: "Time restrictions on loud music at Italian wedding destinations (Roberta Torresan)", url: "https://robertatorresan.com/time-restrictions-on-loud-music-at-italian-wedding-destinations/" },
    ],
  }),

  page({
    slug: "event-staff-and-security-planning-italy",
    kind: "guide",
    title: "Event Staff and Security in Italy: What to Plan",
    description:
      "Planning event staff and security in Italy: hosts, registration, ushers and waiting staff, plus how licensed security roles work and what to ask providers.",
    h1: "Event Staff and Security in Italy: What to Plan",
    nav: "Event staff and security",
    lead:
      "Guests notice staff more than almost anything else. Plan the roles, the briefings and, where needed, licensed security.",
    parent: GUIDES,
    readingMinutes: 5,
    facts: [
      { label: "Security is regulated", value: "Italian law regulates private security roles, including guards, stewards and staff who control access at entertainment venues, and they need authorisation" },
      { label: "Who provides staff", value: "Hosts, registration staff and interpreters come through staffing partners, and security through licensed providers" },
    ],
    sections: [
      {
        heading: "The roles an event may need",
        bullets: [
          "Hosts and hostesses: greeting, directing and answering questions",
          "Registration staff: check-in, badges, guest lists and late arrivals",
          "Ushers: seating at ceremonies and galas",
          "Waiting and bar staff: usually provided by the caterer",
          "Interpreters: for international guests and speakers",
          "Production and technical crew: covered by the AV or venue team",
          "A coordinator: one person who holds the running order and every supplier's number",
        ],
      },
      {
        heading: "Briefing and languages",
        bullets: [
          "Brief staff on the programme, the venue layout and the guest list before the event",
          "Give hosts a one-page summary of who to ask when a guest has a question",
          "Match languages to your guests, and check English at the very least",
          "Agree dress code and how staff are identified",
          "Plan breaks, meals and the end of shifts, especially at long events",
        ],
      },
      {
        heading: "How security works in Italy",
        paragraphs: [
          "Private security is regulated in Italy. Roles such as security guards, stewards and staff who control access at entertainment venues need authorisation, and the services are provided by licensed firms. That means an event company should not present security as its own team unless it holds the licence. When we arrange security, it comes from licensed providers as a separate line, and we brief them with the rest of the team.",
        ],
      },
      {
        heading: "Do you need security?",
        bullets: [
          "Large guest lists, public access or ticketed entry",
          "VIP guests, or guests who need discretion",
          "Venues that require it, or an insurer that asks for it",
          "Alcohol, late finishes or outdoor spaces with open access",
        ],
      },
      {
        heading: "What to ask a security provider",
        bullets: [
          "Are you licensed, and can you show it?",
          "How many people do you recommend for our guest list and venue, and why?",
          "How do you brief and dress your team, and who leads on the night?",
          "How will you work with the venue and the event coordinator?",
        ],
      },
    ],
    faqs: [
      {
        q: "How many staff do we need?",
        a: "It depends on the guest count, the format and the venue. Ask each supplier what ratio they recommend and why, and compare the answers.",
      },
      {
        q: "Can the caterer provide hosts as well?",
        a: "Sometimes. Caterers usually provide waiting and bar staff, while hosts, registration staff and interpreters often come from a separate staffing supplier.",
      },
      {
        q: "Is security required for a private event?",
        a: "Not always. It depends on the guests, the venue and the risk. Ask the venue and, if you are unsure, a licensed provider for advice.",
      },
    ],
    related: [
      "event-services-italy",
      "conferences-mice-italy",
      "luxury-event-management-italy",
      "how-to-plan-a-gala-dinner-in-italy",
      "event-permits-and-licences-italy",
    ],
    cta: { label: "Request an event quote", service: "event" },
    sources: [
      { label: "Private security in Italy (Polizia di Stato)", url: "https://www.poliziadistato.it/articolo/sicurezza-privata" },
    ],
  }),

  page({
    slug: "event-photography-and-video-brief",
    kind: "guide",
    title: "Event Photography and Video: How to Brief Your Team",
    description:
      "How to brief an event photographer and videographer in Italy: shot lists, timeline, light, venue and drone rules, guest consent, deliverables and usage rights.",
    h1: "Event Photography and Video: How to Brief Your Team",
    nav: "Photo and video brief",
    lead:
      "A good photographer works from a good brief. Give them a timeline, a shot list and the venue's rules, and agree what you will receive.",
    parent: GUIDES,
    readingMinutes: 5,
    facts: [
      { label: "Booking", value: "Photographers and videographers for peak weekends book early, so brief and confirm them as soon as the date and venue are fixed" },
      { label: "Drones", value: "Drone use is regulated by the Italian civil aviation authority (ENAC) and EU rules" },
      { label: "Guest consent", value: "EU data protection rules apply to photographing and filming guests" },
    ],
    sections: [
      {
        heading: "What to put in the brief",
        bullets: [
          "The event's purpose, the schedule and the key moments, with times",
          "The venue and its rules: where photographers can stand, and whether flash or drones are allowed",
          "Who must be photographed: family groups, VIPs, speakers, sponsors or awards winners",
          "The look you want: documentary, editorial, formal or cinematic, with examples",
          "The languages and the contact person for each area",
        ],
      },
      {
        heading: "Shot list and timeline",
        bullets: [
          "Weddings: preparation, the ceremony, family portraits, the couple's portraits, the reception, speeches and the dance floor",
          "Corporate events: the venue, the arrivals, the speakers, the audience, the awards and the networking",
          "Conferences: keynotes, breakout sessions, exhibitors, sponsors and delegates",
          "Give the photographer time for portraits and group photographs, and warn guests in advance",
        ],
      },
      {
        heading: "Light and location",
        paragraphs: [
          "Golden hour makes portraits, and the timing of the ceremony and the couple's portraits should respect it. Indoors, ask the venue about the natural light and the lighting plan. Avoid strong backlighting during the key moments, which can spoil photographs.",
        ],
      },
      {
        heading: "Rules and permissions",
        bullets: [
          "Ask the venue in writing what it allows: professional equipment, tripods, flash and access to certain rooms",
          "For public monuments and museums, check with the site's authority whether professional photography needs permission",
          "Ask any videographer who flies a drone how they will comply with the rules, and check that the venue allows it",
          "Tell guests that photography and filming will take place, and how to opt out",
        ],
      },
      {
        heading: "Deliverables and rights",
        bullets: [
          "The number of edited images, the format and the delivery date",
          "A same-day highlight or preview, if you want one",
          "Video: length, edits and formats, and whether raw footage is included",
          "Usage rights: what you and your company may do with the images",
          "Travel and accommodation costs if the photographer comes from another region",
        ],
      },
    ],
    faqs: [
      {
        q: "How far ahead should we book a photographer?",
        a: "As soon as the date and venue are fixed. The best photographers for peak weekends book early.",
      },
      {
        q: "Do we need a videographer as well?",
        a: "For weddings and galas, a short film is popular. For conferences, a highlight video and speaker clips are more common. Decide the purpose before you brief anyone.",
      },
      {
        q: "Can we use the images for marketing?",
        a: "Only if the agreement gives you the rights, and you have the consent of the people in them. Agree usage in the contract.",
      },
    ],
    related: [
      "event-services-italy",
      "destination-weddings-italy",
      "event-lighting-for-villas-and-historic-venues",
      "how-to-plan-a-conference-in-italy",
      "event-permits-and-licences-italy",
    ],
    cta: { label: "Request an event quote", service: "event" },
    sources: [
      { label: "ENAC: Italian civil aviation authority", url: "https://www.enac.gov.it/" },
    ],
  }),
];
