"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Button } from "~/components/Button";
import { cx } from "~/lib/cx";
import { NAV_LINKS, PRIMARY_CTA, SERVICES_NAV } from "~/lib/site";

/*
 * Fixed site header, measured off the live build: 100px tall on desktop, 24px
 * padding, a 4px backdrop blur.
 *
 * Two schemes, by page and by scroll position:
 *   home, over the hero         20% g5 wash, white type (reads as clear)
 *   home, past the hero         solid g5, white type
 *   elsewhere, over the header  70% g5, white type
 *   elsewhere, past the header  solid n0, dark type and the dark logo
 *
 * "The header" is whatever element carries `data-hero` (PageHero,
 * DestinationHero). Pages with no photo header (booking, travel tip posts)
 * start in the scrolled scheme; that list lives here so a new page of an
 * existing kind inherits it. The open mobile panel is dark, so it forces the
 * dark scheme.
 *
 * Open state for the mobile panel and the services menu is stored as "the path
 * it was opened on", so navigating closes both by derivation rather than an
 * effect that resets state after render.
 */
const NO_HERO_ROUTES = [/^\/booking$/, /^\/travel-tips\/.+/];

export function Navbar() {
  const pathname = usePathname();
  // Stored per path, like the menus below, so a navigation resets it by
  // derivation until the next scroll event measures the new page.
  const [pastHeroOn, setPastHeroOn] = useState<string | null>(null);

  const [panelFor, setPanelFor] = useState<string | null>(null);
  const panelOpen = panelFor === pathname;
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const menuOpen = menuFor === pathname;
  const isHome = pathname === "/";
  const past =
    NO_HERO_ROUTES.some((r) => r.test(pathname)) || pastHeroOn === pathname;
  const light = past && !isHome && !panelOpen;

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector("[data-hero]");
      const nav = document.querySelector(".Navbar");
      const past =
        !!hero &&
        !!nav &&
        hero.getBoundingClientRect().bottom <=
          nav.getBoundingClientRect().height;
      setPastHeroOn(past ? pathname : null);
    };
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!panelOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [panelOpen]);

  return (
    <header
      data-scheme={light ? "light" : "dark"}
      className={cx(
        "Navbar group/nav fixed inset-x-0 top-0 z-50 shadow-[0_0.625rem_0.625rem_-0.25rem_rgb(0_0_0/0.06)] backdrop-blur-[4px] transition-colors duration-500",
        light
          ? "bg-n0"
          : past || panelOpen
            ? "bg-g5"
            : isHome
              ? "bg-g5/20"
              : "bg-g5/70",
      )}
    >
      {/* Same rail as the hero copy (max-w-[100rem], 24/40/80px sides), so the
          logo lines up with the H1 beneath it. */}
      <div className="NavbarInner mx-auto flex h-19 max-w-[100rem] items-center justify-between gap-6 px-6 md:h-25 md:px-10 lg:px-20">
        <Link
          href="/"
          aria-label="Miles & Memories home"
          className="NavbarBrand flex shrink-0 items-center gap-4 rounded-sm focus-visible:ring-2 focus-visible:ring-p3 focus-visible:outline-none"
        >
          {/* Both logos are stacked and crossfade; they share dimensions. */}
          <span className="NavbarLogo relative block h-10">
            <Image
              src="/images/miles-and-memories-logo-white.webp"
              alt="Miles & Memories"
              width={1187}
              height={436}
              priority
              className="h-10 w-auto transition-opacity duration-500 group-data-[scheme=light]/nav:opacity-0"
            />
            <Image
              src="/images/miles-and-memories-logo-dark.webp"
              alt=""
              aria-hidden="true"
              width={1187}
              height={436}
              priority
              className="absolute inset-0 h-10 w-auto opacity-0 transition-opacity duration-500 group-data-[scheme=light]/nav:opacity-100"
            />
          </span>
          <span
            aria-hidden="true"
            className="NavbarBrandDivider hidden h-10 w-px bg-n0/60 transition-colors duration-500 group-data-[scheme=light]/nav:bg-g2/60 lg:block"
          />
          <Image
            src="/images/travelmation-mark-white.webp"
            alt="Travelmation"
            width={600}
            height={234}
            priority
            // A one-colour mark, so the light scheme simply renders it black.
            className="hidden h-10 w-auto transition-[filter] duration-500 group-data-[scheme=light]/nav:brightness-0 lg:block"
          />
        </Link>

        <nav
          aria-label="Main"
          className="NavbarLinks hidden flex-1 items-center gap-8 lg:flex lg:pl-10"
        >
          <div
            className="NavbarServices relative"
            onMouseEnter={() => setMenuFor(pathname)}
            onMouseLeave={() => setMenuFor(null)}
          >
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="services-menu"
              onClick={() => setMenuFor(menuOpen ? null : pathname)}
              className="NavbarServicesTrigger flex items-center gap-1 rounded-sm text-lg tracking-[-0.04em] text-n0 uppercase transition-colors duration-500 group-data-[scheme=light]/nav:text-g5 hover:text-p1 group-data-[scheme=light]/nav:hover:text-p3 focus-visible:ring-2 focus-visible:ring-p3 focus-visible:outline-none"
            >
              Travel Services
              <ChevronDown
                aria-hidden="true"
                className={cx(
                  "size-6 transition-transform duration-300",
                  menuOpen && "rotate-180",
                )}
              />
            </button>
            {menuOpen && (
              <div className="NavbarServicesMenu absolute top-full left-0 pt-4">
                <ul
                  id="services-menu"
                  className="w-72 animate-dropdown-in overflow-hidden rounded-lg bg-g5/90 py-2 shadow-theme backdrop-blur-md"
                >
                  <li>
                    <NavMenuLink href="/services">
                      All Travel Services
                    </NavMenuLink>
                  </li>
                  {SERVICES_NAV.map((s) => (
                    <li key={s.href}>
                      <NavMenuLink href={s.href}>{s.label}</NavMenuLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname.startsWith(l.href) ? "page" : undefined}
              className="NavbarLink rounded-sm text-lg tracking-[-0.04em] text-n0 uppercase transition-colors duration-500 group-data-[scheme=light]/nav:text-g5 hover:text-p1 group-data-[scheme=light]/nav:hover:text-p3 focus-visible:ring-2 focus-visible:ring-p3 focus-visible:outline-none aria-[current=page]:text-p1 group-data-[scheme=light]/nav:aria-[current=page]:text-p3"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="NavbarActions flex items-center gap-3">
          {/* Wrapped, because Button's own inline-flex outranks a hidden passed in. */}
          <div className="NavbarCta hidden md:block">
            <Button href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Button>
          </div>
          <button
            type="button"
            aria-label={panelOpen ? "Close menu" : "Open menu"}
            aria-expanded={panelOpen}
            aria-controls="mobile-menu"
            onClick={() => setPanelFor(panelOpen ? null : pathname)}
            className="NavbarMenuToggle flex size-11 items-center justify-center rounded-full text-n0 transition-colors duration-500 group-data-[scheme=light]/nav:text-g5 hover:bg-n0/10 group-data-[scheme=light]/nav:hover:bg-g5/5 focus-visible:ring-2 focus-visible:ring-p3 focus-visible:outline-none lg:hidden"
          >
            <MenuIcon open={panelOpen} />
          </button>
        </div>
      </div>

      {panelOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="NavbarPanel h-[calc(100dvh-4.75rem)] animate-dropdown-in overflow-y-auto bg-g5 px-6 pt-4 pb-10 md:h-[calc(100dvh-6.25rem)] lg:hidden"
        >
          <p className="NavbarPanelLabel text-sm tracking-wide text-g1 uppercase">
            Travel Services
          </p>
          <ul className="NavbarPanelServices mt-2 flex flex-col">
            {[
              { href: "/services", label: "All Travel Services" },
              ...SERVICES_NAV,
            ].map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="block py-3 text-xl text-n0 hover:text-p2"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="NavbarPanelLinks mt-4 flex flex-col border-t border-g3 pt-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block py-3 text-xl text-n0 hover:text-p2"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href={PRIMARY_CTA.href} fullOnMobile className="mt-8">
            {PRIMARY_CTA.label}
          </Button>
        </nav>
      )}
    </header>
  );
}

function NavMenuLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="NavMenuLink block px-5 py-3 text-base text-n0 transition-colors hover:bg-n0/10 hover:text-p1 focus-visible:bg-n0/10 focus-visible:outline-none"
    >
      {children}
    </Link>
  );
}

/*
 * The live site's menu icon: three 2px rounded lines, left-aligned, 23 / 18 /
 * 13px wide on an 8px pitch. Opening hides the middle line and stretches the
 * short bottom one to full width, then crosses the top and bottom into an X.
 * Closing plays the same steps in reverse. Each bar carries per-property
 * delays for both directions, so the two phases run in order with no JS
 * timers. The properties are `translate` / `rotate` / `scale`, not
 * `transform`: that is what Tailwind v4's utilities set.
 */
function MenuIcon({ open }: { open: boolean }) {
  const bar = "absolute left-0 h-0.5 rounded-full bg-current";
  return (
    <span
      aria-hidden="true"
      data-open={open || undefined}
      className="MenuIcon group/icon relative block h-4.5 w-[1.4375rem]"
    >
      <span
        className={cx(
          bar,
          "top-0 w-full [transition:translate_250ms_ease,rotate_250ms_ease]",
          "group-data-open/icon:translate-y-2 group-data-open/icon:rotate-45 group-data-open/icon:[transition:translate_250ms_ease_200ms,rotate_250ms_ease_200ms]",
        )}
      />
      <span
        className={cx(
          bar,
          "top-2 w-[1.125rem] origin-left [transition:opacity_200ms_ease_250ms,scale_200ms_ease_250ms]",
          "group-data-open/icon:scale-x-0 group-data-open/icon:opacity-0 group-data-open/icon:[transition:opacity_200ms_ease,scale_200ms_ease]",
        )}
      />
      <span
        className={cx(
          bar,
          "top-4 w-[0.8125rem] [transition:translate_250ms_ease,rotate_250ms_ease,width_200ms_ease_250ms]",
          "group-data-open/icon:w-full group-data-open/icon:-translate-y-2 group-data-open/icon:-rotate-45 group-data-open/icon:[transition:width_200ms_ease,translate_250ms_ease_200ms,rotate_250ms_ease_200ms]",
        )}
      />
    </span>
  );
}
