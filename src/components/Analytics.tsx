"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const KEY = "iems_consent_v1";
const OPEN_EVENT = "iems:open-consent";

type Choice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function writeChoice(c: Choice) {
  try {
    window.localStorage.setItem(KEY, c);
  } catch {
    /* storage blocked — the choice simply applies to this page view */
  }
}

function loadGa(id: string) {
  if (document.getElementById("ga4-script")) return;
  const s = document.createElement("script");
  s.id = "ga4-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  // gtag.js requires the `arguments` object itself to be pushed (a plain array does not work).
  function gtag(...args: unknown[]) {
    void args;
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", id, { anonymize_ip: true });
}

function clearGaCookies() {
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (name.startsWith("_ga")) {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, "")}`;
    }
  }
}

/**
 * Google Analytics 4 behind explicit consent. Renders nothing (and loads nothing) unless NEXT_PUBLIC_GA_ID is set.
 * No analytics script or cookie exists before the visitor presses "Accept". "Cookie settings" in the footer reopens this.
 */
export default function Analytics() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    const choice = readChoice();
    if (choice === "granted") loadGa(GA_ID);
    else if (choice === null) window.dispatchEvent(new Event(OPEN_EVENT)); // first visit: ask
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!GA_ID || !open) return null;

  const decide = (c: Choice) => {
    writeChoice(c);
    if (c === "granted") loadGa(GA_ID);
    else clearGaCookies();
    setOpen(false);
  };

  return (
    <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white p-4 shadow-lg sm:p-5">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          We would like to use Google Analytics cookies to understand how the site is used. They are off unless you accept. See our{" "}
          <Link href="/cookies" className="underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => decide("denied")} className="rounded-md border border-ink px-4 py-2 text-sm font-semibold hover:bg-sand">
            Reject
          </button>
          <button onClick={() => decide("granted")} className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink/90">
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner (renders only when analytics is configured). */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  if (!GA_ID) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      Cookie settings
    </button>
  );
}
