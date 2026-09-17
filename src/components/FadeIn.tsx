"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

/*
 * Single-play scroll reveal — fades + lifts its children once, the first time
 * they cross into view (the observer unobserves after firing, so it never
 * replays on scroll-back). `delay` staggers siblings (header → cards → footer,
 * or a per-row card cascade). Renders a transparent block wrapper, so apply it
 * to flex/auto-placed grid children; don't wrap an element that carries
 * grid-placement or `order-*` classes (the wrapper, not the child, becomes the
 * track item). Reduced-motion users see the content immediately via the
 * `motion-reduce:` variants, with no JS branch (a setState in the effect trips
 * the React Compiler). Settles on `transform-none`, not `scale-100`, because an
 * identity transform still disables backdrop-filter in descendants.
 */
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Direction the content travels in from: "up" (default) or "left". */
  from?: "up" | "left";
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
  from = "up",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      // Negative bottom margin shrinks the trigger zone up from the viewport
      // bottom, so the element must scroll ~200px past first-appearance before
      // it reveals (it lands nearer mid-screen instead of firing on entry).
      { threshold: 0, rootMargin: "0px 0px -200px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`FadeIn transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? "transform-none opacity-100"
          : from === "left"
            ? "-translate-x-12 scale-95 opacity-0"
            : "translate-y-12 scale-95 opacity-0"
      } motion-reduce:transform-none motion-reduce:opacity-100 ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
