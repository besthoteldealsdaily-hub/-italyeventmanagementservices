import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { getPublishedPages, pathFor } from "@/content/registry";

// Static routes that are real, indexable pages. (Legal pages are noindex and excluded on purpose.)
const STATIC_ROUTES = ["/", "/about", "/contact", "/partners", "/vehicles", "/guides", "/request-a-quote"];

const PRIORITY: Record<string, number> = {
  hub: 0.9,
  service: 0.8,
  city: 0.8,
  airport: 0.9,
  route: 0.9,
  vertical: 0.8,
  industry: 0.8,
  guide: 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const pageEntries = getPublishedPages().map((p) => ({
    url: absoluteUrl(pathFor(p)),
    lastModified: new Date(p.updated),
    changeFrequency: "monthly" as const,
    priority: PRIORITY[p.kind] ?? 0.7,
  }));

  return [...staticEntries, ...pageEntries];
}
