"use client";

import * as m from "motion/react-m";
import { animate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionStyle } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** A loose piece of type: drag it, release it, or toss it with the keyboard. */
export function LaunchSticker() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotation = useMotionValue(-3);
  const reduced = useReducedMotion();
  const [played, setPlayed] = useState(false);
  const turn = useRef(0);
  const dragged = useRef(false);
  const controls = useRef<{ stop: () => void }[]>([]);
  const stop = () => { controls.current.forEach(control => control.stop()); controls.current = []; };
  useEffect(() => () => controls.current.forEach(control => control.stop()), []);

  function land() {
    setPlayed(true);
    stop();
    const spring = { type: "spring" as const, stiffness: 260, damping: 12, mass: .8 };
    controls.current = [animate(x, 0, spring), animate(y, 0, spring), animate(rotation, -3, spring)];
  }
  function toss() {
    setPlayed(true);
    if (reduced) return;
    stop();
    const direction = ++turn.current % 2 ? 1 : -1;
    controls.current = [
      animate(x, [0, 22 * direction, -8 * direction, 0], { duration: .8 }),
      animate(y, [0, -65, 5, 0], { duration: .8, times: [0, .35, .82, 1] }),
      animate(rotation, [-3, 14 * direction, -8, -3], { duration: .8 }),
    ];
  }

  return <span className="q-sticker-anchor">
    <span className="q-launch-arrival" data-hero-enter="sticker">
    <m.button type="button" className="q-launch-sticker" aria-label="Toss the next step sticker" title="Drag it or press to give it a toss"
      drag={!reduced} dragMomentum={false} dragElastic={.15} dragConstraints={{ left: -70, right: 70, top: -60, bottom: 45 }}
      style={{ x, y, rotate: rotation }} onPointerDown={() => { dragged.current = false; }}
      onDragStart={() => { dragged.current = true; stop(); }} onDrag={(_, info) => rotation.set(-3 + info.offset.x * .12)} onDragEnd={land}
      onClick={event => { if (event.detail === 0 || !dragged.current) toss(); }}
      whileDrag={{ scale: 1.08, cursor: "grabbing" }}>
      <span className="q-sticker-meta" aria-hidden="true"><span>FIND YOUR NEXT MOVE</span><span>№ 001</span></span>
      <span>next.</span>
      <span className="q-sticker-notch" aria-hidden="true" />
    </m.button>
    </span>
    <span className="q-sticker-hint" data-hero-enter="hint" aria-hidden="true">{played ? "THAT’S THE SPIRIT. ↗" : "GO ON. GIVE IT A TOSS. ↗"}</span>
  </span>;
}

export function ElasticWord({ children }: { children: string }) {
  const reduced = useReducedMotion();
  return <span className="q-elastic-word" data-hero-enter="word" aria-label={children}>{[...children].map((letter, index) => <m.span key={index} aria-hidden="true"
    whileHover={reduced ? {} : { y: -16, rotate: index % 2 ? 12 : -12, scaleY: 1.18 }}
    transition={{ type: "spring", stiffness: 450, damping: 10 }}
    >{letter}</m.span>)}</span>;
}

export function StudioSeal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-45, 135]);
  return <div className="q-studio-seal" ref={ref} data-hero-enter="seal" aria-hidden="true">
    <m.svg viewBox="0 0 160 160" style={{ rotate }}>
      <defs><path id="q-seal-orbit" d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" /></defs>
      <text><textPath href="#q-seal-orbit" textLength="389">SMALL TEAM. BIG AMBITION. ALL THE WAY. </textPath></text>
    </m.svg>
    <span className="q-seal-center">A↗Z</span>
    <span className="q-seal-caption">A LITTLE RESTLESS.<br />VERY MUCH INVOLVED.</span>
  </div>;
}

export function ProjectSheet({ children, index, className }: { children: ReactNode; index: number; className: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 10%"] });
  const rotate = useTransform(scrollYProgress, [0, .6, 1], [index % 2 ? -7 : 7, index % 2 ? 1 : -1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [.88, 1]);
  return <m.article ref={ref} className={`${className} q-project-sheet`}
    style={{ rotate, scale, "--q-sheet-index": index } as MotionStyle}>
    <span className="q-sheet-tab" aria-hidden="true">FILE / 0{index + 1}</span>{children}
  </m.article>;
}

export function ProjectPeeker({ children, href, name, label }: { children: ReactNode; href: string; name: string; label: string }) {
  const [active, setActive] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const x = useSpring(cursorX, { stiffness: 360, damping: 26 });
  const y = useSpring(cursorY, { stiffness: 360, damping: 26 });
  const reduced = useReducedMotion();
  return <a className="q-project-image" href={href} aria-label={label} data-analytics-location="recent_work" data-analytics-label={name}
    onPointerMove={event => { if (event.pointerType !== "mouse" || reduced) return; const box = event.currentTarget.getBoundingClientRect(); cursorX.set(event.clientX - box.left); cursorY.set(event.clientY - box.top); setActive(true); }}
    onPointerLeave={() => setActive(false)} onBlur={() => setActive(false)}>
    {children}
    <m.span className="q-project-peeker" aria-hidden="true" style={{ x, y }} animate={{ opacity: active ? 1 : 0, scale: active ? 1 : .6, rotate: active ? -12 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 19 }}>OPEN<br />THIS ONE<span>↗</span></m.span>
  </a>;
}

export function RegistrationType() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "end 20%"] });
  const separation = useTransform(scrollYProgress, [0, .52, 1], [-60, 0, 60]);
  const opposite = useTransform(separation, value => -value);
  return <div className="q-registration" ref={ref}>
    <span className="q-registration-mark q-registration-mark-a" aria-hidden="true">+</span>
    <span className="q-registration-mark q-registration-mark-b" aria-hidden="true">+</span>
    <h2>Your ambition.<span className="q-registration-word">
      <m.span className="q-ink-layer q-ink-lime" aria-hidden="true" style={{ x: separation, y: opposite }}>Our obsession.</m.span>
      <m.span className="q-ink-layer q-ink-outline" aria-hidden="true" style={{ x: opposite }}>Our obsession.</m.span>
      <span className="q-ink-master">Our obsession<span className="q-about-stop">.</span></span>
    </span></h2>
    <span className="q-registration-caption" aria-hidden="true">DIFFERENT MINDS. / PERFECT REGISTRATION.</span>
  </div>;
}

export function Stamp({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`q-stamp ${className}`} data-reveal="stamp">{children}</span>;
}
