import Image from "next/image";
import type { Testimonial } from "~/content/testimonials";

/*
 * The homepage review ticker. Pure CSS: the list is rendered twice and the
 * track slides left by half its width on a loop, so it never jumps. Hovering or
 * focusing inside pauses it. The duplicate copy is aria-hidden so a screen
 * reader hears each review once, and reduced motion stops the loop (globals).
 *
 * Card spec from the live build: 300 × 360, white, 12px radius, a 4px drop,
 * 23/22px padding, an 18px quote, and the pink airplane avatar at 54px.
 */
export function TestimonialMarquee({ items }: { items: Testimonial[] }) {
  return (
    <div className="TestimonialMarquee group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_4%,#000_96%,transparent)] py-2">
      <div className="TestimonialTrack flex w-max animate-marquee gap-6 group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className="flex gap-6 pr-0"
          >
            {items.map((t) => (
              <li key={t.name} className="w-75 shrink-0">
                <figure className="TestimonialCard flex h-90 flex-col justify-between rounded-xl bg-n0 px-5.5 py-6 shadow-[0.25rem_0.25rem_0.25rem_rgb(0_0_0/0.25)]">
                  <blockquote className="TestimonialQuote text-base leading-[1.4] text-g5">
                    <p>&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="TestimonialAuthor flex items-center gap-4.5">
                    <Image
                      src="/images/testimonial-airplane-avatar.webp"
                      alt=""
                      width={54}
                      height={54}
                      className="size-13.5 rounded-full"
                    />
                    <span className="flex flex-col">
                      <span className="TestimonialName text-base leading-[1.4] text-g5">
                        {t.name}
                      </span>
                      <span className="TestimonialLocation text-base leading-[1.4] font-light text-g5">
                        {t.location}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
