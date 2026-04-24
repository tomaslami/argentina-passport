"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";

const ease = [0.22, 1, 0.36, 1] as const;

export function IntroStatement() {
  const t = useTranslations("home.intro");

  return (
    <section className="bg-cream-50 py-16 text-navy-900 md:py-24 lg:py-32">
      <Container className="grid gap-10 md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] md:gap-16">
        <motion.h2
          className="text-h2 font-light leading-[1.15]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease }}
        >
          {t("title")}
        </motion.h2>

        <motion.p
          className="text-body-lg font-light text-text-muted text-balance md:self-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease, delay: 0.08 }}
        >
          {t("body")}
        </motion.p>
      </Container>
    </section>
  );
}
