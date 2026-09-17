import Image from "next/image";
import Link from "next/link";

/*
 * A post on the /travel-tips index.
 *
 * From md up this is the shared ImageTile treatment exactly (413 × 400, 4px
 * radius, 4px drop, a black 10% → transparent 50% shade, bold DM Sans title and
 * a muted "View More"). Live switches to a different card on phones: the photo
 * on top and the title plus a teaser on a black panel beneath. ImageTile has no
 * teaser, so this is one DOM that lays out both ways; the excerpt is in the
 * served HTML at every width.
 */
export function TipCard({
  href,
  title,
  excerpt,
  image,
  imageAlt,
}: {
  href: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <Link
      href={href}
      className="TipCard group relative isolate flex h-full flex-col overflow-hidden rounded-sm bg-g5 shadow-[0.25rem_0.25rem_0.25rem_rgb(0_0_0/0.25)] focus-visible:ring-2 focus-visible:ring-p3 focus-visible:ring-offset-2 focus-visible:outline-none md:aspect-[413/400]"
    >
      <div className="TipCardMedia relative aspect-[5/3] overflow-hidden md:absolute md:inset-0 md:-z-20 md:aspect-auto">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 64rem) 26rem, (min-width: 48rem) 50vw, 100vw"
          className="TipCardImage object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
        />
      </div>
      <div
        aria-hidden="true"
        className="TipCardShade absolute inset-0 -z-10 hidden bg-linear-0 from-g5 from-10% to-transparent to-50% md:block"
      />
      <div className="TipCardCopy flex flex-1 flex-col gap-1 px-3 pt-4 pb-6 md:mt-auto md:flex-none md:gap-0 md:p-4">
        <h3 className="TipCardTitle font-body text-lg font-bold tracking-normal text-n0 capitalize md:text-xl">
          {title}
        </h3>
        <p className="TipCardExcerpt text-sm text-g0 md:hidden">{excerpt}</p>
        <span className="TipCardCta hidden text-base text-g1 transition-colors group-hover:text-p2 md:block">
          View More
        </span>
      </div>
    </Link>
  );
}
