export function isLocalPreview(hostname: string) {
  return hostname === "localhost" || hostname.endsWith(".localhost") ||
    hostname === "127.0.0.1" || hostname === "0.0.0.0" ||
    hostname === "[::1]" || hostname === "::1";
}

export function analyticsEnabled(hostname: string) {
  if (isLocalPreview(hostname) || process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "true" ||
      process.env.NEXT_PUBLIC_LAUNCH_READY !== "true" || !process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return false;
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL || "").hostname === hostname;
  } catch {
    return false;
  }
}
