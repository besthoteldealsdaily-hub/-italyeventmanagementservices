import Link from "next/link";
import { site } from "@/config/site";

/** Minimal branded wrapper for customer-facing transactional pages (quote, payment, voucher, review). */
export default function DocShell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="min-h-screen bg-sand/40 text-ink">
      <header className="border-b border-line bg-white">
        <div className={`mx-auto flex items-center justify-between px-4 py-4 ${wide ? "max-w-5xl" : "max-w-3xl"}`}>
          <Link href="/" className="leading-none">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Italy</span>
            <span className="block font-serif text-lg font-semibold">Event Management Services</span>
          </Link>
          {site.contact.whatsapp && (
            <a
              href={`https://wa.me/${site.contact.whatsapp}`}
              className="text-sm font-medium text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
          )}
        </div>
      </header>
      <main className={`mx-auto px-4 py-8 ${wide ? "max-w-5xl" : "max-w-3xl"}`}>{children}</main>
      <footer className="mx-auto max-w-3xl px-4 pb-10 text-center text-xs text-muted">
        <Link href="/terms" className="hover:underline">Terms</Link> · <Link href="/cancellation-policy" className="hover:underline">Cancellation policy</Link> ·{" "}
        <Link href="/privacy" className="hover:underline">Privacy</Link>
      </footer>
    </div>
  );
}
