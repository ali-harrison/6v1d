"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import Plus from "./ui/Plus";

// Same 4×4 ordered-dither matrix as the hero shader, so the two read as one system
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

interface Props {
  dot: string;
  boxClass: string;
  cornerClass?: string;
  children: React.ReactNode;
}

/**
 * A disc of square "pixels" — dense at the centre, thinning to nothing at the
 * rim — with a solid content box laid over its middle. The disc grows and
 * fills in as the frame scrolls into view.
 */
export default function DitherFrame({ dot, boxClass, cornerClass = "text-charcoal", children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    let grow = 1;

    const draw = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = dot;

      const cell = w < 700 ? 7 : 9;
      const sq = w < 700 ? 4 : 5;
      const inset = (cell - sq) / 2;
      const cx = w / 2;
      const cy = h / 2;
      const radius = (Math.min(w, h) / 2) * (0.78 + 0.22 * grow);
      const density = 0.35 + 0.65 * grow;

      for (let row = 0, y = 0; y < h; row++, y += cell) {
        for (let col = 0, x = 0; x < w; col++, x += cell) {
          const r = Math.hypot(x + cell / 2 - cx, y + cell / 2 - cy) / radius;
          if (r >= 1) continue;
          const intensity = Math.pow(1 - r, 0.75) * 1.25 * density;
          if (intensity > (BAYER[row % 4][col % 4] + 0.5) / 16) {
            ctx.fillRect(x + inset, y + inset, sq, sq);
          }
        }
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(wrap);

    let st: ScrollTrigger | null = null;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      st = ScrollTrigger.create({
        trigger: wrap,
        start: "top bottom",
        end: "center center",
        scrub: true,
        onUpdate(self) {
          grow = self.progress;
          draw();
        },
      });
      grow = st.progress;
      draw();
    }

    return () => {
      ro.disconnect();
      st?.kill();
    };
  }, [dot]);

  return (
    <div className="relative flex justify-center overflow-hidden py-6">
      <div ref={wrapRef} className="relative aspect-square w-[150vw] shrink-0 md:w-[min(78vw,68rem)]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

        <div
          className={`absolute left-1/2 top-1/2 w-[min(90vw,44rem)] -translate-x-1/2 -translate-y-1/2 px-6 py-14 text-center md:px-16 md:py-20 ${boxClass}`}
        >
          {/* "+" marks centred on each corner */}
          {[
            ["0%", "0%"],
            ["100%", "0%"],
            ["0%", "100%"],
            ["100%", "100%"],
          ].map(([left, top]) => (
            <span
              key={left + top}
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 ${cornerClass}`}
              style={{ left, top }}
            >
              <Plus size={15} />
            </span>
          ))}
          {children}
        </div>
      </div>
    </div>
  );
}
