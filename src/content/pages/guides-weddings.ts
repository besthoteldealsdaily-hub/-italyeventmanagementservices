import { page } from "../builders";
import type { ContentPage } from "../types";

/** Wedding planning guides. Figures and rules are sourced in each guide; nothing here is legal advice. */

const GUIDES = { slug: "guides", label: "Guides" };

const WEDDING_DATA = [
  { label: "Destination Wedding 2024 data (Sposi Magazine / Centro Studi Turistici)", url: "https://www.sposimagazine.it/news/destination-wedding-italia-2024/" },
  { label: "Wedding tourism in Italy (Qualitytravel)", url: "https://www.qualitytravel.it/wedding-tourism-in-italia-oltre-15mila-matrimoni-nel-2024-e-indotto-vicino-al-miliardo/160483" },
];

export const weddingGuides: ContentPage[] = [
  page({
    slug: "getting-married-in-italy-civil-religious-symbolic",
    kind: "guide",
    title: "Getting Married in Italy: Civil, Religious or Symbolic",
    description:
      "How foreign couples marry in Italy: civil, religious and symbolic ceremonies, what the comune decides, the nulla osta, and what to confirm early.",
    h1: "Getting Married in Italy: Civil, Religious or Symbolic",
    nav: "Getting married in Italy",
    lead:
      "There are three ways to marry in Italy, and only two are legally binding. The one you choose decides the paperwork, the venue options and the timeline.",
    parent: GUIDES,
    readingMinutes: 6,
    facts: [
      { label: "Nulla osta", value: "The Italian term for a certificate of no impediment. The UK government says a Nulla Osta and a CNI are the same document, and British applicants can apply to the British Embassy Rome by post" },
      { label: "Civil ceremonies", value: "Under the Civil Code a civil marriage is celebrated in the town hall (casa comunale) before the civil registrar. A comune can designate other places as separate civil registry offices" },
      { label: "Symbolic ceremonies", value: "They have no legal effect and can be held wherever the venue allows" },
    ],
    sections: [
      {
        heading: "The three kinds of ceremony",
        bullets: [
          "Civil: legally binding, celebrated by the civil registrar (the mayor or a delegate) at the town hall or at a venue the comune has designated",
          "Religious: held in a church or chapel, with its own paperwork through the parish or the relevant religious authority. Your celebrant explains how the marriage is then registered",
          "Symbolic: a ceremony with no legal effect, held in a garden, on a terrace or in a villa. Some couples complete the legal marriage at home and hold the symbolic one in Italy",
        ],
      },
      {
        heading: "Who decides where a civil ceremony can be held",
        paragraphs: [
          "A couple cannot marry legally wherever they like. A comune can set up separate civil registry offices in other places, such as gardens or villas, and a civil ceremony is only valid at a location the comune has formally authorised. The comune may charge fees for moving the registrar and the records to that place.",
          "Not every venue is on a comune's list. If a villa appeals to you, ask the comune, not only the villa, whether civil ceremonies are allowed there. If they are not, the usual solution is a short legal ceremony at the town hall and the celebration at the villa.",
        ],
      },
      {
        heading: "The paperwork, in outline",
        paragraphs: [
          "A foreign national who wants to marry in Italy has to show that there is no legal impediment under the law of their own country. That document is the nulla osta or its equivalent. For British citizens it is the certificate of no impediment.",
          "Many comuni also ask for other documents, such as a sworn declaration, an apostille and Italian translations. The requirements depend on your nationality and on the comune, and the comune's civil registry office (Ufficio di Stato Civile) is the authority that confirms them. This guide is general information, not legal advice.",
        ],
      },
      {
        heading: "Witnesses and language",
        paragraphs: [
          "A civil ceremony normally needs two witnesses. If you or your witnesses do not speak Italian, ask the comune early whether an interpreter is required and who may act as one.",
        ],
      },
      {
        heading: "Questions to put to the comune",
        bullets: [
          "Which documents do we need for our nationalities, and in what form (originals, apostille, translation)?",
          "How far ahead must the file be submitted, and how long do you need to process it?",
          "Is our chosen venue designated for civil ceremonies, and what fee applies?",
          "How many witnesses do we need, and is an interpreter required?",
          "On which days and at what times can the registrar attend?",
        ],
      },
      {
        heading: "What a planner does and does not do",
        paragraphs: [
          "When we plan a wedding, we map the paperwork steps and deadlines with the comune early and coordinate the ceremony with the venue and the officiant or church. We do not give legal advice: the comune and your embassy or consulate confirm what applies to you.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do we have to marry legally in Italy?",
        a: "No. Many couples complete the legal marriage at home and hold a symbolic ceremony in Italy, which avoids most of the paperwork. Others prefer a legal ceremony in Italy and accept the documents that come with it.",
      },
      {
        q: "Can we marry at any villa?",
        a: "Only for a symbolic ceremony. A legal civil ceremony needs a location the comune has authorised, so ask the comune before you book a venue for that purpose.",
      },
      {
        q: "How far ahead should we start the paperwork?",
        a: "As soon as you have a date and a comune. Documents from your home country take time to obtain, and each comune has its own lead times, so ask for its deadline instead of assuming one.",
      },
    ],
    related: [
      "destination-weddings-italy",
      "how-to-choose-a-wedding-venue-in-italy",
      "destination-wedding-weekend-schedule-italy",
      "tuscany-wedding-planning",
      "lake-como-wedding-planning",
      "amalfi-coast-wedding-planning",
    ],
    cta: { label: "Plan my wedding", service: "wedding" },
    sources: [
      { label: "Nulla osta application pack for marriages in Italy (GOV.UK)", url: "https://gov.uk/government/publications/nulla-osta-application-pack-for-marriages-in-italy" },
      { label: "Where can a civil marriage be celebrated? (La Legge per Tutti)", url: "https://www.laleggepertutti.it/623473_il-matrimonio-civile-puo-essere-celebrato-ovunque" },
    ],
  }),

  page({
    slug: "destination-wedding-budget-italy",
    kind: "guide",
    title: "Destination Wedding Budget in Italy: Where the Money Goes",
    description:
      "What a destination wedding in Italy costs and where the money goes: the average budget, the catering share, venue and guest lines, and the costs couples forget.",
    h1: "Destination Wedding Budget in Italy: Where the Money Goes",
    nav: "Wedding budget",
    lead:
      "The average foreign wedding in Italy costs tens of thousands of euros, and catering takes the biggest slice. Here is how the budget breaks down and where the surprises hide.",
    parent: GUIDES,
    readingMinutes: 6,
    facts: [
      { label: "Average budget", value: "About €61,500 per wedding in 2024, up 4.2% on the year before" },
      { label: "Catering share", value: "Catering takes about 36% of the average budget" },
      { label: "Average size", value: "About 64 guests (960,000 guests across 15,100+ foreign weddings in 2024)" },
      { label: "Planners", value: "Professional planners were used in 46.3% of foreign weddings" },
    ],
    sections: [
      {
        heading: "The average, and what it hides",
        paragraphs: [
          "The 2024 figures put the average budget for a foreign couple's wedding in Italy at about €61,500, with catering taking about 36% of it. An average hides a wide range. Guest count, region, season and how many days the celebration lasts move the total far more than the country does, so treat the figure as a sanity check, not a target.",
        ],
      },
      {
        heading: "Where the money goes",
        bullets: [
          "Venue: hire for the weekend or the day, the ceremony fee, and any exclusive-use charge",
          "Catering and bar: usually the largest single line, and the one that scales most with guest count",
          "Décor, florals and lighting: styling the ceremony, the dinner and the dance floor",
          "Photography and video",
          "Music and entertainment, including the music licence fee",
          "A planner or coordinator, if you use one",
          "Guest hotels and transport, if you choose to cover them",
          "Legal paperwork, translations and any municipal fee for a civil ceremony",
          "Attire, rings, hair and make-up, which usually sit outside a planner's budget",
        ],
      },
      {
        heading: "Costs couples forget",
        bullets: [
          "The SIAE music licence, which the organiser of an event with music has to arrange",
          "Overtime for the venue, caterer and musicians if the evening runs past the agreed hour",
          "VAT and service charges that are not included in a headline price",
          "Venue extras: cleaning, power or a generator, tables, linen and staff",
          "Supplier travel and accommodation when a photographer or florist comes from another region",
          "A weather plan, such as a tent or an indoor fallback",
          "Meals for suppliers who work through the day",
          "A welcome dinner and a farewell brunch, if you plan them",
        ],
      },
      {
        heading: "How to keep the total under control",
        bullets: [
          "Fix the guest number first. It drives catering, tables, transport and rooms",
          "Ask every supplier for an itemised quote and compare like with like",
          "Consider a date outside the peak weeks, when venues and hotels have more room to negotiate",
          "Ask what the venue hire includes before you compare venues",
          "Keep a contingency line for changes",
        ],
      },
      {
        heading: "How our event quotes are built",
        paragraphs: [
          "Our event quotes show itemised supplier costs plus a clear management fee, so you can see where each euro goes. Deposit schedules mirror the suppliers' terms, and the quote shows the schedule before you commit.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a wedding in Italy cheaper than one at home?",
        a: "It depends on the guest count, the region and the season. The savings usually come from a smaller guest list and an off-peak date, not from the country itself.",
      },
      {
        q: "How many guests does the typical destination wedding have?",
        a: "About 64 on average, based on 960,000 guests across more than 15,100 weddings of foreign couples in 2024.",
      },
      {
        q: "Does a wedding budget include guests' hotels?",
        a: "Usually not. Couples decide whether to cover rooms for some or all of the guests, or to negotiate a group rate that guests pay themselves.",
      },
    ],
    related: [
      "destination-weddings-italy",
      "wedding-accommodation-italy",
      "how-to-choose-a-wedding-venue-in-italy",
      "best-time-to-get-married-in-italy",
      "music-and-entertainment-for-events-in-italy",
    ],
    cta: { label: "Plan my wedding", service: "wedding" },
    sources: [
      ...WEDDING_DATA,
      { label: "SIAE: licences for private parties", url: "https://www.siae.it/en/licenses/private-parties/" },
    ],
  }),

  page({
    slug: "how-to-choose-a-wedding-venue-in-italy",
    kind: "guide",
    title: "How to Choose a Wedding Venue in Italy | Checklist",
    description:
      "Twelve checks before you book a wedding venue in Italy: legal ceremony status, capacity, suppliers, music curfews, access, weather plan and contract terms.",
    h1: "How to Choose a Wedding Venue in Italy",
    nav: "Choosing a wedding venue",
    lead:
      "A villa that looks perfect in photographs can fail on access, capacity, noise limits or the legal ceremony. Twelve checks to run before you sign.",
    parent: GUIDES,
    readingMinutes: 6,
    facts: [
      { label: "Venue types", value: "Countryside villas, wine estates and farmhouses, castles and hamlets, lakeside villas, cliff-top hotels and historic city palazzi" },
      { label: "Villa changeovers", value: "Many villa rentals change over on Saturdays, so guests tend to arrive on the same day" },
      { label: "Legal ceremony", value: "A civil ceremony is only valid at a place the comune has authorised for that purpose" },
    ],
    sections: [
      {
        heading: "The date and the space",
        bullets: [
          "1. Exclusivity: is the venue yours for the whole weekend, or shared with another booking?",
          "2. Capacity: ask separately for the seated dinner, the ceremony and the number of guests who can sleep on site. They are often different numbers",
          "3. The indoor fallback: how many guests can it hold if the ceremony or dinner has to move inside?",
        ],
      },
      {
        heading: "The ceremony",
        bullets: [
          "4. Legal status: is the venue authorised by the comune for civil ceremonies? If not, plan a short legal ceremony at the town hall and a symbolic one at the venue",
          "5. Religious or symbolic options: is there a chapel, a garden or a terrace, and who may officiate there?",
        ],
      },
      {
        heading: "The party",
        bullets: [
          "6. Suppliers: does the venue have a fixed list of caterers and florists, or can you bring your own, and is there a fee for outside suppliers?",
          "7. Music and noise: until what time can outdoor music play, who sets the limit, and is there a sound limiter? Comuni set noise rules, and outdoor music commonly has to stop around 11 pm or midnight",
          "8. Kitchen and power: is there a kitchen the caterer can use, and enough power for lighting, sound and cooking?",
        ],
      },
      {
        heading: "The guests",
        bullets: [
          "9. Access: how do vehicles reach the venue, is there coach parking, and are there steps or gravel that affect guests with limited mobility?",
          "10. Rooms: how many guests can stay on site, is there a minimum stay, and where do the others sleep?",
        ],
      },
      {
        heading: "The contract",
        bullets: [
          "11. What the hire fee includes: tables, chairs, linen, cleaning, staff and overtime, and what counts as an extra",
          "12. Terms: the payment schedule, the cancellation and rescheduling terms, and what happens if weather or another event beyond anyone's control prevents the wedding",
        ],
      },
      {
        heading: "Rules that surprise couples",
        paragraphs: [
          "Many historic venues restrict open flames, fixings on walls, confetti, rice and fireworks, and some limit where photographers and drones can go. Ask for the venue's rules in writing and pass them to every supplier.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should we visit before booking?",
        a: "If you can, yes, especially for access, sound and the space you will use if it rains. If you cannot, ask for a video walk-through and the same details in writing.",
      },
      {
        q: "Can we bring our own caterer to a villa?",
        a: "Some venues allow it and some require their own list. Ask early, because it affects price and whether the villa has a working kitchen.",
      },
      {
        q: "How far ahead do venues book?",
        a: "The best venues for the warmer months go first. Start the search as soon as you have a rough date and guest count, and check availability before you commit to a date.",
      },
    ],
    related: [
      "destination-weddings-italy",
      "getting-married-in-italy-civil-religious-symbolic",
      "best-time-to-get-married-in-italy",
      "tuscany-wedding-planning",
      "lake-como-wedding-planning",
      "amalfi-coast-wedding-planning",
    ],
    cta: { label: "Plan my wedding", service: "wedding" },
    sources: [
      { label: "Where can a civil marriage be celebrated? (La Legge per Tutti)", url: "https://www.laleggepertutti.it/623473_il-matrimonio-civile-puo-essere-celebrato-ovunque" },
      { label: "Time restrictions on loud music at Italian wedding destinations (Roberta Torresan)", url: "https://robertatorresan.com/time-restrictions-on-loud-music-at-italian-wedding-destinations/" },
    ],
  }),

  page({
    slug: "best-time-to-get-married-in-italy",
    kind: "guide",
    title: "Best Time to Get Married in Italy, Month by Month",
    description:
      "The best months for an Italian wedding: spring, summer, autumn and winter compared for weather, crowds, prices and venue availability in each region.",
    h1: "Best Time to Get Married in Italy, Month by Month",
    nav: "Best time to marry",
    lead:
      "Italy suits weddings for much of the year, but the months differ in heat, crowds, prices and venue availability. Here is how to choose.",
    parent: GUIDES,
    readingMinutes: 5,
    facts: [
      { label: "Amalfi Coast", value: "May to October is the busiest period, and June to September is the hardest for road capacity" },
      { label: "Tourism seasonality", value: "Tourist arrivals in Italy are highest in the summer months" },
      { label: "Where couples marry", value: "Central Italy (Tuscany, Umbria, Lazio) accounts for 31.3% of foreign wedding requests; Southern Italy and the islands for 29.3%" },
    ],
    sections: [
      {
        heading: "January to March",
        paragraphs: [
          "Cold in the north and mild in the south, with short days. Some seasonal venues close, and outdoor ceremonies need an indoor plan. Venues that stay open often have more room to negotiate. Suits small weddings in cities and in the south.",
        ],
      },
      {
        heading: "April and May",
        paragraphs: [
          "Green, mild and changeable. The countryside is at its best and the flowers are abundant, but rain is a real risk, so a covered fallback matters. Milan and Verona host major trade fairs in April (the Salone del Mobile and Vinitaly), so hotels there can be short of rooms. Amalfi Coast season begins in May.",
        ],
      },
      {
        heading: "June",
        paragraphs: [
          "Long days and warm evenings, and one of the most requested months. Book venues, photographers and hotels early. The heat is usually manageable, and Lake Como and Tuscany are at their fullest.",
        ],
      },
      {
        heading: "July and August",
        paragraphs: [
          "Hot, especially in central and southern Italy, with the highest tourist numbers and the busiest roads and hotels. Many Italians take holiday around 15 August, so some local suppliers are harder to book. Choose shade, a late-afternoon ceremony and a plan for the heat. The lakes are cooler than the cities.",
        ],
      },
      {
        heading: "September and October",
        paragraphs: [
          "Warm days, softer light and the grape harvest in the wine regions. September is a favourite for couples who want summer weather with fewer crowds. By late October the chance of rain rises, so keep an indoor option.",
        ],
      },
      {
        heading: "November and December",
        paragraphs: [
          "Short days, cooler weather and many outdoor venues closed. Christmas markets and lights suit an intimate winter wedding. Expect fewer available suppliers, and plan travel around holiday dates.",
        ],
      },
      {
        heading: "By region",
        bullets: [
          "Tuscany and Umbria: late spring and early autumn are the most comfortable; July and August are hot",
          "Lake Como and the lakes: spring to early autumn, with cooler evenings than the cities",
          "Amalfi Coast: shoulder months beat the July and August crowds on the road",
          "Rome and the cities: avoid the hottest weeks in July and August for outdoor ceremonies",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the cheapest time to marry in Italy?",
        a: "Usually outside the peak weeks, for example on a weekday, in the shoulder months or in winter. Ask each venue and supplier what changes with the date.",
      },
      {
        q: "Is August a bad month?",
        a: "It is hot and busy, and some suppliers are on holiday around 15 August. It can work with shade, a late ceremony and early booking, but many couples prefer June or September.",
      },
      {
        q: "How far ahead should we book?",
        a: "For a peak-season date, about twelve months ahead is comfortable, and the best venues for May, June and September go first. Shorter timelines can work for smaller weddings.",
      },
    ],
    related: [
      "destination-weddings-italy",
      "how-to-choose-a-wedding-venue-in-italy",
      "destination-wedding-budget-italy",
      "best-months-for-events-in-italy",
      "amalfi-coast-wedding-planning",
    ],
    cta: { label: "Plan my wedding", service: "wedding" },
    sources: [
      ...WEDDING_DATA,
      { label: "Tourism seasonality in Italy (Statista)", url: "https://www.statista.com/statistics/1135415/monthly-number-of-tourist-arrivals-in-italy/" },
      { label: "Salone del Mobile 2026 (Dezeen Events Guide)", url: "https://www.dezeen.com/eventsguide/2026/04/salone-del-mobile-2026/" },
    ],
  }),

  page({
    slug: "destination-wedding-weekend-schedule-italy",
    kind: "guide",
    title: "A Destination Wedding Weekend in Italy: Day-by-Day Plan",
    description:
      "A sample three-day schedule for a destination wedding in Italy: arrival day, welcome dinner, ceremony, reception and farewell brunch, with timing tips.",
    h1: "A Destination Wedding Weekend in Italy: Day by Day",
    nav: "Wedding weekend plan",
    lead:
      "Most destination weddings run over two or three days. Here is a sample schedule, with the timing decisions that make it work.",
    parent: GUIDES,
    readingMinutes: 5,
    facts: [
      { label: "Average size", value: "About 64 guests, many travelling from abroad and needing rooms for several nights" },
      { label: "Villa changeovers", value: "Many villa rentals change over on Saturdays, so arrivals cluster on the same day" },
      { label: "Music curfews", value: "Local rules often stop outdoor music around 11 pm or midnight, which shapes the evening" },
    ],
    sections: [
      {
        heading: "Thursday or Friday: arrivals",
        bullets: [
          "Guests arrive over the day from several airports and stations, and check into their hotels",
          "A relaxed welcome drink or aperitivo in the late afternoon gives people a first chance to meet",
          "Keep the evening light if guests are jet-lagged",
          "Some couples complete the civil formalities at the town hall on this day, if the comune's schedule allows",
        ],
      },
      {
        heading: "Friday evening: welcome dinner",
        bullets: [
          "A shorter, informal dinner for the whole guest list or for family and close friends",
          "Regional food suits it, and it is a good place for speeches from the families",
          "Finish at a reasonable hour so guests are fresh the next day",
        ],
      },
      {
        heading: "Saturday: the wedding day",
        bullets: [
          "Late morning: hair, make-up and the couple's preparation. Guests are free or on an optional excursion",
          "Mid-afternoon: guests transfer to the venue and take their seats",
          "Late afternoon: the ceremony, timed for softer light and lower heat in summer",
          "After the ceremony: photographs and a cocktail hour with drinks and canapés",
          "Evening: seated dinner, speeches and the first dance",
          "Late evening: dancing, with the music plan set to the outdoor curfew and a move indoors if needed",
          "Last shuttles and rooms: agree the return times with guests in advance",
        ],
      },
      {
        heading: "Sunday: farewell brunch",
        bullets: [
          "A relaxed late-morning brunch for guests who are still in town",
          "A chance to thank guests and say goodbye before departures",
          "Plan check-out times and airport transfers around it",
        ],
      },
      {
        heading: "Timing decisions that matter",
        bullets: [
          "Start the ceremony earlier if the venue's outdoor music has to stop at 11 pm or midnight, so the party gets its hours",
          "Allow generous time between the ceremony and dinner for photographs, and keep guests comfortable during it",
          "Confirm dietary needs and allergens with the caterer before the dinner",
          "Give guests one clear schedule and a contact number for the weekend",
        ],
      },
    ],
    faqs: [
      {
        q: "How long should a destination wedding last?",
        a: "Two or three days suits most couples: an arrival evening, the wedding day and a farewell meal. Longer programmes add excursions but also cost and guest fatigue.",
      },
      {
        q: "Do we need a welcome dinner and a farewell brunch?",
        a: "Neither is required. They give guests who travelled far more time with you and spread the celebration, but they add cost, so decide by guest list and budget.",
      },
      {
        q: "What time should the ceremony start?",
        a: "In summer, late afternoon works well for light and heat. If outdoor music has to stop early, start earlier so the dancing gets its hours.",
      },
    ],
    related: [
      "destination-weddings-italy",
      "destination-wedding-guest-transport-checklist",
      "getting-married-in-italy-civil-religious-symbolic",
      "italian-wedding-traditions-guide",
      "wedding-accommodation-italy",
    ],
    cta: { label: "Plan my wedding", service: "wedding" },
    sources: [
      ...WEDDING_DATA,
      { label: "Time restrictions on loud music at Italian wedding destinations (Roberta Torresan)", url: "https://robertatorresan.com/time-restrictions-on-loud-music-at-italian-wedding-destinations/" },
    ],
  }),

  page({
    slug: "italian-wedding-traditions-guide",
    kind: "guide",
    title: "Italian Wedding Traditions Your Guests Will Meet",
    description:
      "Italian wedding customs explained: confetti and bomboniere, the serenade, midnight spaghetti, regional traditions, and how to include them in your wedding.",
    h1: "Italian Wedding Traditions Your Guests Will Meet",
    nav: "Italian wedding traditions",
    lead:
      "Sugared almonds, a serenade, a midnight plate of spaghetti: Italian weddings have customs that surprise guests from abroad. Here is what they mean and how to use them.",
    parent: GUIDES,
    readingMinutes: 5,
    facts: [
      { label: "Confetti", value: "In an Italian wedding, confetti are sugar-coated almonds, traditionally given in odd numbers for luck" },
      { label: "Bomboniere", value: "Favours that hold the almonds and thank guests for coming" },
      { label: "Regional variation", value: "Customs differ between the north, the centre and the south, so ask your venue and local suppliers what is usual where you marry" },
    ],
    sections: [
      {
        heading: "Confetti and bomboniere",
        paragraphs: [
          "Sugar-coated almonds, called confetti, are close to essential at an Italian wedding. They are usually displayed on a dedicated table, the tavolo della confettata, and given to guests in a small favour called a bomboniera. The almonds are traditionally given in odd numbers for good luck, and the mix of sweet and bitter is said to stand for married life.",
        ],
      },
      {
        heading: "The serenade",
        paragraphs: [
          "In parts of central and southern Italy, the groom sings to his bride the night before the wedding and brings flowers. It can fit naturally into a welcome evening if he is willing.",
        ],
      },
      {
        heading: "The ceremony",
        bullets: [
          "Weddings are traditionally held on a Saturday or Sunday, and Friday is considered unlucky by some",
          "Rice is often thrown as the couple leave, for fertility and prosperity",
          "Wedding rings are called fede, meaning faith, and are typically gold, worn on the left hand",
        ],
      },
      {
        heading: "The reception",
        bullets: [
          "Long, multi-course meals, seen as a sign of love and respect for guests",
          "La spaghettata di mezzanotte: a plate of spaghetti served around midnight to keep the dancing going",
          "The bouquet toss to unmarried women",
          "In southern Italy, the tarantella, a lively folk dance in which guests join hands and circle",
        ],
      },
      {
        heading: "Regional customs",
        bullets: [
          "Northern Italy: the groom's tie is cut into small pieces by friends and sold to raise money for the couple",
          "Central Italy: rosemary branches may be added to bouquets for luck, and the spouses may leave home left foot first",
          "Southern Italy and Sicily: several bridal customs around the dress and the bouquet vary by family and town",
        ],
      },
      {
        heading: "How to include them in your wedding",
        bullets: [
          "Set up a confettata table and choose bomboniere that guests can pack home",
          "Ask the caterer for a midnight snack, or a plate of pasta for the last dance",
          "Book a folk band or a musician for a tarantella if your guests would enjoy it",
          "Tell guests what to expect in your wedding programme so nothing surprises them",
        ],
      },
    ],
    faqs: [
      {
        q: "Do we have to follow Italian traditions?",
        a: "No. Couples mix the customs they like with their own. A confettata table and a midnight snack are the easiest to add.",
      },
      {
        q: "Why are the almonds given in odd numbers?",
        a: "Tradition holds that an odd number, often five, brings luck and stands for wishes such as health, happiness and a long life.",
      },
      {
        q: "Are customs the same across Italy?",
        a: "No. They vary by region and family, so ask your venue and local suppliers what is usual where you are marrying.",
      },
    ],
    related: [
      "destination-weddings-italy",
      "destination-wedding-weekend-schedule-italy",
      "music-and-entertainment-for-events-in-italy",
      "tuscany-wedding-planning",
      "amalfi-coast-wedding-planning",
    ],
    cta: { label: "Plan my wedding", service: "wedding" },
    sources: [
      { label: "Italian wedding traditions (Italy Segreta)", url: "https://italysegreta.com/italian-wedding-traditions-serenades-sugar-coated-almonds-and-silver-confetti/" },
      { label: "Bonbonniere (Wikipedia)", url: "https://en.wikipedia.org/wiki/Bonbonniere" },
    ],
  }),
];
