import Link from "next/link";
import type { ContentPage } from "@/content/types";
import { getPublishedPage, pagesTagged, pathFor, relatedFor } from "@/content/registry";
import { articleJsonLd, breadcrumbJsonLd, collectionJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import FaqList from "./FaqList";
import JsonLd from "./JsonLd";
import PageCards from "./PageCards";
import PriceWidget from "./PriceWidget";
import { ButtonLink, CheckList, Container, Eyebrow } from "./ui";

const KIND_LABEL: Record<ContentPage["kind"], string> = {
  hub: "Overview",
  service: "Service",
  city: "Destination",
  airport: "Airport transfer",
  route: "Route",
  vertical: "Solution",
  industry: "For professionals",
  guide: "Guide",
};

export function crumbsFor(page: ContentPage): Crumb[] {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }];
  // A parent is linked only if that page is live ("guides" is the static guides index).
  if (page.parent) {
    if (page.parent.slug === "guides") {
      crumbs.push({ name: page.parent.label, path: "/guides" });
    } else {
      const parent = getPublishedPage(page.parent.slug);
      if (parent) crumbs.push({ name: page.parent.label, path: pathFor(parent) });
    }
  }
  crumbs.push({ name: page.nav ?? page.h1, path: pathFor(page) });
  return crumbs;
}

/** Pages carrying a city's tag, grouped for the city page. */
function taggedGroups(city: ContentPage) {
  const tagged = pagesTagged(city.slug, city.slug);
  return [
    { title: `Airport transfers for ${city.nav ?? city.h1}`, pages: tagged.filter((p) => p.kind === "airport") },
    { title: "Routes", pages: tagged.filter((p) => p.kind === "route") },
    { title: "Services and solutions", pages: tagged.filter((p) => p.kind === "vertical" || p.kind === "service") },
    { title: "For professionals", pages: tagged.filter((p) => p.kind === "industry") },
  ].filter((g) => g.pages.length > 0);
}

export default function RegistryPage({ page }: { page: ContentPage }) {
  const crumbs = crumbsFor(page);
  const related = relatedFor(page, 6);
  const isHub = page.kind === "hub";
  const isGuide = page.kind === "guide";
  const isCity = page.kind === "city";
  const quoteHref = `/request-a-quote?service=${page.cta.service}&from=${encodeURIComponent(page.slug)}`;

  const groups = (page.groups ?? [])
    .map((g) => ({
      ...g,
      pages: g.slugs.map((s) => getPublishedPage(s)).filter((p): p is ContentPage => Boolean(p)),
    }))
    .filter((g) => g.pages.length > 0);

  const cityGroups = isCity ? taggedGroups(page) : [];

  const jsonLd: Record<string, unknown>[] = [breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, path: c.path })))];
  if (isGuide) jsonLd.push(articleJsonLd(page));
  else if (isHub)
    jsonLd.push(
      collectionJsonLd(
        page,
        groups.flatMap((g) => g.pages).map((p) => ({ name: p.nav ?? p.h1, path: pathFor(p) })),
      ),
    );
  else jsonLd.push(serviceJsonLd(page));
  if (page.faqs?.length) jsonLd.push(faqJsonLd(page.faqs));

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={crumbs} />

      <section className="border-b border-line bg-sand/40">
        <Container className="py-14 sm:py-20">
          <Eyebrow>{KIND_LABEL[page.kind]}</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-5xl">{page.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{page.lead}</p>
          {isGuide && page.readingMinutes && (
            <p className="mt-4 text-sm text-muted">
              {page.readingMinutes} min read · Updated {page.updated}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={quoteHref}>{page.cta.label}</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Talk to our team
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0 space-y-12">
          {isHub &&
            groups.map((g) => (
              <section key={g.title}>
                <h2 className="text-2xl font-semibold">{g.title}</h2>
                {g.text && <p className="mt-2 text-muted">{g.text}</p>}
                <div className="mt-5">
                  <PageCards pages={g.pages} columns={2} />
                </div>
              </section>
            ))}

          {page.facts && page.facts.length > 0 && (
            <section aria-labelledby="facts">
              <h2 id="facts" className="text-2xl font-semibold">
                {isGuide ? "Key facts" : "The essentials"}
              </h2>
              <dl className="mt-5 divide-y divide-line rounded-lg border border-line bg-white">
                {page.facts.map((f) => (
                  <div key={f.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                    <dt className="text-sm font-semibold text-muted">{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {(page.kind === "route" || page.kind === "airport") && <PriceWidget slug={page.slug} quoteHref={quoteHref} />}

          {page.included && page.included.length > 0 && (
            <section aria-labelledby="included">
              <h2 id="included" className="text-2xl font-semibold">
                What&apos;s included
              </h2>
              <div className="mt-5">
                <CheckList items={page.included} />
              </div>
            </section>
          )}

          {page.sections?.map((s) => (
            <section key={s.heading}>
              <h2 className="text-2xl font-semibold">{s.heading}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-muted">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-accent">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {cityGroups.map((g) => (
            <section key={g.title}>
              <h2 className="text-2xl font-semibold">{g.title}</h2>
              <div className="mt-5">
                <PageCards pages={g.pages} columns={2} />
              </div>
            </section>
          ))}

          {page.faqs && page.faqs.length > 0 && (
            <section aria-labelledby="faq">
              <h2 id="faq" className="text-2xl font-semibold">
                Frequently asked questions
              </h2>
              <div className="mt-5">
                <FaqList faqs={page.faqs} />
              </div>
            </section>
          )}

          {page.sources && page.sources.length > 0 && (
            <section aria-labelledby="sources">
              <h2 id="sources" className="text-xl font-semibold">
                Sources
              </h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted marker:text-accent">
                {page.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="text-xs text-muted">Facts on this page last reviewed: {page.updated}.</p>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-line bg-white p-6">
            <p className="font-serif text-xl font-semibold">Get a fixed price</p>
            <p className="mt-2 text-sm text-muted">
              Tell us the basics — we reply with a fixed quote, usually within the hour on business days.
            </p>
            <ButtonLink href={quoteHref} className="mt-4 w-full">
              {page.cta.label}
            </ButtonLink>
          </div>

          {related.length > 0 && (
            <nav aria-label="Related pages" className="rounded-xl border border-line bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">Related</p>
              <ul className="mt-3 space-y-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={pathFor(r)} className="text-sm font-medium text-accent hover:underline">
                      {r.nav ?? r.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </Container>
    </>
  );
}
