import Image from "next/image";
import Link from "next/link";
import { CookieSettingsButton } from "./Analytics";
import { site, whatsappLink } from "@/config/site";
import { getFooterColumns } from "@/lib/nav";
import { Container } from "./ui";

function LinkedInIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43C21.99 8.94 22 9.28 22 12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77c-.55.55-1.11.9-1.77 1.15-.64.25-1.37.42-2.43.47C15.06 21.99 14.72 22 12 22s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53C6.09.28 6.82.11 7.88.06 8.94.01 9.28 0 12 0Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2A3.2 3.2 0 1 1 12 6.8a3.2 3.2 0 0 1 0 6.4ZM17.4 4.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
    </svg>
  );
}

export default function Footer() {
  const columns = getFooterColumns();
  const c = site.company;
  const hasCompany = c.legalName || c.vatId || c.rea || c.registeredOffice || c.shareCapital || c.pec;
  const wa = whatsappLink("Hello, I'd like to speak about a transfer/event in Italy.");

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-ink text-white/80">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_60%_50%_at_85%_0%,rgba(168,72,42,0.12),transparent)]"
      />
      <Container className="relative grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Image
            src="/italy-event-management-services-logo.webp"
            alt={site.name}
            width={2216}
            height={709}
            className="h-12 w-auto rounded-md"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Transfers, group transport, hotel blocks and events across Italy — run by one accountable team.
          </p>
          <ul className="mt-5 space-y-1.5 text-sm">
            <li>
              <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-white">
                {site.contact.email}
              </a>
            </li>
            {site.contact.phone && (
              <li>
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                  {site.contact.phone}
                </a>
              </li>
            )}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  WhatsApp us
                </a>
              </li>
            )}
            <li>Replies {site.responseSla}</li>
          </ul>
          {(site.social.linkedin || site.social.instagram) && (
            <div className="mt-5 flex gap-4">
              {site.social.linkedin && (
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  <LinkedInIcon />
                </a>
              )}
              {site.social.instagram && (
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  <InstagramIcon />
                </a>
              )}
            </div>
          )}
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-widest text-white">{col.title}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-xs text-white/60 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            {hasCompany && (
              <p>
                {[
                  c.legalName,
                  c.registeredOffice,
                  c.vatId && `P.IVA ${c.vatId}`,
                  c.rea && `REA ${c.rea}`,
                  c.shareCapital && `Share capital ${c.shareCapital}`,
                  c.pec && `PEC ${c.pec}`,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
            {site.agency.licensed && site.agency.authorisation && (
              <p>
                Travel agency authorisation: {site.agency.authorisation}
                {site.agency.insurer ? ` · Insurance: ${site.agency.insurer}` : ""}
              </p>
            )}
            <p>
              © {new Date().getFullYear()} {c.legalName ?? site.name}. All rights reserved.
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/about" className="transition-colors hover:text-white">About</Link></li>
            <li><Link href="/guides" className="transition-colors hover:text-white">Guides</Link></li>
            <li><Link href="/partners" className="transition-colors hover:text-white">Partners</Link></li>
            <li><Link href="/vehicles" className="transition-colors hover:text-white">Vehicles</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-white">Contact</Link></li>
            <li><Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link></li>
            <li><Link href="/terms" className="transition-colors hover:text-white">Terms</Link></li>
            <li><Link href="/cookies" className="transition-colors hover:text-white">Cookies</Link></li>
            <li><CookieSettingsButton className="transition-colors hover:text-white" /></li>
            <li><Link href="/cancellation-policy" className="transition-colors hover:text-white">Cancellation</Link></li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
