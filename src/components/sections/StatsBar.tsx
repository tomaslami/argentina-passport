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
  /** gold = accent color; cream = neutral light */
  color: "gold" | "cream";
};

const STATS: StatConfig[] = [
  {
    kind: "text",
    valueKey: "stats.languagesValue",
    labelKey: "stats.languagesLabel",
    color: "gold",
  },
  {
    kind: "text",
    valueKey: "stats.stabilityValue",
    labelKey: "stats.stabilityLabel",
    color: "gold",
  },
  {
    kind: "counter",
    valueKey: "stats.investmentValue",
    countKey: "stats.investmentCount",
    labelKey: "stats.investmentLabel",
    color: "gold",
  },
  {
    kind: "counter",
    valueKey: "stats.visaFreeValue",
    countKey: "stats.visaFreeCount",
    labelKey: "stats.visaFreeLabel",
    color: "gold",
  },
];

type CounterProps = {
  template: string;
  target: number;
  className?: string;
};

function AnimatedCounter({ template, target, className }: CounterProps) {
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
    <span ref={spanRef} className={className}>
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
    <section className={cn("bg-navy-800 py-6 md:py-8", className)}>
      <Container>
        <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:gap-y-0">
          {STATS.map((stat, index) => {
            const label = t(stat.labelKey);
            const valueTemplate = t(stat.valueKey);
            const isLast = index === STATS.length - 1;
            const valueClass = cn(
              "text-h2 font-normal leading-none",
              "text-gold-500",
            );

            return (
              <div
                key={stat.labelKey}
                className={cn(
                  "flex flex-col items-center gap-2 text-center",
                  !isLast && "lg:border-r lg:border-cream-50/10",
                )}
              >
                {stat.kind === "counter" && stat.countKey ? (
                  <AnimatedCounter
                    template={valueTemplate}
                    target={Number(t(stat.countKey))}
                    className={valueClass}
                  />
                ) : (
                  <span className={valueClass}>{valueTemplate}</span>
                )}
                <span className="text-eyebrow uppercase tracking-[0.1em] text-cream-50/55">
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
