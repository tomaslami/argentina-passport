import { setRequestLocale } from "next-intl/server";

import { InvestmentsHero } from "@/components/sections/investments/InvestmentsHero";
import { StrategicAllocation } from "@/components/sections/investments/StrategicAllocation";
import { InvestmentSupport } from "@/components/sections/investments/InvestmentSupport";
import { CTABanner } from "@/components/sections/CTABanner";

type InvestmentsPageProps = {
  params: { locale: string };
};

export default function InvestmentsPage({ params }: InvestmentsPageProps) {
  const { locale } = params;
  setRequestLocale(locale);

  return (
    <>
      <InvestmentsHero />
      <StrategicAllocation />
      <InvestmentSupport />
      <CTABanner
        eyebrowKey="ctaBanner.startInvesting.eyebrow"
        titleKey="ctaBanner.startInvesting.title"
        highlightKey="ctaBanner.startInvesting.highlight"
        ctaKey="ctaBanner.startInvesting.cta"
      />
    </>
  );
}
