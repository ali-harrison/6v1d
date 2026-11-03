"use client";

import { useEffect, useRef } from "react";
import Plus from "./ui/Plus";

// Crosshair markers around the logo with live angle readouts — slow drift so
// the hero feels instrumented rather than static.
const MARKERS = [
  { left: "38%", top: "24%", base: 271.3, speed: 2.1, align: "left" },
  { left: "71%", top: "69%", base: 37.6, speed: -1.4, align: "left" },
  { left: "45%", top: "79%", base: 91.8, speed: 1.1, align: "right" },
] as const;

export default function HeroHud() {
  const readouts = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    const id = window.setInterval(() => {
      const t = (performance.now() - start) / 1000;
      MARKERS.forEach((m, i) => {
        const el = readouts.current[i];
        if (!el) return;
        const deg = (((m.base + t * m.speed) % 360) + 360) % 360;
        el.textContent = `${deg.toFixed(1)}°`;
        const rad = el.nextElementSibling;
        if (rad) rad.textContent = `${((deg * Math.PI) / 180).toFixed(3)} rad`;
      });
    }, 120);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 hidden md:block" aria-hidden="true">
      {MARKERS.map((m, i) => (
        <div
          key={i}
          className="hud-marker absolute"
          style={{ left: m.left, top: m.top }}
        >
          <span className="absolute -translate-x-1/2 -translate-y-1/2 text-orchid">
            <Plus size={15} />
          </span>
          <span
            className={`absolute top-2 flex flex-col whitespace-nowrap font-mono text-[10px] leading-tight ${
              m.align === "left" ? "left-3" : "right-3 items-end"
            }`}
          >
            <span ref={(el) => { readouts.current[i] = el; }} className="text-lilac/60">
              {m.base.toFixed(1)}°
            </span>
            <span className="text-lilac/30">{((m.base * Math.PI) / 180).toFixed(3)} rad</span>
          </span>
        </div>
      ))}
    </div>
  );
}
