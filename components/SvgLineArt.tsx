"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SvgLineArt({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1.5,
        },
      });
    });

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <svg
      viewBox="0 0 600 1200"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        top: 0,
        left: "-8%",
        width: "50%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="
          M 80 0
          C 200 80, 50 200, 150 320
          C 280 460, 30 520, 120 660
          C 220 800, 350 780, 280 920
          C 200 1040, 60 1080, 180 1200
        "
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
