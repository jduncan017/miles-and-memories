import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "~/components/icons/Social";
import { SERVICES_NAV, SITE } from "~/lib/site";

/*
 * Footer, measured off the live build: g4 band, 80px padding, two columns split
 * by a hairline. Left: full logo, contact info, socials. Right: a two-column
 * sitemap and the Travelmation affiliation, which is a disclosure Mandy's host
 * agency requires, so it stays prominent.
 */
// Row order is the live layout: two columns, filled left to right.
const [corporate, greek, friends, luxury] = SERVICES_NAV;
const SITEMAP = [
  ...[corporate, friends, greek, luxury].map((s) => ({
    href: s.href,
    label: s.footerLabel,
  })),
  { href: "/about", label: "Who We Are" },
  { href: "/contact", label: "Contact" },
  { href: "/booking", label: "Book a Meeting" },
];

const SOCIAL = [
  { href: SITE.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: SITE.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SITE.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
];

const linkClass =
  "rounded-xs text-g0 transition-colors hover:text-p2 focus-visible:ring-2 focus-visible:ring-p3 focus-visible:outline-none";

export function Footer() {
  return (
    <footer className="Footer bg-g4 px-6 py-16 text-g0 md:px-10 lg:p-20">
      <div className="FooterInner mx-auto flex max-w-section-wide flex-col gap-8">
        <div className="FooterMain grid gap-10 border-b border-g2 pb-8 lg:grid-cols-2 lg:gap-6">
          <div className="FooterBrand flex flex-col gap-6 lg:border-r lg:border-g2 lg:pr-6">
            <Image
              src="/images/miles-and-memories-logo-full-white.webp"
              alt="Miles & Memories"
              width={1187}
              height={739}
              className="h-auto w-56 md:w-72 lg:w-85"
            />
            <div className="FooterContact flex flex-col gap-2">
              <p className="text-sm tracking-[-0.04em] text-n0 uppercase">
                Contact Info
              </p>
              <a
                href={`tel:${SITE.phoneE164}`}
                className={`${linkClass} flex items-center gap-2 self-start`}
              >
                <Phone aria-hidden="true" className="size-5 text-p3" />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className={`${linkClass} flex items-center gap-2 self-start break-all`}
              >
                <Mail aria-hidden="true" className="size-5 shrink-0 text-p3" />
                {SITE.email}
              </a>
            </div>
            <div className="FooterSocial flex flex-col gap-4 border-t border-g2 pt-6">
              <h2 className="font-body text-2xl font-semibold text-n0">
                Follow Us on Social Media
              </h2>
              <ul className="flex gap-4">
                {SOCIAL.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Miles & Memories on ${label}`}
                      className="flex size-12 items-center justify-center rounded-md text-n0 transition-colors hover:text-p2 focus-visible:ring-2 focus-visible:ring-p3 focus-visible:outline-none"
                    >
                      <Icon className="size-8" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="FooterNav flex flex-col justify-between gap-10">
            <nav aria-label="Footer">
              <p className="text-sm tracking-[-0.04em] text-n0 uppercase">
                Sitemap
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {SITEMAP.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="FooterAffiliation flex flex-col gap-3">
              <Image
                src="/images/travelmation-logo-white.webp"
                alt="Travelmation"
                width={1962}
                height={281}
                className="h-auto w-64 md:w-87"
              />
              <p className="pl-1 text-g0">
                An Independent Contractor of{" "}
                <a
                  href={SITE.hostAgency.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xs text-p3 transition-colors hover:text-p2"
                >
                  Travelmation.net
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="FooterLegal flex flex-col gap-4 text-sm md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm">
              Copyright © {new Date().getFullYear()} Miles & Memories. All
              Rights Reserved.
            </p>
            <a
              href="https://www.digitalnovastudio.com"
              target="_blank"
              rel="noopener"
              className={`${linkClass} self-start text-sm`}
            >
              Site Developed by DigitalNova Studios
            </a>
          </div>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className={linkClass}>
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className={linkClass}>
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
