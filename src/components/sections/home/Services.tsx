"use client";
// Reason: GSAP ScrollTrigger requires browser APIs + motion/react hooks.

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { duration, ease } from "@/lib/motion";

const CARD_KEYS = ["card1", "card2", "card3"] as const;
type CardKey = (typeof CARD_KEYS)[number];
const BULLETS = ["bullet1", "bullet2", "bullet3", "bullet4"] as const;
const NUMBERS = ["01", "02", "03"] as const;
const TOTAL_LABEL = `0${CARD_KEYS.length}`;

// Position for each stacked number in the left column.
const NUM_POSITION = [
  "top-0",
  "top-1/2 -translate-y-1/2",
  "bottom-[6%]",
] as const;

export function ThreeServices() {
  const t = useTranslations("home.services");
  const prefersReduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    if (!sectionRef.current || !pinRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      let lastIdx = 0;

      // Initial states: panels 1 & 2 hidden below; numbers 2 & 3 dimmed.
      gsap.set([contentRefs.current[1], contentRefs.current[2]], {
        autoAlpha: 0,
        y: 20,
      });
      gsap.set([imageRefs.current[1], imageRefs.current[2]], {
        autoAlpha: 0,
        y: 20,
      });
      gsap.set([numRefs.current[1], numRefs.current[2]], { opacity: 0.2 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=320%",
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8,
          invalidateOnRefresh: true,
          snap: {
            snapTo: [0, 0.5, 1],
            duration: { min: 0.25, max: 0.6 },
            delay: 0.08,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const p = self.progress;
            const idx = p < 0.28 ? 0 : p < 0.72 ? 1 : 2;
            if (idx !== lastIdx) {
              lastIdx = idx;
              setActiveIdx(idx);
            }
          },
        },
      });

      // Timeline map (total duration 1):
      //   0.0 – 0.3   dwell service 1
      //   0.3 – 0.5   cross-fade 1 → 2
      //   0.5 – 0.7   dwell service 2
      //   0.7 – 0.9   cross-fade 2 → 3
      //   0.9 – 1.0   dwell service 3

      const FADE_OUT = 0.18;
      const FADE_IN = 0.22;
      const NUM_DIM = 0.2;

      // Cross-fade 0 → 1
      tl.to(
        [contentRefs.current[0], imageRefs.current[0]],
        { autoAlpha: 0, y: -16, duration: FADE_OUT },
        0.3,
      );
      tl.to(numRefs.current[0], { opacity: 0.2, duration: NUM_DIM }, 0.3);
      tl.to(
        [contentRefs.current[1], imageRefs.current[1]],
        { autoAlpha: 1, y: 0, duration: FADE_IN },
        0.33,
      );
      tl.to(numRefs.current[1], { opacity: 1, duration: NUM_DIM }, 0.3);

      // Cross-fade 1 → 2
      tl.to(
        [contentRefs.current[1], imageRefs.current[1]],
        { autoAlpha: 0, y: -16, duration: FADE_OUT },
        0.7,
      );
      tl.to(numRefs.current[1], { opacity: 0.2, duration: NUM_DIM }, 0.7);
      tl.to(
        [contentRefs.current[2], imageRefs.current[2]],
        { autoAlpha: 1, y: 0, duration: FADE_IN },
        0.73,
      );
      tl.to(numRefs.current[2], { opacity: 1, duration: NUM_DIM }, 0.7);

      // Pad timeline to exactly 1.0 so snap maps cleanly to [0, 0.5, 1].
      tl.to({}, { duration: 0.1 }, 0.9);
    });

    return () => mm.revert();
  }, [prefersReduced]);

  const useCarousel = !prefersReduced;

  return (
    <section ref={sectionRef} className="relative bg-navy-900 text-cream-50">
      {/* ── Desktop: 3-column layout with scroll-driven cross-fade ─────── */}
      {useCarousel && (
        <div
          ref={pinRef}
          className="relative hidden h-svh overflow-hidden md:block"
        >
          <Container className="flex h-full flex-col pt-20 pb-4 lg:pt-24 lg:pb-6">
            {/* Main 3-column grid */}
            <div className="grid min-h-0 flex-1 grid-cols-[10%_minmax(0,1fr)_36%] gap-6 lg:gap-10">
              {/* ── Left: stacked numbers, static position, opacity toggles ── */}
              <div className="relative h-full">
                {NUMBERS.map((n, i) => (
                  <span
                    key={n}
                    ref={(el) => {
                      numRefs.current[i] = el;
                    }}
                    aria-hidden
                    className={`absolute left-0 block select-none text-[clamp(3.5rem,6.5vw,5.5rem)] font-light leading-[0.85] text-cream-50 ${NUM_POSITION[i]}`}
                  >
                    {n}
                  </span>
                ))}
              </div>

              {/* ── Center: content panels, absolute-stacked, vertical cross-fade ── */}
              <div className="relative h-full">
                {CARD_KEYS.map((key, i) => (
                  <div
                    key={key}
                    ref={(el) => {
                      contentRefs.current[i] = el;
                    }}
                    className="absolute inset-0 flex flex-col justify-start space-y-3 lg:space-y-4"
                  >
                    <h3 className="text-[clamp(1.75rem,2.4vw,2.25rem)] font-light leading-tight">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="max-w-[56ch] text-[clamp(0.875rem,0.95vw,0.9375rem)] font-light leading-relaxed text-cream-50/75">
                      {t(`${key}.body`)}
                    </p>
                    <ul className="space-y-2 pt-1">
                      {BULLETS.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-[clamp(0.8125rem,0.9vw,0.9375rem)] font-light text-cream-50/80"
                        >
                          <span
                            className="mt-[0.75em] h-px w-4 shrink-0 bg-gold-500"
                            aria-hidden
                          />
                          <span>{t(`${key}.${b}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* ── Right: image panels, absolute-stacked, vertical cross-fade ── */}
              <div className="relative flex h-full items-center justify-center">
                <div className="relative aspect-[4/3] w-full">
                  {CARD_KEYS.map((key, i) => (
                    <div
                      key={key}
                      ref={(el) => {
                        imageRefs.current[i] = el;
                      }}
                      className="absolute inset-0 overflow-hidden border border-cream-50/10 bg-navy-800"
                      role="img"
                      aria-label={t(`${key}.title`)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ── Footer: counter + CTA ───────────────────────────────── */}
            <div className="flex items-center justify-between pt-4 lg:pt-6">
              <span className="text-eyebrow font-extralight uppercase tracking-[0.2em] text-cream-50/60">
                {NUMBERS[activeIdx]} / {TOTAL_LABEL}
              </span>
              <Link href="/services">
                <Button size="md">{t("exploreCta")}</Button>
              </Link>
            </div>
          </Container>
        </div>
      )}

      {/* ── Mobile OR reduced motion: stacked fallback ─────────────── */}
      <div className={useCarousel ? "md:hidden" : "block"}>
        <Container className="py-16 md:py-24">
          <motion.div
            className="mb-12 space-y-2 md:mb-16"
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: duration.base, ease: ease.out }}
          >
            <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
            <h2 className="text-h3 font-light leading-tight md:text-h2">
              {t("title")}
            </h2>
          </motion.div>

          <div className="flex flex-col divide-y divide-cream-50/10">
            {CARD_KEYS.map((key, i) => (
              <StackedPanel key={key} cardKey={key} number={NUMBERS[i]} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/services">
              <Button size="lg">{t("exploreCta")}</Button>
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
}

type StackedPanelProps = { cardKey: CardKey; number: string };

function StackedPanel({ cardKey, number }: StackedPanelProps) {
  const t = useTranslations("home.services");
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className="py-10 first:pt-0"
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: duration.base, ease: ease.out }}
    >
      <span
        className="mb-4 block text-h2 font-light text-gold-500/85"
        aria-hidden
      >
        {number}
      </span>
      <h3 className="mb-3 text-h3 font-light leading-tight">
        {t(`${cardKey}.title`)}
      </h3>
      <p className="mb-4 text-body-lg font-light text-cream-50/75">
        {t(`${cardKey}.body`)}
      </p>
      <ul className="space-y-2">
        {BULLETS.map((b) => (
          <li
            key={b}
            className="flex items-start gap-3 text-body text-cream-50/80"
          >
            <span
              className="mt-[0.7em] h-px w-5 shrink-0 bg-gold-500"
              aria-hidden
            />
            <span>{t(`${cardKey}.${b}`)}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
