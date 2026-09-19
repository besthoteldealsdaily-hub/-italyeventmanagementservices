"use client";

import Link from "next/link";
import { useState } from "react";
import type { ResolvedGroup } from "@/lib/nav";

export default function MobileNav({
  groups,
  links,
}: {
  groups: ResolvedGroup[];
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="rounded-md border border-line p-2"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-line bg-paper px-4 pb-6 pt-2 shadow-lg"
        >
          <ul className="divide-y divide-line">
            {groups.map((g) => (
              <li key={g.label}>
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between py-3 text-base font-semibold">
                    {g.label}
                    <svg aria-hidden viewBox="0 0 20 20" className="chev h-4 w-4 transition-transform" fill="currentColor">
                      <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
                    </svg>
                  </summary>
                  <div className="space-y-4 pb-4">
                    {g.columns.map((c) => (
                      <div key={c.title}>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted">{c.title}</p>
                        <ul className="mt-2 space-y-1">
                          {c.items.map((item) => (
                            <li key={item.href}>
                              <Link href={item.href} onClick={close} className="block rounded-md px-2 py-2 text-sm hover:bg-sand">
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {g.all && (
                      <Link href={g.all.href} onClick={close} className="block px-2 text-sm font-semibold text-accent">
                        {g.all.label} →
                      </Link>
                    )}
                  </div>
                </details>
              </li>
            ))}
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} className="block py-3 text-base font-semibold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/request-a-quote"
            onClick={close}
            className="mt-4 block rounded-md bg-accent px-3 py-3 text-center text-base font-semibold text-white"
          >
            Request a quote
          </Link>
        </div>
      )}
    </div>
  );
}
