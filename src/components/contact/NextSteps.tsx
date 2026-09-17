/*
 * The "Here's what happens next" list on /contact: pink DM Sans numerals beside
 * short lines, centred as a block under the section heading.
 */
const STEPS = [
  "Choose a time that works for you",
  "We'll discuss your trip goals, group size, and budget",
  "You'll receive a tailored proposal with 3-5 perfect venue options",
  "Zero planning fees, zero pressure",
];

export function NextSteps() {
  return (
    <div className="NextSteps mx-auto flex w-full max-w-[33.75rem] flex-col gap-3 md:gap-4">
      <h3 className="NextStepsTitle text-center text-lg font-bold text-g4 md:text-xl">
        Here&rsquo;s What Happens Next:
      </h3>
      <ol className="NextStepsList flex flex-col gap-3">
        {STEPS.map((step, i) => (
          <li key={step} className="NextStep flex items-center gap-2">
            <span
              aria-hidden="true"
              className="NextStepNumber w-6 shrink-0 text-lg font-semibold text-p3 md:text-xl"
            >
              {i + 1}.
            </span>
            <span className="NextStepText text-lg text-g3">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
