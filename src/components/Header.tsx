import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { getNavGroups, getNavLinks } from "@/lib/nav";
import { ButtonLink, Container } from "./ui";
import MobileNav from "./MobileNav";

export default function Header() {
  const groups = getNavGroups();
  const links = getNavLinks();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-white backdrop-blur">
      <Container className="flex h-24 items-center justify-between gap-6">
        <Link href="/" className="shrink-0 leading-none" aria-label={`${site.name} — home`}>
          <Image
            src="/italy-event-management-services-logo.webp"
            alt={site.name}
            width={2216}
            height={709}
            priority
            className="h-16 w-auto rounded-md sm:h-20"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {groups.map((g) => (
            <div key={g.label} className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10"
                aria-haspopup="true"
              >
                {g.label}
                <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                  <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
                </svg>
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div
                  className={`rounded-xl border border-line bg-white p-5 text-ink shadow-xl ${
                    g.columns.length > 1 ? "w-[44rem]" : "w-72"
                  }`}
                >
                  <div className={`grid gap-6 ${g.columns.length > 1 ? "grid-cols-3" : ""}`}>
                    {g.columns.map((c) => (
                      <div key={c.title}>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted">{c.title}</p>
                        <ul className="mt-3 space-y-1">
                          {c.items.map((item) => (
                            <li key={item.href}>
                              <Link href={item.href} className="block rounded-md px-2 py-1.5 text-sm hover:bg-sand hover:text-accent">
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {g.all && (
                    <div className="mt-4 border-t border-line pt-3">
                      <Link href={g.all.href} className="text-sm font-semibold text-accent hover:underline">
                        {g.all.label} →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/request-a-quote" className="hidden !py-2 sm:inline-flex">
            Request a quote
          </ButtonLink>
          <MobileNav groups={groups} links={links} />
        </div>
      </Container>
    </header>
  );
}
