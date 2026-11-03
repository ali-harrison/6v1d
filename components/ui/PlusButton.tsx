import Plus from "./Plus";

type Props = {
  label: string;
  className?: string;
  /** Border colour of the square — swap when the button sits on orchid */
  boxClass?: string;
} & (
  | { href: string; onClick?: never }
  | { onClick: () => void; href?: never }
);

// Signature CTA: outlined square with a "+" that spins and fills on hover
export default function PlusButton({
  label,
  href,
  onClick,
  className = "",
  boxClass = "border-orchid",
}: Props) {
  const inner = (
    <>
      <span
        className={`grid h-[34px] w-[34px] shrink-0 place-items-center border transition-colors duration-300 group-hover:bg-orchid group-hover:text-charcoal ${boxClass}`}
      >
        <Plus size={9} className="plus-spin" />
      </span>
      <span className="text-[12px] font-semibold uppercase leading-none">{label}</span>
    </>
  );

  const classes = `group inline-flex items-center gap-2.5 ${className}`;

  return href ? (
    <a href={href} className={classes}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
