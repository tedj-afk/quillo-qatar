"use client";

import dynamic from "next/dynamic";
import { LazyMotion, domMax, MotionConfig } from "motion/react";
import { useState, type ReactNode } from "react";
import { MotionTitle, useRevealScope } from "./components/site-motion";
import { ElasticWord, LaunchSticker, StudioSeal, ProjectSheet, ProjectPeeker, RegistrationType, Stamp } from "./components/studio-play";
import { ScrollHeadline, ProjectDepth, ProcessAssembly, ContactScene, ContactHeadline } from "./components/scroll-scenes";
import { AnimatedDetails } from "./components/animated-details";
import { Header, Footer, Arrow } from "./components/agero-chrome";
import { ResponsiveImage } from "./components/responsive-image";
import { projects, projectVisuals } from "@/data/projects";
import { services, formatPrice } from "@/data/services";
import { processSteps } from "@/data/process";
import { faqs } from "@/data/faqs";
import { testimonials } from "@/data/testimonials";
import { bookingUrl } from "@/lib/booking";
import { captureLandingEvent } from "@/lib/analytics";

const BookingCalendar = dynamic(() => import("./components/booking-calendar"), {
  ssr: false, loading: () => <p className="q-calendar-loading" role="status">Loading available times… You can also open the calendar in a new tab below.</p>,
});
const selectedProjects = ["stackray", "helpmegrow", "quillo"].map(slug => projects.find(project => project.slug === slug)!);
const capabilities = [
  { title: "Know what to build.", label: "STRATEGY & DISCOVERY", description: "Find the real problem, understand the people, and define the product worth making.", tags: ["Product strategy", "User journeys", "Requirements", "Roadmaps"] },
  { title: "Make it feel right.", label: "PRODUCT DESIGN", description: "Turn complexity into an experience people can understand, use, and come back to.", tags: ["UX research", "UX/UI design", "Prototyping", "Design systems"] },
  { title: "Design it for the real world.", label: "WEB & MOBILE APP DESIGN", description: "Design clear, usable experiences for customer-facing apps and the tools behind your business, ready for your development team.", tags: ["Web apps & SaaS", "iOS & Android", "Portals & internal tools", "Responsive interfaces"] },
  { title: "Hand it over. Keep improving.", label: "DEVELOPER HANDOFF & DESIGN SUPPORT", description: "Give your developers clear files and specifications, then refine the experience as you learn from users.", tags: ["Usability testing", "Design specifications", "Developer handoff", "Design iteration"] },
];
function Label({ number, children }: { number: string; children: ReactNode }) {
  return <p className="q-label" data-reveal="rule"><span>{number}</span>{children}</p>;
}
function ProjectLink({ children, className = "", location = "page" }: { children: ReactNode; className?: string; location?: string }) {
  return <a href="#contact" className={`q-button ${className}`} data-analytics-location={location}>{children}<Arrow /></a>;
}
function Hero() {
  const [entranceSkipped, setEntranceSkipped] = useState(false);
  return <section className="q-hero q-wrap" id="intro" aria-labelledby="hero-title" data-hero-skip={entranceSkipped || undefined}
    onFocusCapture={event => { if (event.target.matches(":focus-visible")) setEntranceSkipped(true); }}>
    <div className="q-hero-eyebrow"><p><span className="q-live-dot" data-hero-enter="signal" /><span data-hero-enter="eyebrow">PRODUCT DESIGN STUDIO FOR QATAR</span></p><span data-hero-enter="location">FOR QATAR. FOR WHAT’S NEXT.</span></div>
    <div className="q-hero-composition">
      <ScrollHeadline label="Stop guessing what to build next.">{[
        <><span className="q-hero-piece" data-hero-enter="lead">Stop</span>{" "}<ElasticWord>guessing</ElasticWord></>,
        <><span className="q-hero-piece" data-hero-enter="bridge">what</span>{" "}<span className="q-outline q-hero-piece" data-hero-enter="outline">to</span></>,
        <><span className="q-hero-piece" data-hero-enter="verb">build</span><LaunchSticker /></>,
      ]}</ScrollHeadline>
      <StudioSeal />
    </div>
    <div className="q-hero-bottom"><a className="q-scroll-link" href="#shipments"><span className="q-circle" data-hero-enter="scroll-disc"><Arrow /></span><span data-hero-enter="scroll-caption">SCROLL TO SEE<br />WHAT’S POSSIBLE</span></a><div><p data-hero-enter="description">For founders turning an idea into a first product, and businesses whose current tools are holding them back. Quillo helps you find the right problem, shape the right solution, and design a web or mobile experience your team can take into development.</p><div className="q-hero-action" data-hero-enter="action"><ProjectLink location="hero">Let’s find your next move</ProjectLink><p className="q-hero-cta-note">A rough idea is enough to start.</p></div></div></div>
    <div className="q-hero-index"><span data-hero-enter="index-left">PRODUCT STRATEGY / UX / INTERFACE DESIGN</span><span data-hero-enter="index-right">01 — THE START OF SOMETHING</span></div>
  </section>;
}
function ProjectArtwork({ project, index }: { project: (typeof selectedProjects)[number]; index: number }) {
  return <ProjectPeeker href={`/case-studies/${project.slug}`} name={project.name} label={`Explore ${project.name}${project.slug === "quillo" ? " learning platform" : ""} case study`}>
    <span className="q-project-topline"><span>0{index + 1} / SELECTED PROJECT</span><span>{project.slug === "stackray" ? "STRATEGY TO LIVE WEBSITE" : "PRODUCT STORY & LANDING PAGE"}</span></span>
    <ProjectDepth><ResponsiveImage src={projectVisuals[project.slug]} sizes="(max-width: 760px) 90vw, 85vw" alt={`${project.name} landing-page design`} loading="lazy" /></ProjectDepth>
    <span className="q-project-open"><Arrow /></span>
    <span className="q-sheet-name" aria-hidden="true">{project.name}</span>
  </ProjectPeeker>;
}
function Work() {
  return <section id="shipments" className="q-work q-wrap" aria-labelledby="work-title">
    <div className="q-section-top"><Label number="01">SELECTED WORK</Label><span className="q-small">THREE PROJECTS. ONE STACK. ↓</span></div>
    <div className="q-work-heading"><MotionTitle id="work-title">{[<>Ideas, out</>, <>in the <em>world.</em></>]}</MotionTitle><p>A closer look at our product storytelling, design, and development work. Each case study shows exactly what we delivered.</p></div>
    <div className="q-projects">{selectedProjects.map((project, index) => <ProjectSheet index={index} key={project.slug} className={`q-project q-project-${project.slug}`}>
      <ProjectArtwork project={project} index={index} />
      <div className="q-project-caption" data-reveal="rule" data-reveal-delay="120"><div><h3 data-analytics-project={project.slug} data-analytics-location="recent_work"><a href={`/case-studies/${project.slug}`}>{project.name}<span>{project.slug === "quillo" ? " / Learning platform" : ""}</span></a></h3><p>{project.category}</p></div><span>{project.slug === "stackray" ? "Strategy / UX/UI / Build" : "Positioning / UX/UI"}</span></div>
    </ProjectSheet>)}</div>
    <p className="q-work-note">Selected work from the team’s Hippo portfolio. Quillo, the learning product above, is a separate project from Quillo Qatar.</p>
  </section>;
}
function Capabilities() {
  return <section id="services" className="q-capabilities">
    <div className="q-wrap">
      <div className="q-section-top"><Label number="02">WHAT WE DO</Label><span className="q-small">FROM THE FIRST “WHAT IF” TO WHAT’S NEXT.</span></div>
      <Stamp className="q-cap-stamp">NO<br />LOOSE<br />ENDS. ↙</Stamp><div className="q-cap-heading"><MotionTitle>{[<>A big picture.</>, <span className="q-title-accent" key="detail">Every little detail.</span>]}</MotionTitle><p>Product strategy, UX, and interface design in one team.</p></div>
      <div className="q-cap-list">{capabilities.map((item, index) => <AnimatedDetails key={item.title} className="q-cap-item" open={index === 0} onToggle={event => captureLandingEvent("service selected", { location: "services", label: item.label, expanded: event.currentTarget.open, service_index: index + 1 })} summary={<><span className="q-cap-number">0{index + 1}</span><div><small data-reveal="rule">{item.label}</small><h3 data-reveal="line" data-reveal-delay={index * 60}>{item.title}</h3></div><span className="q-expand" aria-hidden="true" /></>}>
        <div className="q-cap-detail"><p>{item.description}</p><ul>{item.tags.map((tag, tagIndex) => <li key={tag} data-reveal="ticket" data-reveal-delay={tagIndex * 65}>{tag}</li>)}</ul></div>
      </AnimatedDetails>)}</div>
    </div>
  </section>;
}
function About() {
  return <section id="about" className="q-about q-wrap">
    <Label number="03">THE STUDIO</Label>
    <div className="q-about-statement"><RegistrationType /></div>
    <div className="q-about-bottom"><span className="q-about-aside" data-reveal="rule">SMALL ENOUGH TO CARE.<br />INVOLVED ENOUGH TO GET IT.</span><div data-reveal="sheet"><p className="q-lead">We’re Quillo Qatar. A product design studio for people who see a better way of doing things.</p><p>Maybe you’re a founder building something new. Maybe you’re a business in Qatar ready to make a complicated process simple. We bring product strategy, UX, and interface design into the same conversation—from the first question to a clear handoff for your development team.</p><a className="q-text-link" href="#contact">Meet your product design team <Arrow /></a></div></div>
  </section>;
}
function Process() {
  return <section id="process" className="q-process">
    <div className="q-wrap"><div className="q-section-top"><Label number="04">HOW WE WORK</Label><span className="q-small">A SHARED DIRECTION. A CLEAR NEXT STEP.</span></div>
      <div className="q-process-heading"><MotionTitle>{[<>From “what if”</>, <>to <span className="q-process-accent">“ready to build.”</span></>]}</MotionTitle><p>Clear milestones. Interactive prototypes. Honest conversations.<br />We set the timeline after discovery, around your actual scope.</p></div>
      <ProcessAssembly><ol className="q-timeline">{processSteps.map((step, index) => <li key={step.label} data-reveal="sheet" data-reveal-delay={index * 80}><span className="q-step-number" data-reveal="ticket" data-reveal-delay={120 + index * 80}>{step.label}</span><h3>{step.title}</h3><p>{step.description}</p><small>{step.deliverable}</small></li>)}</ol></ProcessAssembly>
      <p className="q-process-note">Your design, ready for development. Design files, prototypes, specifications, and a handoff with your developers are part of the plan.</p>
    </div>
  </section>;
}
function Pricing() {
  return <section id="pricing" className="q-pricing q-wrap">
    <Label number="05">THE INVESTMENT</Label>
    <div className="q-pricing-heading"><MotionTitle>{[<>A clear start.</>, <>Room to grow.</>]}</MotionTitle><div><span className="q-draft-label">PREVIEW / PROVISIONAL PRICING</span><p>Start with what you need. User journeys, screens, platforms, and research scope determine your final design quote.</p></div></div>
    <div className="q-price-table">{services.map((service, index) => <article key={service.id} className="q-price-row" data-reveal="sheet">
      <div className="q-price-title"><span className="q-small">0{index + 1} / {service.description}</span><h3>{service.title}</h3></div>
      <div className="q-price-deliverables"><ul>{service.includes.map(item => <li key={item}>{item}</li>)}</ul>{service.scopeNote && <p className="q-price-scope">{service.scopeNote}</p>}</div>
      <div data-reveal="ticket" data-reveal-delay="200" className="q-price-amount ag-price-amount" data-analytics-plan={service.description} data-analytics-price={service.amount} data-analytics-currency={service.currency} data-analytics-interval={service.interval}>
        <span>Starting from</span><p><small>{service.currency}</small> {formatPrice(service.amount)}</p><span>{service.interval === "month" ? "per month · agreed scope" : "per project · agreed scope"}</span>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="q-text-link" data-analytics-location="pricing">Let’s talk scope <Arrow /></a>
      </div>
    </article>)}</div>
    <p className="q-pricing-note">Draft starting prices for this local preview. MVP Design covers a tested prototype and development-ready design for one agreed core experience, not working software. Web, iOS, and Android are scoped individually. Development is scoped separately with your team or development partner. Final deliverables and pricing are confirmed in your proposal.</p>
  </section>;
}
function Testimonials() {
  return <section className="q-testimonials q-wrap" id="testimonials">
    <Label number="06">IN GOOD COMPANY</Label><div className="q-testimonial-layout"><div><MotionTitle>{[<>The work matters.</>, <>So do the people.</>]}</MotionTitle><p>Selected feedback from work delivered under Hippo. Original words, unchanged.</p></div>
      <div className="q-quotes">{testimonials.map((item, index) => <figure key={item.id} data-reveal="quote" data-reveal-delay={index * 80} className={index === 0 ? "q-featured-quote" : ""}><blockquote>{item.quote}</blockquote><figcaption data-analytics-testimonial={item.id}><strong>{item.name}</strong><span>{item.role}</span></figcaption></figure>)}</div>
    </div>
  </section>;
}
function FAQ() {
  return <section id="faq" className="q-faq q-wrap"><div><Label number="07">A FEW GOOD QUESTIONS</Label><MotionTitle>{[<>Before we</>, <>get started.</>]}</MotionTitle></div><div className="q-faq-list">{faqs.map((item) => <AnimatedDetails key={item.question} onToggle={event => captureLandingEvent("faq toggled", { question: item.question, expanded: event.currentTarget.open, location: "faq" })} summary={<><span data-reveal="rule">{item.question}</span><span className="q-expand" aria-hidden="true" /></>}><p>{item.answer}</p></AnimatedDetails>)}</div></section>;
}
function Contact() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  return <ContactScene>
    <div className="q-wrap"><div className="q-section-top"><Label number="08">YOUR NEXT CHAPTER</Label><span className="q-small">AN IDEA. A CHALLENGE. A CONVERSATION.</span></div>
      <Stamp className="q-contact-stamp">GOOD<br />THINGS<br />AHEAD. ↗</Stamp><div className="q-contact-main"><ContactHeadline /><div data-reveal="ticket" data-reveal-delay="140"><p>You bring the ambition.<br />We’ll bring the questions, the thinking,<br />and the design to move you forward.</p><button className="q-button" type="button" aria-expanded={showCalendar} aria-controls="q-booking" onClick={() => { setCalendarLoaded(true); setShowCalendar(!showCalendar); }}>{showCalendar ? "Close the calendar" : "Book a discovery call"}<Arrow /></button><span className="q-contact-small">30 minutes. A useful first conversation.</span></div></div>
      <div id="q-booking" className="q-booking-shell" data-open={showCalendar} inert={!showCalendar} aria-hidden={!showCalendar}><div><div className="q-booking-panel">{calendarLoaded && <><p className="q-booking-note">Local preview: this is the team’s existing Hippo calendar. A Quillo Qatar booking page will replace it before launch.</p><BookingCalendar /><a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="q-text-link" data-analytics-location="calendar_fallback">Open calendar in a new tab <Arrow /></a></>}</div></div></div>
    </div>
  </ContactScene>;
}
export default function Home() {
  const motionRef = useRevealScope<HTMLDivElement>();
  return <LazyMotion features={domMax} strict><MotionConfig reducedMotion="user"><div ref={motionRef} data-motion-scope className="q-site" id="top"><a className="q-skip" href="#intro">Skip to content</a><Header /><main><Hero /><Work /><Capabilities /><About /><Process /><Pricing /><Testimonials /><FAQ /><Contact /></main><Footer /></div></MotionConfig></LazyMotion>;
}
