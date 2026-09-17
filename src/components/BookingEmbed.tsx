"use client";

import { useEffect, useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Button } from "~/components/Button";
import { SITE } from "~/lib/site";

/*
 * Cal.com scheduler (the same event the Framer build embedded).
 *
 * Mounted when it nears the viewport: Cal pulls in its own runtime and an
 * iframe, and most visitors to a page never scroll to it. Until then, and if
 * the embed is blocked outright, the slot holds a real link to the booking
 * page, so booking always works.
 *
 * Cal's `brandColor` is the one place a hex has to be passed as a string,
 * because it styles a third-party iframe that cannot read our CSS variables.
 * It is read off the p3 token at runtime rather than hardcoded.
 */
const CAL_URL = `https://cal.com/${SITE.calLink}`;
const NAMESPACE = "general-consultation";

export function BookingEmbed({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    void (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      if (cancelled) return;
      const brand = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-p3")
        .trim();
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        ...(brand
          ? {
              cssVarsPerTheme: {
                light: { "cal-brand": brand },
                dark: { "cal-brand": brand },
              },
            }
          : {}),
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [mounted]);

  return (
    <div
      ref={ref}
      className={`BookingEmbed min-h-[40rem] w-full ${className}`.trim()}
    >
      {mounted ? (
        <Cal
          namespace={NAMESPACE}
          calLink={SITE.calLink}
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view", theme: "light" }}
        />
      ) : (
        <div className="BookingEmbedFallback flex min-h-[40rem] flex-col items-center justify-center gap-5 text-center">
          <p className="text-g2">Loading the calendar…</p>
          <Button href={CAL_URL}>Book Your Free Consultation</Button>
        </div>
      )}
    </div>
  );
}
