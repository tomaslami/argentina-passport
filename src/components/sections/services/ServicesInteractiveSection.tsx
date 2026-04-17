"use client";
// Reason: useScroll + scroll-driven active step state with AnimatePresence transitions.

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";
import { useTranslations } from "next-intl";

import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { cn } from "@/lib/utils";
import { duration, ease } from "@/lib/motion";
import { IconScales } from "@/components/ui/icons/IconScales";
import { IconBriefcaseBrand } from "@/components/ui/icons/IconBriefcase";
import { IconShieldBrand } from "@/components/ui/icons/IconShield";
import { ServiceBlock } from "./ServiceBlock";

// ─── Step metadata ────────────────────────────────────────────────────────────

const STEP_NUMS = ["01", "02", "03"] as const;
const STEP_KEYS = ["legal", "investment", "vip"] as const;
const STEP_DARK = [false, true, false] as const; // false = cream bg, true = navy bg
const ITEM_COUNT = 6;

type StepKey = (typeof STEP_KEYS)[number];

function mobileItemKeys(key: StepKey): readonly string[] {
  return Array.from({ length: ITEM_COUNT }, (_, i) => `${key}.item${i + 1}`);
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ServicesInteractiveSection() {
  const t = useTranslations("services");
  const prefersReduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Progress 0→1 as the wrapper scrolls through its 300vh height.
  // With offset "start start" → "end end" on a 300vh wrapper inside a 100vh viewport,
  // the progress goes 0→1 over 200vh of actual scroll — giving ~66vh per step.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Sync scroll progress to discrete step index.
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const next = v < 1 / 3 ? 0 : v < 2 / 3 ? 1 : 2;
      setActiveStep((prev) => (prev !== next ? next : prev));
    });
  }, [scrollYProgress]);

  // Click a step label → smooth-scroll to the center of that step's range.
  const handleNavClick = (idx: number) => {
    if (!wrapperRef.current) return;
    const wrapperTop =
      wrapperRef.current.getBoundingClientRect().top + window.scrollY;
    const scrollRange =
      wrapperRef.current.offsetHeight - window.innerHeight;
    // Centers of each third: ~1/6, 3/6, 5/6
    const centers = [1 / 6, 3 / 6, 5 / 6];
    window.scrollTo({
      top: wrapperTop + centers[idx] * scrollRange,
      behavior: prefersReduced ? "instant" : "smooth",
    });
  };

  const key = STEP_KEYS[activeStep];
  const isDark = STEP_DARK[activeStep];
  const textColor = isDark ? "text-cream-50" : "text-navy-900";

  return (
    <>
      {/* ── Desktop: pinned two-column scroll reveal (≥1024px) ── */}
      <div
        ref={wrapperRef}
        className="relative hidden lg:block"
        style={{ height: "300vh" }}
      >
        {/* This div is pinned for the full 300vh scroll distance */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* pt-20 offsets the 80px sticky header so content is never hidden behind it */}
          <div className="flex h-full pt-20">

            {/* ── LEFT COLUMN (38%) — compact title + step navigation ── */}
            <div className="flex h-full w-[38%] flex-col justify-center gap-10 bg-navy-900 px-12 xl:px-16">
              <SectionEyebrow>{t("hero.eyebrow")}</SectionEyebrow>

              {/* Compact heading — clamp keeps it proportional to the 38% column */}
              <h2 className="text-[clamp(1.75rem,2.4vw,2.5rem)] font-light leading-[1.15] text-cream-50">
                {t("hero.title")}
              </h2>

              {/* Step navigation — clicking smooth-scrolls to that step */}
              <nav className="flex flex-col gap-6" aria-label="Service steps">
                {STEP_KEYS.map((stepKey, i) => (
                  <button
                    key={stepKey}
                    type="button"
                    onClick={() => handleNavClick(i)}
                    aria-current={activeStep === i ? "step" : undefined}
                    className={cn(
                      "flex items-baseline gap-5 text-start transition-all duration-300",
                      activeStep === i
                        ? "opacity-100"
                        : "opacity-30 hover:opacity-60",
                    )}
                  >
                    <span
                      className={cn(
                        "text-h2 font-light leading-none transition-colors duration-300",
                        activeStep === i ? "text-gold-500" : "text-cream-50",
                      )}
                    >
                      {STEP_NUMS[i]}
                    </span>
                    <span className="text-h4 font-light text-cream-50">
                      {t(`${stepKey}.title`)}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* ── RIGHT COLUMN (62%) — animated service content ── */}
            <div
              className={cn(
                "flex h-full w-[62%] items-center overflow-hidden transition-colors duration-500",
                isDark ? "bg-navy-900" : "bg-cream-50",
              )}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? {} : { opacity: 0, y: -16 }}
                  transition={{ duration: duration.base, ease: ease.out }}
                  className="flex h-full w-full flex-col justify-center gap-7 px-12 xl:px-16"
                >
                  {/* Icon */}
                  {activeStep === 0 && (
                    <IconScales size={64} className="text-gold-500" />
                  )}
                  {activeStep === 1 && (
                    <IconBriefcaseBrand size={64} className="text-gold-500" />
                  )}
                  {activeStep === 2 && (
                    <IconShieldBrand size={64} className="text-gold-500" />
                  )}

                  {/* Service title */}
                  <h3
                    className={cn(
                      "text-card-title font-normal leading-tight",
                      textColor,
                    )}
                  >
                    {t(`${key}.title`)}
                  </h3>

                  {/* Service description */}
                  <p className={cn("text-h4 font-normal", textColor)}>
                    {t(`${key}.body`)}
                  </p>

                  {/* Inclusions list */}
                  <div className="flex flex-col gap-4">
                    <p className="text-[2rem] font-bold text-gold-500">
                      {t(`${key}.listTitle`)}
                    </p>
                    <ul className="flex flex-col gap-3">
                      {Array.from({ length: ITEM_COUNT }, (_, i) => (
                        <li key={i} className="flex items-baseline gap-3">
                          <span
                            className="shrink-0 text-gold-500"
                            aria-hidden
                          >
                            •
                          </span>
                          <span
                            className={cn("text-body-lg font-normal", textColor)}
                          >
                            {t(`${key}.item${i + 1}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: stacked service blocks (<1024px) ── */}
      <div className="lg:hidden">
        {STEP_KEYS.map((stepKey, i) => (
          <ServiceBlock
            key={stepKey}
            variant={STEP_DARK[i] ? "dark" : "light"}
            layout={i === 1 ? "content-right" : "content-left"}
            icon={
              i === 0 ? (
                <IconScales size={80} className="text-gold-500" />
              ) : i === 1 ? (
                <IconBriefcaseBrand size={80} className="text-gold-500" />
              ) : (
                <IconShieldBrand size={80} className="text-gold-500" />
              )
            }
            titleKey={`${stepKey}.title`}
            bodyKey={`${stepKey}.body`}
            listTitleKey={`${stepKey}.listTitle`}
            itemKeys={mobileItemKeys(stepKey)}
            namespace="services"
          />
        ))}
      </div>
    </>
  );
}
