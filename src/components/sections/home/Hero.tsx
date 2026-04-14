"use client";
// Reason: Uses motion/react for hero entrance animations.

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type HomeHeroProps = {
  hasBackgroundImage: boolean;
  imageSrc?: string;
};

const heroImageDefault = "/images/home/hero-skyline.jpg";

export function HomeHero({
  hasBackgroundImage,
  imageSrc = heroImageDefault,
}: HomeHeroProps) {
  const t = useTranslations("home.hero");
  const prefersReducedMotion = useReducedMotion();

  const titleAnimation = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0 };

  const initialTitle = prefersReducedMotion ? undefined : { opacity: 0, y: 24 };
  const initialButton = prefersReducedMotion ? undefined : { opacity: 0, y: 16 };

  return (
    <section className="relative isolate flex min-h-screen items-end bg-navy-900 text-cream-50">
      {hasBackgroundImage ? (
        <Image
          src={imageSrc}
          alt="Buenos Aires skyline at dusk"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-navy-900/30" aria-hidden />
      <Container className="relative z-10 py-24">
        <div className="max-w-3xl space-y-6">
          <div className="space-y-2">
            <motion.h1
              initial={initialTitle}
              animate={titleAnimation}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-h1 font-light text-cream-50 leading-tight"
            >
              {t("titleLine1")}
            </motion.h1>
            <motion.h1
              initial={initialTitle}
              animate={titleAnimation}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="text-h1 font-light text-gold-500 leading-tight"
            >
              {t("titleLine2")}
            </motion.h1>
          </div>
          <motion.p
            initial={prefersReducedMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="max-w-2xl text-body-lg text-cream-50/85"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            initial={initialButton}
            animate={titleAnimation}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="pt-4"
          >
            <Link href="/contact">
              <Button size="lg">{t("cta")}</Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
