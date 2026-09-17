import Image from "next/image";
import Link from "next/link";
import { cx } from "~/lib/cx";

/*
 * The photo card: homepage services, the destinations index and travel tips.
 * The whole card is the link, and one DOM lays out two ways.
 *
 * Phones: the live site's mobile service card. Photo on top (3:2), a black
 * panel beneath holding the bold title, the description and a pink link.
 *
 * md and up: the photo fills the card with the title over a bottom shade
 * (0° g5 10% → transparent 50%, 4px radius, 4px drop, measured off live) and a
 * muted "View More". On hover or keyboard focus a 50% g5 overlay fades in and
 * the description opens beneath the title, replacing "View More"; that is the
 * live destinations card. `titleOnReveal="shrink"` also steps the title down
 * a size, so a long post title and its teaser both fit (travel tips).
 *
 * Touch screens at tablet width cannot hover, so a coarse pointer gets the
 * revealed state at rest rather than never seeing the description.
 *
 * The description opens with a grid-rows 0fr → 1fr transition, which animates
 * to the text's real height without measuring it.
 */
export function ImageTile({
  href,
  title,
  description,
  image,
  imageAlt,
  mobileCta = "Learn More",
  desktopRatio = "md:aspect-[592/400]",
  sizes = "(min-width: 64rem) 37rem, (min-width: 48rem) 50vw, 100vw",
  titleOnReveal = "keep",
  headingLevel = "h3",
  className,
}: {
  href: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  mobileCta?: string;
  /** An `md:aspect-*` class: the card's shape once it is a photo tile. */
  desktopRatio?: string;
  sizes?: string;
  titleOnReveal?: "keep" | "shrink";
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const Heading = headingLevel;
  const revealed =
    "md:group-hover:opacity-100 md:group-focus-visible:opacity-100 md:pointer-coarse:opacity-100";

  return (
    <Link
      href={href}
      className={cx(
        "ImageTile group relative isolate flex h-full flex-col overflow-hidden rounded-sm bg-g5 shadow-[0.25rem_0.25rem_0.25rem_rgb(0_0_0/0.25)] focus-visible:ring-2 focus-visible:ring-p3 focus-visible:ring-offset-2 focus-visible:outline-none",
        desktopRatio,
        className,
      )}
    >
      <div className="ImageTileMedia relative aspect-[3/2] overflow-hidden md:absolute md:inset-0 md:-z-20 md:aspect-auto">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes={sizes}
          className="ImageTileImage object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
        />
      </div>
      <div
        aria-hidden="true"
        className="ImageTileShade absolute inset-0 -z-10 hidden bg-linear-0 from-g5 from-10% to-transparent to-50% md:block"
      />
      <div
        aria-hidden="true"
        className={cx(
          "ImageTileOverlay absolute inset-0 -z-10 hidden bg-g5/50 opacity-0 transition-opacity duration-500 md:block",
          revealed,
        )}
      />

      <div className="ImageTileCopy flex flex-1 flex-col gap-2 p-4 pb-5 md:mt-auto md:flex-none md:gap-0">
        <Heading
          className={cx(
            "ImageTileTitle font-body text-lg font-bold text-n0 capitalize md:text-xl md:transition-[font-size] md:duration-500",
            titleOnReveal === "shrink" &&
              "md:group-hover:text-lg md:group-focus-visible:text-lg md:pointer-coarse:text-lg",
          )}
        >
          {title}
        </Heading>

        <div
          className={cx(
            "ImageTileReveal md:grid md:grid-rows-[0fr] md:transition-[grid-template-rows] md:duration-500",
            "md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr] md:pointer-coarse:grid-rows-[1fr]",
          )}
        >
          <div className="md:overflow-hidden">
            <p
              className={cx(
                "ImageTileDescription text-base text-g0 md:pt-1 md:text-n2 md:opacity-0 md:transition-opacity md:duration-500",
                revealed,
              )}
            >
              {description}
            </p>
          </div>
        </div>

        <span className="ImageTileMobileCta mt-auto pt-2 text-lg font-semibold text-p2 md:hidden">
          {mobileCta}
        </span>
        <span
          aria-hidden="true"
          className="ImageTileViewMore hidden text-base text-g1 md:block md:group-hover:hidden md:group-focus-visible:hidden md:pointer-coarse:hidden"
        >
          View More
        </span>
      </div>
    </Link>
  );
}
