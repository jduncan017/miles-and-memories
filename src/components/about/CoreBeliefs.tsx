import {
  CalendarDays,
  RefreshCw,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

/*
 * "My Core Beliefs" on /about: a 30px pink icon beside a DM Sans title and a
 * paragraph. Live used inline SVGs; these are the closest lucide shapes.
 */
const BELIEFS: { Icon: LucideIcon; title: string; body: string }[] = [
  {
    Icon: CalendarDays,
    title: "I'm Obsessed With the Details You'd Rather Skip:",
    body: "Disney dining reservations, group payment tracking, visa requirements, and packing lists tailored to your destination. I handle what overwhelms most people.",
  },
  {
    Icon: UsersRound,
    title: "I'm Your Advocate, Not Your Vendor:",
    body: "I negotiate better rates, find solutions to problems, and fight for upgrades because the success of your trip is my reputation.",
  },
  {
    Icon: RefreshCw,
    title: "I Turn Setbacks Into Opportunities:",
    body: "Flight delayed? We've already rebooked your dinner reservation. Hotel overbooked? We know three better options. No matter what happens we've got your back!",
  },
  {
    Icon: Sparkles,
    title: "I'm Honest About How I Get Paid:",
    body: "I'm compensated by my industry partners, which means you get my expert service without the expert fees. No hidden costs, ever.",
  },
];

export function CoreBeliefs() {
  return (
    <div className="CoreBeliefs flex flex-col gap-6">
      <h3 className="CoreBeliefsTitle text-g3">My Core Beliefs</h3>
      <ul className="CoreBeliefsList flex flex-col gap-5">
        {BELIEFS.map(({ Icon, title, body }) => (
          <li
            key={title}
            className="CoreBelief flex flex-col gap-4 lg:flex-row lg:gap-4"
          >
            <Icon
              aria-hidden="true"
              strokeWidth={2}
              className="CoreBeliefIcon size-7.5 shrink-0 text-p3"
            />
            <div className="flex flex-col gap-2">
              <h4 className="CoreBeliefTitle text-g3 capitalize">{title}</h4>
              <p className="CoreBeliefBody text-lg text-g2">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
