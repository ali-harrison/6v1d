// Pixel equaliser — four columns of square "pixels". Used as the small brand
// mark in the badge and the contact frame.
const COLUMNS = [2, 4, 3, 5];

export default function PixelMark({
  px = 6,
  className = "",
}: {
  px?: number;
  className?: string;
}) {
  const gap = Math.max(1, Math.round(px / 3));
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-end ${className}`}
      style={{ gap, height: 5 * px + 4 * gap }}
    >
      {COLUMNS.map((h, c) => (
        <span key={c} className="flex flex-col-reverse" style={{ gap }}>
          {Array.from({ length: h }, (_, r) => (
            <span key={r} className="block bg-current" style={{ width: px, height: px }} />
          ))}
        </span>
      ))}
    </span>
  );
}
