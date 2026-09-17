"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "~/components/Button";
import { cx } from "~/lib/cx";
import { NAV_LINKS, PRIMARY_CTA, SERVICES_NAV } from "~/lib/site";

/*
 * Fixed site header, measured off the live build: 100px tall on desktop, 24px
 * padding, a 20% black wash with a 4px backdrop blur so it reads over any hero
 * photo.
 *
 * The wash only sits over the photo header. Once the page has scrolled past
 * the element marked `data-hero` (PageHero sets it), the bar turns solid g5 so
 * it reads over light sections. Pages whose content starts on a light surface
 * (the booking page, destination guides, travel tip posts) are solid from the
 * top; that list lives here so a new page of an existing kind inherits it. The
 * open mobile panel is always solid.
 *
 * Open state for the mobile panel and the services menu is stored as "the path
 * it was opened on", so navigating closes both by derivation rather than an
 * effect that resets state after render.
 */
const SOLID_ROUTES = [
  /^\/booking$/,
  /^\/destinations\/.+/,
  /^\/travel-tips\/.+/,
];

export function Navbar() {
  const pathname = usePathname();
  // Stored per path, like the menus below, so a navigation resets it by
  // derivation until the next scroll event measures the new page.
  const [pastHeroOn, setPastHeroOn] = useState<string | null>(null);

  const [panelFor, setPanelFor] = useState<string | null>(null);
  const panelOpen = panelFor === pathname;
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const menuOpen = menuFor === pathname;
  const solid =
    SOLID_ROUTES.some((r) => r.test(pathname)) ||
    pastHeroOn === pathname ||
    panelOpen;

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
      className={cx(
        "Navbar fixed inset-x-0 top-0 z-50 shadow-[0_0.625rem_0.625rem_-0.25rem_rgb(0_0_0/0.06)] backdrop-blur-[4px] transition-colors duration-500",
        solid ? "bg-g5" : "bg-g5/20",
      )}
    >
      <div className="NavbarInner mx-auto flex h-19 items-center justify-between gap-6 px-4 md:h-25 md:px-6">
        <Link
          href="/"
          aria-label="Miles & Memories home"
          className="NavbarBrand flex shrink-0 items-center gap-4 rounded-sm focus-visible:ring-2 focus-visible:ring-p3 focus-visible:outline-none"
        >
          <Image
            src="/images/miles-and-memories-logo-white.webp"
            alt="Miles & Memories"
            width={1187}
            height={436}
            priority
            className="h-10 w-auto"
          />
          <span
            aria-hidden="true"
            className="NavbarBrandDivider hidden h-10 w-px bg-n0/60 lg:block"
          />
          <Image
            src="/images/travelmation-mark-white.webp"
            alt="Travelmation"
            width={600}
            height={234}
            priority
            className="hidden h-10 w-auto lg:block"
          />
        </Link>

        <nav
          aria-label="Main"
          className="NavbarLinks hidden flex-1 items-center gap-8 lg:flex"
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
              className="NavbarServicesTrigger flex items-center gap-1 rounded-sm text-lg tracking-[-0.04em] text-n0 uppercase transition-colors hover:text-p1 focus-visible:ring-2 focus-visible:ring-p3 focus-visible:outline-none"
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
              className="NavbarLink rounded-sm text-lg tracking-[-0.04em] text-n0 uppercase transition-colors hover:text-p1 focus-visible:ring-2 focus-visible:ring-p3 focus-visible:outline-none aria-[current=page]:text-p1"
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
            className="NavbarMenuToggle flex size-11 items-center justify-center rounded-full text-n0 transition-colors hover:bg-n0/10 focus-visible:ring-2 focus-visible:ring-p3 focus-visible:outline-none lg:hidden"
          >
            {panelOpen ? <X className="size-7" /> : <Menu className="size-7" />}
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
