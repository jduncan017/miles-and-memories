import Image from "next/image";
import {
  BriefcaseBusiness,
  CalendarDays,
  CircleDollarSign,
  Box,
  Ship,
  Sparkles,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "~/components/Button";
import { SectionHeader } from "~/components/SectionHeader";
import { SectionWrapper } from "~/components/SectionWrapper";
import type { ServiceIcon, ServiceImage } from "~/content/services";

/*
 * Lucide stand-ins for the Heroicons the live pages inlined (calendar-days,
 * sparkles, currency-dollar, user-group, cube-transparent, sun, a ship and a
 * briefcase).
 */
const ICONS: Record<ServiceIcon, LucideIcon> = {
  calendar: CalendarDays,
  sparkles: Sparkles,
  dollar: CircleDollarSign,
  users: Users,
  cube: Box,
  sun: Sun,
  ship: Ship,
  briefcase: BriefcaseBusiness,
};

/*
 * "Why executive teams choose…": an icon list on the left and a photo on the
 * right that stretches to the list's height, then a centred CTA. On phones the
 * photo leads at a fixed 240px. Measured off live: two 568px columns with a
 * 64px gutter, 30px p3 icons, 16px radius (8px on phones).
 */
export function FeatureList({
  title,
  items,
  image,
  cta,
}: {
  title: string;
  items: { icon: ServiceIcon; title: string; body: string }[];
  image: ServiceImage;
  cta: string;
}) {
  return (
    <SectionWrapper tone="white">
      <SectionHeader title={title} />
      <div className="FeatureListBody mt-10 grid gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-16">
        <ul className="FeatureListItems flex flex-col gap-5">
          {items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.title} className="FeatureItem flex gap-3 lg:gap-4">
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="FeatureItemIcon mt-0.5 size-7.5 shrink-0 text-p3"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="FeatureItemTitle text-g3">{item.title}</h3>
                  <p className="FeatureItemBody text-lg text-g2">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="FeatureListMedia relative order-first h-60 overflow-hidden rounded-lg shadow-theme md:h-96 lg:order-none lg:h-auto lg:min-h-96 lg:rounded-2xl">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 64rem) 35.5rem, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="FeatureListCta mt-10 flex justify-center lg:mt-18">
        <Button href="/contact" fullOnMobile>
          {cta}
        </Button>
      </div>
    </SectionWrapper>
  );
}
