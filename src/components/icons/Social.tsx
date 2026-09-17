/*
 * Social brand glyphs, hand-rolled rather than imported.
 *
 * lucide-react removed its brand icons in v1 (trademark reasons), so pulling
 * these from the icon library is not an option and would break again on the
 * next major. They are plain currentColor paths — size and color come from the
 * call site like any other icon.
 *
 * Each is decorative: the accessible name lives on the wrapping link, so the
 * svg carries aria-hidden.
 */
type IconProps = { className?: string };

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.16V9.75H2.4V21.5Zm7.72 0h5.16v-6.36c0-1.7.32-3.34 2.42-3.34 2.07 0 2.1 1.94 2.1 3.45v6.25h5.16v-7.28c0-4.47-.97-7.02-5.19-7.02-2.03 0-3.39 1.11-3.95 2.17h-.07V9.75h-4.95c.07 1.4 0 11.75 0 11.75Z" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 2H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h9.6v-7.7H10v-3h2.6V9.1c0-2.6 1.6-4 3.9-4 1.1 0 2.1.1 2.3.1v2.7h-1.6c-1.3 0-1.5.6-1.5 1.5v1.9h3l-.4 3h-2.6V22H21a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" />
    </svg>
  );
}
