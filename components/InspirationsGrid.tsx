"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { inspirations } from "@/data/inspirations";
import InspirationCard from "./InspirationCard";
import SvgLineArt from "./SvgLineArt";

const GAP = 16;

// Parallax multipliers per column: left drifts down, middle is static, right pulls up
const MULTIPLIERS = [0.15, 0, -0.15] as const;
const MAX_OFFSET = 80; // px cap in either direction

export default function InspirationsGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const currentStopRef = useRef<(() => void) | null>(null);

  // Three column refs — hooks must be called at top level, not inside a loop
  const col0Ref = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  // Card entry animation (unchanged)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".card") ?? [];
      gsap.fromTo(
        cards,
        {
          y: 40,
          opacity: 0,
          scaleX: 1.05,
          rotateZ: (i: number) => (i % 2 === 0 ? -5 : 5),
        },
        {
          y: 0,
          opacity: 1,
          scaleX: 1,
          rotateZ: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Column parallax — desktop only, disabled on mobile via gsap.matchMedia
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cols = [col0Ref.current, col1Ref.current, col2Ref.current];
    if (!section || cols.some((c) => !c)) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      // quickTo gives smooth, spring-like interpolation on each frame
      const setters = cols.map((col) =>
        gsap.quickTo(col, "y", { duration: 0.8, ease: "power2.out" })
      );

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          // Map scroll progress to a centered range so columns are at 0
          // when the section is centred in the viewport
          const range = self.end - self.start;
          const centered = (self.progress - 0.5) * range;

          MULTIPLIERS.forEach((mult, i) => {
            const raw = centered * mult;
            const clamped = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, raw));
            setters[i](clamped);
          });
        },
      });

      // Cleanup inside matchMedia callback — called on revert or breakpoint change
      return () => st.kill();
    });

    return () => mm.revert();
  }, []);

  // Distribute cards across columns by index mod 3
  const columns = ([0, 1, 2] as const).map((colIdx) =>
    inspirations.filter((_, i) => i % 3 === colIdx)
  );

  const colRefs = [col0Ref, col1Ref, col2Ref];

  return (
    <section
      id="grid"
      ref={sectionRef}
      style={{ position: "relative", padding: "8rem 3rem" }}
    >
      <SvgLineArt sectionRef={sectionRef} />

      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "2rem",
          marginBottom: "3rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span className="section-label" style={{ opacity: 1 }}>
          02 — Inspirations
        </span>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.12)" }} />
      </div>

      {/* Three flex-column wrappers — parallax transforms applied here */}
      <div className="parallax-grid">
        {columns.map((colCards, colIdx) => (
          <div
            key={colIdx}
            ref={colRefs[colIdx]}
            className="parallax-col"
          >
            {colCards.map((item) => (
              <InspirationCard
                key={item.name}
                item={item}
                currentStopRef={currentStopRef}
              />
            ))}
          </div>
        ))}
      </div>

      <style>{`
        .parallax-grid {
          display: flex;
          gap: ${GAP}px;
          align-items: start;
        }
        .parallax-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: ${GAP}px;
        }
        @media (max-width: 768px) {
          .parallax-grid {
            flex-direction: column;
          }
          .parallax-col {
            flex: none;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
