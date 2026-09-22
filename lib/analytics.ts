"use client";

import { captureAnalytics } from "./analytics-client";
import { analyticsEnabled } from "./analytics-config";

export type AnalyticsEvent =
  | "booking clicked" | "navigation clicked" | "case study clicked"
  | "project website clicked" | "section viewed" | "plan viewed"
  | "service selected" | "studio slide changed" | "faq toggled"
  | "process step toggled" | "navigation menu toggled"
  | "case study walkthrough selected" | "case study walkthrough playback"
  | "case study story step selected" | "case study viewed"
  | "case study card viewed" | "testimonial viewed" | "page scrolled"
  | "case study chapter clicked" | "case study image opened"
  | "case study video started" | "case study video playback"
  | "case study video progress" | "case study video completed";
export type AnalyticsProperties = Record<string, boolean | number | string | null | undefined>;

export function captureLandingEvent(eventName: AnalyticsEvent, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;
  const preview = !analyticsEnabled(window.location.hostname);
  const eventProperties = Object.fromEntries(Object.entries({
    ...properties,
    page: window.location.pathname.startsWith("/case-studies/") ? "case_study" : "landing",
    page_path: window.location.pathname,
    // Source study stays separate from `project`, which identifies a clicked destination.
    case_study: window.location.pathname.match(/^\/case-studies\/([^/]+)/)?.[1],
    schema_version: 3,
    environment: preview ? "local_preview" : "production",
  }).filter(([, value]) => value !== undefined));

  try {
    // Exercise the same events locally without adding test traffic to live reports.
    if (preview) {
      console.info("[Quillo analytics] " + JSON.stringify({ event: eventName, properties: eventProperties }));
      return;
    }
    const navigating = ["booking clicked", "case study clicked", "project website clicked", "navigation clicked", "case study image opened", "case study chapter clicked"].includes(eventName);
    captureAnalytics(eventName, eventProperties, navigating);
  } catch {
    // Tracking must never interrupt navigation or booking.
  }
}
