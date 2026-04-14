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
    <section className="bg-cream-50 py-24 md:py-32">
      <Container className="space-y-12">
        {/* Eyebrow + decorative vertical line */}
        <div className="flex flex-col gap-4">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <div className="h-[140px] w-px bg-navy-900/20" />
        </div>

        {/* Statement — right-aligned, full container width */}
        <motion.div
          className="text-right"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: duration.base, ease: ease.out }}
        >
          <p className="text-h1 font-light leading-tight text-navy-900 lg:text-display lg:whitespace-nowrap">
            {t("line1")}
          </p>
          <p className="text-h1 font-light leading-tight text-navy-900 lg:text-display lg:whitespace-nowrap">
            {t("line2")}
          </p>
        </motion.div>

        {/* Location badge — centered */}
        <div className="flex justify-center pt-4">
          <div className="inline-flex bg-navy-900 px-4 py-4">
            <span className="whitespace-nowrap text-step-body font-medium uppercase text-cream-50">
              {t("location")}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
