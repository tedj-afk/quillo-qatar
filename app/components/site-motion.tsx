"use client";

import { useEffect, useRef, type ReactNode } from "react";

const ease = "cubic-bezier(.22, 1, .36, 1)";

/** Enhance visible HTML after hydration; content also works without JavaScript. */
export function useRevealScope<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const scope = ref.current;
    if (!scope || !window.IntersectionObserver || !Element.prototype.animate) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};

    function setup() {
      dispose();
      if (!scope || preference.matches) return;
      const targets = [...scope.querySelectorAll<HTMLElement>("[data-reveal]")].filter(target => target.closest("[data-motion-scope]") === scope);
      const animations = new Map<HTMLElement, Animation>();
      const reveal = (target: HTMLElement, immediate = false) => {
        observer.unobserve(target);
        if (immediate) {
          animations.get(target)?.cancel();
          animations.delete(target);
          target.dataset.motion = "visible";
          return;
        }
        if (target.dataset.motion === "visible") return;
        target.dataset.motion = "visible";
        const type = target.dataset.reveal;
        const stamp = type === "stamp";
        const frames: Keyframe[] = stamp ? [
          { transform: "scale(1.8) rotate(-24deg)", opacity: 0, offset: 0 },
          { transform: "scale(.92) rotate(-12deg)", opacity: 1, offset: .55 },
          { transform: "scale(1.04) rotate(-12deg)", opacity: 1, offset: .75 },
          { transform: "scale(1) rotate(-12deg)", opacity: 1 },
        ] : type === "sheet" ? [
          { transform: "perspective(900px) translateY(64px) rotateX(-16deg) scale(.97)", clipPath: "inset(0 0 28% 0)" },
          { transform: "none", clipPath: "inset(0 0 0% 0)" },
        ] : type === "quote" ? [
          { transform: "translateX(32px) rotate(2deg)", clipPath: "inset(0 0 100% 0)" },
          { transform: "none", clipPath: "inset(0 0 0% 0)" },
        ] : type === "ticket" ? [
          { transform: "translateY(38px) rotate(8deg) scale(.88)", offset: 0 },
          { transform: "translateY(-5px) rotate(-2deg) scale(1.025)", offset: .72 },
          { transform: "none" },
        ] : type === "rule" ? [
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)" },
        ] : [
          { clipPath: "inset(0 100% 0 0)", transform: "translateX(-18px) skewX(-5deg)" },
          { clipPath: "inset(0 0% 0 0)", transform: "none" },
        ];
        const animation = target.animate(
          frames,
          { duration: stamp ? 480 : type === "sheet" || type === "ticket" ? 780 : 620, delay: Number(target.dataset.revealDelay || 0), easing: ease, fill: "both" },
        );
        animations.set(target, animation);
        animation.onfinish = () => {
          animation.cancel();
          animations.delete(target);
        };
      };
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) reveal(entry.target as HTMLElement);
      }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

      for (const target of targets) {
        // Keep completed entrances completed when a motion preference changes.
        if (target.dataset.motion === "visible") continue;
        target.dataset.motion = "pending";
        observer.observe(target);
      }
      const onFocus = (event: FocusEvent) => {
        // Pointer focus must not move a link between pointerdown and click.
        if (!(event.target instanceof HTMLElement) || !event.target.matches(":focus-visible")) return;
        for (const target of targets) if (target.contains(event.target as Node)) reveal(target, true);
      };
      scope.addEventListener("focusin", onFocus);
      dispose = () => {
        observer.disconnect();
        scope.removeEventListener("focusin", onFocus);
        for (const animation of animations.values()) animation.cancel();
        for (const target of targets) if (target.dataset.motion === "pending") delete target.dataset.motion;
      };
    }
    setup();
    preference.addEventListener("change", setup);
    return () => { dispose(); preference.removeEventListener("change", setup); };
  }, []);

  return ref;
}

export function MotionTitle({ children, id, className = "" }: { children: ReactNode[]; id?: string; className?: string }) {
  return <h2 id={id} className={className}>{children.map((line, index) => <span className="q-title-line" key={index}><span data-reveal="line" data-reveal-delay={index * 100}>{line}</span></span>)}</h2>;
}
