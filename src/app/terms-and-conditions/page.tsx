import type { Metadata } from "next";
import Body from "~/content/legal/terms-and-conditions.mdx";
import { LegalPage, legalProse } from "~/components/legal/LegalPage";
import { getLegalPage } from "~/lib/legal";

const page = getLegalPage("terms-and-conditions");

export const metadata: Metadata = {
  title: { absolute: page.seoTitle },
  description: page.description,
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <LegalPage page={page}>
      <Body components={legalProse} />
    </LegalPage>
  );
}
