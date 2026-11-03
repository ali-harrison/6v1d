// Eyebrow + uppercase heading on the left, optional action on the right
export default function SectionHeader({
  eyebrow,
  title,
  action,
  eyebrowClass = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  action?: React.ReactNode;
  eyebrowClass?: string;
}) {
  return (
    <div data-reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className={`eyebrow mb-3 md:mb-4 ${eyebrowClass}`}>{eyebrow}</p>
        <h2 className="heading text-h4">{title}</h2>
      </div>
      {action && <div className="md:pb-1">{action}</div>}
    </div>
  );
}
