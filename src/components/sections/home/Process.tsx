"use client";
// Reason: Uses motion/react for staggered scroll animations.

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ease, duration } from "@/lib/motion";

const STEPS = [
  { key: "step1", number: "01" },
  { key: "step2", number: "02" },
  { key: "step3", number: "03" },
  { key: "step4", number: "04" },
] as const;

export function HowItWorks() {
  const t = useTranslations("home.process");

  return (
    <section className="bg-cream-50 py-24 text-navy-900 md:py-32">
      <Container className="space-y-12">
        {/* Section header */}
        <div className="space-y-4">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="text-display font-light leading-tight text-navy-900">
            {t("title")}
          </h2>
        </div>

        {/* Steps — 3-column layout per Figma: [number | title | body] */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="divide-y divide-navy-900/12"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.key}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: duration.base, ease: ease.out },
                },
              }}
              className="grid items-start gap-6 py-10 md:grid-cols-[80px_1fr_1fr] md:gap-8"
            >
              {/* Number — gold, 36px */}
              <span className="text-step font-light text-gold-500">
                {step.number}
              </span>

              {/* Title — navy, 36px medium */}
              <h3 className="text-step font-medium text-navy-900">
                {t(`${step.key}.title`)}
              </h3>

              {/* Body — muted, 24px */}
              <p className="text-step-body font-light text-text-muted">
                {t(`${step.key}.body`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA — navy bg + cream text (Figma "inverse" style) */}
        <div className="flex justify-center pt-4">
          <Link href="/process">
            <Button variant="inverse" size="lg">
              {t("fullProcessCta")}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
