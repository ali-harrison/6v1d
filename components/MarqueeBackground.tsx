"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// waveNumber: radians per item index — controls how many sine cycles span the list.
// 0.8 ≈ ~2 full cycles visible across the viewport at once.
const WAVE_NUMBER = 0.8;
// waveSpeed: full cycles the wave shifts per full-page scroll (1 = one full cycle)
const WAVE_SPEED = 1;
// Enough items to fill the viewport height + generous overflow top and bottom
const ITEM_COUNT = 30;

const ITEM_CLASS =
  "w-max select-none whitespace-nowrap font-sans text-[clamp(1rem,4vw,3rem)] font-light uppercase leading-[0.85] tracking-[0.06em] text-lilac/[0.05]";
const COL_CLASS = "flex flex-1 flex-col justify-center gap-[1.25rem] overflow-hidden";

export default function MarqueeBackground() {
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!leftCol || !rightCol) return;

    const leftTexts = gsap.utils.toArray<HTMLElement>(leftCol.querySelectorAll("[data-wave]"));
    const rightTexts = gsap.utils.toArray<HTMLElement>(rightCol.querySelectorAll("[data-wave]"));
    if (!leftTexts.length || !rightTexts.length) return;

    const leftSetters = leftTexts.map((el) => gsap.quickTo(el, "x", { duration: 0.6, ease: "power4.out" }));
    const rightSetters = rightTexts.map((el) => gsap.quickTo(el, "x", { duration: 0.6, ease: "power4.out" }));

    // Range = column width − widest text node, so every item stays inside its column
    function getRange(col: HTMLElement, texts: HTMLElement[]): number {
      const maxW = Math.max(...texts.map((t) => t.offsetWidth));
      return Math.max(0, col.offsetWidth - maxW);
    }

    // phase = waveNumber * index + waveSpeed * progress * 2π − π/2
    // The −π/2 starts index 0 at the column edge (sin(−π/2) = −1 → normalised 0).
    function waveX(index: number, progress: number, range: number): number {
      const phase = WAVE_NUMBER * index + WAVE_SPEED * progress * Math.PI * 2 - Math.PI / 2;
      return ((Math.sin(phase) + 1) / 2) * range;
    }

    let leftRange = getRange(leftCol, leftTexts);
    let rightRange = getRange(rightCol, rightTexts);

    leftTexts.forEach((el, i) => gsap.set(el, { x: waveX(i, 0, leftRange) }));
    rightTexts.forEach((el, i) => gsap.set(el, { x: -waveX(i, 0, rightRange) }));

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate(self) {
        const p = self.progress;
        // Left col pushes rightward from its edge, right col mirrors leftward
        leftTexts.forEach((_, i) => leftSetters[i](waveX(i, p, leftRange)));
        rightTexts.forEach((_, i) => rightSetters[i](-waveX(i, p, rightRange)));
      },
    });

    const onResize = () => {
      leftRange = getRange(leftCol, leftTexts);
      rightRange = getRange(rightCol, rightTexts);
    };
    window.addEventListener("resize", onResize);
    // Text widths change once the webfont swaps in
    document.fonts?.ready.then(onResize);

    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 flex overflow-hidden" aria-hidden="true">
      <div ref={leftColRef} className={`${COL_CLASS} items-start`}>
        {Array.from({ length: ITEM_COUNT }, (_, i) => (
          <div key={i} data-wave="" className={ITEM_CLASS}>
            Six Voices
          </div>
        ))}
      </div>

      <div ref={rightColRef} className={`${COL_CLASS} items-end`}>
        {Array.from({ length: ITEM_COUNT }, (_, i) => (
          <div key={i} data-wave="" className={ITEM_CLASS}>
            One Direction
          </div>
        ))}
      </div>
    </div>
  );
}
