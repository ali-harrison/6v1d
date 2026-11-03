// Line-art diagrams for the approach cards, each framed by corner brackets.
type Kind = "signal" | "lens" | "converge";

function Brackets() {
  return (
    <g strokeWidth="1">
      <path d="M2 14 V2 H14" />
      <path d="M126 2 H138 V14" />
      <path d="M2 126 V138 H14" />
      <path d="M126 138 H138 V126" />
    </g>
  );
}

function Signal() {
  // A sine wave passing through nested squares
  const wave = Array.from({ length: 41 }, (_, i) => {
    const x = 14 + i * 2.8;
    const y = 70 + Math.sin((i / 40) * Math.PI * 4) * 26;
    return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return (
    <g>
      <rect x="12" y="12" width="116" height="116" />
      <rect x="34" y="34" width="72" height="72" />
      <rect x="56" y="56" width="28" height="28" />
      <path d={wave} />
    </g>
  );
}

function Lens() {
  // Grid with a magnified circle and crosshair
  const lines = [30, 50, 70, 90, 110];
  return (
    <g>
      <rect x="12" y="12" width="116" height="116" />
      {lines.map((v) => (
        <g key={v}>
          <path d={`M${v} 12 V128`} opacity="0.45" />
          <path d={`M12 ${v} H128`} opacity="0.45" />
        </g>
      ))}
      <circle cx="70" cy="70" r="36" />
      <circle cx="70" cy="70" r="20" />
      <path d="M70 26 V114 M26 70 H114" />
      <circle cx="70" cy="70" r="2.5" fill="currentColor" />
    </g>
  );
}

function Converge() {
  // Six lines arriving from the left, meeting at one point, leaving as one
  const ys = [22, 41, 60, 80, 99, 118];
  return (
    <g>
      <rect x="12" y="12" width="116" height="116" />
      {ys.map((y) => (
        <path key={y} d={`M12 ${y} L92 70`} />
      ))}
      <path d="M92 70 H128" strokeWidth="2" />
      <circle cx="92" cy="70" r="3" fill="currentColor" />
      <path d="M118 64 L128 70 L118 76" />
    </g>
  );
}

export default function LineIcon({ kind, className = "" }: { kind: Kind; className?: string }) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
      aria-hidden="true"
    >
      <Brackets />
      {kind === "signal" && <Signal />}
      {kind === "lens" && <Lens />}
      {kind === "converge" && <Converge />}
    </svg>
  );
}
