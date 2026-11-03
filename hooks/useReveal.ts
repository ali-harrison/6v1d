"use client";

import { useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";

// Fades [data-reveal] elements inside `ref` up into place once, as the section
// scrolls in. Skipped entirely under reduced motion.
export function useReveal(ref: React.RefObject<HTMLElement | null>, start = "top 75%") {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(ref);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-reveal]", {
        y: 28,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    });

    return () => mm.revert();
  }, [ref, start]);
}
