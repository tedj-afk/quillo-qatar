"use client";

import * as m from "motion/react-m";
import { useScroll, useSpring, useTransform, useVelocity, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";

function HeadlineStrip({ children, index, progress, velocity }: {
  children: ReactNode; index: number; progress: MotionValue<number>; velocity: MotionValue<number>;
}) {
  const x = useTransform(progress, [0, 1], ["0%", index % 2 ? "9%" : "-7%"]);
  const rotate = useTransform(progress, [0, 1], [0, index % 2 ? 3 : -3]);
  const skewX = useTransform(velocity, [-2200, 0, 2200], [-4, 0, 4]);
  const scaleY = useTransform(velocity, [-2200, 0, 2200], [1.07, 1, .94]);
  return <m.span className={`q-hero-type-row q-scroll-type${index === 2 ? " q-hero-launch-row" : ""}`} style={{ x, rotate, skewX, scaleY }}>{children}</m.span>;
}

export function ScrollHeadline({ children }: { children: ReactNode[] }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress, scrollY } = useScroll({ target: ref, offset: ["start 18%", "end start"] });
  const velocity = useVelocity(scrollY);
  const elasticVelocity = useSpring(velocity, { stiffness: 100, damping: 22, mass: .5 });
  return <h1 ref={ref} id="hero-title" aria-label="Your digital product, from idea to launch.">
    {children.map((line, index) => <HeadlineStrip key={index} index={index} progress={scrollYProgress} velocity={elasticVelocity}>{line}</HeadlineStrip>)}
  </h1>;
}

/** The art travels separately from the sheet holding it. */
export function ProjectDepth({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 8%"] });
  const y = useTransform(scrollYProgress, [0, .8, 1], [95, 8, -12]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
  return <div ref={ref} className="q-project-layer"><m.div className="q-project-float" style={{ y, rotate }}>{children}</m.div></div>;
}

/** A drawn route catches up to the four pieces as they settle into place. */
export function ProcessAssembly({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const position = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const rotation = useTransform(scrollYProgress, [0, 1], [-90, 270]);
  return <div className="q-process-assembly" ref={ref}>
    <div className="q-process-route q-process-route-horizontal" aria-hidden="true">
      <svg viewBox="0 0 1000 40" preserveAspectRatio="none"><path d="M0 20 H1000" /><m.path d="M0 20 H1000" className="q-route-ink" style={{ pathLength: scrollYProgress }} /></svg>
      <m.span className="q-route-star" style={{ left: position, rotate: rotation }}>✳</m.span>
    </div>
    <div className="q-process-route q-process-route-vertical" aria-hidden="true">
      <svg viewBox="0 0 40 1000" preserveAspectRatio="none"><path d="M20 0 V1000" /><m.path d="M20 0 V1000" className="q-route-ink" style={{ pathLength: scrollYProgress }} /></svg>
      <m.span className="q-route-star" style={{ top: position, rotate: rotation }}>✳</m.span>
    </div>
    {children}
  </div>;
}

/** Two oversized sheets slide together behind the final invitation. */
export function ContactScene({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 25%"] });
  const leftX = useTransform(scrollYProgress, [0, 1], ["-105%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["105%", "0%"]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], [-14, 0]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [14, 0]);
  return <section ref={ref} id="contact" className="q-contact q-contact-scene">
    <div className="q-contact-sheets" aria-hidden="true">
      <m.span style={{ x: leftX, rotate: leftRotate }} />
      <m.span style={{ x: rightX, rotate: rightRotate }} />
    </div>
    {children}
  </section>;
}

export function ContactHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 35%"] });
  const firstX = useTransform(scrollYProgress, [0, 1], ["-18%", "0%"]);
  const secondX = useTransform(scrollYProgress, [0, 1], ["22%", "0%"]);
  const turn = useTransform(scrollYProgress, [0, 1], [-7, 0]);
  return <h2 ref={ref} className="q-contact-headline">
    <m.span className="q-contact-type" style={{ x: firstX, rotate: turn }}>Let’s make</m.span>
    <m.span className="q-contact-outline q-contact-type" style={{ x: secondX }}>it happen.</m.span>
  </h2>;
}
