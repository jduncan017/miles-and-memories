import Script from "next/script";

/*
 * GA4, carried over from the Framer build (same measurement id) so reporting
 * continues across the migration. The id is public in the served HTML, so it
 * is the default; set NEXT_PUBLIC_GA_ID to point a preview somewhere else.
 *
 * The Framer site also loaded a GTM container (GTM-T78WCQM7). It is not
 * reproduced here until we know what, if anything, it fires beyond GA.
 *
 * Production only, and `afterInteractive` so it never competes with hydration
 * or the hero video.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-NVSYN2631B";

export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
