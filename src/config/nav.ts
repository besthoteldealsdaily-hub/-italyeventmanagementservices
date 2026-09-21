/**
 * Navigation structure. Entries are page slugs; labels come from each page's `nav` (or h1),
 * and slugs that are not published are skipped automatically (see lib/nav.ts).
 */

export interface NavColumn {
  title: string;
  slugs: string[];
}

export interface NavGroup {
  label: string;
  /** "All …" link shown under the menu */
  all?: { label: string; href: string };
  columns: NavColumn[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Services",
    all: { label: "All services", href: "/services" },
    columns: [
      {
        title: "Event management and weddings",
        slugs: [
          "event-management-italy",
          "event-services-italy",
          "corporate-events-italy",
          "conferences-mice-italy",
          "luxury-event-management-italy",
          "destination-weddings-italy",
          "incentive-travel-italy",
        ],
      },
      {
        title: "Transportation",
        slugs: [
          "airport-transfers",
          "city-to-city-transfers-italy",
          "private-chauffeur-italy",
          "group-transportation-italy",
          "minibus-coach-hire-italy",
          "cruise-port-transfers-italy",
          "wedding-transportation-italy",
        ],
      },
      {
        title: "Hotels, tours and travel",
        slugs: [
          "hotel-group-bookings-italy",
          "wedding-accommodation-italy",
          "private-tours-italy",
          "group-travel-italy",
          "italy-dmc-services",
          "corporate-travel-italy",
        ],
      },
    ],
  },
  {
    label: "Destinations",
    all: { label: "All destinations", href: "/destinations" },
    columns: [
      {
        title: "Cities and regions",
        slugs: ["rome", "milan", "florence", "venice", "naples", "amalfi-coast", "lake-como", "tuscany", "bologna", "verona"],
      },
      {
        title: "Airports",
        slugs: [
          "rome-airport-transfer",
          "milan-airport-transfer",
          "malpensa-airport-transfer",
          "venice-airport-transfer",
          "naples-airport-transfer",
          "pisa-airport-transfer",
        ],
      },
      {
        title: "Popular routes",
        slugs: [
          "rome-to-florence-transfer",
          "rome-to-amalfi-coast-transfer",
          "rome-to-naples-transfer",
          "florence-to-venice-transfer",
          "malpensa-to-lake-como-transfer",
          "milan-to-venice-transfer",
        ],
      },
    ],
  },
  {
    label: "For professionals",
    all: { label: "Trade desk and suppliers", href: "/partners" },
    columns: [
      {
        title: "Ground handling for",
        slugs: [
          "for-travel-agencies",
          "for-wedding-planners",
          "for-event-agencies",
          "for-tour-operators",
          "for-corporate-travel-managers",
        ],
      },
    ],
  },
];

/** Simple top-level links shown after the menus. */
export const navLinks: { label: string; href: string }[] = [
  { label: "Guides", href: "/guides" },
  { label: "Contact", href: "/contact" },
];

/** Footer columns (slugs, same rules). */
export const footerColumns: NavColumn[] = [
  {
    title: "Events and weddings",
    slugs: [
      "event-management-italy",
      "event-services-italy",
      "corporate-events-italy",
      "conferences-mice-italy",
      "luxury-event-management-italy",
      "destination-weddings-italy",
      "incentive-travel-italy",
    ],
  },
  {
    title: "Transportation",
    slugs: [
      "airport-transfers",
      "city-to-city-transfers-italy",
      "private-chauffeur-italy",
      "hourly-chauffeur-italy",
      "group-transportation-italy",
      "minibus-coach-hire-italy",
      "cruise-port-transfers-italy",
      "vip-transfers-italy",
      "wedding-transportation-italy",
    ],
  },
  {
    title: "Hotels and travel",
    slugs: [
      "hotel-group-bookings-italy",
      "private-tours-italy",
      "group-travel-italy",
      "italy-dmc-services",
    ],
  },
  {
    title: "Destinations",
    slugs: ["rome", "milan", "florence", "venice", "naples", "amalfi-coast", "lake-como", "tuscany"],
  },
  {
    title: "For professionals",
    slugs: ["for-travel-agencies", "for-wedding-planners", "for-event-agencies", "for-tour-operators", "for-corporate-travel-managers"],
  },
];
