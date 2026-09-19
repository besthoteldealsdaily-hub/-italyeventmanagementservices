import Link from "next/link";
import { site } from "@/config/site";
import { getNav } from "./Header";
import { Container } from "./ui";

export default function Footer() {
  const { services } = getNav();
  const c = site.company;
  const hasCompany = c.legalName || c.vatId || c.rea || c.registeredOffice || c.shareCapital || c.pec;

  return (
    <footer className="mt-24 border-t border-line bg-ink text-white/80">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-serif text-lg font-semibold text-white">{site.name}</p>
          <p className="mt-3 text-sm leading-relaxed">
            Transfers, group transport, hotel blocks and events across Italy — run by one accountable team.
          </p>
        </div>

        {services.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white">Services</p>
            <ul className="mt-4 space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="hover:text-white">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/partners" className="hover:text-white">Partners &amp; suppliers</Link></li>
            <li><Link href="/vehicles" className="hover:text-white">Vehicles</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/request-a-quote" className="hover:text-white">Request a quote</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href={`mailto:${site.contact.email}`} className="hover:text-white">{site.contact.email}</a></li>
            {site.contact.phone && (
              <li><a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-white">{site.contact.phone}</a></li>
            )}
            <li>Replies {site.responseSla}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-xs text-white/60 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            {hasCompany && (
              <p>
                {[c.legalName, c.registeredOffice, c.vatId && `P.IVA ${c.vatId}`, c.rea && `REA ${c.rea}`, c.shareCapital && `Share capital ${c.shareCapital}`, c.pec && `PEC ${c.pec}`]
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
            <p>© {new Date().getFullYear()} {c.legalName ?? site.name}. All rights reserved.</p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            <li><Link href="/cookies" className="hover:text-white">Cookies</Link></li>
            <li><Link href="/cancellation-policy" className="hover:text-white">Cancellation policy</Link></li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
