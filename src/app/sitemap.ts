import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { getPublishedPages } from "@/content/registry";

// Static routes that are real, indexable pages. (Legal pages are draft/noindex and excluded on purpose.)
const STATIC_ROUTES = ["/", "/about", "/contact", "/partners", "/vehicles", "/request-a-quote"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const pageEntries = getPublishedPages().map((p) => ({
    url: absoluteUrl(`/${p.slug}`),
    lastModified: new Date(p.updated),
    changeFrequency: "monthly" as const,
    priority: p.kind === "route" || p.kind === "airport" ? 0.9 : 0.8,
  }));

  return [...staticEntries, ...pageEntries];
}
