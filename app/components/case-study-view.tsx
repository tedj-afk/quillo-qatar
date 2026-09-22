"use client";

import * as m from "motion/react-m";

import { ResponsiveImage } from "@/app/components/responsive-image";
import { imageProps } from "@/lib/image-props";

import { useRef, type ReactNode } from "react";
import { MotionConfig, LazyMotion, domAnimation, useReducedMotion, useScroll, useTransform } from "motion/react";
import { projectVisuals as visuals, type Project } from "@/data/projects";
import { bookingUrl } from "@/lib/booking";
import { Header, Footer } from "./agero-chrome";
import { StackrayHero, StackrayStory } from "./stackray-story";
import { HelpMeGrowHero, HelpMeGrowStory } from "./helpmegrow-story";
import { QuilloHero, QuilloStory } from "./quillo-story";
import "../home.css";
import "../case-studies/case-study.css";
import "../case-studies/stackray-story.css";
import "../case-studies/helpmegrow-story.css";
import "../case-studies/quillo-story.css";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <m.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.8, ease }}>{children}</m.div>;
}

function Title({ children }: { children: string }) {
  const reduce = useReducedMotion();
  return <m.h2 initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.7, ease }}>{children}</m.h2>;
}

function ProjectImage({ project, detail = false }: { project: Project; detail?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const isLive = project.slug === "stackray";
  return <div ref={ref} className={`${detail ? "ag-case-detail-visual" : "ag-case-cover"}${isLive ? " ag-case-live-visual" : ""}`}>
    {isLive && <ResponsiveImage className="ag-cover" src="/agero/texture.avif" alt="" />}
    <m.img className="ag-case-project-image" {...imageProps(visuals[project.slug], "(max-width: 700px) 90vw, 900px")} alt={`${project.name} ${isLive ? "live website" : "concept presentation"}`} style={{ ...(reduce ? {} : { scale }), rotate: isLive && !detail ? -4 : 0, rotateY: isLive && !detail ? -10 : 0 }} loading={detail ? "lazy" : "eager"} fetchPriority={detail ? "auto" : "high"} />
  </div>;
}

function CaseHero({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const [category, ...rest] = project.category.split(" ");
  const remainder = rest.join(" ");
  const title = `${project.name} — ${project.category}`;
  return <div className="ag-case-opening">
    <Header homePath="/" />
    <section className="ag-case-hero" id="project" aria-labelledby="case-title">
      <h1 id="case-title" aria-label={title}>
        <m.span className="ag-case-title-line" aria-hidden="true" initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.85, ease }}>
          {project.name}<ResponsiveImage src={visuals[project.slug]} sizes="100px" loading="eager" alt="" /><em>{category}</em>
        </m.span>
        {remainder && <m.span className="ag-case-title-line ag-case-title-category" aria-hidden="true" initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.85, delay: 0.12, ease }}>
          <ResponsiveImage src={visuals[project.slug]} sizes="100px" loading="eager" alt="" />{remainder}
        </m.span>}
      </h1>
      <Reveal className="ag-case-hero-description"><p>{project.caseStudy.headline}</p></Reveal>
    </section>
    <ProjectImage project={project} />
  </div>;
}

function ProjectStory({ project }: { project: Project }) {
  const { caseStudy: study } = project;
  const signature = study.signature;
  return <article className="ag-case-story">
    <section className="ag-case-copy ag-case-wrap" id="discovery">
      <Title>Discovery &amp; Strategy</Title>
      <div className="ag-case-prose">
        <p>{study.founderPain}</p>
        <p>{study.context}</p>
        <p>{study.strategy[0]}</p>
      </div>
      <div className="ag-case-facts" aria-label="Project details">
        <span>{project.scope}</span>
        <span>{project.tags[0] === "Live" ? "Pre-launch / private beta" : "Concept project"}</span>
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-analytics-location="case_study_details">View live site <ResponsiveImage src="/agero/arrow.svg" alt="" /></a>}
      </div>
      <Reveal><ProjectImage project={project} detail /></Reveal>
    </section>

    <section className="ag-case-copy ag-case-creation ag-case-wrap" id="deliverables">
      <Title>Creation &amp; Deliverables</Title>
      <div className="ag-case-prose">
        {signature && <><p className="ag-case-lead">{signature.title}</p><p>{signature.body}</p></>}
        {study.strategy.slice(1).map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {signature && <div className="ag-case-text-group">
        <h3>Trust by design</h3>
        <p>The biggest conversion objection was not price. It was access.</p>
        <ul className="ag-case-inline-list">{signature.trust.map(item => <li key={item}>{item}</li>)}</ul>
      </div>}
      <div className="ag-case-text-group">
        <h3>{signature ? "Every road leads to the waitlist." : "The founder walkthrough."}</h3>
        {signature && <p>No competing CTAs. No pricing detour. No vague demo ask. The page builds one clean path from problem recognition to a private-beta signup.</p>}
        <ol className="ag-case-flow">{study.pageStructure.map(step => <li key={step.label}><span>{step.label}</span><p><strong>{step.title}.</strong> {step.detail}</p></li>)}</ol>
      </div>
      <div className="ag-case-text-group">
        <h3>{signature ? "We did not stop at Figma." : "What shipped."}</h3>
        {signature && <p>The interface was not handed off and forgotten. We shipped the system collecting the leads.</p>}
        <ul className="ag-case-inline-list">{(signature?.system || study.proof).map(item => <li key={item}>{item}</li>)}</ul>
        <p className="ag-case-outcome-copy">{study.outcome}</p>
      </div>
    </section>
  </article>;
}

function Takeaway({ project }: { project: Project }) {
  return <section className="ag-case-takeaway" id="outcome">
    <div className="ag-wrap">
      <div className="ag-heading ag-heading-ghost"><p className="ag-label">(Founder takeaway)</p><Reveal><h2>The Outcome</h2></Reveal></div>
      <Reveal className="ag-case-quote">
        <ResponsiveImage className="ag-cover" src={visuals[project.slug]} alt="" loading="lazy" />
        <div className="ag-case-quote-copy">
          <p>{project.caseStudy.takeaway}</p>
          <div className="ag-case-quote-bottom"><span>Shipped by Hippo<small>{project.name} / {project.category}</small></span><a className="ag-button ag-button-light" href={bookingUrl} target="_blank" rel="noopener noreferrer" data-analytics-location="case_study_takeaway">Book a call <ResponsiveImage className="ag-icon" src="/agero/arrow.svg" alt="" /></a></div>
        </div>
      </Reveal>
    </div>
  </section>;
}

function NextProject({ project, index, count }: { project: Project; index: number; count: number }) {
  const href = `/case-studies/${project.slug}`;
  const art = visuals[project.slug];
  return <section className="ag-case-next" id="next-project">
    <div className="ag-heading"><p className="ag-label">(Project)</p><Title>Next Project</Title></div>
    <Reveal className="ag-work ag-case-next-card">
      <ResponsiveImage className="ag-cover ag-work-bg" src={`/agero/work-bg-${(index % 3) + 1}.avif`} sizes="(max-width: 700px) 1800px, 100vw" alt="" loading="lazy" />
      <div className="ag-work-inner ag-wrap">
        <div className="ag-work-summary"><p>{project.note}</p><div><span className="ag-label">{String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span><h3 data-analytics-project={project.slug} data-analytics-location="next_project"><a href={href} data-analytics-location="next_project">{project.slug === "helpmegrow" ? <>HelpMe<wbr/>Grow</> : project.name}</a></h3><a className="ag-text-link" href={href} data-analytics-location="next_project" data-analytics-label={project.name}>View case study <ResponsiveImage className="ag-icon" src="/agero/arrow.svg" alt="" /></a></div></div>
        <a className={`ag-work-art${project.liveUrl || ["helpmegrow", "quillo"].includes(project.slug) ? " ag-case-next-live" : ""}`} href={href} aria-label={`View ${project.name} case study`} data-analytics-location="next_project" data-analytics-label={project.name}><ResponsiveImage src={art} sizes="(max-width: 700px) calc(100vw - 40px), 592px" alt={`${project.name} ${["helpmegrow", "quillo"].includes(project.slug) ? "landing page design" : project.liveUrl ? "website" : "concept presentation"}`} loading="lazy" /><span className="ag-project-hover"><ResponsiveImage className="ag-icon" src="/agero/arrow.svg" alt="" /></span></a>
        <div className="ag-work-meta"><div><p>{project.liveUrl ? "Status" : "Project"}</p><h4>{project.liveUrl ? "Live website" : project.tags[0]}</h4></div><div><p>Focus</p><span>{project.category}</span></div><div><p>Services</p>{project.scope.split(" + ").map(item => <span key={item}>{item}</span>)}</div></div>
      </div>
    </Reveal>
  </section>;
}

export function CaseStudyView({ project, nextProject, nextIndex, projectCount }: { project: Project; nextProject: Project; nextIndex: number; projectCount: number }) {
  const expanded = ["stackray", "helpmegrow", "quillo"].includes(project.slug);
  return <LazyMotion features={domAnimation} strict><MotionConfig reducedMotion="user"><div className={`ag-site ag-case${project.slug === "stackray" ? " ag-stackray" : project.slug === "helpmegrow" ? " ag-helpmegrow" : project.slug === "quillo" ? " ag-quillo" : ""}`} id="top">
    <a className="ag-skip" href={expanded ? "#snapshot" : "#discovery"}>Skip to case study</a>
    <main>{project.slug === "stackray" ? <><StackrayHero/><StackrayStory/></> : project.slug === "helpmegrow" ? <><HelpMeGrowHero/><HelpMeGrowStory/></> : project.slug === "quillo" ? <><QuilloHero/><QuilloStory/></> : <><CaseHero project={project} /><ProjectStory project={project} /><Takeaway project={project} /></>}<NextProject project={nextProject} index={nextIndex} count={projectCount} /></main>
    <Footer homePath="/" />
  </div></MotionConfig></LazyMotion>;
}
