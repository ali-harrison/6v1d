"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import LogoShader from "./LogoShader";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollLabelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        scrollLabelRef.current,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.5,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* ── Bayer dither logo — sits at z:0 behind all content ── */}
      <LogoShader src="/logo.png" />

      {/* Subtle top-right label */}
      <span
        className="section-label"
        style={{
          position: "absolute",
          top: "5rem",
          right: "3rem",
          zIndex: 1,
        }}
      >
        01 — Intro
      </span>

      {/* Scroll indicator */}
      <div
        ref={scrollLabelRef}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          opacity: 0,
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-barlow)",
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          Scroll
        </span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
