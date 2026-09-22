"use client";

import * as m from "motion/react-m";

import { ResponsiveImage } from "@/app/components/responsive-image";

import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { projects } from "@/data/projects";
import { bookingUrl } from "@/lib/booking";
import { captureLandingEvent } from "@/lib/analytics";
import { Header } from "./agero-chrome";

const ease = [0.22, 1, 0.36, 1] as const;
const study = projects.find(project => project.slug === "helpmegrow")!.caseStudy;
const workflows = [
  { label: "Understand", title: "Know what is growing.", image: "product-understand.png", width: 1396, height: 1190, alt: "HelpMeGrow social media analytics with a performance line graph", body: "Bring performance into view so a store owner can see which content is getting attention.", outcome: "A clearer view of what is working." },
  { label: "Answer", title: "Every conversation in one place.", image: "product-answer.png", width: 1625, height: 2042, alt: "HelpMeGrow unified inbox with customer messages on a phone and the headline All messages in one place", body: "Make customer conversations easier to follow without moving between separate social channels.", outcome: "Fewer conversations to lose track of." },
  { label: "Engage", title: "Keep up with comments.", image: "product-engage.png", width: 2448, height: 1026, alt: "HelpMeGrow unified comments inbox showing Facebook comments beside the headline All your comments in the same page", body: "Treat comments as part of the customer conversation, with a shared place to see and respond to them.", outcome: "Respond while interest is highest." },
  { label: "Plan", title: "Build a visible content rhythm.", image: "product-plan.png", width: 710, height: 561, alt: "HelpMeGrow scheduler in week view with color-coded events arranged across a seven-day calendar", body: "Turn scattered posting into a visible schedule. See what is planned and keep content moving across channels.", outcome: "A more consistent content operation." },
];

function Arrow() { return <ResponsiveImage className="hmg-arrow" src="/agero/arrow.svg" alt="" />; }
function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <m.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.75, ease }}>{children}</m.div>;
}
function Label({ number, children }: { number: string; children: ReactNode }) { return <p className="hmg-label"><span>{number}</span> / {children}</p>; }
function Title({ children }: { children: ReactNode }) { return <Reveal><h2 className="hmg-title">{children}</h2></Reveal>; }
function Screen({ image, alt, width, height, eager = false }: { image: string; alt: string; width: number; height: number; eager?: boolean }) {
  return <ResponsiveImage src={`/helpmegrow/${image.includes(".") ? image : `${image}.jpg`}`} sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1200px) 70vw, 960px" alt={alt} width={width} height={height} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} />;
}

export function HelpMeGrowHero() {
  const reduce = useReducedMotion();
  return <div className="hmg-opening"><Header homePath="/" />
    <section className="hmg-hero ag-wrap" id="project" aria-labelledby="case-title">
      <p className="ag-label">(HelpMeGrow / SaaS landing page)</p>
      <m.h1 id="case-title" initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.85, ease }}>Making an all-in-one{" "}<br />platform <em>feel simple.</em></m.h1>
      <Reveal><p className="hmg-hero-intro">A landing page designed to turn a broad feature set into one focused product story for e-commerce owners.</p><div className="hmg-scope"><span>Positioning</span><span>Landing page</span><span>UX/UI</span></div></Reveal>
    </section>
    <Reveal className="hmg-hero-showcase ag-wrap">
      <div className="hmg-showcase-top"><span>HELPMEGROW / THE LANDING PAGE</span><span>Designed for e-commerce</span></div>
      <div className="hmg-showcase-grid">
        <div className="hmg-hero-screen"><Screen image="hero" alt="HelpMeGrow landing page design: the social-management promise, email signup, and product dashboard" width={435} height={330} eager /></div>
        <div className="hmg-showcase-copy"><span className="hmg-eyebrow">ONE CONNECTED STORY</span><p>Less scattered work.{" "}<br /><em>More room to grow.</em></p><ol>{[["Know", "See what is happening."], ["Respond", "Stay close to customers."], ["Plan", "Keep content moving."]].map(([title, body], i) => <li key={title}><span>0{i + 1}</span><div><strong>{title}</strong><small>{body}</small></div></li>)}</ol></div>
      </div>
      <div className="hmg-showcase-bottom"><span>Product interface from the project design</span><a href="#snapshot" data-analytics-location="helpmegrow_hero">Explore the story <Arrow /></a></div>
    </Reveal>
  </div>;
}

function Snapshot() { return <section className="hmg-section ag-wrap" id="snapshot">
  <Label number="01">The project</Label><Title>One product.{" "}<br /><em>Too many things to explain.</em></Title>
  <div className="hmg-snapshot-grid"><div className="hmg-prose"><p>HelpMeGrow combines analytics, scheduling, messages, comments, and content distribution.</p><p>The breadth was valuable. But it created the central communication challenge: how do we present an all-in-one platform without making it feel complicated?</p></div>
    <dl className="hmg-facts">{[["Product", "Social management SaaS"], ["Audience", "E-commerce founders & small teams"], ["Deliverable", "SaaS landing page"], ["Conversion goal", "Join early access"]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
  </div><Reveal className="hmg-feature-strip"><span>THE PRODUCT BREADTH</span><ul>{["Analytics", "Messages", "Comments", "Scheduling", "Distribution"].map(item => <li key={item}>{item}</li>)}</ul></Reveal>
</section>; }

function Challenge() { return <section className="hmg-dark" id="challenge"><div className="hmg-section ag-wrap">
  <Label number="02">The business challenge</Label><Title>The product had features.{" "}<br /><span>It needed a reason to care.</span></Title>
  <p className="hmg-body-intro">A list of capabilities explains what the product does. It does not explain why an overwhelmed store owner should switch.</p>
  <Reveal className="hmg-insight"><span className="hmg-eyebrow">THE SHIFT THAT MATTERED</span><p>People buy fewer missed messages, more consistent posting, and a clearer view of what is working.</p></Reveal>
</div></section>; }

function Audience() { return <section className="hmg-section ag-wrap" id="audience">
  <Label number="03">The audience reality</Label><Title>Built for the person{" "}<br /><em>doing everything.</em></Title>
  <div className="hmg-two-col"><p>An e-commerce founder or small team is balancing products, orders, customers, content, and growth.</p><p>Their problem is not a shortage of dashboards.{" "}<br /><strong>Their work is scattered.</strong></p></div>
  <div className="hmg-audience-grid">{[{ label: "Performance", job: "What is working?", shot: { ...workflows[0], image: "audience-performance", width: 1396, height: 1190, alt: "HelpMeGrow social media analytics with a performance line graph" } }, { label: "Conversations", job: "Who needs a reply?", shot: { ...workflows[1], image: "audience-conversations.png", width: 2664, height: 2042, alt: "HelpMeGrow social media analytics and unified inbox showing customer messages in one place" } }, { label: "Planning", job: "What goes out next?", shot: { ...workflows[3], image: "audience-planning.png", width: 1223, height: 781, alt: "HelpMeGrow social media scheduler with a weekly calendar of planned content" } }].map(({ label, job, shot }, i) => <Reveal className="hmg-audience-card" key={label}><span className="hmg-eyebrow">0{i + 1} / {label}</span><h3>{job}</h3><div className="hmg-audience-screen"><Screen {...shot} /></div></Reveal>)}</div>
  <Reveal><p className="hmg-statement">HelpMeGrow needed to feel like <em>relief.</em>{" "}<br /><span>One less system to manage.</span></p></Reveal>
</section>; }

function Strategy() { return <section className="hmg-dark" id="strategy"><div className="hmg-section ag-wrap">
  <Label number="04">The strategic angle</Label><Title>We stopped selling{" "}<br /><span>more features.</span></Title>
  <p className="hmg-body-intro">We organized the product around a simpler narrative:</p><Reveal><p className="hmg-big-idea">One place to{" "}<br /><em>see, answer, and plan.</em></p></Reveal>
  <div className="hmg-strategy-grid">{[["Know", "See what is happening.", "Analytics brings performance into view."], ["Respond", "Stay close to customers.", "Messages and comments become one connected job."], ["Plan", "Keep content moving.", "Scheduling gives the work a visible rhythm."]].map(([title, benefit, detail], i) => <Reveal key={title}><span className="hmg-eyebrow">0{i + 1}</span><h3>{title}</h3><p>{benefit}</p><small>{detail}</small></Reveal>)}</div>
</div></section>; }

function Journey() { return <section className="hmg-section ag-wrap" id="journey">
  <Label number="05">The page journey</Label><Title>A page structured around{" "}<br /><em>increasing confidence.</em></Title>
  <ol className="hmg-journey">{study.pageStructure.map(step => <li key={step.label}><span>{step.label}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}</ol>
  <p className="hmg-section-note">Each section answers the question that makes the next one worth reading.</p>
</section>; }

function AboveFold() { return <section className="hmg-section hmg-fold ag-wrap" id="experience">
  <Label number="06">Above the fold</Label><Title>Understandable{" "}<br /><em>at first glance.</em></Title>
  <div className="hmg-fold-grid"><Reveal className="hmg-fold-screen"><Screen image="hero" alt="HelpMeGrow hero establishing the e-commerce audience, product category, signup, and dashboard" width={435} height={330} /><span>THE FIRST IMPRESSION</span></Reveal><div className="hmg-prose"><p>The hero establishes the audience, category, and core benefit before asking visitors to interpret the interface.</p><p>The dashboard then turns the promise into tangible proof.</p><ol className="hmg-fold-notes">{[["Audience", "Built for e-commerce owners."], ["Category", "A social-management platform."], ["Product proof", "An interface that makes the promise visible."]].map(([title, body], i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></div></div>
</section>; }

function Outcomes() { return <section className="hmg-section ag-wrap hmg-benefits" id="everyday-work">
  <Label number="07">From features to outcomes</Label><Title>Connected to{" "}<br /><em>everyday work.</em></Title>
  <div className="hmg-benefit-grid">{[["Online visibility", "See which content drives attention.", "Understand where the audience is responding."], ["Customer engagement", "Keep conversations moving.", "Give messages and comments a place in the daily workflow."], ["Sales opportunities", "Respond while interest is highest.", "Make it easier to stay close to potential customers."], ["Brand consistency", "Keep every channel active and on-brand.", "Turn content distribution into a repeatable rhythm."]].map(([label, title, body], i) => <Reveal className="hmg-benefit" key={label}><span className="hmg-eyebrow">0{i + 1} / {label}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div>
</section>; }

function ProductProof() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  function select(index: number, inputMethod: "keyboard" | "pointer") {
    if (index === active) return;
    setActive(index);
    captureLandingEvent("case study walkthrough selected", { location: "helpmegrow_product_proof", step: index + 1, label: workflows[index].label, input_method: inputMethod });
  }
  return <section className="hmg-dark" id="product-proof"><div className="hmg-section ag-wrap">
    <Label number="08">Product proof</Label><Title>Four real workflows.{" "}<br /><em>One connected story.</em></Title>
    <div className="hmg-workflow-tabs" role="tablist" aria-label="HelpMeGrow product workflows">{workflows.map((shot, i) => <button key={shot.label} type="button" role="tab" id={`hmg-workflow-tab-${i}`} aria-controls={`hmg-workflow-panel-${i}`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} ref={el => { refs.current[i] = el; }} onClick={event => select(i, event.detail === 0 ? "keyboard" : "pointer")} onKeyDown={event => {
      let next = i;
      if (event.key === "ArrowRight") next = (i + 1) % workflows.length;
      else if (event.key === "ArrowLeft") next = (i + workflows.length - 1) % workflows.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = workflows.length - 1;
      else return;
      event.preventDefault(); select(next, "keyboard"); refs.current[next]?.focus();
    }}><span>0{i + 1}</span>{shot.label}</button>)}</div>
    {workflows.map((shot, i) => <div key={shot.label} role="tabpanel" id={`hmg-workflow-panel-${i}`} aria-labelledby={`hmg-workflow-tab-${i}`} tabIndex={0} hidden={active !== i} className="hmg-workflow-panel">
      {active === i && <m.div className="hmg-workflow-content" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}><div className="hmg-workflow-screen"><Screen {...shot} /></div><div className="hmg-workflow-copy"><span className="hmg-eyebrow">0{i + 1} / {shot.label}</span><h3>{shot.title}</h3><p>{shot.body}</p><p className="hmg-workflow-outcome">{shot.outcome}</p></div></m.div>}
    </div>)}
    <p className="hmg-proof-note">Interface details from the HelpMeGrow landing page design.</p>
  </div></section>;
}

function Conversion() { return <section className="hmg-section ag-wrap" id="conversion">
  <Label number="09">Conversion</Label><Title>Interest first.{" "}<br /><em>Action at the right moment.</em></Title>
  <div className="hmg-two-col"><p>The email capture appears in the hero for visitors who immediately recognize the need.</p><p>It returns after the product has been explained for those who need more confidence.</p></div>
  <Reveal className="hmg-conversion-map"><div><span className="hmg-eyebrow">READY AT FIRST GLANCE</span><h3>Hero email capture</h3></div><div className="hmg-conversion-goal"><span className="hmg-eyebrow">ONE PRIMARY ACTION</span><strong>Join early access</strong></div><div><span className="hmg-eyebrow">READY AFTER THE STORY</span><h3>Closing email capture</h3></div></Reveal>
  <div className="hmg-conversion-detail"><blockquote>Spend less time managing channels.{" "}<br /><em>Spend more time growing your store.</em></blockquote><figure><Screen image="conversion-early-access.png" alt="HelpMeGrow early-access discount invitation with an email field and free-trial button" width={2052} height={900} /><figcaption>The closing invitation in the landing page design.</figcaption></figure></div>
</section>; }

function NextIteration() { return <section className="hmg-dark hmg-iteration" id="next-iteration"><div className="hmg-section ag-wrap">
  <Label number="10">The next iteration</Label><Title>Sharper proof would{" "}<br /><span>make the story stronger.</span></Title><p className="hmg-body-intro">The next opportunities to strengthen the landing page:</p>
  <ol>{["Replace placeholder copy with specific product value.", "Lead with operational pain rather than “all-in-one.”", "Add integrations near the hero.", "Use testimonials with concrete outcomes.", "Demonstrate the workflow with a short product animation.", "Keep one primary conversion action."].map((item, i) => <li key={item}><span>0{i + 1}</span><p>{item}</p></li>)}</ol>
</div></section>; }

function Outcome() { return <section className="hmg-section ag-wrap" id="outcome">
  <Label number="11">The outcome</Label><Title>A clearer way to introduce{" "}<br /><em>a powerful product.</em></Title><p className="hmg-body-intro">{study.outcome}</p>
  <div className="hmg-result-grid">{[["Clearer positioning", "One understandable promise."], ["Stronger proof", "Real interface moments."], ["Focused path", "From recognition to action."]].map(([label, title]) => <Reveal key={label}><span className="hmg-eyebrow">{label}</span><h3>{title}</h3></Reveal>)}</div>
  <Reveal className="hmg-takeaway"><span className="hmg-eyebrow">THE FOUNDER TAKEAWAY</span><blockquote>{study.takeaway}</blockquote></Reveal>
</section>; }

function Outro() { return <section className="hmg-outro hmg-section" id="case-outro"><div className="ag-wrap"><p className="ag-label">(From the first idea to developer handoff.)</p><Title>Your next idea.{" "}<br /><em>Let’s shape it.</em></Title><a className="ag-button" href={bookingUrl} target="_blank" rel="noopener noreferrer" data-analytics-location="helpmegrow_outro">Book a call <ResponsiveImage className="ag-icon" src="/agero/arrow.svg" alt="" /></a><p className="hmg-outro-note">30 minutes to explore your product, priorities, and next steps.</p></div></section>; }

export function HelpMeGrowStory() { return <article className="hmg-story"><nav className="hmg-chapters" aria-label="Case-study chapters"><a href="#snapshot">Overview</a><a href="#strategy">Strategy</a><a href="#experience">Experience</a><a href="#outcome">Outcome</a></nav><Snapshot /><Challenge /><Audience /><Strategy /><Journey /><AboveFold /><Outcomes /><ProductProof /><Conversion /><NextIteration /><Outcome /><Outro /></article>; }
