import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl, isPublicSite } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isPublicSite || !siteUrl) return [];
  return [{ url: siteUrl, changeFrequency: "monthly", priority: 1 }, ...projects.map(project => ({ url: `${siteUrl}/case-studies/${project.slug}`, changeFrequency: "monthly" as const, priority: 0.7 }))];
}
