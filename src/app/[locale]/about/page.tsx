import { setRequestLocale } from "next-intl/server";

import { AboutHero } from "@/components/sections/about/Hero";
import { AboutStatement } from "@/components/sections/about/Statement";
import { AboutPillars } from "@/components/sections/about/Pillars";
import { StatsBar } from "@/components/sections/StatsBar";
import { CTABanner } from "@/components/sections/CTABanner";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <AboutStatement />
      <AboutPillars />
      <StatsBar />
      <CTABanner
        eyebrowKey="ctaBanner.beginProcess.eyebrow"
        titleKey="ctaBanner.beginProcess.title"
        highlightKey="ctaBanner.beginProcess.highlight"
        subtitleKey="ctaBanner.beginProcess.subtitle"
        ctaKey="ctaBanner.beginProcess.cta"
      />
    </>
  );
}
