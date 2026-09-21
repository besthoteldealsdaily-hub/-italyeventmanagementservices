import type { ContentPage, PageKind, RegistryEntry } from "./types";
import { airportPages } from "./pages/airports";
import { cityPages } from "./pages/cities";
import { guidePages } from "./pages/guides";
import { corporateGuides } from "./pages/guides-corporate";
import { planningGuides } from "./pages/guides-planning";
import { productionGuides } from "./pages/guides-production";
import { weddingGuides } from "./pages/guides-weddings";
import { hubPages } from "./pages/hubs";
import { industryPages } from "./pages/industries";
import { publishedPages } from "./pages/published";
import { routePages } from "./pages/routes";
import { eventServicePages } from "./pages/services-events";
import { transportServicePages } from "./pages/services-transport";
import { stubs } from "./pages/stubs";
import { verticalPages } from "./pages/verticals";

const allPages: ContentPage[] = [
  ...publishedPages,
  ...hubPages,
  ...transportServicePages,
  ...eventServicePages,
  ...airportPages,
  ...routePages,
  ...cityPages,
  ...verticalPages,
  ...industryPages,
  ...guidePages,
  ...weddingGuides,
  ...corporateGuides,
  ...productionGuides,
  ...planningGuides,
];

/** slug → entry. Published pages override stubs with the same slug. */
const map = new Map<string, RegistryEntry>();
for (const s of stubs) map.set(s.slug, s);

// Guard: fail the build if a slug is defined twice.
{
  const seen = new Set<string>();
  for (const p of allPages) {
    if (seen.has(p.slug)) throw new Error(`Duplicate published slug: ${p.slug}`);
    seen.add(p.slug);
    map.set(p.slug, p);
  }
}

/** Slugs of static routes: never served by the [slug] route. */
export const RESERVED_SLUGS = new Set([
  "about",
  "contact",
  "partners",
  "vehicles",
  "request-a-quote",
  "privacy",
  "terms",
  "cookies",
  "cancellation-policy",
  "guides",
  "sitemap.xml",
  "robots.txt",
]);

/** URL path of a page: guides live under /guides, everything else is flat. */
export function pathFor(p: { slug: string; kind: PageKind }): string {
  return p.kind === "guide" ? `/guides/${p.slug}` : `/${p.slug}`;
}

export function labelFor(p: ContentPage): string {
  return p.nav ?? p.h1;
}

export function getPublishedPage(slug: string): ContentPage | undefined {
  if (RESERVED_SLUGS.has(slug)) return undefined;
  const entry = map.get(slug);
  return entry && entry.status === "published" ? entry : undefined;
}

/** Pages served by the flat /[slug] route (everything except guides). */
export function getFlatPage(slug: string): ContentPage | undefined {
  const p = getPublishedPage(slug);
  return p && p.kind !== "guide" ? p : undefined;
}

export function getGuide(slug: string): ContentPage | undefined {
  const p = getPublishedPage(slug);
  return p && p.kind === "guide" ? p : undefined;
}

export function getPublishedPages(): ContentPage[] {
  return [...map.values()].filter((e): e is ContentPage => e.status === "published" && !RESERVED_SLUGS.has(e.slug));
}

export function getFlatPages(): ContentPage[] {
  return getPublishedPages().filter((p) => p.kind !== "guide");
}

export function getGuides(): ContentPage[] {
  return getPublishedPages().filter((p) => p.kind === "guide");
}

export function isPublished(slug: string): boolean {
  return Boolean(getPublishedPage(slug));
}

/** Path to a page if it is live, otherwise the quote page (so links never produce a 404). */
export function hrefFor(slug: string): string {
  const p = getPublishedPage(slug);
  return p ? pathFor(p) : "/request-a-quote";
}

/** Published pages (other than the destination itself) that carry a destination tag. */
export function pagesTagged(tag: string, exceptSlug?: string): ContentPage[] {
  return getFlatPages().filter((p) => p.slug !== exceptSlug && p.kind !== "city" && p.tags?.includes(tag));
}

/**
 * Related pages: the page's explicit `related` list first, then automatic siblings
 * (same parent, then same kind + shared destination tag) until there are `limit` links.
 */
export function relatedFor(page: ContentPage, limit = 6): ContentPage[] {
  const out: ContentPage[] = [];
  const seen = new Set<string>([page.slug]);
  const push = (p: ContentPage | undefined) => {
    if (p && !seen.has(p.slug) && p.kind !== "hub" && out.length < limit) {
      seen.add(p.slug);
      out.push(p);
    }
  };

  for (const slug of page.related ?? []) push(getPublishedPage(slug));

  if (page.parent) {
    for (const p of getFlatPages()) if (p.parent?.slug === page.parent.slug) push(p);
  }
  if (page.tags?.length) {
    for (const p of getPublishedPages()) {
      if (p.kind === page.kind && p.tags?.some((t) => page.tags!.includes(t))) push(p);
    }
  }
  return out;
}

export function registryStats() {
  const pages = getPublishedPages();
  const byKind: Record<string, number> = {};
  for (const p of pages) byKind[p.kind] = (byKind[p.kind] ?? 0) + 1;
  return { published: pages.length, byKind };
}
