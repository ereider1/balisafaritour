import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { SITES, siteForHost } from "@/lib/domains";
import { TOURS } from "@/lib/tours";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const site = siteForHost(headersList.get("host"));

  const entries: MetadataRoute.Sitemap = [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  if (site.key === "main") {
    entries.push(
      ...[SITES.balisafari, SITES.gobali, SITES.vwbali].map((page) => ({
        url: `${site.url}${page.path}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    );

    entries.push({
      url: `${site.url}/tours`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    });

    entries.push(
      ...TOURS.map((tour) => ({
        url: `${site.url}/tours/${tour.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
      {
        url: `${site.url}/leave-a-review`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.4,
      },
    );
  }

  return entries;
}
