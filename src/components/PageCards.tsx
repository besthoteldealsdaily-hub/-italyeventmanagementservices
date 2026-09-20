import Link from "next/link";
import { labelFor, pathFor } from "@/content/registry";
import type { ContentPage } from "@/content/types";

const clamp = (s: string, n: number) => (s.length <= n ? s : s.slice(0, n - 1).replace(/[\s,;:–—-]+\S*$/, "") + "…");

/** Grid of links to pages: label, short description, arrow. */
export default function PageCards({ pages, columns = 3 }: { pages: ContentPage[]; columns?: 2 | 3 }) {
  if (pages.length === 0) return null;
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {pages.map((p) => (
        <li key={p.slug}>
          <Link
            href={pathFor(p)}
            className="group flex h-full flex-col rounded-xl border border-line bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-md"
          >
            <span className="font-semibold leading-snug transition-colors group-hover:text-accent">{labelFor(p)}</span>
            <span className="mt-2 flex-1 text-sm text-muted">{clamp(p.description, 110)}</span>
            <span
              className="mt-3 inline-block text-sm font-semibold text-accent transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
