"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Badge from "./Badge";

const STATEMENT =
  "These aren't just references. They're the reason the work looks the way it does — six people across music, fashion, performance, activism and storytelling.";

const SUPPORT =
  "Every creative decision carries a trace of someone who came before. This page names them openly.";

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(sectionRef);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-reveal]", {
        y: 30,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });

      // Supporting line lights up word by word as you scroll through it
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-words]",
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="gutter relative z-10 bg-charcoal pb-24 pt-32 md:pb-28 md:pt-48"
    >
      <div className="grid gap-12 md:grid-cols-12 md:items-end">
        <p data-reveal className="heading text-h2 md:col-span-7">
          {STATEMENT}
        </p>

        <p data-words className="max-w-sm text-body md:col-span-4 md:col-start-9 md:pb-2">
          {SUPPORT.split(" ").map((word, i) => (
            <span key={i} data-word className="inline-block pr-[0.3em]">
              {word}
            </span>
          ))}
        </p>
      </div>

      <div className="mt-20 flex justify-end md:mt-28">
        <Badge />
      </div>
    </section>
  );
}
