"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const formatNumber = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function CountUp({
  value,
  prefix = "",
  startValue = 0,
  durationMs = 1800,
}: {
  value: number;
  prefix?: string;
  startValue?: number;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);
  const reduce = useReducedMotion();
  const finished = useRef(false);
  const finalLabel = `${prefix}${formatNumber.format(value)}`;

  useEffect(() => {
    if (finished.current || reduce || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(value);
      return;
    }
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    setCurrent(startValue);
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrent(progress === 1 ? value : Math.floor(startValue + (value - startValue) * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
        else finished.current = true;
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value, startValue, durationMs, reduce]);

  return (
    <span className="ag-count" ref={ref}>
      <span className="ag-count-final" aria-hidden="true">{finalLabel}</span>
      <span className="ag-count-current" aria-hidden="true">{prefix}{formatNumber.format(current)}</span>
      <span className="ag-sr-only">{finalLabel}</span>
    </span>
  );
}
