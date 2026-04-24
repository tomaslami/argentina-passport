"use client";

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
      className="relative isolate flex h-[85vh] items-end bg-navy-900 text-cream-50 md:h-[90vh] lg:h-screen"
      aria-label="Hero"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover object-[center_top] md:object-center"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(23, 53, 87, 0.10) 9.21%, #173557 100%)",
        }}
        aria-hidden
      />

      <Container className="relative z-10 pb-12 pt-16 md:pb-20 md:pt-24 lg:pb-24">
        <div className="space-y-6 md:space-y-8">
          <motion.h1
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: ease.out, delay: 0.1 }}
            className="text-h1 leading-[1.05] text-cream-50"
          >
            <span className="block font-extralight">{t("titleLine1")}</span>
            <span className="block font-medium">{t("titleLine2")}</span>
          </motion.h1>

          {/* Subtitle: fluid 13→20 */}
          <motion.p
            initial={initialFade}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.slow, ease: ease.out, delay: 0.3 }}
            className="max-w-[560px] text-body-lg font-normal text-cream-50 md:text-h4"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: ease.out, delay: 0.5 }}
          >
            <Link href="/contact">
              <Button variant="secondary" size="md" className="px-6 py-4">
                {t("cta")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
