import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cx } from "~/lib/cx";

/*
 * The one button. Every CTA on the site is a variant of this.
 *
 * Measured off the live build: a 52px pill, 24px left / 8px right padding, a
 * 20px medium label, and a 40px circle on the right holding an up-right arrow.
 * The circle carries a small inset shadow so it reads as pressed into the pill.
 *
 * Three fills, and the circle always takes the contrasting one:
 *   primary  p3 pill · n0 circle · g5 arrow      the main CTA
 *   light    n0 pill · p3 circle · n0 arrow      beside a primary, on dark
 *   dark     g5 pill · p3 circle · n0 arrow      on light bands
 *
 * The arrow turns 45° on hover, which is the live site's only button motion.
 */
export type ButtonVariant = "primary" | "light" | "dark";

const VARIANTS: Record<
  ButtonVariant,
  { pill: string; circle: string; arrow: string }
> = {
  primary: {
    pill: "bg-p3 text-n0 hover:bg-p4 active:bg-p5",
    circle: "bg-n0",
    arrow: "text-g5",
  },
  light: {
    pill: "bg-n0 text-g5 hover:bg-n2 active:bg-n3",
    circle: "bg-p3",
    arrow: "text-n0",
  },
  dark: {
    pill: "bg-g5 text-n0 hover:bg-g4 active:bg-g3",
    circle: "bg-p3",
    arrow: "text-n0",
  },
};

type Common = {
  children: ReactNode;
  variant?: ButtonVariant;
  /** Stretch to the container on phones (the live hero does this). */
  fullOnMobile?: boolean;
  className?: string;
};

type AsLink = Common & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof Common | "href"
  >;
type AsButton = Common & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof Common
  >;

export function Button(props: AsLink | AsButton) {
  const {
    children,
    variant = "primary",
    fullOnMobile = false,
    className,
    ...rest
  } = props;
  const v = VARIANTS[variant];
  const classes = cx(
    "Button group inline-flex h-13 items-center justify-between gap-4 rounded-full py-1.5 pr-2 pl-6 text-lg font-medium whitespace-nowrap shadow-[0.125rem_0.125rem_0.5rem_rgb(0_0_0/0.25)] transition-colors duration-300",
    "focus-visible:ring-2 focus-visible:ring-p3 focus-visible:ring-offset-2 focus-visible:outline-none",
    v.pill,
    fullOnMobile && "w-full md:w-auto",
    className,
  );
  const content = (
    <>
      <span className="ButtonLabel">{children}</span>
      <span
        aria-hidden="true"
        className={cx(
          "ButtonCircle flex size-10 shrink-0 items-center justify-center rounded-full shadow-[inset_0.125rem_0.125rem_0.25rem_rgb(0_0_0/0.25)]",
          v.circle,
        )}
      >
        <ArrowUpRight
          className={cx(
            "size-6 transition-transform duration-300 group-hover:rotate-45",
            v.arrow,
          )}
          strokeWidth={2.25}
        />
      </span>
    </>
  );

  if (props.href !== undefined) {
    const { href, ...anchor } = rest as Omit<AsLink, keyof Common>;
    const external = /^(https?:|mailto:|tel:)/.test(href);
    return external ? (
      <a href={href} className={classes} {...anchor}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes} {...anchor}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...button } = rest as Omit<AsButton, keyof Common>;
  return (
    <button
      type={type}
      className={cx(classes, "disabled:cursor-not-allowed disabled:opacity-50")}
      {...button}
    >
      {content}
    </button>
  );
}
