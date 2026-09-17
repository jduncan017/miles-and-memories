import Image from "next/image";
import { FadeIn } from "~/components/FadeIn";

/*
 * The single client quote on /contact: a round 240px headshot beside an italic
 * quote with pink quotation marks. Live slides it in from the left; FadeIn's
 * `left` entrance is the same move.
 */
export function FeaturedTestimonial() {
  return (
    <FadeIn from="left">
      <figure className="FeaturedTestimonial mx-auto flex max-w-section flex-col items-center gap-6 md:flex-row md:justify-center md:gap-10">
        <Image
          src="/images/nicole-m-headshot.webp"
          alt="Nicole M."
          width={480}
          height={600}
          sizes="15rem"
          className="FeaturedTestimonialImage size-60 shrink-0 rounded-full object-cover object-top shadow-theme"
        />
        <div className="flex max-w-150 flex-col gap-6 text-center md:text-left">
          <blockquote className="FeaturedTestimonialQuote">
            <p className="text-lg tracking-[0.02em] text-g5 italic lg:text-[1.375rem] lg:leading-[1.4]">
              <span aria-hidden="true" className="text-p3">
                &ldquo;
              </span>
              After a year of working with Mandy, we couldn&rsquo;t be more
              pleased with the impact she&rsquo;s had on our event team.
              She&rsquo;s meticulous with every detail, streamlines the entire
              travel process, and even tailors individual itineraries to each
              traveler.
              <span aria-hidden="true" className="text-p3">
                &rdquo;
              </span>
            </p>
          </blockquote>
          <figcaption className="FeaturedTestimonialAuthor text-base text-g2">
            Nicole M., Director of Events &amp; Experiences, 49 Financial
          </figcaption>
        </div>
      </figure>
    </FadeIn>
  );
}
