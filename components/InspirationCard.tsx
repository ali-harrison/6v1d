"use client";

import { Inspiration } from "@/data/inspirations";
import { useCardAudio } from "@/hooks/useCardAudio";

interface Props {
  item: Inspiration;
  currentStopRef: React.MutableRefObject<(() => void) | null>;
}

export default function InspirationCard({ item, currentStopRef }: Props) {
  const { play, stop } = useCardAudio(item.audio);

  return (
    <div
      className="card"
      onMouseEnter={() => {
        currentStopRef.current?.();
        currentStopRef.current = stop;
        play();
      }}
      onMouseLeave={() => {
        stop();
        currentStopRef.current = null;
      }}
    >
      {/* Name watermark — fades in on hover behind the image */}
      <div className="card-name-bg" aria-hidden="true">
        {item.name}
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        style={{ width: "100%", height: "auto", display: "block" }}
      />

      <div className="card-overlay">
        <p
          style={{
            fontFamily: "var(--font-barlow)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            marginBottom: "0.5rem",
          }}
        >
          {item.discipline}
        </p>
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            lineHeight: 1.4,
            color: "#fff",
            marginBottom: "1rem",
          }}
        >
          &ldquo;{item.quote}&rdquo;
        </p>
        <p
          style={{
            fontFamily: "var(--font-barlow)",
            fontSize: "13px",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          — {item.name}
        </p>
      </div>

      {/* SVG corner brackets — draw themselves in on hover via stroke-dashoffset */}
      {/* Top-left bracket */}
      <svg
        className="card-bracket card-bracket--tl"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        {/* M 22 2 → L 2 2 → L 2 22  (arms: 20px + 20px = 40px total) */}
        <path d="M 22 2 L 2 2 L 2 22" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
      </svg>

      {/* Bottom-right bracket */}
      <svg
        className="card-bracket card-bracket--br"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        {/* M 2 22 → L 22 22 → L 22 2  (arms: 20px + 20px = 40px total) */}
        <path d="M 2 22 L 22 22 L 22 2" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
      </svg>
    </div>
  );
}
