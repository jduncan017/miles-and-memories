import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { cx } from "~/lib/cx";

/*
 * The layout blocks a destination guide's MDX body is written with. They are
 * passed to the body as a components map by the guide route, so they exist only
 * inside guides and the global mdx-components.tsx stays empty.
 *
 *   <Intro image alt>   "Introduction" copy beside a tall photo
 *   <Panel image alt>   bordered card: wide photo on top, prose beneath
 *   <Split image alt>   photo left, prose right, no border
 *
 * Measured off live at 1440: a 1040px column with 64px between blocks; panels
 * have 80px padding, a hairline border and a 2px drop, an 880px photo, and a
 * 720px prose measure; splits are two 500px halves 40px apart. Photos have a 6px
 * radius. On phones live drops the panel chrome and every photo becomes a
 * 342 x 240 crop above its copy; both are reproduced.
 */

/*
 * Prose styling for the markdown inside a block. Live sets body at 20px with an
 * 8px paragraph rhythm, h2 in Playfair and h3 in DM Sans semibold at 24px.
 */
const PROSE = cx(
  "GuideProse flex min-w-0 flex-col gap-2 text-g3",
  "[&_li]:text-lg [&_p]:text-lg",
  "[&_h2]:capitalize [&_h2:not(:first-child)]:mt-6",
  "[&_h3]:text-xl [&_h3]:font-semibold [&_h3:not(:first-child)]:mt-6",
  "[&_ul]:list-disc [&_ul]:pl-7 [&_li]:pl-1 [&_li::marker]:text-g3",
  "[&_strong]:font-bold [&_strong]:text-g4",
  "[&_a]:text-p3 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-p4",
);

type BlockProps = {
  image: string;
  alt: string;
  children: ReactNode;
};

const PHOTO =
  "GuidePhoto relative overflow-hidden rounded-md bg-n3 shadow-theme-sm";

export function Intro({ image, alt, children }: BlockProps) {
  return (
    <div className="GuideIntro mx-auto grid w-full max-w-254 gap-10 lg:grid-cols-2 lg:items-center">
      <div
        className={cx(
          PHOTO,
          "aspect-[342/240] lg:order-2 lg:aspect-auto lg:self-stretch",
        )}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 64rem) 30.5rem, 100vw"
          className="object-cover"
        />
      </div>
      <div className={cx(PROSE, "lg:order-1 [&_h2]:mb-2")}>{children}</div>
    </div>
  );
}

export function Panel({
  image,
  alt,
  ratio = "880/540",
  children,
}: BlockProps & {
  /** Desktop photo ratio, width/height. Live uses 880/540 and 880/500. */
  ratio?: string;
}) {
  return (
    <div className="GuidePanel flex flex-col gap-10 md:border md:border-g1 md:bg-n1 md:p-10 md:shadow-theme-sm lg:p-20">
      <div
        className={cx(PHOTO, "aspect-[342/240] md:aspect-(--ratio)")}
        style={{ "--ratio": ratio } as CSSProperties}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 64rem) 55rem, 100vw"
          className="object-cover"
        />
      </div>
      <div className={cx(PROSE, "mx-auto w-full max-w-180")}>{children}</div>
    </div>
  );
}

export function Split({ image, alt, children }: BlockProps) {
  return (
    <div className="GuideSplit grid gap-10 lg:grid-cols-2">
      <div className={cx(PHOTO, "aspect-[342/240] lg:aspect-auto")}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 64rem) 31.25rem, 100vw"
          className="object-cover"
        />
      </div>
      <div className={PROSE}>{children}</div>
    </div>
  );
}

export const guideComponents = { Intro, Panel, Split } satisfies MDXComponents;
