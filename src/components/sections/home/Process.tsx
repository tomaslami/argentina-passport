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
    <section className="bg-cream-50 py-16 text-navy-900 md:py-24 lg:py-32">
      <Container className="space-y-12">
        {/* Section header */}
        <div className="space-y-4">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="text-display font-light leading-tight text-navy-900">
            {t("title")}
          </h2>
        </div>

        {/* Steps — 3-column layout: [number | title | body] */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="divide-y divide-navy-900/15"
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
              className="grid cursor-default items-center gap-6 rounded-none px-4 py-10 transition-colors duration-300 hover:bg-slate/10 md:-mx-4 md:grid-cols-[100px_1fr_1fr] md:gap-10 md:px-4"
            >
              {/* Number — gold, 64px */}
              <span className="text-h1 font-normal leading-none text-gold-500">
                {step.number}
              </span>

              {/* Title — navy, medium */}
              <h3 className="text-h3 font-normal text-navy-900">
                {t(`${step.key}.title`)}
              </h3>

              {/* Body — muted */}
              <p className="text-body-lg font-light text-text-muted">
                {t(`${step.key}.body`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA — navy bg + cream text (Figma "inverse" style) */}
        <div className="flex justify-center pt-4">
          <Link href="/process">
            <Button variant="navy" size="md">
              {t("fullProcessCta")}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
