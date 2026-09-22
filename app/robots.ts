import type { MetadataRoute } from "next";
import { siteUrl, isPublicSite } from "@/lib/site";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return isPublicSite ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml` } : { rules: { userAgent: "*", disallow: "/" } };
}
