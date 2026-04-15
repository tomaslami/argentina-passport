"use client";
// Reason: motion/react animations on mount.

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { duration, ease } from "@/lib/motion";

export function ProcessHero() {
  const t = useTranslations("process.header");
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[677px] items-end overflow-hidden bg-navy-900 pb-24">
      {/* Watermark — 408px, UltraLight, navy-700/40, positioned behind content */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[160px] -translate-x-1/2 select-none whitespace-nowrap text-[25.5rem] font-extralight leading-none text-navy-700/40 uppercase"
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.hero, ease: ease.out, delay: 0.3 }}
      >
        {t("backgroundWord")}
      </motion.span>

      <Container className="relative space-y-6">
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>

        <motion.h1
          className="max-w-[1062px] text-display font-light text-cream-50"
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease: ease.out, delay: 0.1 }}
        >
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </motion.h1>

        <motion.p
          className="text-h4 font-light text-cream-50"
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.slow, ease: ease.out, delay: 0.3 }}
        >
          {t("subtitle")}
        </motion.p>
      </Container>
    </section>
  );
}
