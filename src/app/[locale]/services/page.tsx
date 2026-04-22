import { setRequestLocale } from "next-intl/server";

import { ServicesInteractiveSection } from "@/components/sections/services/ServicesInteractiveSection";
import { CTABanner } from "@/components/sections/CTABanner";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServicesInteractiveSection />
      <CTABanner
        eyebrowKey="ctaBanner.getStarted.eyebrow"
        titleKey="ctaBanner.getStarted.title"
        highlightKey="ctaBanner.getStarted.highlight"
        ctaKey="ctaBanner.getStarted.cta"
      />
    </>
  );
}
