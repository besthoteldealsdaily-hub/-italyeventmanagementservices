import type { ContentPage, RegistryEntry } from "./types";
import { publishedPages } from "./pages/published";
import { stubs } from "./pages/stubs";

/**
 * slug → entry. Published pages override stubs with the same slug.
 * Only `status: "published"` entries are routable / in the sitemap.
 */
const map = new Map<string, RegistryEntry>();
for (const s of stubs) map.set(s.slug, s);
for (const p of publishedPages) map.set(p.slug, p);

// Guard: fail the build if a slug is defined twice inside published pages.
{
  const seen = new Set<string>();
  for (const p of publishedPages) {
    if (seen.has(p.slug)) throw new Error(`Duplicate published slug: ${p.slug}`);
    seen.add(p.slug);
  }
}

/** Slugs that collide with static routes and must never be served by the [slug] route. */
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
  "sitemap.xml",
  "robots.txt",
]);

export function getPublishedPage(slug: string): ContentPage | undefined {
  if (RESERVED_SLUGS.has(slug)) return undefined;
  const entry = map.get(slug);
  return entry && entry.status === "published" ? entry : undefined;
}

export function getPublishedPages(): ContentPage[] {
  return [...map.values()].filter((e): e is ContentPage => e.status === "published" && !RESERVED_SLUGS.has(e.slug));
}

export function isPublished(slug: string): boolean {
  return Boolean(getPublishedPage(slug));
}

/** Path to a page if it is live, otherwise the quote page (so nav never produces a 404). */
export function hrefFor(slug: string): string {
  return isPublished(slug) ? `/${slug}` : "/request-a-quote";
}

export function registryStats() {
  const all = [...map.values()];
  return {
    total: all.length,
    published: all.filter((e) => e.status === "published").length,
    planned: all.filter((e) => e.status === "draft").length,
  };
}
