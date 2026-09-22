"use client";

import * as m from "motion/react-m";

import { ResponsiveImage } from "@/app/components/responsive-image";
import { imageProps } from "@/lib/image-props";

import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { Header } from "./agero-chrome";
import { bookingUrl } from "@/lib/booking";
import { captureLandingEvent } from "@/lib/analytics";
import { createVideoAnalytics } from "@/lib/video-analytics";

const ease = [0.22, 1, 0.36, 1] as const;
const questions = [
  ["Promise", "What is this?", "A learning path for the thing no course was built to teach."],
  ["Problem", "Do I recognize the problem?", "Too much information. No clear starting point."],
  ["Mechanism", "How does it work?", "Map the territory, teach in context, keep the thread."],
  ["Trust", "Can I trust it?", "Sources, evidence, and uncertainty stay visible."],
  ["Difference", "Why this instead?", "The structure of a course, built around the individual."],
  ["Relevance", "Is it for someone like me?", "A specific learning goal and an honest starting point."],
  ["Commitment", "What does it cost?", "Explain the model before introducing the plans."],
  ["Objections", "What could stop me?", "Answer the AI-wrapper question directly."],
  ["Action", "Where do I start?", "One invitation: start a path. The first one is free."],
];
const proof = [
  { label: "Rigor", image: "landing-rigor", width: 1980, height: 2713, title: "Trust gets its own section.", body: "The landing page pairs its promise with explanatory copy and a framed source-library visual. The headline, evidence, and supporting caption make one coherent argument.", alt: "Quillo landing-page Rigor section, including the Every claim carries its source headline, supporting copy, framed visual, and source-quality caption" },
  { label: "Positioning", image: "landing-differentiation", width: 1980, height: 1796, title: "A familiar frame for a new product.", body: "The page’s comparison cards explain what a chatbot, a course, and a colleague leave unresolved, then give Quillo a clear place among them.", alt: "Quillo landing-page Differentiation section with the Where this sits heading and four comparison cards" },
  { label: "FAQs", image: "landing-faq", width: 1980, height: 2027, title: "The hardest question stays visible.", body: "The FAQ opens with the AI-wrapper objection. Its expanded answer gives the page room to explain the difference before the final invitation.", alt: "Quillo landing-page Questions section, with the ChatGPT-wrapper answer expanded and four further FAQ questions" },
];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <m.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.75, ease }}>{children}</m.div>;
}
function Label({ number, children }: { number: string; children: ReactNode }) { return <p className="ql-label"><span>{number}</span> / {children}</p>; }
function Title({ children }: { children: ReactNode }) { return <Reveal><h2 className="ql-title">{children}</h2></Reveal>; }
function Screen({ image, alt, width, height, eager = false }: { image: string; alt: string; width: number; height: number; eager?: boolean }) {
  return <ResponsiveImage src={`/quillo/${image}.webp`} sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1200px) 70vw, 960px" alt={alt} width={width} height={height} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} />;
}
function Arrow() { return <ResponsiveImage className="ag-icon" src="/agero/arrow.svg" alt="" />; }

function QuilloExplainer() {
  const [analytics] = useState(() => createVideoAnalytics({ location: "quillo_explainer", video: "quillo_platform_introduction" }));
  return <section className="ql-explainer ag-wrap" id="meet-quillo" aria-labelledby="ql-explainer-title">
    <div className="ql-explainer-heading">
      <div><p className="ql-eyebrow">THE PLATFORM</p><h2 id="ql-explainer-title">Meet Quillo.</h2></div>
      <p id="ql-explainer-description">Quillo turns a learning goal into a structured path, with concepts taught in sequence and sources close at hand. See how it works before exploring the landing-page strategy.</p>
    </div>
    <video className="ql-explainer-video" controls playsInline preload="none" poster={imageProps("/quillo/explainer-poster.webp").src} width={1280} height={720} aria-label="Quillo platform introduction" aria-describedby="ql-explainer-description"
      onPlaying={event => analytics.play(event.currentTarget)} onPause={event => analytics.pause(event.currentTarget)}
      onTimeUpdate={event => analytics.progress(event.currentTarget)} onEnded={event => analytics.complete(event.currentTarget)}>
      <source src="/quillo/explainer.mp4" type="video/mp4" />
      Your browser does not support embedded video. <a href="/quillo/explainer.mp4">Watch the Quillo platform introduction.</a>
    </video>
    <div className="ql-explainer-footer"><span>Quillo / 30-second platform introduction</span><a href="#snapshot" data-analytics-location="quillo_explainer">Explore the case study <Arrow /></a></div>
  </section>;
}

export function QuilloHero() {
  const reduce = useReducedMotion();
  return <div className="ql-opening"><Header homePath="/" />
    <section className="ql-hero ag-wrap" id="project" aria-labelledby="case-title">
      <p className="ag-label">(Quillo / AI learning landing page)</p>
      <m.h1 id="case-title" initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.85, ease }}>A reliable path through<br /> <em>unfamiliar territory.</em></m.h1>
      <Reveal><p className="ql-hero-intro">Turning an unfamiliar AI learning product into a path people immediately understand.</p><div className="ql-scope"><span>Positioning</span><span>Messaging</span><span>Visual design</span><span>Landing page</span></div></Reveal>
    </section>
    <QuilloExplainer />
    <Reveal className="ql-showcase ag-wrap">
      <div className="ql-showcase-top"><span>QUILLO / THE LANDING PAGE</span><span>AI + Education</span></div>
      <div className="ql-showcase-grid"><div className="ql-showcase-copy"><span className="ql-eyebrow">THE IDEA BEHIND THE PAGE</span><p>More information<br /> is easy.<br /><em>A way forward<br /> is valuable.</em></p><ol>{[["Direction", "Know where to start."], ["Sequence", "Build on what you know."], ["Confidence", "See what holds up."]].map(([title, body], i) => <li key={title}><span>0{i + 1}</span><div><strong>{title}</strong><small>{body}</small></div></li>)}</ol></div><div className="ql-hero-screen"><Screen image="landing-hero" alt="Quillo landing-page opening with navigation, headline, supporting copy, calls to action, and the framed visual below" width={1980} height={3024} /></div></div>
      <div className="ql-showcase-bottom"><span>From the Quillo landing page design</span><a href="#snapshot" data-analytics-location="quillo_hero">Explore the story <Arrow /></a></div>
    </Reveal>
  </div>;
}

function Snapshot() { return <section className="ql-section ag-wrap" id="snapshot">
  <Label number="01">The product</Label><Title>A learning system for subjects<br /> <em>without a syllabus.</em></Title>
  <div className="ql-split"><div className="ql-prose"><p>Quillo creates a structured learning path around a specific goal. It starts with what the learner already knows, identifies missing foundations, and teaches each concept in the right order.</p><p>We shaped the landing page around one clear idea: the problem is knowing what to trust, what to learn first, and how to keep moving.</p></div><dl className="ql-facts">{[["Industry", "AI / Education"], ["Audience", "Curious, serious learners"], ["Scope", "Positioning, messaging & visual design"], ["Deliverable", "Landing page"]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div>
</section>; }

function Challenge() { return <section className="ql-dark" id="challenge"><div className="ql-section ag-wrap">
  <Label number="02">The communication challenge</Label><Title>A familiar problem.<br /> <span>An unfamiliar solution.</span></Title><p className="ql-intro">People understand courses, search engines, and chatbots. Quillo sits between those categories. The page had to make it feel familiar without a long technical explanation.</p>
  <div className="ql-three">{[["Make it familiar.", "Explain where Quillo fits before asking visitors to learn a new category."], ["Structure, with flexibility.", "Show a clear route that adapts to what each person already knows."], ["Make trust visible.", "Treat sources and uncertainty as essential to believing the product."]].map(([title, body], i) => <Reveal key={title}><span className="ql-eyebrow">0{i + 1}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div>
  <Reveal className="ql-insight"><span className="ql-eyebrow">THE COMMUNICATION GOAL</span><p>Intelligent and rigorous.<br />Approachable enough to begin.</p></Reveal>
</div></section>; }

function Strategy() { return <section className="ql-section ag-wrap" id="strategy">
  <Label number="03">The strategic insight</Label><Title>The real competitor was<br /> <em>unstructured information.</em></Title><div className="ql-split ql-prose"><p>Search made information abundant. AI made answers instant. Neither tells a learner which ideas matter, what order they belong in, or whether the underlying information holds up.</p><p>That shifted the story toward a specific value: direction, sequence, and confidence. Quillo builds a reliable route through the information.</p></div>
  <Reveal className="ql-statement"><span className="ql-eyebrow">THE CENTRAL ANGLE</span><blockquote>The hard part was never finding the information.<br /><em>It was finding a reliable route through it.</em></blockquote></Reveal>
  <figure className="ql-figure ql-problem"><Screen image="landing-problem" alt="Quillo landing-page Problem section, with its headline, introduction, and three columns of learner frustrations" width={1980} height={1654} /><figcaption>Three recognizable frustrations give the product a reason to exist.</figcaption></figure>
</section>; }

function Positioning() { return <section className="ql-section ql-bordered ag-wrap" id="positioning">
  <Label number="04">Positioning</Label><Title>The path, the teaching,<br /> <em>and the follow-through.</em></Title><p className="ql-intro">We made the category understandable through the tools people already use—and the gaps they still have to navigate.</p>
  <div className="ql-comparison" role="region" aria-label="Ways to learn compared" tabIndex={0}><table><thead><tr><th scope="col">Alternative</th><th scope="col">What it provides</th><th scope="col">What remains unresolved</th></tr></thead><tbody>{[["Search", "Unlimited information", "No sequence or quality control"], ["AI chatbot", "Immediate answers", "You still need to know what to ask"], ["Online course", "A predefined path", "A starting point chosen for everyone"], ["Expert colleague", "Contextual guidance", "Rarely available when needed"]].map(([name, value, gap]) => <tr key={name}><th scope="row">{name}</th><td>{value}</td><td>{gap}</td></tr>)}<tr className="ql-comparison-quillo"><th scope="row">Quillo</th><td>A personalized, sourced path</td><td>Direction, teaching, and continuity together</td></tr></tbody></table></div>
</section>; }

function Journey() { return <section className="ql-dark" id="journey"><div className="ql-section ag-wrap">
  <Label number="05">Message strategy</Label><Title>Every section answers<br /> <em>the next question.</em></Title><p className="ql-intro">The page moves from recognition to understanding, then from understanding to trust. Each section earns the right to introduce the next one.</p>
  <ol className="ql-journey">{questions.map(([label, title, body], i) => <li key={label}><span>0{i + 1} / {label}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
</div></section>; }

function Opening() { return <section className="ql-section ag-wrap" id="experience">
  <Label number="06">The opening</Label><Title>One line to make<br /> <em>the promise immediate.</em></Title>
  <div className="ql-opening-detail"><blockquote>Learn the thing no one has made a course for.</blockquote><div className="ql-prose"><p>The headline starts with a situation the audience recognizes: wanting to understand something too specific, advanced, or interdisciplinary for a conventional course.</p><p>The supporting copy supplies the mechanism: vetted sources, the right sequence, and teaching adapted to prior knowledge.</p><p><strong>“Start a path”</strong> turns the product concept into an action. A free first path lowers the commitment needed to experience it.</p></div></div>
</section>; }

function LearningLoop() { return <section className="ql-section ql-bordered ag-wrap" id="learning-loop">
  <Label number="07">Explaining the product</Label><Title>Three capabilities.<br /> <em>One continuous learning loop.</em></Title>
  <div className="ql-loop">{[["01", "Map the territory.", "Start with the destination and the learner’s existing knowledge. Work backward through prerequisites and dependencies to find the shortest honest route."], ["02", "Teach, not just answer.", "Explain concepts in context, check whether they landed, and return to a missing foundation when the learner needs it."], ["03", "Keep the learner moving.", "Short sessions and a visible learning thread make returning easier. Always show the next meaningful step."]].map(([number, title, body]) => <Reveal className="ql-loop-step" key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div>
  <figure className="ql-figure ql-path"><a href="/quillo/landing-how-it-works.webp" target="_blank" rel="noopener noreferrer" aria-label="View the full-size How it works landing-page section"><Screen image="landing-how-it-works" alt="Quillo landing-page How it works section: Three things, one loop, followed by three alternating rows of explanatory copy and framed visuals" width={1980} height={3636} /></a><figcaption>The landing page’s “How it works” section alternates copy and framed visuals to explain the three-part loop. Select the image to view it full size.</figcaption></figure>
</section>; }

function LandingPageProof() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  function select(index: number, inputMethod: "keyboard" | "pointer") {
    if (index === active) return;
    setActive(index);
    captureLandingEvent("case study walkthrough selected", { location: "quillo_landing_page_proof", step: index + 1, label: proof[index].label, input_method: inputMethod });
  }
  return <section className="ql-dark" id="credibility"><div className="ql-section ag-wrap">
    <Label number="08">Designing for credibility</Label><Title>Every claim<br /> <em>carries its source.</em></Title><p className="ql-intro">A polished answer is not enough. The page makes rigor a primary benefit: original sources remain accessible, conflicting evidence is acknowledged, and uncertainty stays visible.</p>
    <ul className="ql-trust-points"><li>Primary sources prioritized</li><li>Disagreement acknowledged</li><li>Evidence stays attached</li></ul>
    <div className="ql-proof-tabs" role="tablist" aria-label="Quillo landing-page sections">{proof.map((shot, i) => <button key={shot.label} type="button" role="tab" id={`ql-tab-${i}`} aria-controls={`ql-panel-${i}`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} ref={el => { refs.current[i] = el; }} onClick={event => select(i, event.detail === 0 ? "keyboard" : "pointer")} onKeyDown={event => {
      let next = i;
      if (event.key === "ArrowRight") next = (i + 1) % proof.length;
      else if (event.key === "ArrowLeft") next = (i + proof.length - 1) % proof.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = proof.length - 1;
      else return;
      event.preventDefault(); select(next, "keyboard"); refs.current[next]?.focus();
    }}><span>0{i + 1}</span>{shot.label}</button>)}</div>
    {proof.map((shot, i) => <div key={shot.label} className="ql-proof-panel" role="tabpanel" id={`ql-panel-${i}`} aria-labelledby={`ql-tab-${i}`} tabIndex={0} hidden={active !== i}><div className="ql-proof-screen"><Screen {...shot} /></div><div className="ql-proof-caption"><h3>{shot.title}</h3><div><p>{shot.body}</p><a className="ql-image-link" href={`/quillo/${shot.image}.webp`} target="_blank" rel="noopener noreferrer">View full-size image <Arrow /></a></div></div></div>)}
    <p className="ql-note">Sections from the supplied Quillo landing-page design.</p>
  </div></section>;
}

function VisualDirection() { return <section className="ql-section ag-wrap" id="visual-direction">
  <Label number="09">Visual direction</Label><Title>Calm enough for focus.<br /> <em>Distinct enough to feel new.</em></Title><div className="ql-split ql-prose"><p>An editorial serif, warm neutral surfaces, and quiet interface framing give Quillo the character of a thoughtful research publication.</p><p>A single progress green gives actions a clear place in the hierarchy. Dark sections punctuate the story; generous space lets dense ideas breathe.</p></div>
  <Reveal className="ql-design-board"><div className="ql-type-sample"><span className="ql-eyebrow">EDITORIAL VOICE</span><p>Learn the thing<br />no one has made<br /><em>a course for.</em></p><div className="ql-interface-sample"><span>QUIET INTERFACE</span><strong>Sources stay connected.</strong><small>PRIMARY SOURCE / READING</small></div></div><div className="ql-swatches">{[["Warm paper", "#F6F5ED"], ["Ink", "#141A12"], ["Progress", "#8BBF48"], ["Moss", "#526D36"]].map(([label, color]) => <div key={label}><span style={{ background: color }} /><p>{label}</p><small>{color}</small></div>)}</div></Reveal>
  <div className="ql-rhythm"><div><span className="ql-eyebrow">PAGE EXPERIENCE</span><h3>Explanation. Proof.<br /><em>Room to breathe.</em></h3><p>The long page alternates editorial statements, product views, comparisons, and dark narrative moments. Scanning visitors get clear entry points; serious readers can follow the full argument.</p></div><figure className="ql-figure"><Screen image="landing-why-now" alt="Quillo landing-page Why now section, with its dark background, headline, and supporting argument" width={1980} height={1262} /><figcaption>A change in contrast gives the central argument its own moment.</figcaption></figure></div>
</section>; }

function Objections() { return <section className="ql-section ql-bordered ag-wrap" id="objections">
  <Label number="10">Objection handling</Label><Title>We addressed the question<br /> <em>everyone would ask.</em></Title><div className="ql-split"><div className="ql-prose"><h3 className="ql-question">“Is this just ChatGPT with a wrapper?”</h3><p>The answer acknowledges the frontier model, then explains the product around it: a planner, an adaptive tutor, a citation system, and a persistent learning path.</p><p>This respects what informed visitors already know about AI products—and gives them a concrete reason to believe the difference.</p></div><figure className="ql-figure ql-faq"><a href="/quillo/landing-faq.webp" target="_blank" rel="noopener noreferrer" aria-label="View the full-size FAQ landing-page section"><Screen image="landing-faq" alt="Quillo landing-page FAQ layout with the first answer expanded and the remaining questions below" width={1980} height={2027} /></a><figcaption>The landing page’s FAQ, with the first answer expanded. Select the image to view it full size.</figcaption></figure></div><Reveal className="ql-pullquote"><blockquote>The model is the engine.<br /><em>It isn’t the product.</em></blockquote></Reveal>
</section>; }

function Conversion() { return <section className="ql-dark" id="conversion"><div className="ql-section ag-wrap">
  <Label number="11">Conversion strategy</Label><Title>Experience the model.<br /> <em>Then make the commitment.</em></Title><p className="ql-intro">“Start a path” stays consistent across the page. The first path is free and requires no card, so the product can prove its value through use. Pricing follows the product story, trust, and differentiation.</p>
  <div className="ql-conversion-flow">{[["First impression", "A clear invitation"], ["After the explanation", "An informed decision"], ["One primary action", "Start a path"]].map(([label, title]) => <div key={label}><span className="ql-eyebrow">{label}</span><h3>{title}</h3></div>)}</div>
  <div className="ql-conversion-close"><blockquote>Start where<br /><em>you actually are.</em></blockquote><figure className="ql-figure"><Screen image="landing-conversion" alt="Quillo landing-page closing section: Start where you actually are, First path is free, and the Start a path button" width={1980} height={1033} /><figcaption>The final invitation returns to the learner’s situation.</figcaption></figure></div>
</div></section>; }

function Outcome() { return <section className="ql-section ag-wrap" id="outcome">
  <Label number="12">The outcome</Label><Title>A complex learning system,<br /> <em>made easy to enter.</em></Title><p className="ql-intro">The final landing page gives Quillo a clearer position, a stronger trust story, and one journey from first recognition to first path.</p>
  <div className="ql-results">{[["Clear position", "A reliable route through unfamiliar territory."], ["Understandable product", "Three capabilities. One continuous loop."], ["Visible credibility", "Source quality at the heart of the promise."], ["Consistent action", "One invitation from the hero to the close."]].map(([label, title]) => <Reveal key={label}><span className="ql-eyebrow">{label}</span><h3>{title}</h3></Reveal>)}</div>
  <Reveal className="ql-takeaway"><span className="ql-eyebrow">THE FOUNDER TAKEAWAY</span><blockquote>When information is everywhere,<br /><em>direction becomes the value.</em></blockquote><p>Quillo’s page makes the path, the evidence, and the next step easy to understand.</p></Reveal>
</section>; }

export function QuilloStory() { return <article className="ql-story"><nav className="ql-chapters" aria-label="Case-study chapters"><a href="#snapshot">Overview</a><a href="#strategy">Strategy</a><a href="#experience">Experience</a><a href="#outcome">Outcome</a></nav><Snapshot /><Challenge /><Strategy /><Positioning /><Journey /><Opening /><LearningLoop /><LandingPageProof /><VisualDirection /><Objections /><Conversion /><Outcome /><section className="ql-outro ql-section" id="case-outro"><div className="ag-wrap"><p className="ag-label">(A powerful product deserves a clear story.)</p><Title>Let’s make the<br /> <em>value obvious.</em></Title><a className="ag-button" href={bookingUrl} target="_blank" rel="noopener noreferrer" data-analytics-location="quillo_outro">Book a call <Arrow /></a><p className="ql-note">30 minutes to talk through your product and page.</p></div></section></article>; }
