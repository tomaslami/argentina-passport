"use client";
// Reason: ResizeObserver to scale the background watermark to 100% section width.

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { duration, ease } from "@/lib/motion";

export function ContactHero() {
  const t = useTranslations("contact.header");
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const bgWordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = bgWordRef.current;
    const container = sectionRef.current;
    if (!el || !container) return;

    const fit = () => {
      el.style.fontSize = "200px";
      el.style.fontSize = `${(container.clientWidth / el.offsetWidth) * 200}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-end overflow-hidden bg-navy-900 pb-16 md:pb-20"
    >
      {/* Watermark */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center"
        aria-hidden
      >
        <motion.span
          ref={bgWordRef}
          className="select-none whitespace-nowrap font-extralight uppercase leading-none text-navy-700 opacity-40"
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: duration.hero, ease: ease.out, delay: 0.3 }}
        >
          {t("backgroundWord")}
        </motion.span>
      </div>

      <Container className="relative z-10 flex flex-col gap-5">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: ease.out }}
        >
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        </motion.div>

        <motion.h1
          className="text-h1 font-light leading-[1.05] text-cream-50"
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease: ease.out, delay: 0.1 }}
        >
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </motion.h1>

        <motion.p
          className="max-w-xl text-body-lg font-light text-cream-50/70"
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
