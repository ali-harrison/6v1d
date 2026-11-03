"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { inspirations } from "@/data/inspirations";
import { VOICE_TONES } from "@/data/site";
import { useAutoCycle } from "@/hooks/useAutoCycle";
import { useReveal } from "@/hooks/useReveal";
import { playClip, setSoundEnabled, stopClip, useSoundEnabled } from "@/lib/sound";
import Plus from "./ui/Plus";
import PlusButton from "./ui/PlusButton";
import SectionHeader from "./ui/SectionHeader";

export default function Voices() {
  const sectionRef = useRef<HTMLElement>(null);
  const accRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const soundOn = useSoundEnabled();
  const { index, setIndex, barRef, labelRef } = useAutoCycle(inspirations.length, 7, accRef, hovering);

  useReveal(sectionRef);

  // Clicking a panel opens it and plays that voice (only if sound is on)
  const open = (i: number) => {
    if (i === index) return;
    setIndex(i);
    playClip(inspirations[i].audio);
  };

  return (
    <section id="voices" ref={sectionRef} className="sheet gutter bg-bone pb-24 pt-24 text-charcoal md:pb-32 md:pt-32">
      <SectionHeader
        eyebrow="Voices"
        title={
          <>
            Six voices.
            <br />
            One direction.
          </>
        }
        action={
          <PlusButton
            label={soundOn ? "Mute them" : "Hear them"}
            onClick={() => setSoundEnabled(!soundOn)}
          />
        }
      />

      <div
        ref={accRef}
        data-reveal
        className="voices-acc mt-12 md:mt-16"
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
        onPointerLeave={(e) => {
          if (e.pointerType !== "mouse") return;
          setHovering(false);
          stopClip();
        }}
      >
        {inspirations.map((item, i) => {
          const tone = VOICE_TONES[i % VOICE_TONES.length];
          const active = i === index;
          const number = String(i + 1).padStart(2, "0");

          return (
            <article
              key={item.name}
              className={`voices-panel group ${tone.bg} ${tone.text} ${active ? "is-active" : ""}`}
              onClick={() => open(i)}
            >
              {/* Collapsed strip: "+" and the name running up the side */}
              <button
                type="button"
                tabIndex={active ? -1 : 0}
                aria-label={`Open ${item.name}`}
                className="voices-strip absolute inset-0 flex items-center justify-between px-5 text-left md:flex-col-reverse md:items-center md:px-0 md:py-8"
              >
                <span className="font-mono text-[13px] uppercase leading-tight md:vertical-text md:text-[clamp(12px,1.1vw,16px)]">
                  <span className="opacity-50">{number}</span>&nbsp;&nbsp;{item.name}
                </span>
                <Plus size={14} className="plus-spin" />
              </button>

              {/* Expanded content, pre-sized to the open width so it never reflows */}
              <div className="voices-content absolute left-0 top-0 flex flex-col md:grid md:grid-cols-[1.1fr_1fr]">
                <div className="relative order-2 flex flex-1 flex-col justify-between p-5 md:order-1 md:p-10">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="font-mono text-[10px] opacity-50">{number}</p>
                      <h3 className="mt-3 font-mono text-[clamp(1.4rem,2.2vw,2.1rem)] uppercase leading-[1.1] md:mt-5">
                        {item.name}
                      </h3>
                      <p className="eyebrow mt-3 opacity-60">{item.discipline}</p>
                    </div>
                    <span
                      ref={active ? labelRef : undefined}
                      className="font-mono text-[10px] tabular-nums opacity-40"
                    >
                      0%
                    </span>
                  </div>

                  <p className="max-w-md font-mono text-[13px] leading-relaxed md:text-[14px]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="relative order-1 h-[45%] shrink-0 md:order-2 md:h-full">
                  <Image
                    src={item.image}
                    alt={`Portrait of ${item.name}`}
                    fill
                    sizes="(min-width: 768px) 40vw, 90vw"
                    className="object-cover"
                  />
                </div>

                {/* Progress toward the next voice */}
                <div className="absolute inset-x-0 bottom-0 h-[3px]">
                  <div className="absolute inset-0 bg-current opacity-15" />
                  <div
                    ref={active ? barRef : undefined}
                    className="absolute inset-0 origin-left scale-x-0 bg-current opacity-60"
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
