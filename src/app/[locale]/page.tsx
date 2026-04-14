import { setRequestLocale } from "next-intl/server";

import { CTABanner } from "@/components/sections/CTABanner";
import { StatsBar } from "@/components/sections/StatsBar";
import { HomeHero } from "@/components/sections/home/Hero";
import { IntroStatement } from "@/components/sections/home/Intro";
import { ThreeServices } from "@/components/sections/home/Services";
import { HowItWorks } from "@/components/sections/home/Process";
import { assetExists } from "@/lib/assets";

type HomePageProps = {
  params: { locale: string };
};

export default function HomePage({ params }: HomePageProps) {
  const { locale } = params;
  setRequestLocale(locale);

  const heroImageAvailable = assetExists("images/home/hero-skyline.jpg");
  const serviceImages = {
    card1: assetExists("images/home/legal.jpg"),
    card2: assetExists("images/home/investment.jpg"),
    card3: assetExists("images/home/concierge.jpg"),
  } as const;
  const ctaImageAvailable = assetExists("images/cta/patagonia-lake.jpg");

  return (
    <>
      <HomeHero hasBackgroundImage={heroImageAvailable} />
      <IntroStatement />
      <ThreeServices availableImages={serviceImages} />
      <HowItWorks />
      <StatsBar />
      <CTABanner
        eyebrowKey="ctaBanner.beginProcess.eyebrow"
        titleKey="ctaBanner.beginProcess.title"
        highlightKey="ctaBanner.beginProcess.highlight"
        subtitleKey="ctaBanner.beginProcess.subtitle"
        ctaKey="ctaBanner.beginProcess.cta"
        backgroundImage={ctaImageAvailable ? "/images/cta/patagonia-lake.jpg" : undefined}
      />
    </>
  );
}