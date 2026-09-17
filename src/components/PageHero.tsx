import type { ReactNode } from "react";
import Image from "next/image";
import { cx } from "~/lib/cx";

/*
 * The full-bleed photo header every top-level page opens with.
 *
 * Measured off the live build: the photo (or video) fills the band, a
 * transparent → black gradient covers the lower ~40%, and the copy sits at the
 * bottom-left: H1, a hairline rule, then a subtitle row with the CTAs pushed to
 * the right. The home hero is 1000px tall; interior heroes run 790–900px.
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
  height?: "home" | "interior";
  italicSubtitle?: boolean;
}) {
  return (
    <header
      className={cx(
        "PageHero relative isolate flex items-end overflow-hidden bg-g5",
        height === "home"
          ? "min-h-[40rem] md:min-h-[50rem] lg:h-[62.5rem]"
          : "min-h-[34rem] md:min-h-[40rem] lg:h-[49.375rem]",
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="PageHeroImage -z-20 object-cover"
      />
      {video && (
        <video
          className="PageHeroVideo absolute inset-0 -z-20 size-full object-cover"
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
        className="PageHeroShade absolute inset-0 -z-10 bg-linear-to-b from-transparent from-50% to-g5"
      />

      <div className="PageHeroCopy mx-auto flex w-full max-w-[100rem] flex-col gap-4 px-6 pt-40 pb-10 md:px-10 lg:px-20 lg:pb-20">
        <h1 className="PageHeroTitle max-w-[62.5rem] text-n1 capitalize">
          {title}
        </h1>
        <div aria-hidden="true" className="PageHeroRule h-px w-full bg-n0/40" />
        <div className="PageHeroFooter flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {subtitle && (
            <p
              className={cx(
                "PageHeroSubtitle max-w-[34rem] text-lg text-n1",
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
