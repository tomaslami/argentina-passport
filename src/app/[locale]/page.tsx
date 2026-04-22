import { setRequestLocale } from "next-intl/server";

import { CTABanner } from "@/components/sections/CTABanner";
import { StatsBar } from "@/components/sections/StatsBar";
import { HomeHero } from "@/components/sections/home/Hero";
import { IntroStatement } from "@/components/sections/home/Intro";
import { ThreeServices } from "@/components/sections/home/Services";
import { HowItWorks } from "@/components/sections/home/Process";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomeHero />
      <IntroStatement />
      <ThreeServices />
      <HowItWorks />
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
