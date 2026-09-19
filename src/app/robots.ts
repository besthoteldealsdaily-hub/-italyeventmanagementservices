import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/config/site";

/**
 * Search engines are blocked until NEXT_PUBLIC_ALLOW_INDEXING=true (set it at launch).
 * This prevents half-built pages and preview deployments from being indexed.
 */
export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    // Private, token-based customer pages and the admin panel must never be crawled.
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/quote/", "/pay/", "/voucher/", "/review/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
