"use client";
// Reason: motion/react stagger animations on scroll.

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { duration, ease } from "@/lib/motion";

const ROWS = ["realEstate", "energy", "business"] as const;

type InvestmentRowProps = {
  name: string;
  range: string;
  returnLabel: string;
  returnValue: string;
  timelineLabel: string;
  timelineValue: string;
  rangeLabel: string;
};

function DataCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 md:gap-2">
      <span className="text-h4 font-light uppercase tracking-[0.08em] text-gold-500">
        {label}
      </span>
      <span className="text-h3 font-light text-navy-900">{value}</span>
    </div>
  );
}

function InvestmentRow({
  name,
  range,
  rangeLabel,
  returnLabel,
  returnValue,
  timelineLabel,
  timelineValue,
}: InvestmentRowProps) {
  return (
    <div className="grid grid-cols-1 items-start gap-6 border-t border-navy-900/12 py-10 lg:grid-cols-[280px_1fr] lg:items-center lg:gap-12">
      {/* Category name */}
      <p className="text-stat font-light text-navy-900">{name}</p>

      {/* Data cells — inline on desktop, stacked on mobile */}
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-12 lg:gap-16">
        <DataCell label={rangeLabel} value={range} />
        <DataCell label={returnLabel} value={returnValue} />
        <DataCell label={timelineLabel} value={timelineValue} />
      </div>
    </div>
  );
}

export function StrategicAllocation() {
  const t = useTranslations("investments.table");
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-cream-50 py-24 md:py-32">
      <Container>
        {/* Section title */}
        <h2 className="text-display font-light text-navy-900">
          {t("title")}
        </h2>

        {/* Investment rows */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-8"
        >
          {ROWS.map((rowKey) => (
            <motion.div
              key={rowKey}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: duration.base, ease: ease.out },
                },
              }}
            >
              <InvestmentRow
                name={t(`${rowKey}.name`)}
                range={t(`${rowKey}.range`)}
                rangeLabel={t("headerRange")}
                returnLabel={t("headerReturn")}
                returnValue={t(`${rowKey}.return`)}
                timelineLabel={t("headerTimeline")}
                timelineValue={t(`${rowKey}.timeline`)}
              />
            </motion.div>
          ))}

          {/* Minimum Requirement row */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: duration.base, ease: ease.out },
              },
            }}
            className="border-t border-navy-900/12 pt-10"
          >
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Left — label + amount + CTA */}
              <div className="flex flex-col items-start gap-6">
                <span className="text-h4 font-light uppercase tracking-[0.08em] text-gold-500">
                  {t("minimumLabel")}
                </span>
                <p className="text-stat font-light text-navy-900">
                  {t("minimumValue")}
                </p>
                <Link href="/contact">
                  <Button size="lg">{t("minimumCta")}</Button>
                </Link>
              </div>

              {/* Right — description */}
              <p className="text-body font-light text-text-muted lg:self-end">
                {t("minimumDescription")}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
