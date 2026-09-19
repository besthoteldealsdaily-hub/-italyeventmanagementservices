import Link from "next/link";
import { Container } from "./ui";

export interface Crumb {
  name: string;
  path: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-sand/50">
      <Container>
        <ol className="flex flex-wrap items-center gap-x-2 py-3 text-xs text-muted">
          {items.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>›</span>}
              {i < items.length - 1 ? (
                <Link href={c.path} className="hover:text-ink hover:underline">
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink">
                  {c.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
}
