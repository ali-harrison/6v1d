"use client";

import { useRef } from "react";
import { inspirations } from "@/data/inspirations";
import { EMAIL, NAV } from "@/data/site";
import { useReveal } from "@/hooks/useReveal";
import { scrollToId } from "@/lib/lenis";
import DitherFrame from "./DitherFrame";
import PixelMark from "./ui/PixelMark";
import Plus from "./ui/Plus";
import PlusButton from "./ui/PlusButton";

// Forest-green sheet that closes the page: roster marquee → contact frame → footer
export default function Closing() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef, "top 80%");

  const names = inspirations.map((i) => i.name);

  return (
    <section id="contact" ref={sectionRef} className="sheet bg-forest pt-24 text-lilac md:pt-32">
      {/* Roster */}
      <div className="gutter">
        <p data-reveal className="eyebrow mb-3 text-orchid md:mb-4">The roster</p>
        <h2 data-reveal className="heading text-h4">Six names. One throughline.</h2>
      </div>

      <div className="mt-12 overflow-hidden border-y border-lilac/10 py-8 md:mt-16 md:py-10" aria-label={names.join(", ")}>
        <div className="marquee-track flex w-max" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {names.map((name) => (
                <span key={name} className="flex items-center">
                  <span className="heading whitespace-nowrap px-8 text-h2 md:px-14">{name}</span>
                  <span className="text-orchid">
                    <Plus size={14} />
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Say hello */}
      <div className="mt-10 md:mt-16">
        <DitherFrame dot="rgba(237, 223, 238, 0.85)" boxClass="bg-forest" cornerClass="text-orchid">
          <div className="text-orchid">
            <PixelMark px={5} />
          </div>
          <h2 className="heading mt-6 text-display text-orchid">Say hello.</h2>
          <p className="mx-auto mt-6 max-w-md text-body text-orchid">
            Building something new, rethinking something old, or just want to
            trade references? Always glad to hear from you.
          </p>
          <div className="mt-8 flex justify-center">
            <PlusButton href={`mailto:${EMAIL}`} label="Contact us" />
          </div>
        </DitherFrame>
      </div>

      {/* Footer */}
      <footer className="gutter pb-8 pt-16 md:pt-24">
        <div className="flex gap-10">
          <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            <div>
              <p className="mb-5 text-[12px] font-semibold uppercase text-orchid">Enquiries</p>
              <a href={`mailto:${EMAIL}`} className="draw-underline text-body">
                {EMAIL}
              </a>
            </div>
            <div>
              <p className="mb-5 text-[12px] font-semibold uppercase text-orchid">Based in</p>
              <p className="text-body uppercase">Aotearoa New Zealand</p>
            </div>
            <div>
              <p className="mb-5 text-[12px] font-semibold uppercase text-orchid">Elsewhere</p>
              <ul className="space-y-3 text-body uppercase">
                {["Instagram", "Are.na", "LinkedIn"].map((s) => (
                  <li key={s}>
                    <a href="#" className="draw-underline">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-5 text-[12px] font-semibold uppercase text-orchid">Index</p>
              <ul className="space-y-3 text-body uppercase">
                {NAV.map((n) => (
                  <li key={n.id}>
                    <a
                      href={`#${n.id}`}
                      className="draw-underline"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(n.id);
                      }}
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Brand mark turned on its side, like a book spine */}
          <div className="relative hidden h-[200px] w-[96px] shrink-0 self-end md:block" aria-hidden="true">
            <div className="logo-mask absolute left-1/2 top-1/2 h-[96px] w-[200px] -translate-x-1/2 -translate-y-1/2 -rotate-90 bg-orchid" />
          </div>
        </div>

        <div className="mt-16 grid border border-lilac/25 font-mono text-[10px] font-semibold uppercase md:mt-24 md:grid-cols-[auto_1fr_auto]">
          <span className="border-b border-lilac/25 px-5 py-4 md:border-b-0 md:border-r">© 6v1d {new Date().getFullYear()}</span>
          <span className="border-b border-lilac/25 px-5 py-4 md:border-b-0">A concept by Te Wairama Digital</span>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("hero");
            }}
            className="px-5 py-4 transition-colors hover:bg-orchid hover:text-charcoal md:border-l md:border-lilac/25"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </section>
  );
}
