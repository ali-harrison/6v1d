"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const children = sectionRef.current?.children ?? [];

      gsap.fromTo(
        children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      style={{
        padding: "8rem 3rem",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        ref={sectionRef}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          gap: "6rem",
          alignItems: "flex-start",
        }}
        className="about-inner"
      >
        {/* Decorative large number */}
        <div
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 300,
            fontSize: "clamp(5rem, 12vw, 10rem)",
            lineHeight: 1,
            color: "rgba(255,255,255,0.06)",
            flexShrink: 0,
            userSelect: "none",
          }}
        >
          06
        </div>

        {/* Text block */}
        <div>
          <span className="section-label" style={{ display: "block", marginBottom: "1.5rem", opacity: 1 }}>
            03 — About
          </span>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
              lineHeight: 1.5,
              color: "#fff",
              maxWidth: "560px",
            }}
          >
            These aren&apos;t just references.
            <br />
            They&apos;re the reason the work looks the way it does.
          </p>
          <p
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.5)",
              maxWidth: "480px",
              marginTop: "1.5rem",
            }}
          >
            Every creative decision carries a trace of someone who came before.
            This page names them openly.
          </p>
        </div>
      </div>

      {/* Mobile: stack vertically */}
      <style>{`
        @media (max-width: 768px) {
          .about-inner {
            flex-direction: column !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
