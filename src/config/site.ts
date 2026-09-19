/**
 * Central site configuration. Everything that must be true for a legal/commercial
 * reason (licence, company details) is env-driven and hidden until you set it —
 * so the site never shows placeholder or invented business details.
 */

const env = (key: string) => {
  const v = process.env[key];
  return v && v.trim().length > 0 ? v.trim() : undefined;
};

export const site = {
  name: "Italy Event Management Services",
  url: env("NEXT_PUBLIC_SITE_URL") ?? "https://italyeventmanagementservices.com",
  tagline: "Italy, handled.",
  description:
    "Event management, private transfers, group transport and hotel blocks across Italy — for planners, agencies and corporate teams. Fixed prices, 24/7 support.",
  locale: "en",

  contact: {
    email: env("NEXT_PUBLIC_CONTACT_EMAIL") ?? "info@italyeventmanagementservices.com",
    phone: env("NEXT_PUBLIC_PHONE"), // e.g. "+39 06 0000 0000"
    /** digits only, international format, no "+": e.g. "393331234567" */
    whatsapp: env("NEXT_PUBLIC_WHATSAPP"),
  },

  /** Our promise — only keep it if you can meet it. */
  responseSla: "within 1 hour on business days",

  /**
   * Shown in the footer/contact page only when set.
   * Fill these after the SRL exists (Italian commercial practice expects them on the site).
   */
  company: {
    legalName: env("NEXT_PUBLIC_COMPANY_LEGAL_NAME"),
    vatId: env("NEXT_PUBLIC_COMPANY_VAT_ID"),
    rea: env("NEXT_PUBLIC_COMPANY_REA"),
    registeredOffice: env("NEXT_PUBLIC_COMPANY_ADDRESS"),
    shareCapital: env("NEXT_PUBLIC_COMPANY_SHARE_CAPITAL"),
    pec: env("NEXT_PUBLIC_COMPANY_PEC"),
  },

  /**
   * Set once the travel-agency SCIA is filed and insurance is bound.
   * Until then the site does NOT describe itself as a licensed travel agency.
   */
  agency: {
    licensed: env("NEXT_PUBLIC_AGENCY_LICENSED") === "true",
    authorisation: env("NEXT_PUBLIC_AGENCY_AUTHORISATION"),
    insurer: env("NEXT_PUBLIC_AGENCY_INSURER"),
  },

  social: {
    linkedin: env("NEXT_PUBLIC_LINKEDIN_URL"),
    instagram: env("NEXT_PUBLIC_INSTAGRAM_URL"),
  },

  /** Search engines are blocked until you flip this to "true" at launch. */
  indexable: env("NEXT_PUBLIC_ALLOW_INDEXING") === "true",
} as const;

export function whatsappLink(message?: string) {
  if (!site.contact.whatsapp) return undefined;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.contact.whatsapp}${text}`;
}

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
