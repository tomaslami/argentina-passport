"use client";
// Reason: Uses motion/react for staggered scroll animations.

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { cn } from "@/lib/utils";
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
          {STEPS.map((step, i) => (
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
              className={cn(
                "grid cursor-default items-start gap-3 rounded-none py-8 transition-colors duration-300 md:-mx-4 md:grid-cols-[100px_1fr_1fr] md:items-center md:gap-10 md:px-4 md:py-10 md:hover:bg-slate/10",
                // Mobile: left gold border for the first (active) step
                i === 0
                  ? "border-l-2 border-gold-500 pl-4 md:border-l-0 md:pl-4"
                  : "pl-0 md:pl-4",
              )}
            >
              {/* Number — gold */}
              <span className="text-stat font-normal leading-none text-gold-500 md:text-h1">
                {step.number}
              </span>

              {/* Title — navy */}
              <h3 className="text-h4 font-normal text-navy-900 md:text-h3">
                {t(`${step.key}.title`)}
              </h3>

              {/* Body — muted */}
              <p className="text-body font-light text-text-muted md:text-body-lg">
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
