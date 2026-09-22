import { startAnalytics } from './lib/analytics-client';
import { analyticsEnabled } from './lib/analytics-config';

if (analyticsEnabled(window.location.hostname)) {
  const schedule = () => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(() => void startAnalytics(), { timeout: 1000 });
    else setTimeout(() => void startAnalytics(), 0);
  };
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
}
