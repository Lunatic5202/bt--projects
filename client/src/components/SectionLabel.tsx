/*
 * Hydrogrid Editorial — blueprint section index label (e.g. "01 — Overview").
 * Thin leading rule + mono uppercase text.
 */
export default function SectionLabel({
  index,
  text,
  className = "",
}: {
  index: string;
  text: string;
  className?: string;
}) {
  return (
    <p className={`section-label ${className}`}>
      <span className="text-bolt">{index}</span>
      <span>{text}</span>
    </p>
  );
}
