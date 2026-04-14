"use client";
// Reason: animates counters on scroll using motion/react hooks.

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type StatKind = "text" | "counter";

type StatConfig = {
  kind: StatKind;
  valueKey: string;
  labelKey: string;
  countKey?: string;
};

const STATS: StatConfig[] = [
  {
    kind: "text",
    valueKey: "stats.languagesValue",
    labelKey: "stats.languagesLabel",
  },
  {
    kind: "text",
    valueKey: "stats.stabilityValue",
    labelKey: "stats.stabilityLabel",
  },
  {
    kind: "counter",
    valueKey: "stats.investmentValue",
    countKey: "stats.investmentCount",
    labelKey: "stats.investmentLabel",
  },
  {
    kind: "counter",
    valueKey: "stats.visaFreeValue",
    countKey: "stats.visaFreeCount",
    labelKey: "stats.visaFreeLabel",
  },
];

type CounterProps = {
  template: string;
  target: number;
};

function AnimatedCounter({ template, target }: CounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(spanRef, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(template);

  const { prefix, suffix } = useMemo(() => {
    const match = template.match(/[\d,.]+/);
    if (!match || match.index === undefined) {
      return { prefix: "", suffix: "" };
    }
    const start = match.index;
    const end = start + match[0].length;
    return { prefix: template.slice(0, start), suffix: template.slice(end) };
  }, [template]);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration: duration.slow,
      ease: ease.out,
      onUpdate(value) {
        const formatted = Math.round(value).toLocaleString();
        setDisplay(`${prefix}${formatted}${suffix}`.trim());
      },
    });

    return () => controls.stop();
  }, [isInView, prefix, suffix, target]);

  return (
    <span ref={spanRef} className="text-h2 font-light text-gold-500">
      {display}
    </span>
  );
}

type StatsBarProps = {
  className?: string;
};

export function StatsBar({ className }: StatsBarProps) {
  const t = useTranslations();

  return (
    <section className={cn("bg-navy-800 py-12 md:py-16", className)}>
      <Container>
        <div className="grid gap-10 text-center md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => {
            const label = t(stat.labelKey);
            const valueTemplate = t(stat.valueKey);
            return (
              <div key={stat.labelKey} className="flex flex-col items-center gap-3">
                {stat.kind === "counter" && stat.countKey ? (
                  <AnimatedCounter
                    template={valueTemplate}
                    target={Number(t(stat.countKey))}
                  />
                ) : (
                  <span className="text-h3 font-light text-gold-500">{valueTemplate}</span>
                )}
                <span className="text-small uppercase tracking-[0.2em] text-cream-50/80">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
