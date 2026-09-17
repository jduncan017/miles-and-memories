import Image from "next/image";
import { FadeIn } from "~/components/FadeIn";
import { SectionWrapper } from "~/components/SectionWrapper";
import type { ServiceImage } from "~/content/services";

/*
 * One client review with a round headshot. Measured off live: a 240px circle
 * beside a 600px italic quote with p3 quote marks, 40px apart and centred as a
 * pair; stacked and centred on phones.
 */
export function ServiceTestimonial({
  quote,
  name,
  role,
  image,
}: {
  quote: string;
  name: string;
  role: string;
  image: ServiceImage;
}) {
  return (
    <SectionWrapper tone="white">
      <FadeIn>
        <figure className="ServiceTestimonial mx-auto flex max-w-220 flex-col items-center gap-6 text-center md:gap-10 lg:flex-row lg:text-left">
          <Image
            src={image.src}
            alt={image.alt}
            width={480}
            height={480}
            sizes="15rem"
            className="ServiceTestimonialImage size-60 shrink-0 rounded-full object-cover shadow-theme"
          />
          <div className="flex flex-col gap-6">
            <blockquote className="ServiceTestimonialQuote">
              <p className="text-lg tracking-[0.02em] text-g4 italic">
                <span aria-hidden="true" className="text-p3">
                  &ldquo;
                </span>
                {quote}
                <span aria-hidden="true" className="text-p3">
                  &rdquo;
                </span>
              </p>
            </blockquote>
            <figcaption className="ServiceTestimonialAuthor text-sm text-g2">
              {name}, {role}
            </figcaption>
          </div>
        </figure>
      </FadeIn>
    </SectionWrapper>
  );
}
