export type PageKind =
  | "hub"
  | "service"
  | "city"
  | "airport"
  | "route"
  | "vertical"
  | "industry"
  | "guide";

export interface Faq {
  q: string;
  a: string;
}

/** Unique, page-specific data (the "no unique data → no page" rule). */
export interface Fact {
  label: string;
  value: string;
}

export interface Section {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

/** Which quote-form service option a page's CTA pre-selects. */
export type QuoteService =
  | "transfer"
  | "chauffeur"
  | "wedding"
  | "group"
  | "hotel-block"
  | "event"
  | "tour"
  | "trade"
  | "supplier"
  | "other";

export interface HubGroup {
  title: string;
  text?: string;
  /** Slugs of pages listed as cards (unpublished ones are skipped automatically) */
  slugs: string[];
}

export interface ContentPage {
  slug: string;
  kind: PageKind;
  status: "published";
  /** <title> without the site suffix. Keep ≤ 60 characters. */
  title: string;
  description: string;
  h1: string;
  /** Short label for menus and cards (falls back to h1) */
  nav?: string;
  lead: string;
  /** Breadcrumb parent; only linked if that slug is published */
  parent?: { slug: string; label: string };
  /** Destination tags, e.g. ["rome"]. City pages list every page carrying their tag. */
  tags?: string[];
  facts?: Fact[];
  included?: string[];
  sections?: Section[];
  faqs?: Faq[];
  /** Hub pages: grouped cards */
  groups?: HubGroup[];
  /** Slugs of related pages (unpublished ones are ignored automatically) */
  related?: string[];
  cta: { label: string; service: QuoteService };
  serviceType?: string;
  areaServed?: string[];
  /** Guides: approximate reading time */
  readingMinutes?: number;
  /** Sources shown at the bottom of the page (used by guides) */
  sources?: { label: string; url: string }[];
  /** ISO date of the last human review of the facts on this page */
  updated: string;
}

/** A planned page that exists in the registry but is not live yet. */
export interface PageStub {
  slug: string;
  kind: PageKind;
  status: "draft";
  title: string;
}

export type RegistryEntry = ContentPage | PageStub;
