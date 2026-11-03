"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { inspirations } from "@/data/inspirations";
import { PRINCIPLES } from "@/data/site";
import { useAutoCycle } from "@/hooks/useAutoCycle";
import { useReveal } from "@/hooks/useReveal";
import GlyphIcon from "./ui/GlyphIcon";
import PlusButton from "./ui/PlusButton";

const TONES = [
  "bg-forest text-lilac",
  "bg-orchid text-charcoal",
  "bg-lilac text-charcoal",
  "bg-khaki text-charcoal",
];

const PORTRAIT = inspirations.find((i) => i.name === "Pharrell Williams")!;

export default function Principles() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [hovering, setHovering] = useState(false);
  const { index, setIndex, barRef, labelRef } = useAutoCycle(PRINCIPLES.length, 6, listRef, hovering);

  useReveal(sectionRef);

  return (
    <section
      id="principles"
      ref={sectionRef}
      className="gutter relative z-10 bg-gradient-to-b from-white to-bone pb-32 pt-8 text-charcoal md:pb-44"
    >
      <div className="grid gap-12 md:grid-cols-2 md:gap-12">
        <div>
          <p data-reveal className="eyebrow mb-4">Principles</p>
          <h2 data-reveal className="heading text-display">
            Don&apos;t imitate.
            <br />
            Interpret.
          </h2>
          <div data-reveal className="mt-8 flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-sm text-body">
              Every voice on this page earned its place by changing how the
              work gets made, not just how it looks. These are the rules they
              left behind.
            </p>
            <PlusButton href="#contact" label="Say hello" className="shrink-0" />
          </div>

          <div data-reveal className="relative mt-12 aspect-[4/5] overflow-hidden md:mt-16">
            <Image
              src={PORTRAIT.image}
              alt={`Portrait of ${PORTRAIT.name}`}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <ul
          ref={listRef}
          data-reveal
          className="self-start md:sticky md:top-24"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setHovering(false)}
        >
          {PRINCIPLES.map((p, i) => {
            const active = i === index;
            return (
              <li key={p.title} className={`${TONES[i]} ${active ? "is-active" : ""}`}>
                <button
                  type="button"
                  aria-expanded={active}
                  onClick={() => setIndex(i)}
                  className="flex w-full items-start justify-between gap-6 px-6 pb-8 pt-6 text-left md:px-10 md:pt-8"
                >
                  <span>
                    <span className="font-mono text-[10px] opacity-60">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mt-4 block font-mono text-[clamp(1.1rem,1.7vw,1.6rem)] uppercase leading-tight">
                      {p.title}
                    </span>
                  </span>
                  <GlyphIcon kind={p.icon} className="h-9 w-9 shrink-0 opacity-80" />
                </button>

                <div className="principle-body">
                  <div className="relative min-h-0 overflow-hidden">
                    <div className="flex items-end justify-between gap-6 px-6 pb-8 pt-16 md:px-10 md:pt-40">
                      <div>
                        <p className="max-w-md font-mono text-[13px] leading-relaxed md:text-[14px]">{p.body}</p>
                        <p className="eyebrow mt-4 opacity-50">{p.from}</p>
                      </div>
                      <span
                        ref={active ? labelRef : undefined}
                        className="shrink-0 font-mono text-[10px] tabular-nums opacity-40"
                      >
                        0%
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[3px]">
                      <div className="absolute inset-0 bg-current opacity-15" />
                      <div
                        ref={active ? barRef : undefined}
                        className="absolute inset-0 origin-left scale-x-0 bg-current opacity-60"
                      />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
