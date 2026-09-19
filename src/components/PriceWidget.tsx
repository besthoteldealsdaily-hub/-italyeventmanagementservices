"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Price {
  vehicleClass: string;
  priceCents: number;
}

const LABEL: Record<string, string> = { sedan: "Sedan (1–3)", van: "Van (up to 7)", minibus: "Minibus", coach: "Coach", luxury: "Luxury" };
const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

/**
 * Shows fixed "from" prices for a route or airport page — but only when a real price exists in the admin
 * (Pricing → Sell prices, channel b2c). Otherwise it renders nothing.
 */
export default function PriceWidget({ slug, quoteHref }: { slug: string; quoteHref: string }) {
  const [prices, setPrices] = useState<Price[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/price?slug=${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : { prices: [] }))
      .then((d: { prices?: Price[] }) => {
        if (!cancelled && Array.isArray(d.prices)) setPrices(d.prices);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (prices.length === 0) return null;

  return (
    <section aria-labelledby="fixed-price" className="rounded-lg border border-accent/40 bg-white p-5">
      <h2 id="fixed-price" className="text-2xl font-semibold">
        Fixed price from {eur.format(Math.min(...prices.map((p) => p.priceCents)) / 100)}
      </h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {prices.map((p) => (
          <li key={p.vehicleClass} className="flex items-baseline justify-between rounded-md bg-sand/60 px-4 py-2">
            <span>{LABEL[p.vehicleClass] ?? p.vehicleClass}</span>
            <span className="font-semibold">{eur.format(p.priceCents / 100)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-muted">Per vehicle, VAT included. Tolls, parking and waiting time as described in your quote. Send your dates and we confirm availability in writing.</p>
      <Link href={quoteHref} className="mt-4 inline-block font-semibold text-accent underline">
        Get a confirmed quote →
      </Link>
    </section>
  );
}
