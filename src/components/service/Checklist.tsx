import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "~/components/Button";
import { SectionHeader } from "~/components/SectionHeader";
import { SectionWrapper } from "~/components/SectionWrapper";
import type { ServiceImage } from "~/content/services";

/*
 * "Solutions for every goal": the mirror of FeatureList, photo on the left and
 * a p3 check list on the right, then a centred CTA. Measured off live: 720px
 * heading, two 568px columns, 30px checks, the photo stretching to the list.
 */
export function Checklist({
  title,
  items,
  image,
  cta,
}: {
  title: string;
  items: { title: string; body: string }[];
  image: ServiceImage;
  cta: string;
}) {
  return (
    <SectionWrapper tone="white">
      <SectionHeader title={title} className="max-w-180" />
      <div className="ChecklistBody mt-10 grid gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-16">
        <div className="ChecklistMedia relative h-60 overflow-hidden rounded-lg shadow-theme md:h-96 lg:h-auto lg:min-h-96 lg:rounded-2xl">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 64rem) 35.5rem, 100vw"
            className="object-cover"
          />
        </div>
        <ul className="ChecklistItems flex flex-col gap-6 lg:gap-7">
          {items.map((item) => (
            <li key={item.title} className="ChecklistItem flex gap-1 lg:gap-4">
              <Check
                aria-hidden="true"
                strokeWidth={1.5}
                className="ChecklistItemIcon size-7.5 shrink-0 text-p3"
              />
              <div className="flex flex-col gap-2">
                <h3 className="ChecklistItemTitle text-g3">{item.title}</h3>
                <p className="ChecklistItemBody text-lg text-g2">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="ChecklistCta mt-10 flex justify-center lg:mt-18">
        <Button href="/contact" fullOnMobile>
          {cta}
        </Button>
      </div>
    </SectionWrapper>
  );
}
