"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import DitherFrame from "./DitherFrame";
import PlusButton from "./ui/PlusButton";

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef, "top 60%");

  return (
    <section ref={sectionRef} className="relative z-10 bg-bone pb-16 pt-10 text-charcoal md:pb-24">
      <DitherFrame dot="#b7b39c" boxClass="bg-bone">
        <h2 data-reveal className="heading text-h1">
          Borrowed light.
          <br />
          Original work.
        </h2>
        <p data-reveal className="mx-auto mt-6 max-w-md text-body">
          Influence isn&apos;t a shortcut, it&apos;s a starting point. The six
          voices on this page set the bar; the work still has to clear it.
        </p>
        <div data-reveal className="mt-8 flex justify-center">
          <PlusButton href="#voices" label="Meet the voices" />
        </div>
      </DitherFrame>
    </section>
  );
}
