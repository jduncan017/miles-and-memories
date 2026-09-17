"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/*
 * The page transition: the old page wipes away from the bottom to near-black,
 * then the new one rises from below. The motion is CSS on the `root`
 * view-transition snapshot (globals.css, "Page transition"); this component
 * only decides when a transition runs.
 *
 * Why not React's <ViewTransition>: React animates the whole-document `root`
 * snapshot only when a boundary changed size, and cancels it otherwise, so a
 * page swap never reaches `root`. Wrapping the page instead animates that
 * element, which is thousands of pixels tall and offset by the scroll, so a
 * "wipe from the bottom of the screen" cannot be expressed. Driving the View
 * Transitions API directly keeps the snapshot the size of the viewport.
 *
 * How: a capture-phase click listener on the document runs before Next's
 * <Link> handler. For a plain left click on an internal link to a different
 * path it cancels the default (which <Link> respects) and navigates inside
 * document.startViewTransition, resolving the update once the new pathname
 * has committed. Modified clicks, new tabs, downloads, hash links and browsers
 * without the API fall through to normal navigation. Reduced motion skips it.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<{ to: string; resolve: () => void } | null>(null);

  // Resolve the in-flight transition once the destination has rendered.
  useEffect(() => {
    if (pending.current && pending.current.to === pathname) {
      pending.current.resolve();
      pending.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        !document.startViewTransition ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || a.target === "_blank" || a.hasAttribute("download"))
        return;
      const url = new URL(a.href);
      if (url.origin !== location.origin || url.pathname === location.pathname)
        return;

      e.preventDefault();
      const to = decodeURIComponent(url.pathname);
      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            // Never hold the old page frozen for long if the route is slow.
            const timeout = window.setTimeout(resolve, 2500);
            pending.current = {
              to,
              resolve: () => {
                window.clearTimeout(timeout);
                resolve();
              },
            };
            router.push(url.pathname + url.search + url.hash);
          }),
      );
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
