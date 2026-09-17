import { Button } from "~/components/Button";

/*
 * The bordered "see what this trip actually looks like" panel that closes a
 * guide's body and links to its travel-tips story. Same chrome as a Panel, but
 * it keeps its border on phones (live does), with the copy centred.
 *
 * Measured off live: a 36px Playfair regular h2 in g3, a 20px body and the
 * primary button 40px below.
 */
export function GuideLinkPanel({
  title,
  body,
  label,
  href,
}: {
  title: string;
  body: string;
  label: string;
  href: string;
}) {
  return (
    <aside className="GuideLinkPanel flex flex-col items-center gap-10 border border-g1 bg-n1 px-6 py-10 text-center shadow-theme-sm md:p-20">
      <div className="flex flex-col items-center gap-4">
        <h2 className="GuideLinkPanelTitle max-w-220 text-[2rem] font-normal text-g3 capitalize lg:text-[2.25rem]">
          {title}
        </h2>
        <p className="GuideLinkPanelBody max-w-146 text-lg text-g3">{body}</p>
      </div>
      <Button href={href}>{label}</Button>
    </aside>
  );
}
