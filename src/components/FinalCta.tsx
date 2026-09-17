import type { ReactNode } from "react";
import Image from "next/image";
import { Button } from "~/components/Button";
import { cx } from "~/lib/cx";

/*
 * The closing call to action. Two treatments, both from the live build:
 *
 *  - `photo` (default): a full-bleed photo with a 25% shade and inset top and
 *    bottom shadows, and the copy in a centred glass panel (50% black, 10px
 *    blur, 16px radius, 80px padding).
 *  - `shade`: no panel, the photo under a 60% shade. Destination guides and
 *    travel tips close with this.
 *  - `parallax`: the homepage and services index. No panel; the photo stays
 *    fixed to the viewport while the section, its 60% shade and the copy
 *    scroll over it. Live does this with a sticky, viewport-tall photo; here
 *    the photo is `position: fixed` inside a section with `clip-path:
 *    inset(0)`, which clips a fixed child to the section's box, so the effect
 *    needs no scroll listener. (A `transform` on any ancestor would break
 *    `fixed`; nothing in the layout sets one.)
 *
 * The primary action defaults to /contact. A second, light "Explore Services"
 * action is optional.
 */
export function FinalCta({
  title,
  body,
  image,
  primary = { href: "/contact", label: "Book My Free Consultation" },
  secondary,
  variant = "photo",
}: {
  title: ReactNode;
  body: ReactNode;
  image: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  variant?: "photo" | "shade" | "parallax";
}) {
  const copy = (
    <div className="FinalCtaCopy mx-auto flex max-w-[65rem] flex-col items-center gap-10 text-center">
      <div className="flex flex-col items-center gap-4">
        <h2 className="FinalCtaTitle max-w-[43.75rem] text-n1 capitalize">
          {title}
        </h2>
        <p className="FinalCtaBody max-w-[43.75rem] text-lg text-n1">{body}</p>
      </div>
      <div className="FinalCtaActions flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
        <Button href={primary.href} fullOnMobile>
          {primary.label}
        </Button>
        {secondary && (
          <Button href={secondary.href} variant="light" fullOnMobile>
            {secondary.label}
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <section
      className={cx(
        "FinalCta relative isolate overflow-hidden py-24 md:px-10 lg:px-20 lg:py-40",
        variant === "photo" ? "px-4" : "px-6",
        variant === "parallax" && "[clip-path:inset(0)]",
        "shadow-[inset_0_-0.25rem_0.5rem_rgb(0_0_0/0.25),inset_0_0.25rem_0.5rem_rgb(0_0_0/0.25)]",
      )}
    >
      {variant === "parallax" ? (
        // next/image `fill` forces position: absolute inline, so the fixed
        // positioning lives on a wrapper, sized to the large viewport so
        // mobile toolbar resizes do not expose an edge.
        <div className="FinalCtaParallax fixed inset-x-0 top-0 -z-20 h-lvh">
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="FinalCtaImage object-cover"
          />
        </div>
      ) : (
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="FinalCtaImage -z-20 object-cover"
        />
      )}
      <div
        aria-hidden="true"
        className={cx(
          "FinalCtaShade absolute inset-0 -z-10",
          { photo: "bg-g5/25", shade: "bg-g5/60", parallax: "bg-g5/60" }[
            variant
          ],
        )}
      />
      {variant === "photo" ? (
        <div className="FinalCtaPanel mx-auto max-w-section rounded-2xl bg-g5/50 px-5 py-12 shadow-theme-sm backdrop-blur-[10px] md:p-20">
          {copy}
        </div>
      ) : (
        copy
      )}
    </section>
  );
}
