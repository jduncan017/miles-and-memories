import Image from "next/image";

/*
 * Guide header. Unlike PageHero, live starts this photo below the solid navbar
 * and sets the copy centred in a dark caption bar across the bottom of the
 * photo rather than over a gradient.
 *
 * Measured off live at 1440: an 800px photo under the 100px bar, a caption
 * band of 80% black with a 5px blur and 40px padding, a 52px Playfair h1 and
 * an uppercase 22px DM Sans semibold tagline in g0, capped at 800px.
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
    <header className="DestinationHero bg-g5 pt-19 md:pt-25">
      <div className="DestinationHeroFrame relative isolate flex h-[40rem] items-end overflow-hidden shadow-theme-sm md:h-[45rem] lg:h-[50rem]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="DestinationHeroImage -z-10 object-cover"
        />
        <div className="DestinationHeroCaption flex w-full flex-col items-center gap-2 bg-g5/80 px-6 py-8 text-center backdrop-blur-[5px] md:p-10">
          <h1 className="DestinationHeroTitle max-w-240 text-n0 capitalize">
            {title}
          </h1>
          <p className="DestinationHeroTagline max-w-200 text-lg font-semibold text-g0 uppercase lg:text-[1.375rem]">
            {tagline}
          </p>
        </div>
      </div>
    </header>
  );
}
