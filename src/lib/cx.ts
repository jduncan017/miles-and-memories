/**
 * Joins class names, dropping anything falsy.
 *
 *   cx("Button", size === "md" && "px-6 py-3", disabled && "opacity-50")
 *
 * Deliberately not tailwind-merge: this codebase resolves conflicts by making
 * each design dimension a typed prop with one source (see CardWrapper), so two
 * competing utilities should not reach the same element in the first place.
 * Reaching for a merger tends to hide that mistake rather than fix it.
 */
export type ClassValue = string | false | null | undefined;

export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
