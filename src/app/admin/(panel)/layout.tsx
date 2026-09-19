import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../login/actions";

const NAV: { group: string; items: { label: string; href: string }[] }[] = [
  {
    group: "Sales",
    items: [
      { label: "Dashboard", href: "/admin" },
      { label: "Leads", href: "/admin/leads" },
      { label: "Quotes", href: "/admin/quotes" },
      { label: "Sales CRM", href: "/admin/sales" },
    ],
  },
  {
    group: "Operations",
    items: [
      { label: "Bookings", href: "/admin/bookings" },
      { label: "Events", href: "/admin/data/events" },
      { label: "Incidents", href: "/admin/data/incidents" },
      { label: "Tasks", href: "/admin/tasks" },
    ],
  },
  {
    group: "Finance",
    items: [
      { label: "Finance & profit", href: "/admin/finance" },
      { label: "Invoices", href: "/admin/invoices" },
      { label: "Payouts", href: "/admin/payouts" },
      { label: "Commissions", href: "/admin/data/commissions" },
    ],
  },
  {
    group: "Network",
    items: [
      { label: "Suppliers", href: "/admin/data/suppliers" },
      { label: "Hotels", href: "/admin/data/hotels" },
      { label: "Venues", href: "/admin/data/venues" },
      { label: "Customers", href: "/admin/data/organizations" },
      { label: "Contacts", href: "/admin/data/contacts" },
    ],
  },
  {
    group: "Pricing",
    items: [
      { label: "Routes", href: "/admin/data/routes" },
      { label: "Rate cards (cost)", href: "/admin/data/rate_cards" },
      { label: "Sell prices", href: "/admin/data/sell_prices" },
    ],
  },
  {
    group: "Plan",
    items: [
      { label: "Launch plan", href: "/admin/plan" },
      { label: "Supplier docs due", href: "/admin/documents" },
      { label: "Settings & import", href: "/admin/settings" },
    ],
  },
];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="lg:grid lg:grid-cols-[15rem_1fr]">
      <aside className="border-b border-line bg-ink p-4 text-white lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0">
        <Link href="/admin" className="block leading-none">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">Italy</span>
          <span className="block font-serif text-base font-semibold">Ops Admin</span>
        </Link>
        <nav aria-label="Admin" className="mt-5 flex flex-wrap gap-x-4 gap-y-4 lg:block lg:space-y-5">
          {NAV.map((g) => (
            <div key={g.group}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">{g.group}</p>
              <ul className="mt-1.5 flex flex-wrap gap-x-3 lg:block lg:space-y-0.5">
                {g.items.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className="block rounded px-2 py-1 text-sm text-white/85 hover:bg-white/10 hover:text-white">
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <form action={logout} className="mt-6">
          <button type="submit" className="rounded border border-white/30 px-3 py-1.5 text-xs font-semibold hover:bg-white/10">
            Log out
          </button>
        </form>
        <p className="mt-6 text-[11px] text-white/50">
          <Link href="/" className="hover:text-white">
            ← View public site
          </Link>
        </p>
      </aside>
      <div className="min-w-0 p-4 sm:p-8">{children}</div>
    </div>
  );
}
