/*
 * Site-wide identity, navigation, and the values the SEO layer needs. Metadata,
 * sitemap, robots and JSON-LD all read from here so they cannot drift apart.
 */

export const SITE = {
  name: "Miles & Memories",
  legalName: "Miles & Memories",
  /** Canonical origin, with www (the live host serves www). No trailing slash. */
  url: "https://www.milesandmemories.net",
  tagline: "Stress-Free Travel Planning",
  description:
    "Expert travel planning for corporate events, Greek life trips, family getaways and luxury vacations. Complimentary service with no hidden fees. Free consultation today.",
  founder: "Mandy Gonzales",
  email: "mandygonzales@travelmation.net",
  phone: "(832) 320-1285",
  phoneE164: "+18323201285",
  /** Mandy is an independent contractor of this host agency. */
  hostAgency: { name: "Travelmation", url: "https://www.travelmation.net" },
  social: {
    instagram: "https://www.instagram.com/themandygonzales",
    facebook: "https://www.facebook.com/share/16kMLiYD31/",
    linkedin: "https://www.linkedin.com/in/mandygonzales-travel",
  },
  /** Cal.com event used by /contact and /booking. */
  calLink: "milesandmemories/general-consultation",
} as const;

export const SERVICES_NAV = [
  {
    href: "/services/corporate-travel-planning",
    label: "Corporate Travel & Events",
    footerLabel: "Corporate Travel",
  },
  {
    href: "/services/greek-life-travel-planning",
    label: "Greek Life Adventures",
    footerLabel: "Greek Life",
  },
  {
    href: "/services/friends-group-travel-planning",
    label: "Family & Group Travel",
    footerLabel: "Friends & Family Travel",
  },
  {
    href: "/services/luxury-travel-planning",
    label: "Luxury Experiences",
    footerLabel: "Luxury Travel",
  },
] as const;

export const NAV_LINKS = [
  { href: "/about", label: "Who We Are" },
  { href: "/destinations", label: "Destinations" },
  { href: "/travel-tips", label: "Travel Tips" },
] as const;

/** Every "plan / book" CTA points here. */
export const PRIMARY_CTA = { href: "/contact", label: "Plan My Trip" } as const;

export function absoluteUrl(path = "/"): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
