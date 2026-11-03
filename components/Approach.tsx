"use client";

import { useRef } from "react";
import { APPROACH } from "@/data/site";
import { useReveal } from "@/hooks/useReveal";
import LineIcon from "./ui/LineIcon";
import SectionHeader from "./ui/SectionHeader";

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section id="approach" ref={sectionRef} className="gutter relative z-10 bg-bone pb-8 text-charcoal">
      <SectionHeader eyebrow="Approach" title="Influence in. Original work out." />

      <div className="mt-12 grid border-l border-t border-khaki md:mt-16 md:grid-cols-3">
        {APPROACH.map((step, i) => (
          <article
            key={step.title}
            data-reveal
            className="flex min-h-[20rem] flex-col justify-between border-b border-r border-khaki p-6 md:min-h-[38rem] md:p-12"
          >
            <div>
              <div className="flex items-start justify-between gap-6">
                <h3 className="heading text-h5">{step.title}</h3>
                <span className="font-mono text-[10px] font-semibold">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-8 max-w-[34ch] font-mono text-[12px] leading-[1.5] md:mt-12">{step.body}</p>
            </div>
            <LineIcon kind={step.icon} className="ml-auto mt-10 h-[110px] w-[110px] md:h-[136px] md:w-[136px]" />
          </article>
        ))}
      </div>
    </section>
  );
}
