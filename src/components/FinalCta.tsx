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
 *  - `dark`: the homepage's version: no panel, and the photo all but hidden
 *    under a 90% shade (live measures 60%, but over a near-black section
 *    background, so what a visitor sees is effectively black).
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
  variant?: "photo" | "shade" | "dark";
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
        "shadow-[inset_0_-0.25rem_0.5rem_rgb(0_0_0/0.25),inset_0_0.25rem_0.5rem_rgb(0_0_0/0.25)]",
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className="FinalCtaImage -z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className={cx(
          "FinalCtaShade absolute inset-0 -z-10",
          { photo: "bg-g5/25", shade: "bg-g5/60", dark: "bg-g5/90" }[variant],
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
