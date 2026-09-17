import type { ReactNode } from "react";
import { cx } from "~/lib/cx";

/*
 * Heading + description pair used at the top of most sections. The heading is
 * an h2 (sections sit under the page's single h1). The live site capitalises
 * every section heading; `capitalize` reproduces that without rewriting copy.
 */
export function SectionHeader({
  title,
  description,
  align = "center",
  onDark = false,
  as: Tag = "h2",
  className,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  onDark?: boolean;
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cx(
        "SectionHeader flex flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      <Tag className={cx("SectionHeaderTitle capitalize", onDark && "text-n0")}>
        {title}
      </Tag>
      {description && (
        <p
          className={cx(
            "SectionHeaderDescription max-w-text text-lg",
            onDark ? "text-g0" : "text-g3",
          )}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
