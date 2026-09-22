import type { PostHog } from 'posthog-js';
import { analyticsEnabled } from './analytics-config';

type PendingEvent = { event: string; properties: Record<string, unknown>; navigating: boolean; timestamp: string };
const storageKey = 'quillo:pending-analytics';
let client: PostHog | undefined;
let starting: Promise<void> | undefined;
let pending: PendingEvent[] | undefined;

function queue() {
  if (!pending) {
    try { pending = JSON.parse(sessionStorage.getItem(storageKey) || '[]'); }
    catch { pending = []; }
    if (!Array.isArray(pending)) pending = [];
  }
  return pending;
}
function persist() {
  try { sessionStorage.setItem(storageKey, JSON.stringify(queue())); } catch { /* Storage may be disabled. */ }
}
function send(item: PendingEvent) {
  client?.capture(item.event, item.properties, {
    timestamp: new Date(item.timestamp),
    ...(item.navigating ? { transport: 'sendBeacon' as const, send_instantly: true } : {}),
  });
}
export function startAnalytics() {
  if (starting || typeof window === 'undefined' || !analyticsEnabled(location.hostname)) return starting;
  starting = import('posthog-js').then(({ default: posthog }) => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      defaults: '2026-05-30',
      autocapture: false,
      capture_pageview: true,
      capture_pageleave: true,
    });
    client = posthog;
    queue().forEach(send);
    pending = [];
    persist();
  }).catch(() => { starting = undefined; });
  return starting;
}
export function captureAnalytics(event: string, properties: Record<string, unknown>, navigating: boolean) {
  if (typeof window === 'undefined' || !analyticsEnabled(location.hostname)) return;
  const item = { event, properties: { ...properties, $current_url: location.href }, navigating, timestamp: new Date().toISOString() };
  if (client) send(item);
  else {
    queue().push(item);
    // Preserve early same-tab navigation events until the next page initializes.
    persist();
    if (navigating) void startAnalytics();
  }
}
