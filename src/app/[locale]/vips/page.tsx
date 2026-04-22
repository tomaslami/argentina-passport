import { setRequestLocale } from "next-intl/server";

import { VipsHero } from "@/components/sections/vips/VipsHero";
import { ExperiencesGrid } from "@/components/sections/vips/ExperiencesGrid";
import { ConciergeServices } from "@/components/sections/vips/ConciergeServices";
import { QuoteBlock } from "@/components/sections/vips/QuoteBlock";
import { CTABanner } from "@/components/sections/CTABanner";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function VipsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <VipsHero />
      <ExperiencesGrid />
      <ConciergeServices />
      <QuoteBlock />
      <CTABanner
        eyebrowKey="ctaBanner.experienceArgentina.eyebrow"
        titleKey="ctaBanner.experienceArgentina.title"
        highlightKey="ctaBanner.experienceArgentina.highlight"
        ctaKey="ctaBanner.experienceArgentina.cta"
      />
    </>
  );
}
