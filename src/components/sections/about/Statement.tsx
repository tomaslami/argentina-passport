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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[max-content_1fr] md:gap-12 lg:gap-20">
          {/* Left: eyebrow + decorative vertical line (line hidden on mobile) */}
          <div className="flex flex-col gap-4">
            <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
            <div className="hidden h-[140px] w-px bg-navy-900/20 md:block" />
          </div>

          {/* Right: large quote — left-aligned on mobile, right-aligned on desktop */}
          <motion.div
            className="text-start md:self-end md:text-right"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: duration.base, ease: ease.out }}
          >
            <p className="text-h2 font-light leading-[1.15] text-navy-900">
              {t("line1")}
            </p>
            <p className="text-h2 font-light leading-[1.15] text-navy-900">
              {t("line2")}
            </p>
          </motion.div>
        </div>

        {/* Badge on line — horizontal rule passing through the button */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: duration.base, ease: ease.out, delay: 0.15 }}
        >
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-navy-900" />
          <div className="relative bg-navy-900 px-6 py-3">
            <span className="whitespace-nowrap text-small font-medium uppercase tracking-widest text-cream-50">
              {t("location")}
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
