"use client";

import { useEffect, useRef } from "react";

interface TurnstileApi {
  render: (el: HTMLElement, opts: { sitekey: string; theme?: string }) => string;
  reset: (id?: string) => void;
}
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Explicit-render Turnstile widget. It writes its token into a hidden "cf-turnstile-response" field of the
 * surrounding form. `resetKey` changes after every submission so the (single-use) token is refreshed.
 */
export default function Turnstile({ resetKey }: { resetKey: unknown }) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);

  useEffect(() => {
    if (!SITE_KEY || !box.current) return;
    const el = box.current;
    const mount = () => {
      if (window.turnstile && !widget.current) widget.current = window.turnstile.render(el, { sitekey: SITE_KEY, theme: "light" });
    };
    if (window.turnstile) mount();
    else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = SRC;
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", mount);
      return () => script?.removeEventListener("load", mount);
    }
  }, []);

  useEffect(() => {
    if (widget.current && window.turnstile) window.turnstile.reset(widget.current);
  }, [resetKey]);

  if (!SITE_KEY) return null;
  return <div ref={box} className="min-h-[65px]" />;
}
