"use client";

import { useSoundEnabled } from "@/lib/sound";
import PixelMark from "./ui/PixelMark";

const RING = "Six voices · One direction · Est. 2026 · ";
const CIRCUMFERENCE = 2 * Math.PI * 78;

// Rotating stamp: text on a circle around the pixel equaliser mark. The mark
// bounces when sound is on.
export default function Badge({ className = "" }: { className?: string }) {
  const soundOn = useSoundEnabled();

  return (
    <div className={`relative h-[150px] w-[150px] text-orchid md:h-[170px] md:w-[170px] ${className}`}>
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="badge-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current font-mono text-[12px] font-semibold uppercase">
          <textPath href="#badge-ring" textLength={CIRCUMFERENCE - 4} lengthAdjust="spacing">
            {RING}
          </textPath>
        </text>
      </svg>
      <div className={`absolute inset-0 grid place-items-center ${soundOn ? "badge-live" : ""}`}>
        <PixelMark px={7} />
      </div>
    </div>
  );
}
