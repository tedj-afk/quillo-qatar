"use client";

import { useEffect, useRef, type ReactNode, type SyntheticEvent, type MouseEvent } from "react";

/** Keep native disclosure semantics, including a working no-JS fallback. */
export function AnimatedDetails({ children, summary, className, open = false, onToggle }: {
  children: ReactNode;
  summary: ReactNode;
  className?: string;
  open?: boolean;
  onToggle?: (event: SyntheticEvent<HTMLDetailsElement>) => void;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const animation = useRef<Animation | null>(null);
  const expanding = useRef(open);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => {
      if (!ref.current || !animation.current) return;
      ref.current.open = expanding.current;
      animation.current.cancel();
      animation.current = null;
      delete ref.current.dataset.animating;
    };
    preference.addEventListener("change", finish);
    return () => { finish(); preference.removeEventListener("change", finish); };
  }, []);

  function toggle(event: MouseEvent<HTMLElement>) {
    const element = ref.current;
    if (!element || !element.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    const next = animation.current ? !expanding.current : !element.open;
    expanding.current = next;
    const start = element.getBoundingClientRect().height;
    animation.current?.cancel();
    element.open = true;
    const styles = getComputedStyle(element);
    const closedHeight = element.querySelector("summary")!.getBoundingClientRect().height
      + parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
    const end = next ? element.getBoundingClientRect().height : closedHeight;
    element.dataset.expanded = String(next);
    element.dataset.animating = "true";
    const current = element.animate([{ height: `${start}px` }, { height: `${end}px` }], {
      duration: 360, easing: "cubic-bezier(.22, 1, .36, 1)",
    });
    animation.current = current;
    current.onfinish = () => {
      element.open = next;
      current.cancel();
      animation.current = null;
      delete element.dataset.animating;
    };
  }

  return <details ref={ref} className={className} open={open} onToggle={onToggle}>
    <summary onClick={toggle}>{summary}</summary>
    <div className="q-disclosure-content">{children}</div>
  </details>;
}
