"use client";
// Reason: motion/react stagger animations.

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { duration, ease } from "@/lib/motion";

const PILLARS = ["pillar1", "pillar2", "pillar3", "pillar4"] as const;

export function AboutPillars() {
  const t = useTranslations("about.pillars");

  return (
    <section className="bg-cream-50 py-16 md:py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">

          {/* Left column — body + quote */}
          <div className="space-y-12">
            <p className="text-step-body font-normal text-navy-900">
              {t("body")}
            </p>
            <p className="text-step-body font-normal text-text-muted">
              {t("quote")}
            </p>
          </div>

          {/* Right column — 4 pillars with stagger */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {PILLARS.map((key) => (
              <motion.div
                key={key}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: duration.base, ease: ease.out },
                  },
                }}
                className="border-b border-navy-900/12 py-8"
              >
                <p className="text-step-body font-bold uppercase text-navy-900">
                  {t(`${key}.title`)}
                </p>
                <p className="mt-2 text-h4 font-normal text-navy-900">
                  {t(`${key}.description`)}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
