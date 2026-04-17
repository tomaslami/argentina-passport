"use client";
// Reason: Uses motion/react for hero entrance animations and useReducedMotion hook.

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ease, duration } from "@/lib/motion";

export function HomeHero() {
  const t = useTranslations("home.hero");
  const prefersReducedMotion = useReducedMotion();

  const initial = prefersReducedMotion ? undefined : { opacity: 0, y: 24 };
  const initialFade = prefersReducedMotion ? undefined : { opacity: 0 };

  return (
    <section
      className="relative isolate flex min-h-screen items-end bg-navy-900 text-cream-50"
      aria-label="Hero"
    >
      {/*
        Background: place /public/images/home/hero-skyline.jpg (1920×1080, Buenos Aires skyline at dusk).
        Once available, replace this comment with:
          <Image src="/images/home/hero-skyline.jpg" alt="Buenos Aires skyline at dusk"
            fill priority className="object-cover" sizes="100vw" />
      */}

      {/* Gradient overlay — Figma: top 10% navy → bottom solid navy */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[rgba(23,53,87,0.1)] via-navy-900/70 to-navy-900"
        aria-hidden
      />

      <Container className="relative z-10 py-24">
        <div className="max-w-3xl space-y-8">
          {/* H1 semántico — una sola etiqueta, dos weights como en el Figma */}
          <motion.h1
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: ease.out, delay: 0.1 }}
            className="text-display leading-tight"
          >
            <span className="block font-extralight text-cream-50">
              {t("titleLine1")}
            </span>
            <span className="block font-medium text-gold-500">
              {t("titleLine2")}
            </span>
          </motion.h1>

          <motion.p
            initial={initialFade}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.slow, ease: ease.out, delay: 0.3 }}
            className="max-w-[560px] text-body-lg font-light text-cream-50/85"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: ease.out, delay: 0.5 }}
          >
            <Link href="/contact">
              {/* secondary: borde blanco + texto blanco — igual al Figma */}
              <Button variant="secondary" size="lg">
                {t("cta")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
