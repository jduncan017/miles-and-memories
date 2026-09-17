import type { Metadata } from "next";
import { Button } from "~/components/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="NotFound flex min-h-[80vh] items-center justify-center bg-linear-150 from-n1 to-n2 px-6 pt-32 pb-20">
      <div className="NotFoundInner flex max-w-text flex-col items-center gap-6 text-center">
        <p className="NotFoundCode text-stat font-black text-p3">404</p>
        <h1>This Trip Took a Wrong Turn</h1>
        <p className="text-lg text-g3">
          The page you&rsquo;re looking for has moved or never existed.
          Let&rsquo;s get you back on route.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/">Back to Home</Button>
          <Button href="/contact" variant="dark">
            Plan My Trip
          </Button>
        </div>
      </div>
    </section>
  );
}
