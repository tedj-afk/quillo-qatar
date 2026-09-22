import { captureLandingEvent, type AnalyticsProperties } from "./analytics";

// One tracker per mounted video. TimeRanges excludes skipped portions and replay duplicates.
export function createVideoAnalytics(properties: AnalyticsProperties) {
  let started = false;
  let playing = false;
  let completed = false;
  const milestones = new Set<number>();
  function details(video: HTMLVideoElement) {
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    let watched = 0;
    for (let i = 0; i < video.played.length; i++) watched += video.played.end(i) - video.played.start(i);
    return {
      ...properties,
      current_time_seconds: Math.round(video.currentTime * 10) / 10,
      duration_seconds: Math.round(duration * 10) / 10,
      watched_percent: duration > 0 ? Math.min(100, Math.floor(watched / duration * 100)) : 0,
    };
  }
  function progress(video: HTMLVideoElement) {
    if (!started) return;
    const payload = details(video);
    [25, 50, 75].forEach(percent => {
      if (payload.watched_percent < percent || milestones.has(percent)) return;
      milestones.add(percent);
      captureLandingEvent("case study video progress", { ...payload, progress_percent: percent });
    });
  }
  return {
    play(video: HTMLVideoElement) {
      if (playing) return;
      playing = true;
      if (!started) {
        started = true;
        captureLandingEvent("case study video started", details(video));
      }
      captureLandingEvent("case study video playback", { ...details(video), playing: true });
    },
    pause(video: HTMLVideoElement) {
      if (!playing) return;
      playing = false;
      if (!video.ended) captureLandingEvent("case study video playback", { ...details(video), playing: false });
    },
    progress,
    complete(video: HTMLVideoElement) {
      playing = false;
      if (!started || completed) return;
      progress(video);
      completed = true;
      captureLandingEvent("case study video completed", details(video));
    },
  };
}
