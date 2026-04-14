"use client";
// Reason: Uses motion/react for staggered scroll animations.

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { cn } from "@/lib/utils";
import { ease, duration } from "@/lib/motion";

const SERVICES = [
  { key: "card1", number: "01" },
  { key: "card2", number: "02" },
  { key: "card3", number: "03" },
] as const;

/** Figma 3-color system for stacked numerals:
 *  past  (index < active) → gold-500 opacity-50
 *  active (index === active) → cream-50 (white)
 *  future (index > active)  → text-muted (gray)
 */
function getNumberClass(numeralIndex: number, cardIndex: number): string {
  if (numeralIndex < cardIndex) return "text-gold-500 opacity-50";
  if (numeralIndex === cardIndex) return "text-cream-50";
  return "text-text-muted";
}

export function ThreeServices() {
  const t = useTranslations("home.services");

  return (
    <section className="bg-navy-900 py-24 text-cream-50 md:py-32">
      <Container className="space-y-16">
        {/* Section header */}
        <div className="space-y-4">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="text-display font-light leading-tight">
            {t("title")}
          </h2>
        </div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="space-y-0"
        >
          {SERVICES.map((service, cardIndex) => {
            const cardKey = service.key;
            const title = t(`${cardKey}.title`);
            const body = t(`${cardKey}.body`);
            const bullets = [
              t(`${cardKey}.bullet1`),
              t(`${cardKey}.bullet2`),
              t(`${cardKey}.bullet3`),
              t(`${cardKey}.bullet4`),
            ];

            return (
              <motion.article
                key={cardKey}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: duration.base, ease: ease.out },
                  },
                }}
                className="border-t border-cream-50/10 py-16 first:border-t-0 first:pt-0"
              >
                {/* Card grid: [numbers | content | image] */}
                <div className="grid gap-8 lg:grid-cols-[130px_minmax(0,1fr)_420px] lg:gap-12">

                  {/* Stacked number block — 128px per Figma */}
                  <div className="flex flex-col leading-none" aria-hidden>
                    {SERVICES.map((numeral, numeralIndex) => (
                      <span
                        key={numeral.key}
                        className={cn(
                          "text-service-number font-light",
                          getNumberClass(numeralIndex, cardIndex),
                        )}
                      >
                        {numeral.number}
                      </span>
                    ))}
                  </div>

                  {/* Text content */}
                  <div className="space-y-6">
                    <h3 className="text-card-title font-light leading-tight">
                      {title}
                    </h3>
                    <p className="text-body-lg font-light text-cream-50/80">
                      {body}
                    </p>
                    <ul className="space-y-2">
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
                    aria-label={`${title} — imagen`}
                  >
                    {/*
                      Place image file here once available:
                        card1 → /public/images/home/legal.jpg      (documento con sello sobre escritorio)
                        card2 → /public/images/home/investment.jpg  (skyline o paneles solares)
                        card3 → /public/images/home/concierge.jpg   (mesa elegante al atardecer)

                      Replace this div with:
                        <Image src="/images/home/{name}.jpg" alt={title}
                          fill className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 420px" />
                    */}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Section CTA */}
        <div className="flex justify-center pt-4">
          <Link href="/services">
            <Button size="lg">{t("exploreCta")}</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
