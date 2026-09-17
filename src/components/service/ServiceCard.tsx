import Image from "next/image";
import Link from "next/link";
import type { ServiceImage } from "~/content/services";

/*
 * A service on the /services index: photo on top, a black body with the
 * title, a short pitch and a p3 "Learn More". The whole card is the link.
 * Measured off live: 592px cards, a 329px photo, 4px radius, 16px padding,
 * a 4px drop.
 */
export function ServiceCard({
  href,
  title,
  body,
  image,
}: {
  href: string;
  title: string;
  body: string;
  image: ServiceImage;
}) {
  return (
    <Link
      href={href}
      className="ServiceCard group flex h-full flex-col overflow-hidden rounded-sm bg-g5 shadow-[0.25rem_0.25rem_0.25rem_rgb(0_0_0/0.25)] focus-visible:ring-2 focus-visible:ring-p3 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <div className="ServiceCardMedia relative h-60 overflow-hidden md:aspect-[592/329] md:h-auto">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 48rem) 37rem, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
        />
      </div>
      <div className="ServiceCardCopy flex flex-1 flex-col gap-1 p-4">
        <h3 className="ServiceCardTitle text-xl font-bold text-n0">{title}</h3>
        <p className="ServiceCardBody text-base text-g0">{body}</p>
        <span className="ServiceCardCta mt-auto pt-6 text-xl font-semibold text-p3 transition-colors group-hover:text-p2">
          Learn More
        </span>
      </div>
    </Link>
  );
}
