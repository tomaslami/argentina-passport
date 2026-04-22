"use client";
// Reason: motion/react scroll reveal animations.

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { duration, ease } from "@/lib/motion";

export function AboutStatement() {
  const t = useTranslations("about.statement");

  return (
    <section className="bg-cream-50 py-16 md:py-24 lg:py-32">
      <Container className="flex flex-col gap-16 md:gap-20">

        {/* Top row: eyebrow + vertical line | quote right-aligned */}
        <div className="grid grid-cols-[max-content_1fr] gap-12 lg:gap-20">
          {/* Left: eyebrow + decorative vertical line */}
          <div className="flex flex-col gap-4">
            <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
            <div className="h-[140px] w-px bg-navy-900/20" />
          </div>

          {/* Right: large quote, self-end so it aligns to bottom of the left column */}
          <motion.div
            className="self-end text-right"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: duration.base, ease: ease.out }}
          >
            <p className="text-h1 font-light leading-[1.1] text-navy-900 md:text-[2.75rem] lg:text-[3.5rem] xl:text-display xl:whitespace-nowrap">
              {t("line1")}
            </p>
            <p className="text-h1 font-light leading-[1.1] text-navy-900 md:text-[2.75rem] lg:text-[3.5rem] xl:text-display xl:whitespace-nowrap">
              {t("line2")}
            </p>
          </motion.div>
        </div>

        {/* Badge — centered */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: duration.base, ease: ease.out, delay: 0.15 }}
        >
          <div className="bg-navy-900 px-6 py-3">
            <span className="whitespace-nowrap text-small font-medium uppercase tracking-widest text-cream-50">
              {t("location")}
            </span>
          </div>
        </motion.div>

        {/* Bottom divider */}
        <div className="border-t border-navy-900/12" />
      </Container>
    </section>
  );
}
