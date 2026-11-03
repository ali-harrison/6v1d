"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import LogoShader from "./LogoShader";
import MarqueeBackground from "./MarqueeBackground";
import HeroHud from "./HeroHud";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-fade]",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power2.out", delay: 1.4, stagger: 0.12 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex h-svh flex-col items-center justify-center overflow-hidden"
    >
      {/* Fixed wave text — later sections are opaque and slide over it */}
      <MarqueeBackground />

      {/* Bayer dither logo */}
      <LogoShader src="/logo.png" color="#eddfee" />

      {/* Wrapper is the containing block once GSAP transforms it, so it must fill the hero */}
      <div data-hero-fade className="pointer-events-none absolute inset-0 z-[1] opacity-0">
        <HeroHud />
      </div>

      <h1 className="sr-only">6v1d — Six voices. One direction.</h1>

      <div className="absolute bottom-8 left-1/2 z-[1] -translate-x-1/2">
        <div data-hero-fade className="flex flex-col items-center gap-3 opacity-0">
          <span className="eyebrow text-lilac/50">Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
}
