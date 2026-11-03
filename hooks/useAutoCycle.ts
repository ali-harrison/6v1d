"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Steps through `count` items on a timer, driving a progress bar (scaleX) and
 * a "42%" label through refs so nothing re-renders per frame. Pauses while
 * `paused` is true, while the root is off screen, and under reduced motion.
 */
export function useAutoCycle(
  count: number,
  seconds: number,
  rootRef: React.RefObject<HTMLElement | null>,
  paused: boolean
) {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const barRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [rootRef]);

  // Fresh timer each time the active item changes
  useEffect(() => {
    const state = { p: 0 };
    const render = () => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${state.p})`;
      if (labelRef.current) labelRef.current.textContent = `${Math.round(state.p * 100)}%`;
    };
    render();

    const tween = gsap.to(state, {
      p: 1,
      duration: seconds,
      ease: "none",
      paused: true,
      onUpdate: render,
      onComplete: () => setIndex((i) => (i + 1) % count),
    });
    tweenRef.current = tween;
    return () => {
      tween.kill();
    };
  }, [index, count, seconds]);

  useEffect(() => {
    const tween = tweenRef.current;
    if (!tween) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || !inView || reduce) tween.pause();
    else tween.play();
  }, [paused, inView, index]);

  return { index, setIndex, barRef, labelRef };
}
