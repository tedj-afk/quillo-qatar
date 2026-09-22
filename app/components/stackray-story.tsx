"use client";

import * as m from "motion/react-m";

import { ResponsiveImage } from "@/app/components/responsive-image";
import { imageProps } from "@/lib/image-props";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { Header } from "./agero-chrome";
import { bookingUrl } from "@/lib/booking";
import { captureLandingEvent } from "@/lib/analytics";

const liveUrl = "https://www.stackray.xyz/";
const ease = [0.22, 1, 0.36, 1] as const;
const shots = [
  {label:"First impression",image:"hero.png",caption:"One clear promise before the product details."},
  {label:"The evidence",image:"evidence.png",caption:"A receipt behind every claim. Something you can inspect."},
  {label:"Built-in trust",image:"security.png",caption:"Read-only access, clear boundaries, and control."},
  {label:"One next step",image:"waitlist.png",caption:"One destination: a place on the private-beta waitlist."},
];
const flow = [
  ["Promise","“See your stack in two minutes.”",0],
  ["Recognition","“Yep, we probably use some of these tools.”",0],
  ["Proof of opportunity","Savings signals grounded in billing evidence.",1],
  ["Understanding","Connect → Scan → Review → Cancel",1],
  ["Specific problems","Duplicates · Forgotten trials · Price hikes · Overlap",1],
  ["Evidence","The X-rayed receipt",1],
  ["Risk reduction","Read-only · Secure · Delete anytime",2],
  ["Conversion","Join the waitlist",3],
] as const;
const capabilities=["Scan receipts","Detect subscriptions","Recognize price changes","Identify duplicate tools","Find expired / forgotten trials","Surface unused accounts","Provide evidence","Eventually help cancel"];
const trust=[
  ["Read-only","OAuth access","eye"], ["No card","Needed today","check"],
  ["Server-side","Tokens stay off browser","layout"], ["No selling","Of customer data","globe"],
  ["Delete","Access anytime","minus"], ["Evidence","Before action","check"],
];
const delivery=["Responsive production build","Mobile-first interactions","Reduced-motion support","Live waitlist backend","Position-in-line logic","Confirmation emails","Founder alerts","Admin invite controls"];
const palette=[['Ivory','#FBF7F0'],['Charcoal','#1C1B19'],['Ember','#FF5C35'],['Cobalt','#2F6BFF'],['Mint','#12B76A'],['Amber','#FFB020'],['Coral','#FF4D6D']];

function Arrow({down=false}:{down?:boolean}) {return <ResponsiveImage className={`sr-arrow${down?" sr-arrow-down":""}`} src="/agero/arrow.svg" alt=""/>;}
function Reveal({children,className=""}:{children:ReactNode;className?:string}) {
  const reduce=useReducedMotion();
  return <m.div className={className} initial={reduce?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.7,ease}}>{children}</m.div>;
}
function Label({number,children}:{number:string;children:ReactNode}) {return <p className="sr-label"><span>{number}</span> / {children}</p>;}
function Title({children}:{children:ReactNode}) {return <Reveal><h2 className="sr-title">{children}</h2></Reveal>;}
function Booking({location}:{location:string}) {return <a className="ag-button" href={bookingUrl} target="_blank" rel="noopener noreferrer" data-analytics-location={location}>Book a call <Arrow/></a>;}
function Frame({index,className=""}:{index:number;className?:string}) {return <div className={`sr-screen ${className}`}><ResponsiveImage src={`/stackray/${shots[index].image}`} sizes="(max-width: 700px) calc(100vw - 40px), 800px" alt={`Stackray live website: ${shots[index].label}`} loading="lazy"/></div>;}

function Walkthrough() {
  const [active,setActive]=useState(0);
  const [playing,setPlaying]=useState(false);
  const refs=useRef<(HTMLButtonElement|null)[]>([]);
  const reduce=useReducedMotion();
  useEffect(()=>{
    if(!playing)return;
    const timer=window.setTimeout(()=>{
      if(active===shots.length-1){setPlaying(false);captureLandingEvent("case study walkthrough playback",{location:"stackray_hero",playing:false,reason:"completed"});}
      else setActive(active+1);
    },4000);
    return()=>window.clearTimeout(timer);
  },[playing,active]);
  function select(index:number,inputMethod:"keyboard"|"pointer") {
    if(playing) captureLandingEvent("case study walkthrough playback",{location:"stackray_hero",playing:false,reason:"selection",input_method:inputMethod});
    setPlaying(false);
    if(index===active)return;
    setActive(index);
    captureLandingEvent("case study walkthrough selected",{location:"stackray_hero",step:index+1,label:shots[index].label,input_method:inputMethod});
  }
  return <div className="sr-walkthrough">
    <div className="sr-walkthrough-top"><span>STACKRAY / THE LIVE EXPERIENCE</span><a href={liveUrl} target="_blank" rel="noopener noreferrer" data-analytics-location="stackray_walkthrough">Visit live site <Arrow/></a></div>
    <div className="sr-walkthrough-stage" role="tabpanel" id="sr-walkthrough-panel" aria-labelledby={`sr-walkthrough-tab-${active}`}>
      {shots.map((shot,i)=><m.img key={shot.image} {...imageProps(`/stackray/${shot.image}`, "(max-width: 700px) calc(100vw - 40px), 1100px")} alt={i===active?`Stackray website — ${shot.label}`:""} aria-hidden={i!==active} initial={false} animate={{opacity:i===active?1:0,scale:i===active?1:1.015}} transition={{duration:reduce?0:.5,ease}} loading={i===0?"eager":"lazy"} />)}
    </div>
    <div className="sr-walkthrough-bottom"><div className="sr-shot-tabs" role="tablist" aria-label="Walk through the Stackray website">{shots.map((shot,i)=><button key={shot.label} ref={el=>{refs.current[i]=el;}} role="tab" id={`sr-walkthrough-tab-${i}`} aria-selected={active===i} aria-controls="sr-walkthrough-panel" tabIndex={active===i?0:-1} onClick={event=>select(i,event.detail===0?"keyboard":"pointer")} onKeyDown={e=>{let next=i;if(e.key==="ArrowRight")next=(i+1)%shots.length;else if(e.key==="ArrowLeft")next=(i+shots.length-1)%shots.length;else if(e.key==="Home")next=0;else if(e.key==="End")next=shots.length-1;else return;e.preventDefault();select(next,"keyboard");refs.current[next]?.focus();}}><span>0{i+1}</span>{shot.label}</button>)}</div><button className="sr-play" onClick={event=>{if(!playing&&active===shots.length-1)setActive(0);setPlaying(!playing);captureLandingEvent("case study walkthrough playback",{location:"stackray_hero",playing:!playing,reason:"toggle",input_method:event.detail===0?"keyboard":"pointer"});}} aria-pressed={playing}>{playing?"Pause walkthrough":"Play walkthrough"}<Arrow/></button></div>
    <p className="sr-shot-caption" aria-live={playing?"off":"polite"}>{shots[active].caption}</p>
  </div>;
}

export function StackrayHero() {
  const reduce=useReducedMotion();
  return <div className="sr-opening"><Header homePath="/"/>
    <section className="sr-hero ag-wrap" id="project" aria-labelledby="case-title">
      <p className="ag-label">(Stackray / Case study)</p>
      <m.h1 id="case-title" initial={reduce?false:{opacity:0,y:20,filter:"blur(6px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:.85,ease}}>Making invisible<br/>SaaS waste <em>obvious.</em><ResponsiveImage src="/agero/stackray-desktop.png" sizes="(max-width: 700px) 64px, 108px" loading="eager" alt="Stackray landing page"/></m.h1>
      <Reveal><p className="sr-hero-intro">Turning an invisible SaaS spending problem into a product you understand in seconds.</p><div className="sr-hero-scope">Strategy <span>·</span> Positioning <span>·</span> Messaging <span>·</span> UX/UI <span>·</span> Development</div></Reveal>
    </section>
    <Reveal className="sr-hero-viewer ag-wrap"><Walkthrough/></Reveal>
  </div>;
}

function Snapshot() {return <section className="sr-section ag-wrap" id="snapshot">
  <Label number="01">Project snapshot</Label><Title>A marketing page<br/>with <em>one job.</em></Title>
  <div className="sr-snapshot-grid"><Reveal className="sr-position-card"><span className="sr-eyebrow">THE POSITIONING</span><h3>“The financial X-ray<br/>for your SaaS stack.”</h3><p>Scan Gmail for SaaS subscriptions, surface waste, and cancel the junk — evidence first.</p><a href={liveUrl} target="_blank" rel="noopener noreferrer" data-analytics-location="stackray_snapshot">stackray.xyz <Arrow/></a></Reveal>
  <dl className="sr-facts">{[["Product","SaaS spend intelligence"],["Stage","Pre-launch / Private beta"],["Primary goal","Build demand + capture qualified waitlist signups"],["Core action","Join the waitlist"],["Access model","Read-only OAuth"],["Charge today","$0"]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div>
  <Reveal><p className="sr-statement">Stackray wasn’t trying to sell software yet.<br/><span>It needed to sell the problem, the insight, and the promise.</span></p></Reveal>
</section>;}
function Trail({label,items,accent=false}:{label:string;items:string[];accent?:boolean}) {return <div className={`sr-trail${accent?" sr-trail-accent":""}`}><p className="sr-eyebrow">{label}</p><ol>{items.map((item,i)=><li key={item}><span>{item}</span>{i<items.length-1&&<Arrow/>}</li>)}</ol></div>;}
function Problem() {return <section className="sr-section sr-problem ag-wrap" id="problem">
  <Label number="02">The business problem</Label><Title>SaaS waste is invisible<br/><span>until the charge hits.</span></Title>
  <div className="sr-two-col sr-problem-copy"><p>Companies accumulate subscriptions across Gmail receipts, trials, employee accounts, price increases and forgotten tools.</p><p><strong>Stackray could find those leaks.</strong><br/>But explaining that capability introduced another problem.</p></div>
  <Reveal className="sr-question"><p>How do you make something happening quietly in someone’s inbox feel tangible enough that they’ll give you access to it?</p></Reveal>
  <div className="sr-trails"><Trail label="Before Stackray" items={["Inbox","Receipts","Renewals","Forgotten subscriptions","$$$"]}/><Trail label="What Stackray sees" items={["Inbox","Evidence","Findings","Actions"]} accent/></div>
</section>;}
function Positioning() {return <section className="sr-dark sr-positioning" id="positioning"><div className="ag-wrap sr-section">
  <Label number="03">The positioning challenge</Label><Title>The product did a lot.<br/><span>The website needed to say one thing.</span></Title>
  <p className="sr-body-intro">Internally, Stackray can:</p><ul className="sr-capabilities">{capabilities.map(item=><li key={item}>{item}</li>)}</ul>
  <p className="sr-muted-copy">But dumping all of that into the hero would kill the page.</p><Reveal className="sr-mental-model"><span className="sr-eyebrow">FIND THE SIMPLEST MENTAL MODEL FOR THE ENTIRE PRODUCT</span><h3>The financial X-ray<br/>for your SaaS stack.</h3></Reveal>
  <div className="sr-position-explained">{[["Financial","Immediately establishes the domain."],["X-ray","Communicates scanning something normally invisible."],["Your SaaS stack","Clearly defines what is being examined."]].map(([term,description],i)=><div key={term}><span>0{i+1}</span><h4>{term}</h4><p>{description}</p></div>)}</div>
</div></section>;}
function Evidence() {return <section className="sr-section ag-wrap" id="evidence">
  <Label number="04">The strategic insight</Label><Title>Receipts,<br/><em>not guesses.</em></Title>
  <div className="sr-evidence-grid"><div className="sr-prose"><p>For this product, trust is everything. Stackray is asking someone to connect Gmail.</p><p>Therefore the website can’t just shout <span className="sr-hype">“SAVE THOUSANDS!!!”</span> That would immediately feel scammy.</p><p>Instead, the product was positioned around <strong>evidence.</strong></p><h3>Every finding needed<br/>to feel inspectable.</h3><ul className="sr-evidence-tags">{["Dates","Charges","Vendors","Receipts","Evidence"].map(t=><li key={t}>{t}</li>)}</ul></div>
  <Reveal className="sr-receipt"><ResponsiveImage src="/stackray/receipt.png" alt="Live Stackray receipt showing the vendor, plan, amount, cadence, next charge and status" loading="lazy"/><p>A financial claim should come<br/>with the receipt attached.</p><small>Interface example from the live website</small></Reveal></div>
  <div className="sr-influence"><p>And this influenced everything:</p><Trail label="The evidence runs through the whole experience" items={["Product messaging","Visual language","Interaction design","Security messaging","Conversion flow"]}/></div>
</section>;}
function Architecture() {
  const [active,setActive]=useState(0);
  const image=flow[active][2];
  return <section className="sr-section sr-architecture ag-wrap" id="architecture"><Label number="05">Conversion architecture</Label><Title>One story.<br/><em>One action.</em></Title>
    <div className="sr-architecture-grid"><ol className="sr-flow-list">{flow.map(([title,detail],i)=><li key={title}><button onClick={event=>{if(i===active)return;setActive(i);captureLandingEvent("case study story step selected",{location:"stackray_architecture",step:i+1,label:title,input_method:event.detail===0?"keyboard":"pointer"});}} aria-pressed={active===i} ><span>0{i+1}</span><span><strong>{title}</strong><small>{detail}</small></span><Arrow/></button>{active===i&&<div className="sr-flow-mobile-preview"><Frame index={image}/><p>{shots[image].caption}</p></div>}</li>)}</ol>
      <div className="sr-flow-preview" id="sr-flow-preview"><div className="sr-preview-label"><span>0{active+1} / THE PAGE STORY</span><span>{flow[active][0]}</span></div><Frame index={image}/><p>{shots[image].caption}</p><a href={liveUrl} target="_blank" rel="noopener noreferrer" data-analytics-location="stackray_architecture">Explore the live page <Arrow/></a></div>
    </div><div className="sr-destination"><strong>Every primary CTA</strong><Arrow/><span>Join the waitlist</span><small>ONE DESTINATION</small></div>
  </section>;
}
function Messaging() {return <section className="sr-section ag-wrap" id="messaging"><Label number="06">Messaging</Label><Title>Copy was doing<br/><em>conversion work.</em><br/><span>Not decoration.</span></Title>
  <div className="sr-message-grid"><Reveal className="sr-message-card"><span className="sr-card-number">01</span><h3>Reduce the<br/>Gmail fear.</h3><p className="sr-before">Instead of: “Connect your Gmail account.”</p><p className="sr-message-focus">Read-only OAuth<br/>Private beta<br/>$0 today</p><p>Because the question running through the user’s head is: <strong>“What exactly am I giving these people?”</strong></p></Reveal>
  <Reveal className="sr-message-card"><span className="sr-card-number">02</span><h3>Make the pain<br/>recognizable.</h3><p className="sr-before">Instead of: “Save money on software.”</p><p className="sr-message-focus">Duplicate tools<br/>Price hikes<br/>Forgotten trials<br/>Overlapping apps</p><p>Specificity makes the problem recognizable.</p></Reveal>
  <Reveal className="sr-message-card"><span className="sr-card-number">03</span><h3>Protect<br/>credibility.</h3><p className="sr-before">The unused-seat rule</p><p className="sr-message-focus">An unused seat isn’t automatically labeled as savings.</p><p>That’s product integrity translated into marketing.</p></Reveal></div>
</section>;}
function Trust() {return <section className="sr-dark sr-trust" id="trust"><div className="ag-wrap sr-section"><Label number="07">Trust by design</Label><Title>The biggest conversion<br/>objection was not price.<br/><em>It was access.</em></Title>
  <div className="sr-trust-grid">{trust.map(([title,body],i)=><Reveal className="sr-trust-item" key={title}><span className="sr-trust-index">0{i+1}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div><p className="sr-dark-note">Trust language was part of the conversion architecture — <strong>not a footer afterthought.</strong></p>
</div></section>;}
function VisualDirection() {return <section className="sr-section ag-wrap" id="visual-direction"><Label number="08">Visual direction</Label><Title>A financial report<br/>someone has already<br/><em>investigated for you.</em></Title>
  <div className="sr-visual-grid"><div><p className="sr-eyebrow">THE PRODUCT PALETTE</p><div className="sr-swatches">{palette.map(([name,hex])=><div key={name}><span style={{backgroundColor:hex}}/><strong>{name}</strong><small>{hex}</small></div>)}</div><p className="sr-palette-note">Warm documents. Clear evidence.<br/>A little investigative energy.</p></div><dl className="sr-visual-notes">{[["Ivory canvas","Feels closer to documents and receipts than generic fintech."],["Charcoal bands","Creates analytical moments and clear rhythm."],["Ember orange","Acts like the marker/highlighter in an investigation."],["Doodles + receipts","Make the evidence metaphor visible."],["Scan-line motion","Reinforces the X-ray idea without becoming a gimmick."]].map(([title,body])=><div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl></div>
</section>;}
function Experience() {return <section className="sr-section sr-experience" id="experience"><div className="ag-wrap"><Label number="09">The experience</Label><Title>The strategy shows up<br/><em>in the interface.</em></Title></div><Reveal className="sr-experience-stage"><ResponsiveImage className="sr-interface-hero" src="/stackray/hero.png" alt="The live Stackray homepage: Find where your SaaS money is leaking" loading="lazy"/><ResponsiveImage className="sr-interface-receipt" src="/stackray/receipt.png" alt="Inspectable billing evidence in the Stackray interface" loading="lazy"/><div className="sr-interface-caption"><span>01 / CLARITY</span><strong>The promise earns attention.<br/>The evidence earns trust.</strong></div></Reveal><div className="ag-wrap sr-interface-details"><div><span>02 / EVIDENCE</span><h3>Something you can inspect.</h3><Frame index={1}/></div><div><span>03 / CONFIDENCE</span><h3>Boundaries made visible.</h3><Frame index={2}/></div></div></section>;}
function Funnel() {return <section className="sr-section ag-wrap" id="funnel"><Label number="10">The funnel</Label><Title>Every road leads<br/><em>to one action.</em></Title><div className="sr-two-col"><p>There was no reason to create competing CTAs like:</p><p>The business needed <strong>one outcome.</strong></p></div><div className="sr-competing">{["Explore features","Start free trial","Book demo","View pricing","Contact sales"].map(t=><span key={t}>{t}</span>)}</div>
  <Reveal className="sr-funnel-map"><div className="sr-funnel-entry">{["Hero CTA","Pricing CTA","FAQ CTA","Footer CTA","Sticky CTA"].map(t=><span key={t}>{t}</span>)}</div><Arrow down/><div className="sr-funnel-goal"><h3>Join the waitlist.</h3><span>One clear destination</span></div></Reveal>
  <div className="sr-funnel-screen"><Frame index={3}/></div><Trail label="What happens after the click" items={["Form · email","Backend · save","Confirm · user","Alert · founder","Admin · invite"]}/>
</section>;}
function Delivery() {return <section className="sr-dark sr-delivery" id="delivery"><div className="ag-wrap sr-section"><Label number="11">Delivery</Label><Title>We didn’t stop<br/><em>at Figma.</em></Title><ul className="sr-delivery-list">{delivery.map((item,i)=><li key={item}><span>0{i+1}</span><strong>{item}</strong><ResponsiveImage src="/agero/check.svg" alt=""/></li>)}</ul><p className="sr-dark-note">The interface wasn’t handed off and forgotten.<br/><strong>We shipped the system collecting the leads.</strong></p></div></section>;}
function Outcomes() {return <section className="sr-section ag-wrap" id="outcome"><Label number="12">What shipped</Label><Title>No invented<br/><em>conversion numbers.</em></Title><p className="sr-outcome-intro">Just the system that is live today.</p><Trail label="What shipped" items={["Positioning","Landing page","Waitlist","Confirmation","Admin","Invite"]}/><div className="sr-measure"><span className="sr-eyebrow">WHAT WE’LL MEASURE NEXT</span><ul>{["Waitlist conversion","CTA engagement","Visitor → signup","Traffic","Invites sent"].map(t=><li key={t}>{t}</li>)}</ul><p>Stackray went from a complex product idea to a proposition someone can understand before finishing the hero.</p></div></section>;}
function Takeaway() {return <section className="sr-section sr-takeaway" id="takeaway"><div className="ag-wrap"><Label number="13">Founder takeaway</Label><Title>Your product probably<br/>isn’t too complicated.</Title><Reveal><p className="sr-takeaway-answer">Your website may just be explaining it from the inside out.</p></Reveal><div className="sr-takeaway-bottom"><p>Stackray had Gmail scanning, subscription detection, security, cancellation, evidence systems and multiple finding types.<br/><br/>The website didn’t need to explain all of them at once. It needed to make one idea obvious:</p><blockquote>Connect your inbox.<br/>See where your SaaS<br/>money is leaking.</blockquote></div></div></section>;}
function Outro() {return <section className="sr-section sr-outro ag-wrap" id="case-outro"><p className="ag-label">(Your next product starts here)</p><Title>Your next idea.<br/><em>Let’s shape it.</em></Title><Booking location="stackray_outro"/><p>A useful first conversation.<br/>30 minutes to explore your product and next steps.</p></section>;}

export function StackrayStory() {return <div className="sr-story"><nav className="sr-chapters" aria-label="Case-study chapters"><a href="#snapshot">Overview</a><a href="#positioning">Strategy</a><a href="#experience">Experience</a><a href="#delivery">Delivery</a><a href="#outcome">Outcome</a></nav><Snapshot/><Problem/><Positioning/><Evidence/><Architecture/><Messaging/><Trust/><VisualDirection/><Experience/><Funnel/><Delivery/><Outcomes/><Takeaway/><Outro/></div>;}
