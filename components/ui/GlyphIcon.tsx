// Small line glyphs for the principles list
type Kind = "wave" | "arrow" | "spark" | "shield";

const PATHS: Record<Kind, React.ReactNode> = {
  wave: (
    <>
      <path d="M6 20h3l2-6 3 12 3-16 3 14 3-9 2 5h5" />
      <circle cx="20" cy="20" r="15" opacity="0.5" />
    </>
  ),
  arrow: (
    <>
      <path d="M7 13l7 7-7 7" />
      <path d="M16 13l7 7-7 7" />
      <path d="M25 13l7 7-7 7" />
    </>
  ),
  spark: (
    <>
      <circle cx="20" cy="20" r="5" />
      <path d="M20 4v7M20 29v7M4 20h7M29 20h7M8.7 8.7l5 5M26.3 26.3l5 5M31.3 8.7l-5 5M13.7 26.3l-5 5" />
    </>
  ),
  shield: (
    <>
      <path d="M20 4l13 5v10c0 8-5.5 14-13 17C12.5 33 7 27 7 19V9z" />
      <path d="M20 10v20M13 18h14" opacity="0.6" />
    </>
  ),
};

export default function GlyphIcon({ kind, className = "" }: { kind: Kind; className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[kind]}
    </svg>
  );
}
