import type { Metadata } from "next";
import { Analytics } from "~/components/Analytics";
import { JsonLd } from "~/components/JsonLd";
import { Footer } from "~/components/layout/Footer";
import { Navbar } from "~/components/layout/Navbar";
import { PageTransition } from "~/components/PageTransition";
import { bodyFont, headingFont } from "~/fonts";
import { SITE, absoluteUrl } from "~/lib/site";
import "~/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Miles & Memories | Stress-Free Travel Planning",
    template: "%s | Miles & Memories",
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: SITE.url,
  },
  twitter: { card: "summary_large_image" },
};

/*
 * Organization schema, once sitewide. Mandy works under Travelmation, so the
 * agency is a TravelAgency with Travelmation as its parent organisation.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": absoluteUrl("/#organization"),
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  logo: absoluteUrl("/images/miles-and-memories-logo-full-white.webp"),
  telephone: SITE.phoneE164,
  email: SITE.email,
  priceRange: "Free consultation",
  founder: { "@type": "Person", name: SITE.founder },
  parentOrganization: {
    "@type": "TravelAgency",
    name: SITE.hostAgency.name,
    url: SITE.hostAgency.url,
  },
  areaServed: { "@type": "Country", name: "United States" },
  sameAs: Object.values(SITE.social),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationSchema} />
        <a
          href="#main"
          className="SkipLink sr-only z-[60] rounded-full bg-p3 px-6 py-3 text-n0 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="SiteMain flex-1">
          {children}
        </main>
        <Footer />
        <PageTransition />
        <Analytics />
      </body>
    </html>
  );
}
