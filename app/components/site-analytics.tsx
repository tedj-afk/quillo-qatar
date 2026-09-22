"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { captureLandingEvent, type AnalyticsEvent, type AnalyticsProperties } from "@/lib/analytics";
import { bookingUrl } from "@/lib/booking";

export function observePageAnalytics(pathname: string) {
  function trackLink(event: MouseEvent) {
    if (event.type === "auxclick" ? event.button !== 1 : event.button !== 0) return;
    const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
    if (!anchor || anchor.hasAttribute("download")) return;
    const target = new URL(anchor.href, window.location.href);
    if (!["http:", "https:"].includes(target.protocol)) return;
    const booking = new URL(bookingUrl, window.location.href);
    const internal = target.origin === window.location.origin;
    const samePage = internal && target.pathname.replace(/\/$/, "") === pathname.replace(/\/$/, "");
    const chapter = samePage && target.hash && anchor.closest('[aria-label="Case-study chapters"]');
    const plan = anchor.closest<HTMLElement>("[data-analytics-plan]");
    const location = anchor.dataset.analyticsLocation ||
      (chapter ? "case_study_chapters" : anchor.closest("#ag-mobile-nav") ? "mobile_navigation" :
      anchor.closest("header") ? "header" : anchor.closest("footer") ? "footer" :
      anchor.closest("section[id]")?.id || (pathname.startsWith("/case-studies/") ? "case_study" : "page"));
    const properties: AnalyticsProperties = {
      location,
      label: anchor.dataset.analyticsLabel || anchor.getAttribute("aria-label") || anchor.textContent?.trim().replace(/\s+/g, " ").slice(0, 120),
      target: internal ? target.pathname + target.hash : target.origin + target.pathname,
      input_method: event.type === "auxclick" ? "middle_click" : event.detail === 0 ? "keyboard" : "pointer",
      link_type: anchor.dataset.analyticsLinkType || (anchor.classList.contains("ag-work-art") ? "image" : "text"),
    };
    if (plan) {
      properties.plan = plan.dataset.analyticsPlan;
      properties.price = Number(plan.dataset.analyticsPrice);
      properties.currency = "USD";
    }
    if (target.origin === booking.origin && target.pathname.replace(/\/$/, "") === booking.pathname.replace(/\/$/, "")) {
      captureLandingEvent("booking clicked", properties);
    } else if (chapter) {
      captureLandingEvent("case study chapter clicked", { ...properties, section: target.hash.slice(1) });
    } else if (internal && /\.(webp|png|jpe?g|avif|gif|svg)$/i.test(target.pathname) && pathname.startsWith("/case-studies/")) {
      captureLandingEvent("case study image opened", { ...properties, image: target.pathname });
    } else if (samePage && target.hash) {
      // In-page story links are navigation, not another case-study visit.
      captureLandingEvent("navigation clicked", { ...properties, section: target.hash.slice(1) });
    } else if (internal && target.pathname.startsWith("/case-studies/")) {
      captureLandingEvent("case study clicked", { ...properties, project: target.pathname.split("/")[2] });
    } else if (internal) {
      captureLandingEvent("navigation clicked", { ...properties, section: target.hash.slice(1) || "home" });
    } else {
      captureLandingEvent("project website clicked", properties);
    }
  }
  // Capture before React removes a mobile-menu link; one handler covers every CTA.
  document.addEventListener("click", trackLink, true);
  document.addEventListener("auxclick", trackLink, true);

  const observed = new Map<Element, { event: AnalyticsEvent; properties: AnalyticsProperties }>();
  document.querySelectorAll("main section[id], .ag-hero, .ag-footer").forEach(section => {
    const heading = section.querySelector("h1, h2") || section.querySelector(".ag-footer-links") || section;
    observed.set(heading, { event: "section viewed", properties: { section: section.id || (section.matches(".ag-hero") ? "hero" : "footer") } });
  });
  document.querySelectorAll<HTMLElement>(".ag-price-amount[data-analytics-plan]").forEach(plan => {
    observed.set(plan, { event: "plan viewed", properties: { section: "pricing", plan: plan.dataset.analyticsPlan, price: Number(plan.dataset.analyticsPrice), currency: "USD" } });
  });
  document.querySelectorAll<HTMLElement>("[data-analytics-project]").forEach(project => {
    observed.set(project, { event: "case study card viewed", properties: { location: project.dataset.analyticsLocation, project: project.dataset.analyticsProject } });
  });
  document.querySelectorAll<HTMLElement>("[data-analytics-testimonial]").forEach(testimonial => {
    observed.set(testimonial, { event: "testimonial viewed", properties: { location: "testimonials", testimonial: testimonial.dataset.analyticsTestimonial } });
  });
  const pending = new Set<Element>();
  function captureVisible() {
    if (document.visibilityState !== "visible") return;
    pending.forEach(element => {
      const item = observed.get(element);
      if (item) captureLandingEvent(item.event, item.properties);
      observed.delete(element);
      observer.unobserve(element);
    });
    pending.clear();
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) pending.add(entry.target);
      else pending.delete(entry.target);
    });
    captureVisible();
  }, { threshold: 0.5 });
  observed.forEach((_, element) => observer.observe(element));
  document.addEventListener("visibilitychange", captureVisible);

  const reached = new Set<number>();
  let frame = 0;
  function measureScroll() {
    frame = 0;
    if (document.visibilityState !== "visible") return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const percent = Math.min(100, Math.max(0, window.scrollY / scrollable * 100));
    [25, 50, 75, 100].forEach(depth => {
      if (percent < depth - (depth === 100 ? 0.1 : 0) || reached.has(depth)) return;
      reached.add(depth);
      captureLandingEvent("page scrolled", { depth_percent: depth });
    });
  }
  function trackScroll() {
    if (!frame) frame = window.requestAnimationFrame(measureScroll);
  }
  window.addEventListener("scroll", trackScroll, { passive: true });
  window.addEventListener("resize", trackScroll);
  document.addEventListener("visibilitychange", trackScroll);
  trackScroll();

  return () => {
    document.removeEventListener("click", trackLink, true);
    document.removeEventListener("auxclick", trackLink, true);
    document.removeEventListener("visibilitychange", captureVisible);
    document.removeEventListener("visibilitychange", trackScroll);
    window.removeEventListener("scroll", trackScroll);
    window.removeEventListener("resize", trackScroll);
    if (frame) window.cancelAnimationFrame(frame);
    observer.disconnect();
  };
}

export function SiteAnalytics() {
  const pathname = usePathname();
  const lastPage = useRef<string | null>(null);
  useEffect(() => {
    if (lastPage.current !== pathname && pathname.startsWith("/case-studies/")) {
      captureLandingEvent("case study viewed");
    }
    lastPage.current = pathname;
    return observePageAnalytics(pathname);
  }, [pathname]);
  return null;
}
