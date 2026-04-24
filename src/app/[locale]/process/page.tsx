import { setRequestLocale } from "next-intl/server";

import { ProcessHero } from "@/components/sections/process/ProcessHero";
import { ProcessStep } from "@/components/sections/process/ProcessStep";
import { CTABanner } from "@/components/sections/CTABanner";
import { Container } from "@/components/ui/Container";

type ProcessPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProcessPage({ params }: ProcessPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProcessHero />

      <section className="bg-cream-50 py-16 md:py-24 lg:py-32">
        <Container>
          <div className="flex flex-col gap-16 md:gap-24 lg:gap-40">
            <ProcessStep
              number="01"
              reverse={false}
              imageSrc="/images/process/consultation.jpg"
              imageAlt="Leather notebook, pen and whisky glass on an elegant desk"
              stepLabelKey="step1.stepLabel"
              titleKey="step1.title"
              body1Key="step1.body1"
              body2Key="step1.body2"
              priority
            />

            <ProcessStep
              number="02"
              reverse={true}
              imageSrc="/images/process/investment.jpg"
              imageAlt="Aerial night view of a city or renewable energy infrastructure"
              stepLabelKey="step2.stepLabel"
              titleKey="step2.title"
              body1Key="step2.body1"
              body2Key="step2.body2"
            />

            <ProcessStep
              number="03"
              reverse={false}
              imageSrc="/images/process/legal-filing.jpg"
              imageAlt="Argentine official document with embossed gold seal from the Ministry of Foreign Affairs"
              stepLabelKey="step3.stepLabel"
              titleKey="step3.title"
              body1Key="step3.body1"
              body2Key="step3.body2"
            />

            <ProcessStep
              number="04"
              reverse={true}
              imageSrc="/images/process/passport.jpg"
              imageAlt="Blue Argentine Mercosur passport on a light surface"
              stepLabelKey="step4.stepLabel"
              titleKey="step4.title"
              body1Key="step4.body1"
              body2Key="step4.body2"
            />
          </div>
        </Container>
      </section>

      <CTABanner
        eyebrowKey="ctaBanner.scheduleConsultation.eyebrow"
        titleKey="ctaBanner.scheduleConsultation.title"
        highlightKey="ctaBanner.scheduleConsultation.highlight"
        ctaKey="ctaBanner.scheduleConsultation.cta"
      />
    </>
  );
}
