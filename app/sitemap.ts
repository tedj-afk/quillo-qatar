import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: "2026-09-15",
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/case-studies/${project.slug}`,
      lastModified: project.slug === "quillo" ? "2026-09-15" : project.slug === "helpmegrow" ? "2026-09-13" : "2026-09-10",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
