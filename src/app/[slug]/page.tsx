import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RegistryPage from "@/components/RegistryPage";
import { getPublishedPage, getPublishedPages } from "@/content/registry";
import { pageMetadata } from "@/lib/seo";

// Only published slugs exist. Anything else is a 404 — no accidental thin pages.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPages().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPublishedPage(slug);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.description, path: `/${page.slug}` });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = getPublishedPage(slug);
  if (!page) notFound();
  return <RegistryPage page={page} />;
}
