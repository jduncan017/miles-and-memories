import type { Metadata } from "next";
import Body from "~/content/legal/privacy.mdx";
import { LegalPage, legalProse } from "~/components/legal/LegalPage";
import { getLegalPage } from "~/lib/legal";

const page = getLegalPage("privacy");

export const metadata: Metadata = {
  title: { absolute: page.seoTitle },
  description: page.description,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage page={page}>
      <Body components={legalProse} />
    </LegalPage>
  );
}
