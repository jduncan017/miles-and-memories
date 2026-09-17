import type { MetadataRoute } from "next";
import { SERVICES } from "~/content/services";
import { getAllDestinations } from "~/lib/destinations";
import { absoluteUrl } from "~/lib/site";
import { getAllTravelTips } from "~/lib/travel-tips";

/*
 * Generated from the same sources the pages render from, so it cannot list a
 * page that does not exist. /booking is omitted: it is noindex (as on live).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
    lastModified?: Date,
  ) => ({ url: absoluteUrl(path), priority, changeFrequency, lastModified });

  return [
    page("/", 1),
    page("/services", 0.9),
    ...SERVICES.map((s) => page(`/services/${s.slug}`, 0.9)),
    page("/about", 0.8),
    page("/contact", 0.8),
    page("/destinations", 0.7),
    ...getAllDestinations().map((d) => page(`/destinations/${d.slug}`, 0.7)),
    page("/travel-tips", 0.7, "weekly"),
    ...getAllTravelTips().map((t) =>
      page(
        `/travel-tips/${t.slug}`,
        0.6,
        "yearly",
        new Date(`${t.date}T00:00:00Z`),
      ),
    ),
    page("/privacy", 0.2, "yearly"),
    page("/terms-and-conditions", 0.2, "yearly"),
  ];
}
