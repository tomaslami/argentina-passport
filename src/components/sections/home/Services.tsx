"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const TOTAL_STEPS = 3;
const NUMBERS = ["01", "02", "03"] as const;
type CardKey = "card1" | "card2" | "card3";
const CARD_KEYS: CardKey[] = ["card1", "card2", "card3"];

export function ThreeServices() {
  const t = useTranslations("home.services");
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      function goToStep(index: number) {
        activeStepRef.current = index;

        gsap.to(contentRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.25,
          onComplete: () => {
            setActiveStep(index);
            gsap.to(contentRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power2.out",
            });
          },
        });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: `+=${(TOTAL_STEPS - 1) * 100}vh`,
        anticipatePin: 1,
        onUpdate: (self) => {
          const newStep = Math.min(
            TOTAL_STEPS - 1,
            Math.floor(self.progress * TOTAL_STEPS),
          );
          if (newStep !== activeStepRef.current) {
            goToStep(newStep);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cardKey = CARD_KEYS[activeStep] ?? "card1";
  const bullets: string[] = [
    t(`${cardKey}.bullet1`),
    t(`${cardKey}.bullet2`),
    t(`${cardKey}.bullet3`),
    t(`${cardKey}.bullet4`),
  ];

  return (
    <section ref={sectionRef} className="bg-navy-900 py-24 text-cream-50 md:py-32">
      <Container className="space-y-16">

        {/* Section header */}
        <div className="space-y-4">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="text-display font-light leading-tight">{t("title")}</h2>
        </div>

        {/* ── Desktop: single card, GSAP cross-fades content ── */}
        <div
          ref={contentRef}
          className="hidden md:grid gap-10 lg:grid-cols-[130px_minmax(0,1fr)_420px] lg:gap-16"
        >
          {/* Number */}
          <div className="leading-none" aria-hidden>
            <span className="text-service-number font-light text-cream-50">
              {NUMBERS[activeStep]}
            </span>
          </div>

          {/* Text content */}
          <div className="space-y-8">
            <h3 className="text-card-title font-light leading-tight">
              {t(`${cardKey}.title`)}
            </h3>
            <p className="text-body-lg font-light text-cream-50/80">
              {t(`${cardKey}.body`)}
            </p>
            <ul className="space-y-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-body text-cream-50/80">
                  <span className="shrink-0 text-gold-500" aria-hidden>—</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image slot */}
          <div
            className="aspect-[647/509] w-full overflow-hidden border border-cream-50/10 bg-navy-800"
            aria-label={t(`${cardKey}.title`)}
          />
        </div>

        {/* ── Mobile: all cards stacked, no pin ── */}
        <div className="space-y-0 md:hidden">
          {CARD_KEYS.map((key, i) => (
            <article
              key={key}
              className="border-t border-cream-50/10 py-20 first:border-t-0 first:pt-0"
            >
              <div className="grid gap-10">
                <div className="leading-none" aria-hidden>
                  <span className="text-service-number font-light text-cream-50">
                    {NUMBERS[i]}
                  </span>
                </div>
                <div className="space-y-8">
                  <h3 className="text-card-title font-light leading-tight">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="text-body-lg font-light text-cream-50/80">
                    {t(`${key}.body`)}
                  </p>
                  <ul className="space-y-3">
                    {(["bullet1", "bullet2", "bullet3", "bullet4"] as const).map((b) => (
                      <li key={b} className="flex items-start gap-2 text-body text-cream-50/80">
                        <span className="shrink-0 text-gold-500" aria-hidden>—</span>
                        <span>{t(`${key}.${b}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="aspect-[647/509] w-full overflow-hidden border border-cream-50/10 bg-navy-800"
                  aria-label={t(`${key}.title`)}
                />
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-4">
          <Link href="/services">
            <Button size="lg">{t("exploreCta")}</Button>
          </Link>
        </div>

      </Container>
    </section>
  );
}
