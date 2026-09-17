"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/*
 * The GA4 events the Framer site sent through its GTM container
 * (GTM-T78WCQM7), reproduced with the same event names so existing GA4 reports
 * and conversions keep counting. The container held nothing but GA4: one
 * config tag and these link-click events. Its two "form" events fired on URL
 * paths containing `contact-form` / `booking-form`, which no page has, so they
 * are not carried over.
 *
 * One delegated listener, not a handler per link. The name is decided the way
 * GTM's triggers did: by what the href contains, first match wins.
 */
const RULES: [test: (href: string) => boolean, event: string][] = [
  [(h) => h.startsWith("mailto:"), "Email Click"],
  [(h) => h.startsWith("tel:"), "Phone Link Click"],
  [(h) => h.includes("instagram"), "Instagram Link Click"],
  [(h) => h.includes("linkedin"), "LinkedIn Click"],
  [(h) => h.includes("facebook"), "Facebook Link Click"],
];

export function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !window.gtag) return;
      const href = a.href;
      const named = RULES.find(([test]) => test(href))?.[1];
      if (named) window.gtag("event", named);
      else
        window.gtag("event", "Navigational Link Click", {
          link_text: (a.textContent ?? "")
            .trim()
            .replace(/\s+/g, " ")
            .slice(0, 100),
          link_url: href,
        });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
