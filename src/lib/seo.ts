import type { Metadata } from "next";
import { absoluteUrl, site } from "@/config/site";
import type { ContentPage, Faq } from "@/content/types";

export const orgId = () => absoluteUrl("/#organization");

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
    openGraph: { title, description, url, siteName: site.name, type: "website", locale: "en_GB" },
    twitter: { card: "summary_large_image", title, description },
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
    url: absoluteUrl(`/${page.slug}`),
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
