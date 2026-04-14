"use client";
// Reason: motion/react animations on mount.

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { duration, ease } from "@/lib/motion";

export function AboutHero() {
  const t = useTranslations("about.hero");
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[677px] items-end bg-navy-900 pb-24">
      {/* Watermark — 408px, Thin (200), cream-50, opacity 5% */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[200px] -translate-x-1/2 select-none whitespace-nowrap text-[25.5rem] font-extralight leading-none text-cream-50 opacity-5"
      >
        {t("watermark")}
      </span>

      <Container className="relative space-y-6">
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>

        <motion.h1
          className="max-w-[1131px] text-display font-normal leading-tight text-cream-50"
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease: ease.out, delay: 0.1 }}
        >
          {t("title")}
        </motion.h1>

        <motion.p
          className="text-h4 font-normal text-cream-50"
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
