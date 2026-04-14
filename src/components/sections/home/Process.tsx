"use client";
// Reason: Uses motion/react stagger animations for steps.

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const steps = [
  { key: "step1", number: "01" },
  { key: "step2", number: "02" },
  { key: "step3", number: "03" },
  { key: "step4", number: "04" },
] as const;

export function HowItWorks() {
  const t = useTranslations("home.process");

  return (
    <section className="bg-cream-50 py-24 text-navy-900 md:py-32">
      <Container className="space-y-12">
        <div className="space-y-4 text-start">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="text-h1 font-light text-balance">{t("title")}</h2>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="divide-y divide-navy-900/10 rounded-sm border border-navy-900/10 bg-white/40"
        >
          {steps.map((step) => (
            <motion.div
              key={step.key}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="flex flex-col gap-4 px-6 py-8 md:flex-row md:items-start md:gap-10"
            >
              <span className="text-h1 font-light text-gold-500">{step.number}</span>
              <div className="space-y-2">
                <h3 className="text-h3 font-light">{t(`${step.key}.title`)}</h3>
                <p className="text-body text-text-muted max-w-3xl">{t(`${step.key}.body`)}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="flex justify-start">
          <Link href="/process">
            <Button variant="secondary" size="lg">
              {t("fullProcessCta")}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
