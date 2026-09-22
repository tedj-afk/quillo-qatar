"use client";

import * as m from "motion/react-m";

import { ResponsiveImage } from "@/app/components/responsive-image";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { captureLandingEvent } from "@/lib/analytics";
import { bookingUrl } from "@/lib/booking";
const A="/agero/";
const nav = [{label:"Works",href:"#shipments"},{label:"Services",href:"#services"},{label:"About",href:"#about"},{label:"Process",href:"#process"}];

export function Header({homePath=""}:{homePath?:string}) {
  const links=nav.map(item=>({...item,href:homePath+item.href}));
  const [open,setOpen]=useState(false);
  const destination=useRef<string|null>(null);
  const reduce=useReducedMotion();
  function finishNavigation() {
    const href=destination.current;
    destination.current=null;
    if(!href)return;
    const section=document.getElementById(href.slice(1));
    if(!section)return;
    window.history.pushState(null,"",href);
    section.scrollIntoView({behavior:reduce?"instant":"smooth",block:"start"});
  }
  useEffect(()=>{ if(!open)return; const close=(event:KeyboardEvent)=>{if(event.key==="Escape"){setOpen(false);captureLandingEvent("navigation menu toggled",{location:"header",expanded:false,reason:"escape"});}};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close);},[open]);
  return <header className="ag-header">
    <div className="ag-availability"><span/>Available for New Projects</div>
    <div className="ag-nav ag-wrap"><a className="ag-brand" href={`${homePath}#top`} aria-label="Shipped by Hippo home"><ResponsiveImage src="/hippo-logo.png" sizes="(max-width: 700px) 37px, 48px" loading="eager" alt=""/><span><small>shipped by</small>Hippo<span className="ag-brand-dot">.</span></span></a>
      <nav className="ag-desktop-nav" aria-label="Main navigation">{links.map(n=><a key={n.href} href={n.href}>{n.label}</a>)}</nav>
      <a className="ag-header-contact ag-button" href={bookingUrl} target="_blank" rel="noopener noreferrer" data-analytics-location="header">Book a call</a>
      <button type="button" className="ag-menu-toggle" aria-expanded={open} aria-controls="ag-mobile-nav" aria-label={open?"Close navigation":"Open navigation"} onClick={()=>{setOpen(!open);captureLandingEvent("navigation menu toggled",{location:"header",expanded:!open,reason:"toggle"});}}><span className={open?"is-open":""}><i/><i/></span></button>
    </div>
    <AnimatePresence onExitComplete={finishNavigation}>{open&&<m.nav initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} className="ag-mobile-nav" id="ag-mobile-nav" aria-label="Mobile navigation">{[...links,{label:"Pricing",href:`${homePath}#pricing`},{label:"Book a call",href:bookingUrl}].map(n=><a key={n.href} href={n.href} target={n.href===bookingUrl?"_blank":undefined} rel={n.href===bookingUrl?"noopener noreferrer":undefined} onClick={event=>{if(n.href.startsWith("#")){event.preventDefault();destination.current=n.href;}setOpen(false);captureLandingEvent("navigation menu toggled",{location:"header",expanded:false,reason:"link"});}}>{n.label}</a>)}</m.nav>}</AnimatePresence>
  </header>;
}
export function Footer({homePath=""}:{homePath?:string}) {
  const [time,setTime]=useState("");useEffect(()=>{const tick=()=>setTime(new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit",timeZone:"UTC"}).format(new Date()));tick();const timer=setInterval(tick,1000);return()=>clearInterval(timer);},[]);
  return <footer className="ag-footer"><ResponsiveImage className="ag-cover" src={`${A}footer.avif`} sizes="(max-width: 700px) 1650px, 100vw" alt=""/><div className="ag-wrap"><div className="ag-footer-links"><div><p>Navigation</p>{nav.map(n=><a key={n.href} href={homePath+n.href}>{n.label}</a>)}</div><div><p>Sprints</p><a href={`${homePath}#pricing`}>Landing page</a><a href={`${homePath}#pricing`}>Website refresh</a><a href={`${homePath}#faq`}>FAQs</a></div><div><p>Let’s build</p><a href={bookingUrl} target="_blank" rel="noopener noreferrer">Book a call</a><a href={`${homePath}#shipments`}>Explore our work</a></div></div><div className="ag-footer-meta"><p>© {new Date().getFullYear()} Shipped by Hippo. All rights reserved.</p><p>Working worldwide <span aria-hidden="true">→</span> {time&&<span>{time} UTC</span>}</p><a href={homePath||"#top"}>{homePath?"Back to home":"Back to top"}</a></div><div className="ag-footer-wordmark" aria-label="Shipped by Hippo"><span>shipped by</span><strong>Hippo.</strong><div aria-hidden="true">Hippo.</div></div></div></footer>;
}
