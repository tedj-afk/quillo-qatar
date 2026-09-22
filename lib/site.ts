const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
function productionOrigin(value: string | undefined) {
  if (!value) return undefined;
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin without a path, credentials, query, or hash.");
  }
  return url.origin;
}
export const siteUrl = productionOrigin(configuredUrl);
// A domain alone never makes an unfinished preview indexable.
export const isPublicSite = Boolean(siteUrl && process.env.NEXT_PUBLIC_LAUNCH_READY === "true");
export const siteName = "Quillo Qatar";
export const siteDescription = "We help startups and businesses in Qatar turn ideas into web and mobile products—with strategy, design, development, and launch handled by one team.";
