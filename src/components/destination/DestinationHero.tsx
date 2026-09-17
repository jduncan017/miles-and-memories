import Image from "next/image";

/*
 * Guide header. Unlike PageHero, live starts this photo below the solid navbar
 * and sets the copy centred in a dark caption bar across the bottom of the
 * photo rather than over a gradient.
 *
 * A photo under the 100px bar, and a caption band of 80% black with a 5px
 * blur. The frame is sized so the header totals the same 640 / 800 / 1000px as
 * PageHero once the bar above it is counted.
 *
 * Deliberately not live's proportions (2026-09-17): live's caption runs three
 * lines of 52px h1 over an uppercase 22px tagline, which made the band as tall
 * as a section. The h1 is a size down on a wider measure so it breaks to two
 * lines, the tagline is sentence case at 18px in n5, and the photo takes the
 * height the band gives back.
 */
export function DestinationHero({
  title,
  tagline,
  image,
  imageAlt,
}: {
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <header data-hero className="DestinationHero bg-g5 pt-19 md:pt-25">
      <div className="DestinationHeroFrame relative isolate flex h-[35.25rem] items-end overflow-hidden shadow-theme-sm md:h-[43.75rem] lg:h-[56.25rem]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="DestinationHeroImage -z-10 object-cover"
        />
        <div className="DestinationHeroCaption flex w-full flex-col items-center gap-2 bg-g5/80 px-6 py-8 text-center backdrop-blur-[5px] md:p-10">
          <h1 className="DestinationHeroTitle max-w-300 text-n0 capitalize lg:text-[2.75rem]">
            {title}
          </h1>
          <p className="DestinationHeroTagline max-w-240 text-base font-medium text-n5 lg:text-lg">
            {tagline}
          </p>
        </div>
      </div>
    </header>
  );
}
