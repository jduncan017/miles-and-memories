import Image from "next/image";
import { SectionHeader } from "~/components/SectionHeader";
import { SectionWrapper } from "~/components/SectionWrapper";
import { cx } from "~/lib/cx";
import type { ServiceImage } from "~/content/services";

/*
 * Four client photos in a staggered 2 × 2 (the Greek life and friends pages).
 * Measured off live: a 900px block, rows of 348 + 532 then 532 + 348 with a
 * 20px gap, 320px tall, 16px radius; a single column on phones.
 */
const ROWS = ["lg:grid-cols-[348fr_532fr]", "lg:grid-cols-[532fr_348fr]"];

export function MemoryGallery({
  title,
  body,
  images,
}: {
  title: string;
  body: string;
  images: ServiceImage[];
}) {
  const rows = [images.slice(0, 2), images.slice(2, 4)];
  return (
    <SectionWrapper tone="white" padding="none" className="pb-16 lg:pb-25">
      <SectionHeader title={title} description={body} />
      <div className="MemoryGallery mx-auto mt-10 flex max-w-225 flex-col gap-5">
        {rows.map((row, r) => (
          <ul key={r} className={cx("MemoryGalleryRow grid gap-5", ROWS[r])}>
            {row.map((img) => (
              <li
                key={img.src}
                className="MemoryGalleryItem relative h-80 overflow-hidden rounded-2xl shadow-theme"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 48rem) 33rem, 100vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </SectionWrapper>
  );
}
