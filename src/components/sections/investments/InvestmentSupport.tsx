"use client";
// Reason: motion/react stagger animations on scroll.

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { duration, ease } from "@/lib/motion";

const PILLARS = ["vetting", "structuring", "compliance", "exit"] as const;

export function InvestmentSupport() {
  const t = useTranslations("investments.support");
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-navy-900 py-16 md:py-24 lg:py-32">
      <Container className="space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="text-display font-light text-cream-50">
            {t("titleLine1")}{" "}
            <span className="text-gold-500">{t("titleHighlight")}</span>
          </h2>
        </div>

        {/* 2×2 pillars grid */}
        <motion.div
          className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-x-24 lg:gap-y-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {PILLARS.map((key) => (
            <motion.div
              key={key}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: duration.base, ease: ease.out },
                },
              }}
              className="space-y-4"
            >
              <h3 className="text-stat font-light text-gold-500">
                {t(`${key}.title`)}
              </h3>
              <p className="text-h3 font-light text-cream-50/80 lg:max-w-[420px]">
                {t(`${key}.body`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
