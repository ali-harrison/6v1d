"use client";

import { useRef } from "react";
import Image from "next/image";
import { inspirations, type Inspiration } from "@/data/inspirations";
import { useReveal } from "@/hooks/useReveal";
import { playClip } from "@/lib/sound";
import PlusButton from "./ui/PlusButton";
import SectionHeader from "./ui/SectionHeader";

const byName = (name: string) => inspirations.find((i) => i.name === name) as Inspiration;

const FEATURED = byName("Tame Iti");
const TILES = [
  { item: byName("Virgil Abloh"), bg: "bg-khaki", box: "border-orchid" },
  { item: byName("Stan Lee"), bg: "bg-orchid", box: "border-charcoal" },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-[0.3em] bg-white px-4 py-2 font-mono text-[10px] font-semibold uppercase leading-none">
      {children}
    </span>
  );
}

export default function Words() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section id="words" ref={sectionRef} className="gutter relative z-10 bg-white pb-24 pt-28 text-charcoal md:pb-36 md:pt-36">
      <SectionHeader
        eyebrow="In their words"
        title="Words worth keeping."
        action={<PlusButton href="#voices" label="All voices" />}
      />

      <div className="mt-12 md:mt-16">
        <div data-reveal className="relative h-[22rem] overflow-hidden md:h-[clamp(26rem,44vw,40rem)]">
          <Image
            src={FEATURED.image}
            alt={`Portrait of ${FEATURED.name}`}
            fill
            sizes="100vw"
            className="object-cover object-[center_38%]"
          />
        </div>

        {/* Panel overlaps the bottom-right of the image */}
        <div
          data-reveal
          className="relative flex min-h-[18rem] flex-col justify-between gap-10 bg-lilac p-6 md:-mt-[clamp(8rem,13vw,13rem)] md:ml-[33.333%] md:min-h-[22rem] md:p-12"
        >
          <div>
            <Chip>{FEATURED.discipline}</Chip>
            <blockquote className="heading mt-8 text-h3 md:mt-10">{FEATURED.quote}</blockquote>
            <p className="eyebrow mt-4 opacity-60">— {FEATURED.name}</p>
          </div>
          <PlusButton label="Listen" onClick={() => playClip(FEATURED.audio, { force: true })} />
        </div>

        <div className="grid md:ml-[33.333%] md:grid-cols-2">
          {TILES.map(({ item, bg, box }) => (
            <div
              key={item.name}
              data-reveal
              className={`flex min-h-[18rem] flex-col justify-between gap-10 p-6 md:p-12 ${bg}`}
            >
              <div>
                <Chip>{item.discipline}</Chip>
                <blockquote className="heading mt-8 text-h5 md:mt-10">{item.quote}</blockquote>
                <p className="eyebrow mt-4 opacity-60">— {item.name}</p>
              </div>
              <PlusButton label="Listen" boxClass={box} onClick={() => playClip(item.audio, { force: true })} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
