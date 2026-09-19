import type { ReactNode } from "react";
import { site } from "@/config/site";
import { Container, Eyebrow } from "./ui";

/** Shared shell for legal pages (privacy, terms, cookies, cancellation). */
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
      <div className="mt-10 space-y-9 leading-relaxed [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_li]:mt-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
      <p className="mt-12 border-t border-line pt-6 text-sm text-muted">
        Questions about this page? Write to{" "}
        <a className="underline" href={`mailto:${site.contact.email}`}>
          {site.contact.email}
        </a>
        .
      </p>
    </Container>
  );
}

/** Name of the business that is responsible for the data / the contract. */
export function controllerName() {
  return site.company.legalName ?? site.name;
}

/** "Name, registered office, VAT" line — only includes what is actually configured. */
export function controllerDetails() {
  const c = site.company;
  return [controllerName(), c.registeredOffice, c.vatId && `VAT (P.IVA) ${c.vatId}`, c.rea && `REA ${c.rea}`]
    .filter(Boolean)
    .join(", ");
}
