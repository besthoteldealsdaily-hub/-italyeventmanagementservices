import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RegistryPage from "@/components/RegistryPage";
import { getGuide, getGuides, pathFor } from "@/content/registry";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getGuides().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getGuide(slug);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.description, path: pathFor(page) });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const page = getGuide(slug);
  if (!page) notFound();
  return <RegistryPage page={page} />;
}
