"use client";

import * as m from "motion/react-m";
import dynamic from "next/dynamic";

import { ResponsiveImage, DesktopHeroImage } from "@/app/components/responsive-image";
import { imageProps } from "@/lib/image-props";
import { DeferredImage } from "./components/deferred-image";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, LazyMotion, domAnimation, useReducedMotion, useScroll, useTransform, useMotionValueEvent, useInView } from "motion/react";
import { services } from "@/data/services";
import { faqs } from "@/data/faqs";
import { featuredProjects, projectVisuals } from "@/data/projects";
import { processSteps } from "@/data/process";
import { testimonials } from "@/data/testimonials";
import { captureLandingEvent } from "@/lib/analytics";
import { bookingUrl } from "@/lib/booking";
import "./home.css";
import { CountUp } from "./components/count-up";
import { Header, Footer } from "./components/agero-chrome";

const A = "/agero/";
const ease = [0.22, 1, 0.36, 1] as const;
const BookingCalendar = dynamic(() => import("./components/booking-calendar"), {
  ssr: false,
  loading: () => <p className="ag-booking-loading" role="status">Loading available times…</p>,
});
// Published case-study stories shown in Selected shipments.
const landingProjects = featuredProjects.filter(project =>
  ["stackray", "helpmegrow", "quillo"].includes(project.slug)
);

function Icon({name, className=""}:{name:string;className?:string}) {
  return <ResponsiveImage className={`ag-icon ${className}`} src={`${A}${name}.svg`} alt="" aria-hidden="true" />;
}
function CTA({children,href=bookingUrl,light=false,location="page",plan,price}:{children:ReactNode;href?:string;light?:boolean;location?:string;plan?:string;price?:number}) {
  const external=href.startsWith("http");
  return <a className={`ag-button${light?" ag-button-light":""}`} href={href} target={external?"_blank":undefined} rel={external?"noopener noreferrer":undefined} data-analytics-location={location} data-analytics-plan={plan} data-analytics-price={price}><span>{children}</span><Icon name="arrow"/></a>;
}
function Reveal({children,className="",delay=0}:{children:ReactNode;className?:string;delay?:number}) {
  const reduce=useReducedMotion();
  return <m.div className={className} initial={reduce?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.12}} transition={{duration:0.8,delay,ease}}>{children}</m.div>;
}
function Heading({label,children,ghost=false}:{label?:string;children:ReactNode;ghost?:boolean}) {
  return <div className={`ag-heading${ghost?" ag-heading-ghost":""}`}>{label&&<p className="ag-label">({label})</p>}<Reveal><h2>{children}</h2></Reveal></div>;
}
function Hero() {
  const ref=useRef<HTMLDivElement>(null);
  const reduce=useReducedMotion();
  const {scrollYProgress}=useScroll({target:ref,offset:["start end","center center"]});
  const scale=useTransform(scrollYProgress,[0,1],[1,1]);
  const rotateX=useTransform(scrollYProgress,[0,1],[2,0]);
  return <div className="ag-opening"><Header/><section className="ag-hero" aria-labelledby="ag-hero-title">
    <Reveal className="ag-hero-trust"><ResponsiveImage src="/hippo-logo.png" sizes="34px" loading="eager" alt=""/><span>For SaaS &amp; AI founders.</span></Reveal>
    <h1 id="ag-hero-title" aria-label="Landing pages built to make your product the obvious choice.">
      <m.span className="ag-hero-line" initial={reduce?false:{opacity:0,y:24,filter:"blur(6px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:0.85,ease}} aria-hidden="true">Landing <DesktopHeroImage src={`${A}hero-design-original.png`}/> <em>pages</em></m.span>
      <m.span className="ag-hero-line" initial={reduce?false:{opacity:0,y:24,filter:"blur(6px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:0.85,delay:0.12,ease}} aria-hidden="true"><span className="ag-muted">built to make</span> <DesktopHeroImage src={`${A}hero-work.avif`}/> your product</m.span>
      <m.span className="ag-hero-line" initial={reduce?false:{opacity:0,y:24,filter:"blur(6px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:0.85,delay:0.24,ease}} aria-hidden="true"><span className="ag-muted">the</span> obvious <DesktopHeroImage src={`${A}hero-world.avif`}/> choice.</m.span>
      <span className="ag-hero-mobile-copy" aria-hidden="true"><span>Landing <em>pages</em> built</span><span><span className="ag-muted">to make</span> your product</span><span><span className="ag-muted">the</span> obvious choice.</span></span>
    </h1>
    <Reveal className="ag-hero-description" delay={0.3}><p>For SaaS and AI founders whose product has outgrown the page explaining it. We sharpen the message, design the experience, and get it live.</p></Reveal>
    <Reveal className="ag-hero-cta" delay={0.4}><CTA location="hero">Book a call</CTA><p className="ag-hero-cta-note">No long sales discovery. 30 minutes to audit your current site.</p></Reveal>
  </section>
  <div className="ag-showcase" ref={ref}><m.div style={reduce?undefined:{scale,rotateX}}><ResponsiveImage src={`${A}banner.avif`} sizes="calc(100vw - 16px)" loading="eager" alt="A selection of website and brand design presentations" fetchPriority="high"/></m.div></div>
  <div className="ag-capabilities" aria-label="From strategy to launch">{["Strategy","Copy","Design","Build","Ship"].map((x,i)=><span key={x}><Icon name={["compass","pen","star","layout","globe"][i]}/>{x}</span>)}</div>
  </div>;
}
function Ribbon({items,className=""}:{items:string[];className?:string}) {
  return <div className={`ag-ribbon ${className}`}><div className="ag-ribbon-track">{[0,1].map(copy=><div key={copy} aria-hidden={copy===1?true:undefined}>{items.map((x,i)=><span key={`${x}${i}`}>{x}<Icon name="flower"/></span>)}</div>)}</div></div>;
}
function Intro() {
  return <><div className="ag-ribbons"><Ribbon className="ag-ribbon-black" items={["One focused sprint","Live in ~2 weeks","Fewer handoffs"]}/><Ribbon className="ag-ribbon-orange" items={["Strategy & Copy","Website Design","Development"]}/></div>
  <section className="ag-intro ag-wrap" id="intro"><Reveal><ResponsiveImage className="ag-hello" src={`${A}hello.svg`} alt="Hello"/><h2>Your product ships weekly.<br/>{" "}Your website ships once a year.<br/>{" "}<span className="ag-muted">We help it catch up.</span></h2><p className="ag-intro-copy">New features, sharper positioning, better customers, bigger ambitions.<br/>{" "}Your team keeps moving. Your website should too.</p></Reveal>
  <Reveal className="ag-pills">{["Positioning","Copy","Website","Design","Build","Strategy"].map((x,i)=><span key={x}><Icon name={["star","pen","globe","layout","globe","compass"][i]}/>{x}</span>)}</Reveal></section></>;
}
const reasons=[
  {title:"We understand the product first.",body:"Before touching Figma, we learn what you sell, who needs it, what changed, and why anyone should care.",label:"Product first",image:"proof-1.avif"},
  {title:"Copy and design happen together.",body:"No lorem ipsum. No designing around unfinished Google Docs. Message and interface evolve together.",label:"One focused team",image:"proof-2.avif"},
  {title:"Fast doesn’t mean rushed.",body:"We remove handoffs. We don’t remove thinking. Speed comes from the way the studio operates.",label:"Less waiting. More shipping.",image:"proof-3.avif"},
];
function WhyHippo() {
  const [active,setActive]=useState(0);
  const [announce,setAnnounce]=useState(false);
  const activeRef=useRef(0);
  const scrollIndex=useRef(0);
  const track=useRef<HTMLDivElement>(null);
  const story=useRef<HTMLDivElement>(null);
  const reduce=useReducedMotion();
  const [pin,setPin]=useState({top:0,height:460});

  // Match the scroll range to the exact interval in which the card is sticky.
  useEffect(()=>{
    const card=story.current;
    if(!card)return;
    const measure=()=>{
      const top=parseFloat(getComputedStyle(card).top)||0;
      const height=card.offsetHeight;
      setPin(previous=>previous.top===top&&previous.height===height?previous:{top,height});
    };
    const observer=new ResizeObserver(measure);
    observer.observe(card);
    measure();
    window.addEventListener("resize",measure);
    return()=>{observer.disconnect();window.removeEventListener("resize",measure);};
  },[]);

  const {scrollYProgress}=useScroll({
    target:track,
    offset:[`start ${pin.top}px`,`end ${pin.top+pin.height}px`],
  });
  function select(next:number,inputMethod:"scroll"|"button",direction?:"next"|"previous") {
    const previous=activeRef.current;
    if(previous===next)return;
    activeRef.current=next;
    setActive(next);
    setAnnounce(inputMethod==="button");
    captureLandingEvent("studio slide changed",{
      location:"why",direction:direction||(next>previous?"next":"previous"),
      slide:next+1,label:reasons[next].label,input_method:inputMethod,
    });
  }
  useMotionValueEvent(scrollYProgress,"change",progress=>{
    const next=Math.min(reasons.length-1,Math.max(0,Math.floor(progress*reasons.length)));
    // Manual selection stays put until scrolling reaches another card's interval.
    if(next===scrollIndex.current)return;
    scrollIndex.current=next;
    select(next,"scroll");
  });
  const change=(step:number)=>select((activeRef.current+step+reasons.length)%reasons.length,"button",step>0?"next":"previous");

  return <section className="ag-why ag-wrap" id="why">
    <Heading label="A better way to ship" ghost>Why Hippo</Heading>
    <div className="ag-proof-grid">
      <Reveal className="ag-metrics"><DeferredImage src={`${A}texture.avif`} sizes="(max-width: 700px) calc(100vw - 40px), 400px" alt="" className="ag-cover"/>{[{value:"2",unit:"weeks",caption:"From strategy to live site"},{value:"1",unit:"team",caption:"Strategy, copy, design & build"},{value:"7",unit:"days",caption:"Post-launch support"}].map(x=><div key={x.caption}><strong><CountUp value={Number(x.value)}/><span className="ag-metric-unit">{x.unit}</span></strong><p>{x.caption}</p></div>)}</Reveal>
      <div className="ag-story-track" ref={track}>
        <div className="ag-story" ref={story} role="region" aria-roledescription="carousel" aria-label="Why Hippo studio principles">
          {reasons.map((reason,index)=><m.div key={reason.label} className="ag-story-slide" aria-hidden={active!==index} initial={false} animate={{opacity:active===index?1:0}} transition={{duration:reduce?0:0.4}} style={{pointerEvents:active===index?"auto":"none"}}>
            <DeferredImage className="ag-cover" src={`${A}${reason.image}`} sizes="(max-width: 700px) 730px, 856px" alt="" loading="lazy"/>
            <span className="ag-story-number">0{index+1} / 03</span>
            <div className="ag-story-copy"><h3>{reason.title}</h3><p>{reason.body}</p><span>{reason.label}</span></div>
          </m.div>)}
          <span className="ag-sr-only" aria-live={announce?"polite":"off"} aria-atomic="true">{active+1} of {reasons.length}: {reasons[active].title}</span>
          <div className="ag-carousel-controls"><button type="button" onClick={()=>change(-1)} aria-label="Previous studio principle"><Icon name="previous"/></button><button type="button" onClick={()=>change(1)} aria-label="Next studio principle"><Icon name="next"/></button></div>
        </div>
      </div>
    </div>
  </section>;
}
function WorkCard({index}:{index:number}) {
  const project=landingProjects[index];
  const isStackray=project.slug==="stackray";
  const isHelpMeGrow=project.slug==="helpmegrow";
  const isQuillo=project.slug==="quillo";
  const hasScreen=isStackray||isHelpMeGrow||isQuillo;
  return <Reveal className={`ag-work ag-work-${index+1}`}>
    <ResponsiveImage className="ag-cover ag-work-bg" src={`${A}work-bg-${(index%3)+1}.avif`} sizes="(max-width: 700px) 1800px, 100vw" alt="" loading="lazy"/>
    <div className="ag-work-inner ag-wrap">
      <div className="ag-work-summary"><p>{project.note}</p><div><span className="ag-label">{String(index+1).padStart(2,"0")} / {String(landingProjects.length).padStart(2,"0")}</span><h3 data-analytics-project={project.slug} data-analytics-location="recent_work">{isHelpMeGrow?<>HelpMe<wbr/>Grow</>:project.name}</h3><a className="ag-text-link" data-analytics-location="recent_work" data-analytics-label={project.name} href={`/case-studies/${project.slug}`}>View case study <Icon name="arrow"/></a></div></div>
      <a className={`ag-work-art${hasScreen?" ag-work-live":""}${isHelpMeGrow?" ag-work-helpmegrow":""}${isQuillo?" ag-work-quillo":""}`} href={`/case-studies/${project.slug}`} aria-label={`View ${project.name} case study`} data-analytics-location="recent_work" data-analytics-label={project.name}>
        {hasScreen&&<span className="ag-work-url">{isStackray?"stackray.xyz":isQuillo?"Quillo / Landing page":"HelpMeGrow / Landing page"}</span>}
        <ResponsiveImage src={projectVisuals[project.slug]} sizes="(max-width: 700px) calc(100vw - 40px), (min-width: 1600px) 592px, 512px" alt={isQuillo?"Quillo landing-page hero with navigation, headline, supporting copy, and calls to action":isHelpMeGrow?"HelpMeGrow social-management landing page design":isStackray?"Stackray’s live SaaS website":`${project.name} concept presentation`} loading="lazy"/>
        {hasScreen&&<span className="ag-live-caption">{isStackray?<>The financial X-ray<br/>for your SaaS stack.</>:isQuillo?<>A reliable path through<br/>unfamiliar territory.</>:<>One place to<br/>see, answer, and plan.</>}</span>}
        <span className="ag-project-hover"><Icon name="arrow"/></span>
      </a>
      <div className="ag-work-meta"><div><p>{project.liveUrl?"Status":"Project"}</p><h4>{project.liveUrl?"Live website":project.tags[0]}</h4></div><div><p>Focus</p><span>{project.category}</span></div><div><p>Services</p>{project.scope.split(" + ").map(x=><span key={x}>{x}</span>)}</div></div>
    </div>
  </Reveal>;
}
const disciplines=[{title:"Website Design",image:"service-web.avif",description:"The story becomes a visual system, responsive page, and key interactions.",tags:["Visual system","Responsive page","Interactions"]},{title:"Positioning & Copy",image:"service-brand.png",description:"We shape the story around what buyers need to understand, believe, and do.",tags:["Page story","Buyer questions","Conversion copy"]},{title:"Build & Launch",image:"service-logo.avif",description:"You do not get a folder of frames and a good-luck message. We design it, build it, QA it, and launch it.",tags:["Framer & Webflow","Responsive QA","Launch support"]}];
function Disciplines() {
  const [active,setActive]=useState(1);
  const refs=useRef<(HTMLButtonElement|null)[]>([]);
  function selectService(index:number,inputMethod:string) {
    if(index===active)return;
    setActive(index);
    captureLandingEvent("service selected",{location:"services",label:disciplines[index].title,service_index:index+1,input_method:inputMethod});
  }
  return <section className="ag-disciplines" id="services"><div className="ag-wrap"><Reveal><p className="ag-label">(Services)</p><h2>What we do</h2></Reveal><div className="ag-tabs" role="tablist" aria-label="Our services">{disciplines.map((d,i)=><button type="button" role="tab" id={`service-tab-${i}`} aria-selected={active===i} aria-controls="service-panel" tabIndex={active===i?0:-1} ref={el=>{refs.current[i]=el;}} key={d.title} onClick={event=>selectService(i,event.detail===0?"keyboard":"pointer")} onKeyDown={e=>{let next=i;if(e.key==="ArrowRight")next=(i+1)%3;else if(e.key==="ArrowLeft")next=(i+2)%3;else if(e.key==="Home")next=0;else if(e.key==="End")next=2;else return;e.preventDefault();selectService(next,"keyboard");refs.current[next]?.focus();}}>{d.title}</button>)}</div></div>
  <div className="ag-service-presentation" id="service-panel" role="tabpanel" aria-labelledby={`service-tab-${active}`}><div className="ag-service-marquee" aria-hidden="true"><div key={active}>{[0,1,2].map(i=><span key={i}>{disciplines[active].title}<Icon name="flower-orange"/></span>)}</div></div><AnimatePresence mode="wait"><m.img key={active} className="ag-service-image" {...imageProps(`${A}${disciplines[active].image}`, "(max-width: 700px) calc(100vw - 40px), 550px")} loading="lazy" decoding="async" alt={`${disciplines[active].title} presentation`} initial={{opacity:0,y:16,rotate:-1}} animate={{opacity:1,y:0,rotate:0}} exit={{opacity:0,y:-12}} transition={{duration:0.4,ease}}/></AnimatePresence><p>{disciplines[active].description}</p><div className="ag-pills ag-small-pills">{disciplines[active].tags.map(t=><span key={t}>{t}</span>)}</div></div></section>;
}
function About() {
  return <section id="about" className="ag-about ag-wrap"><Heading label="The studio" ghost>Meet Hippo</Heading><div className="ag-about-grid"><Reveal className="ag-about-portrait"><ResponsiveImage className="ag-cover" src={`${A}orange-glow.avif`} alt=""/><ResponsiveImage className="ag-about-logo" src="/hippo-logo.png" sizes="(max-width: 700px) 84vw, 420px" alt="Hippo"/><div className="ag-about-signature"><span>shipped by</span><strong>Hippo.</strong><p>Made to ship. Not sit in Figma.</p></div></Reveal><Reveal className="ag-about-copy"><h3>The studio</h3><p>The same team understands the product, writes the story, designs the experience, and builds the page.</p><p>For SaaS and AI founders whose product has outgrown the page explaining it. We sharpen the message, design the experience, and get it live.</p><div className="ag-about-values">{[["Strategy + scope","Product first"],["Positioning + messaging","Clarity"],["Design + development","Together"],["QA + launch","Shipped"]].map(([x,y])=><div key={x}><span>{x}</span><span>{y}</span></div>)}</div></Reveal></div></section>;
}
function Process() {
  return <section className="ag-process ag-wrap" id="process"><Heading label="The two-week sprint">How we ship</Heading><div className="ag-process-rows">{processSteps.map((step,i)=><Reveal key={step.day} delay={i*0.05}><details className="ag-process-row" onToggle={event=>captureLandingEvent("process step toggled",{location:"process",step:i+1,label:step.title,expanded:event.currentTarget.open})}><summary><span>{step.label}</span><h3>{step.title.toLowerCase()}</h3><span>0{i+1}<Icon name="arrow"/></span></summary><div><p>{step.description}</p><ul>{step.deliverables.map(d=><li key={d}>{d}</li>)}</ul></div></details></Reveal>)}</div></section>;
}
function Testimonials() {
  return (
    <section className="ag-testimonials ag-wrap" id="testimonials" aria-labelledby="testimonials-title">
      <Reveal className="ag-testimonials-heading">
        <p className="ag-label">(Testimonials)</p>
        <h2 id="testimonials-title">Good people.<br/><span className="ag-muted">Great things shipped.</span></h2>
      </Reveal>
      <div className="ag-testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <Reveal className={`ag-testimonial${index === 0 ? " ag-testimonial-featured" : ""}`} key={testimonial.id} delay={index * 0.06}>
            <figure className="ag-testimonial-content">
              <span className="ag-testimonial-mark" aria-hidden="true">“</span>
              <blockquote><p>{testimonial.quote}</p></blockquote>
              <figcaption className="ag-testimonial-author" data-analytics-testimonial={testimonial.id}>
                <span className="ag-testimonial-avatar" aria-hidden="true">{testimonial.initials}</span>
                <div>
                  <span className="ag-testimonial-name">{testimonial.name}</span>
                  <span className="ag-testimonial-role">{testimonial.role}</span>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
function Pricing() {
  return <section className="ag-pricing ag-wrap" id="pricing"><Heading label="Pricing plans">Explore Pricing</Heading><div className="ag-pricing-list">{services.map((s,i)=><Reveal className={`ag-price-card${i===1?" ag-price-premium":""}`} key={s.title}><div className="ag-price-info"><div className="ag-price-icon">{i===0?<ResponsiveImage src={`${A}sparkle.png`} alt=""/>:<Icon name="planet"/>}</div><h3>{s.title}</h3><p>{s.audience}</p><div className="ag-delivery"><span>Delivery time</span><span>{s.timeline}</span></div></div><div className="ag-price-detail"><div className="ag-price-amount" data-analytics-plan={s.title} data-analytics-price={Number(s.price.replace(/[^0-9.]/g,""))}><strong><CountUp value={Number(s.price.replace(/[^0-9.]/g,""))} startValue={Number(s.price.replace(/[^0-9.]/g,""))*0.9} durationMs={600} prefix="$"/></strong><span>{i===0?"fixed":"standard scope"}</span></div><ul>{s.includes.map(inc=><li key={inc}><Icon name="check"/>{inc}</li>)}</ul><CTA location="pricing" plan={s.title} price={Number(s.price.replace(/[^0-9.]/g,""))}>{s.cta}</CTA></div></Reveal>)}</div></section>;
}
function FAQ() {
  const [opened,setOpened]=useState<number[]>([0]);
  const items=faqs;
  return <section className="ag-faq ag-wrap" id="faq"><Heading label="FAQs">Your Questions, Answered</Heading><p className="ag-faq-intro">The practical bits before kickoff.</p><div className="ag-faq-columns">{[items.slice(0,6),items.slice(6)].map((column,c)=><div key={c}>{column.map((f,i)=>{const index=c*6+i;const open=opened.includes(index);return <div className="ag-faq-item" key={f.question}><h3><button type="button" aria-expanded={open} aria-controls={`faq-answer-${index}`} onClick={()=>{setOpened(o=>open?o.filter(x=>x!==index):[...o,index]);captureLandingEvent("faq toggled",{location:"faq",question:f.question,question_index:index+1,expanded:!open});}}><span>{f.question}</span><Icon name="plus" className={open?"ag-plus-open":""}/></button></h3><div className={`ag-faq-answer${open?" is-open":""}`} id={`faq-answer-${index}`} aria-hidden={!open}><div><p>{f.answer}</p></div></div></div>;})}</div>)}</div></section>;
}
function Contact() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const showCalendar = useInView(calendarRef, { once: true, margin: "400px" });
  return (
    <section className="ag-contact" id="contact">
      <Heading ghost>Let’s Connect</Heading>
      <div className="ag-contact-panel">
        <ResponsiveImage className="ag-cover" src={`${A}contact.avif`} alt=""/>
        <div className="ag-contact-content ag-wrap">
          <Reveal className="ag-contact-copy">
            <h2>Got a project<br/>in mind?</h2>
            <p>Serious launch, refresh, or campaign on the table?<br/>{" "}Let’s talk through fit, scope, and the fastest useful path.</p>
          </Reveal>
          <div className="ag-contact-booking" ref={calendarRef} role="region" aria-label="Book a 30-minute call">
            {showCalendar ? <BookingCalendar/> : <p className="ag-booking-loading" role="status">Loading available times…</p>}
          </div>
        </div>
        <div className="ag-contact-marquee"><Ribbon items={["Strategy to shipped","Shipped by Hippo","Live in ~2 weeks"]}/></div>
      </div>
    </section>
  );
}
export default function Home() {
  return <LazyMotion features={domAnimation} strict><MotionConfig reducedMotion="user"><div className="ag-site" id="top"><a className="ag-skip" href="#intro">Skip to content</a><main><Hero/><Intro/><WhyHippo/><section className="ag-works" id="shipments"><Heading label="Selected shipments" ghost>Recent Works</Heading>{landingProjects.map((project,i)=><WorkCard key={project.slug} index={i}/>)}</section><Disciplines/><Process/><Testimonials/><Contact/><Pricing/><About/><FAQ/></main><Footer/></div></MotionConfig></LazyMotion>;
}
