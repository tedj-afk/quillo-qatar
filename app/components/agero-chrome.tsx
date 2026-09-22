"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ResponsiveImage } from "./responsive-image";
import { captureLandingEvent } from "@/lib/analytics";
import { bookingUrl } from "@/lib/booking";

const nav = [{ label: "Work", href: "#shipments" }, { label: "What we do", href: "#services" }, { label: "How we work", href: "#process" }, { label: "Pricing", href: "#pricing" }];
export function Arrow({ className = "" }: { className?: string }) {
  return <ResponsiveImage className={`q-arrow ${className}`} src="/agero/arrow.svg" alt="" aria-hidden="true" />;
}
export function Wordmark() {
  return <span className="q-wordmark"><span>Quillo<span className="q-wordmark-stop">.</span></span><small>QATAR</small></span>;
}
export function Header({ homePath = "" }: { homePath?: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 761px)");
    const close = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);
  const change = () => { captureLandingEvent("navigation menu toggled", { location: "header", expanded: !open }); setOpen(!open); };
  return <header className="q-header q-wrap">
    <a className="q-brand" href={homePath || "#top"} aria-label="Quillo Qatar home"><Wordmark /></a>
    <nav className="q-desktop-nav" aria-label="Main navigation">{nav.map(item => <a key={item.href} href={homePath + item.href}>{item.label}</a>)}</nav>
    <a className="q-header-cta" href={`${homePath}#contact`}>Let’s talk <Arrow /></a>
    <button ref={toggle} className="q-menu-toggle" type="button" aria-expanded={open} aria-controls="q-mobile-nav" onClick={change}>{open ? "Close" : "Menu"}<span aria-hidden="true">+</span></button>
    <nav className="q-mobile-nav" id="q-mobile-nav" aria-label="Mobile navigation" data-open={open} aria-hidden={!open} inert={!open}>{[...nav, { label: "The studio", href: "#about" }, { label: "Start a project", href: "#contact" }].map((item, index) => <a style={{ "--q-menu-index": index } as CSSProperties} key={item.href} href={homePath + item.href} onClick={() => setOpen(false)}>{item.label}<Arrow /></a>)}</nav>
  </header>;
}
export function Footer({ homePath = "" }: { homePath?: string }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Qatar" }).format(new Date()));
    tick(); const timer = setInterval(tick, 60000); return () => clearInterval(timer);
  }, []);
  return <footer className="q-footer">
    <div className="q-wrap">
      <div className="q-footer-top" data-reveal="rule"><p>Good things start<br />with a conversation.</p><a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="q-footer-talk" data-analytics-location="footer">Let’s make<br />something matter.<Arrow /></a></div>
      <div className="q-footer-links"><a href={`${homePath}#shipments`}>Selected work</a><a href={`${homePath}#services`}>Our capabilities</a><a href={`${homePath}#faq`}>Your questions</a><a href={homePath || "#top"}>{homePath ? "Back to home" : "Back to top"}<Arrow /></a></div>
      <div data-reveal="sheet" className="q-footer-wordmark" aria-label="Quillo Qatar"><span>Quillo.</span><small>QATAR<br />PRODUCT DESIGN<br />STUDIO</small></div>
      <div className="q-footer-meta"><span>© {new Date().getFullYear()} Quillo Qatar</span><span>Made for what’s next.</span><span>Qatar time{time ? ` / ${time}` : ""} · UTC+3</span></div>
    </div>
  </footer>;
}
