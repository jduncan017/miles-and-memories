import Image from "next/image";
import Link from "next/link";
import { cx } from "~/lib/cx";

/*
 * Photo card with the title set over a bottom shade: the homepage service grid
 * and the destinations index. The whole card is the link.
 *
 * Measured off the live build: 4px radius, a 4px/4px/4px drop, a 0° black
 * (10%) → transparent (50%) gradient, 16px padding, a DM Sans bold title and a
 * muted "View More" beneath it. The photo eases up in scale on hover.
 */
export function ImageTile({
  href,
  title,
  image,
  imageAlt,
  cta = "View More",
  ratio = "aspect-[592/400]",
  sizes = "(min-width: 64rem) 37rem, (min-width: 48rem) 50vw, 100vw",
  headingLevel = "h3",
  className,
}: {
  href: string;
  title: string;
  image: string;
  imageAlt: string;
  cta?: string;
  ratio?: string;
  sizes?: string;
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const Heading = headingLevel;
  return (
    <Link
      href={href}
      className={cx(
        "ImageTile group relative isolate flex overflow-hidden rounded-sm bg-g5 shadow-[0.25rem_0.25rem_0.25rem_rgb(0_0_0/0.25)] focus-visible:ring-2 focus-visible:ring-p3 focus-visible:ring-offset-2 focus-visible:outline-none",
        ratio,
        className,
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes={sizes}
        className="ImageTileImage -z-20 object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
      />
      <div
        aria-hidden="true"
        className="ImageTileShade absolute inset-0 -z-10 bg-linear-0 from-g5 from-10% to-transparent to-50%"
      />
      <div className="ImageTileCopy mt-auto flex flex-col p-4">
        <Heading className="ImageTileTitle font-body text-xl font-bold text-n0 capitalize">
          {title}
        </Heading>
        <span className="ImageTileCta text-base text-g1 transition-colors group-hover:text-p2">
          {cta}
        </span>
      </div>
    </Link>
  );
}
