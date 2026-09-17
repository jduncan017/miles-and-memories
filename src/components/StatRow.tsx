import { cx } from "~/lib/cx";

/*
 * The "5+ / 250+ / 1000+" row: big DM Sans black-weight numbers in p3 with a
 * label beneath, split by vertical hairlines. Used on the homepage (left
 * aligned, short labels) and the about page (centred, sentence labels).
 */
export function StatRow({
  stats,
  align = "center",
  layout = "inline",
  className,
}: {
  stats: { value: string; label: string }[];
  align?: "left" | "center";
  /**
   * `inline` (default): short labels; two per row on phones, the third wraps.
   * `columns`: sentence labels; three equal columns from md, and a stacked
   * list split by hairlines on phones (the about page).
   */
  layout?: "inline" | "columns";
  className?: string;
}) {
  const columns = layout === "columns";
  return (
    <dl
      className={cx(
        "StatRow flex",
        columns ? "flex-col md:flex-row" : "flex-wrap gap-y-6",
        align === "center" && "justify-center",
        className,
      )}
    >
      {stats.map((s, i) => (
        <div
          key={s.value}
          className={cx(
            "Stat flex flex-col-reverse justify-end gap-2 px-3 sm:px-6",
            columns
              ? cx(
                  "py-5 md:flex-1 md:basis-0 md:py-0",
                  i > 0 && "border-t border-g1 md:border-t-0 md:border-l",
                )
              : cx(
                  // Phones: two per row, the third wraps beneath (live wraps
                  // the same way). Hairlines appear once all three share a row.
                  "basis-1/2 sm:basis-auto",
                  i > 0 && "sm:border-l sm:border-g1",
                  i === 0 && align === "left" && "sm:pl-0",
                ),
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
