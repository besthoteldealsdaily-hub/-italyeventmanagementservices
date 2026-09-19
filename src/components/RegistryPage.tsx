import Link from "next/link";
import type { ContentPage } from "@/content/types";
import { getPublishedPage } from "@/content/registry";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import FaqList from "./FaqList";
import JsonLd from "./JsonLd";
import { ButtonLink, CheckList, Container, Eyebrow } from "./ui";

const KIND_LABEL: Record<ContentPage["kind"], string> = {
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
  // Parent is linked only if that page is live.
  if (page.parent && getPublishedPage(page.parent.slug)) {
    crumbs.push({ name: page.parent.label, path: `/${page.parent.slug}` });
  }
  crumbs.push({ name: page.h1, path: `/${page.slug}` });
  return crumbs;
}

export default function RegistryPage({ page }: { page: ContentPage }) {
  const crumbs = crumbsFor(page);
  const related = (page.related ?? [])
    .map((slug) => getPublishedPage(slug))
    .filter((p): p is ContentPage => Boolean(p) && p!.slug !== page.slug);
  const quoteHref = `/request-a-quote?service=${page.cta.service}&from=${encodeURIComponent(page.slug)}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, path: c.path }))),
          serviceJsonLd(page),
          ...(page.faqs?.length ? [faqJsonLd(page.faqs)] : []),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <section className="border-b border-line bg-sand/40">
        <Container className="py-14 sm:py-20">
          <Eyebrow>{KIND_LABEL[page.kind]}</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-5xl">{page.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{page.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={quoteHref}>{page.cta.label}</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Talk to our team
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-12">
          {page.facts && page.facts.length > 0 && (
            <section aria-labelledby="facts">
              <h2 id="facts" className="text-2xl font-semibold">
                The essentials
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

          <p className="text-xs text-muted">Facts on this page last reviewed: {page.updated}.</p>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-line bg-white p-6">
            <p className="font-serif text-xl font-semibold">Get a fixed price</p>
            <p className="mt-2 text-sm text-muted">Tell us the basics — we reply with a fixed quote, usually within the hour on business days.</p>
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
                    <Link href={`/${r.slug}`} className="text-sm font-medium text-accent hover:underline">
                      {r.h1}
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
