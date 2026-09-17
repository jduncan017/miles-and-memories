import { Mail, Phone } from "lucide-react";
import { SITE } from "~/lib/site";

/*
 * "Prefer Email Instead?" on /contact: phone and email side by side, split by
 * a pink hairline. Live let the row overflow a phone screen; here it stacks.
 */
const linkClass =
  "ContactRowLink flex items-center gap-2 rounded-xs text-lg text-g4 transition-colors hover:text-p3 focus-visible:ring-2 focus-visible:ring-p3 focus-visible:outline-none";

export function ContactRow() {
  return (
    <div className="ContactRow flex flex-col items-center gap-3 text-center">
      <div className="flex flex-col gap-1">
        <h3 className="ContactRowTitle text-xl font-semibold text-g4">
          Prefer Email Instead?
        </h3>
        <p className="ContactRowLead text-base text-g4">Reach out directly:</p>
      </div>
      <div className="ContactRowLinks flex flex-col items-center gap-2 sm:flex-row sm:gap-2.5">
        <a href={`tel:${SITE.phoneE164}`} className={linkClass}>
          <Phone aria-hidden="true" className="size-6 text-p3" />
          {SITE.phone}
        </a>
        <span
          aria-hidden="true"
          className="ContactRowDivider hidden h-7.5 w-0.5 bg-p3 sm:block"
        />
        <a href={`mailto:${SITE.email}`} className={`${linkClass} break-all`}>
          <Mail aria-hidden="true" className="size-6 shrink-0 text-p3" />
          {SITE.email}
        </a>
      </div>
    </div>
  );
}
