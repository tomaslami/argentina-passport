"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { duration, ease } from "@/lib/motion";

export function VipsHero() {
  const t = useTranslations("vips.header");
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[677px] items-end overflow-hidden bg-navy-900 pb-24">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute right-0 top-[100px] select-none whitespace-nowrap text-[20rem] font-extralight uppercase leading-none text-navy-700/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: prefersReduced ? 1 : 1 }}
        transition={{ duration: duration.hero, ease: ease.out, delay: 0.3 }}
      >
        {t("backgroundWord")}
      </motion.span>

      <Container className="relative space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: ease.out }}
        >
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        </motion.div>

        <motion.h1
          className="max-w-[900px] text-display font-light text-cream-50"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease: ease.out, delay: 0.1 }}
        >
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </motion.h1>

        <motion.p
          className="max-w-[600px] text-h4 font-light text-cream-50/80"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: ease.out, delay: 0.25 }}
        >
          {t("subtitle")}
        </motion.p>
      </Container>
    </section>
  );
}
