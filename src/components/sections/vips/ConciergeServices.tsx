"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { duration, ease } from "@/lib/motion";

const containerVariants = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 16 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.out },
  },
};

const SERVICES = [
  "accommodation",
  "transportation",
  "culturalAccess",
  "personal",
  "lifestyle",
  "family",
] as const;

export function ConciergeServices() {
  const t = useTranslations("vips.concierge");
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-navy-900 py-16 md:py-24 lg:py-32">
      <Container className="space-y-12 md:space-y-16">
        <div className="space-y-4">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="text-h1 font-light text-cream-50">
            {t("titleLine1")}{" "}
            <span className="text-gold-500">{t("titleHighlight")}</span>
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3"
          variants={prefersReduced ? undefined : containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SERVICES.map((key) => (
            <motion.div
              key={key}
              className="space-y-3"
              variants={prefersReduced ? undefined : itemVariants}
            >
              <h3 className="text-h3 font-light text-gold-500">
                {t(`${key}.title`)}
              </h3>
              <p className="max-w-[340px] text-body font-light text-cream-50/80">
                {t(`${key}.body`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
