"use client";
// Reason: motion/react scroll reveal animations.

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { duration, ease } from "@/lib/motion";

export function ConfidentialityBlock() {
  const t = useTranslations("contact.confidentiality");
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 md:py-32">
      {/* Background image with overlay */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/contact/contact-hero.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-navy-900/80" aria-hidden />

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-[800px] flex-col items-center gap-10 text-center">

          {/* Eyebrow */}
          <motion.span
            className="text-eyebrow font-normal tracking-widest uppercase text-gold-500"
            initial={prefersReduced ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: duration.base, ease: ease.out }}
          >
            {t("eyebrow")}
          </motion.span>

          {/* Title */}
          <motion.h2
            className="text-[2rem] font-light leading-tight text-cream-50 md:text-[2.5rem]"
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: duration.base, ease: ease.out, delay: 0.05 }}
          >
            {t("titleLine1")}{" "}
            <span className="text-gold-500">{t("titleHighlight")}</span>
          </motion.h2>

          {/* Body */}
          <motion.p
            className="text-body font-light leading-relaxed text-cream-50/75"
            initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: duration.base, ease: ease.out, delay: 0.1 }}
          >
            {t("body")}
          </motion.p>

          {/* Stats */}
          <motion.div
            className="mt-4 grid w-full grid-cols-1 gap-8 border-t border-cream-50/10 pt-10 sm:grid-cols-3 sm:gap-px"
            initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: duration.base, ease: ease.out, delay: 0.15 }}
          >
            {(
              [
                { value: t("stat1Value"), label: t("stat1Label") },
                { value: t("stat2Value"), label: t("stat2Label") },
                { value: t("stat3Value"), label: t("stat3Label") },
              ] as const
            ).map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 px-4">
                <span className="text-[2.5rem] font-light leading-none text-gold-500 md:text-[3rem]">
                  {value}
                </span>
                <span className="text-eyebrow font-normal tracking-widest uppercase text-cream-50/60">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
