// Thin "+" glyph built from two hairlines so it stays crisp at any size
export default function Plus({
  size = 10,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
    </span>
  );
}
