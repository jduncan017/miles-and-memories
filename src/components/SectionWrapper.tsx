import type { ReactNode } from "react";
import { cx } from "~/lib/cx";

/*
 * The band around a section. The page picks the band; section content stays
 * background-agnostic.
 *
 * Tones, as the live site uses them:
 *   white   n0, flat                                   most content sections
 *   cream   150° n1 → n2 gradient, raised by a soft drop   alternating feature bands
 *   page    n1 flat                                    long-form pages (contact, guides)
 *   dark    g5                                         statement bands
 *
 * Padding follows live: 40px top/bottom on phones, 64 on tablet, 100 on desktop.
 */
export type SectionTone = "white" | "cream" | "creamDeep" | "page" | "dark";

const TONE: Record<SectionTone, string> = {
  white: "bg-n0",
  cream:
    "bg-linear-150 from-n1 to-n2 relative z-[1] shadow-[0_0.25rem_0.5rem_rgb(0_0_0/0.25)]",
  // One step darker: the service and FAQ bands on live run n2 -> n3.
  creamDeep:
    "bg-linear-150 from-n2 to-n3 relative z-[1] shadow-[0_0.25rem_0.5rem_rgb(0_0_0/0.25)]",
  page: "bg-n1",
  dark: "bg-g5 text-n0",
};

const PAD = {
  none: "",
  // Live's rhythm: 40 on phones, 64 on tablet, 100 on desktop.
  default: "py-10 md:py-16 lg:py-25",
  lg: "py-16 md:py-20 lg:py-30",
} as const;

export function SectionWrapper({
  children,
  tone = "white",
  padding = "default",
  width = "section",
  id,
  className,
  innerClassName,
}: {
  children: ReactNode;
  tone?: SectionTone;
  padding?: keyof typeof PAD;
  /** `section` 1200px · `wide` 1400px · `full` no cap (for scrollers). */
  width?: "section" | "wide" | "full";
  id?: string;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cx(
        "SectionWrapper px-6 md:px-10",
        id && "scroll-mt-28",
        TONE[tone],
        PAD[padding],
        className,
      )}
    >
      <div
        className={cx(
          "SectionInner mx-auto",
          width === "section" && "max-w-section",
          width === "wide" && "max-w-section-wide",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
