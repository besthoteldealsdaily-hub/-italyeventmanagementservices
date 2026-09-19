import Link from "next/link";
import { site } from "@/config/site";
import { getPublishedPage } from "@/content/registry";
import { ButtonLink, Container } from "./ui";
import MobileNav from "./MobileNav";

export interface NavItem {
  label: string;
  href: string;
}

/** Nav only links to pages that are live — never to a stub or a 404. */
function live(slug: string, label: string): NavItem | null {
  return getPublishedPage(slug) ? { label, href: `/${slug}` } : null;
}

export function getNav() {
  const services = [
    live("group-transportation-italy", "Group transportation"),
    live("rome-airport-transfer", "Airport transfers — Rome"),
    live("rome-to-florence-transfer", "Rome to Florence"),
    live("rome-to-amalfi-coast-transfer", "Rome to Amalfi Coast"),
    live("lake-como-wedding-transport", "Wedding transport — Lake Como"),
    live("rome-corporate-events", "Corporate events — Rome"),
  ].filter((x): x is NavItem => x !== null);

  const main = [
    live("for-travel-agencies", "For agencies"),
    live("for-wedding-planners", "For planners"),
    live("rome", "Rome"),
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "/contact" },
  ].filter((x): x is NavItem => x !== null);

  return { services, main };
}

export default function Header() {
  const { services, main } = getNav();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="leading-none" aria-label={`${site.name} — home`}>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Italy</span>
          <span className="block font-serif text-base font-semibold sm:text-lg">Event Management Services</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {services.length > 0 && (
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-sand"
                aria-haspopup="true"
              >
                Services
                <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                  <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
                </svg>
              </button>
              <div className="invisible absolute left-0 top-full w-72 rounded-lg border border-line bg-white p-2 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                {services.map((item) => (
                  <Link key={item.href} href={item.href} className="block rounded-md px-3 py-2 text-sm hover:bg-sand">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {main.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-sand">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/request-a-quote" className="hidden !py-2 sm:inline-flex">
            Request a quote
          </ButtonLink>
          <MobileNav items={[...services, ...main]} />
        </div>
      </Container>
    </header>
  );
}
