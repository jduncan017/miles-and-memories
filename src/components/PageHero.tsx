import type { ReactNode } from "react";
import Image from "next/image";
import { cx } from "~/lib/cx";

/*
 * The full-bleed photo header every top-level page opens with.
 *
 * Measured off the live build: the photo (or video) fills the band at 90%
 * opacity over the wine s5, which dims it slightly, and a transparent → g5
 * gradient darkens toward the copy. On phones that gradient runs the full
 * height and the copy starts 320px down, so the whole photo reads darker; from
 * md the gradient covers the lower half. The copy sits bottom-left: H1, a
 * hairline rule, then a subtitle row with the CTAs pushed to the right.
 * Heights at 1440: home 1000px, service pages 931px, other interiors 790px.
 *
 * `data-hero` marks the band for the Navbar, which turns solid once it has
 * scrolled past.
 *
 * `subtitle` is a node so a page can highlight a phrase in p3, which the live
 * copy does ("$0", "costs you nothing"). Interior pages set it in italics.
 */
export function PageHero({
  title,
  subtitle,
  image,
  imageAlt = "",
  video,
  actions,
  height = "interior",
  italicSubtitle = false,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  image: string;
  imageAlt?: string;
  /** Plays muted and looped over `image`, which is its poster. */
  video?: string;
  actions?: ReactNode;
  height?: "home" | "tall" | "interior";
  italicSubtitle?: boolean;
}) {
  return (
    <header
      data-hero
      className={cx(
        "PageHero relative isolate flex items-end overflow-hidden bg-s5",
        {
          home: "min-h-[40rem] md:min-h-[50rem] lg:h-[62.5rem]",
          tall: "md:min-h-[44rem] lg:h-[58.1875rem]",
          interior: "md:min-h-[40rem] lg:h-[49.375rem]",
        }[height],
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="PageHeroImage -z-20 object-cover opacity-90"
      />
      {video && (
        <video
          className="PageHeroVideo absolute inset-0 -z-20 size-full object-cover opacity-90"
          src={video}
          poster={image}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}
      <div
        aria-hidden="true"
        className="PageHeroShade absolute inset-0 -z-10 bg-linear-to-b from-transparent to-g5 md:from-50%"
      />

      <div className="PageHeroCopy mx-auto flex w-full max-w-[100rem] flex-col gap-4 px-6 pt-80 pb-10 md:px-10 md:pt-40 lg:px-20 lg:pb-20">
        <h1 className="PageHeroTitle max-w-[62.5rem] text-n1 capitalize">
          {title}
        </h1>
        <div aria-hidden="true" className="PageHeroRule h-px w-full bg-n0/40" />
        <div className="PageHeroFooter flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {subtitle && (
            <p
              className={cx(
                "PageHeroSubtitle max-w-80 text-lg text-n1 md:max-w-[43.75rem]",
                italicSubtitle && "italic",
              )}
            >
              {subtitle}
            </p>
          )}
          {actions && (
            <div className="PageHeroActions flex flex-col gap-4 sm:flex-row md:shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
