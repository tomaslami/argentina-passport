"use client";
// Reason: motion/react animations on mount.

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { duration, ease } from "@/lib/motion";

export function AboutHero() {
  const t = useTranslations("about.hero");
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
      className="relative flex h-[100svh] items-end overflow-hidden bg-navy-900 pb-14 sm:pb-20 lg:pb-24"
    >
      {/* Watermark — scales to 100% section width */}
      <div
        className="pointer-events-none absolute top-[100px] w-full text-center sm:top-[140px] lg:top-[200px]"
        aria-hidden
      >
        <span
          ref={bgWordRef}
          className="select-none whitespace-nowrap font-extralight leading-none text-cream-50 opacity-5"
        >
          {t("watermark")}
        </span>
      </div>

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
