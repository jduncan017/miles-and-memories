import { DM_Sans, Playfair_Display } from "next/font/google";

/*
 * Fonts carried over from the Framer build.
 *
 * Playfair Display: h1/h2 and the few display moments (the testimonial
 * signature). DM Sans: everything else, including h3 and below, which is how
 * the live site sets card and list titles.
 *
 * The live site also loaded EB Garamond for one thing, the numerals on the
 * "How It Works" steps. That is a third face for four digits, so those use
 * Playfair instead. See docs/reference/design-system.md §0.
 */
export const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body-face",
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
});

export const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading-face",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});
