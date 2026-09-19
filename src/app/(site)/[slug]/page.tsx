import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RegistryPage from "@/components/RegistryPage";
import { getFlatPage, getFlatPages, pathFor } from "@/content/registry";
import { pageMetadata } from "@/lib/seo";

// Only published slugs exist. Anything else is a 404 — no accidental thin pages.
export const dynamicParams = false;

export function generateStaticParams() {
  return getFlatPages().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getFlatPage(slug);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.description, path: pathFor(page) });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = getFlatPage(slug);
  if (!page) notFound();
  return <RegistryPage page={page} />;
}
