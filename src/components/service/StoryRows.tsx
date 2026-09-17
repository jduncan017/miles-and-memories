import Image from "next/image";
import { FadeIn } from "~/components/FadeIn";
import { SectionHeader } from "~/components/SectionHeader";
import { SectionWrapper } from "~/components/SectionWrapper";
import { cx } from "~/lib/cx";
import type { ServiceImage } from "~/content/services";

/*
 * Alternating text / photo rows on the cream band ("Beyond logistics…"). The
 * first row puts the photo right, the next left, and so on; on phones the
 * photo always leads. Measured off live: 600px halves, 4:3 photos with a 16px
 * radius, text inset 20px from its half, 80px between rows.
 */
export function StoryRows({
  title,
  rows,
}: {
  title: string;
  rows: { title: string; body: string; image: ServiceImage }[];
}) {
  return (
    <SectionWrapper tone="cream">
      <SectionHeader title={title} className="max-w-200" />
      <div className="StoryRowsList mt-10 flex flex-col gap-10 lg:mt-16 lg:gap-20">
        {rows.map((row, i) => (
          <FadeIn key={row.title}>
            <div className="StoryRow grid items-center gap-5 lg:grid-cols-2 lg:gap-0">
              <div
                className={cx(
                  "StoryRowMedia relative aspect-[4/3] overflow-hidden rounded-2xl shadow-theme",
                  i % 2 === 0 && "lg:order-last",
                )}
              >
                <Image
                  src={row.image.src}
                  alt={row.image.alt}
                  fill
                  sizes="(min-width: 64rem) 37.5rem, 100vw"
                  className="object-cover"
                />
              </div>
              <div
                className={cx(
                  "StoryRowCopy flex flex-col gap-4",
                  // 20px from the outer edge, 40px from the photo.
                  i % 2 === 0 ? "lg:pr-10 lg:pl-5" : "lg:pr-5 lg:pl-10",
                )}
              >
                <h3 className="StoryRowTitle text-g3">{row.title}</h3>
                <p className="StoryRowBody text-lg text-g2">{row.body}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  );
}
