import type { ReactNode } from "react";
import { site } from "@/config/site";
import { Container, Eyebrow } from "./ui";

/**
 * Shared shell for legal pages.
 * IMPORTANT: the texts below are DRAFTS to be replaced by lawyer-reviewed wording before launch.
 * Pages using this shell are noindex and excluded from the sitemap.
 */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <Container narrow className="py-16 sm:py-24">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="mt-3 text-4xl font-semibold">{title}</h1>
      <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>
      <p role="note" className="mt-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Draft — this page is being finalised with legal advice and may change before launch.
      </p>
      <div className="mt-10 space-y-8 leading-relaxed [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_li]:mt-1.5 [&_p+p]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
      <p className="mt-12 text-sm text-muted">
        Questions? <a className="underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </p>
    </Container>
  );
}

export function controllerName() {
  return site.company.legalName ?? site.name;
}
