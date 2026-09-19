import type { Metadata } from "next";
import { absoluteUrl, site } from "@/config/site";
import { pathFor } from "@/content/registry";
import type { ContentPage, Faq } from "@/content/types";

export const orgId = () => absoluteUrl("/#organization");

/** Static social-share image (public/og-image.png) — a static file keeps the Cloudflare Worker small. */
export const ogImage = { url: "/og-image.png", width: 1200, height: 630, alt: site.name };

interface MetaInput {
  /** Full <title>. Keep ≤ 60 characters. */
  title: string;
  description: string;
  path: string;
  /** Set false for thin/utility pages (draft legal text, thank-you pages…) */
  index?: boolean;
}

export function pageMetadata({ title, description, path, index = true }: MetaInput): Metadata {
  const url = absoluteUrl(path);
  const allow = site.indexable && index;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index: allow, follow: allow },
    openGraph: { title, description, url, siteName: site.name, type: "website", locale: "en_GB", images: [ogImage] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}

/* ───────────── JSON-LD builders ───────────── */

export function organizationJsonLd() {
  const sameAs = [site.social.linkedin, site.social.instagram].filter(Boolean);
  return {
    "@context": "https://schema.org",
    // Only describe ourselves as a TravelAgency once the SCIA is filed and insurance is bound.
    "@type": site.agency.licensed ? "TravelAgency" : "Organization",
    "@id": orgId(),
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.contact.email,
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(site.company.vatId ? { vatID: site.company.vatId } : {}),
    areaServed: { "@type": "Country", name: "Italy" },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: site.url,
    name: site.name,
    publisher: { "@id": orgId() },
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(page: ContentPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: page.serviceType ?? page.h1,
    description: page.description,
    url: absoluteUrl(pathFor(page)),
    provider: { "@id": orgId() },
    areaServed: (page.areaServed ?? ["Italy"]).map((name) => ({ "@type": "Place", name })),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleJsonLd(page: ContentPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.description,
    mainEntityOfPage: absoluteUrl(pathFor(page)),
    datePublished: page.updated,
    dateModified: page.updated,
    author: { "@id": orgId() },
    publisher: { "@id": orgId() },
    inLanguage: "en",
  };
}

export function collectionJsonLd(page: ContentPage, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.h1,
    description: page.description,
    url: absoluteUrl(pathFor(page)),
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}
