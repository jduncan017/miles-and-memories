import { cx } from "~/lib/cx";

/*
 * The "5+ / 250+ / 1000+" row: big DM Sans black-weight numbers in p3 with a
 * label beneath, split by vertical hairlines. Used on the homepage (left
 * aligned, short labels) and the about page (centred, sentence labels).
 */
export function StatRow({
  stats,
  align = "center",
  className,
}: {
  stats: { value: string; label: string }[];
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <dl className={cx("StatRow grid grid-cols-3", className)}>
      {stats.map((s, i) => (
        <div
          key={s.value}
          className={cx(
            "Stat flex flex-col-reverse gap-2 px-3 md:px-6",
            i > 0 && "border-l border-g1",
            i === 0 && align === "left" && "pl-0 md:pl-0",
            align === "center" && "items-center text-center",
          )}
        >
          <dt className="StatLabel text-sm text-g2 md:text-base">{s.label}</dt>
          <dd className="StatValue text-stat font-black text-p3">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
