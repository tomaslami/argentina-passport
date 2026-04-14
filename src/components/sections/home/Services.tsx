"use client";
// Reason: Uses motion/react for staggered animations based on scroll position.

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { cn } from "@/lib/utils";

type ServicesSectionProps = {
  availableImages: Record<string, boolean>;
};

const servicesData = [
  {
    key: "card1",
    number: "01",
    image: "/images/home/legal.jpg",
  },
  {
    key: "card2",
    number: "02",
    image: "/images/home/investment.jpg",
  },
  {
    key: "card3",
    number: "03",
    image: "/images/home/concierge.jpg",
  },
] as const;

export function ThreeServices({ availableImages }: ServicesSectionProps) {
  const t = useTranslations("home.services");

  return (
    <section className="bg-navy-900 py-24 text-cream-50 md:py-32">
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
          className="space-y-16"
        >
          {servicesData.map((service, index) => {
            const title = t(`${service.key}.title`);
            const body = t(`${service.key}.body`);
            const bullets = [
              t(`${service.key}.bullet1`),
              t(`${service.key}.bullet2`),
              t(`${service.key}.bullet3`),
              t(`${service.key}.bullet4`),
            ];

            return (
              <motion.article
                key={service.key}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="grid gap-6 lg:grid-cols-[120px_minmax(0,1fr)] lg:items-center"
              >
                <div className="flex flex-col text-h3 font-light text-gold-500">
                  {servicesData.map((numeral, numeralIndex) => (
                    <span
                      key={numeral.key}
                      className={cn(
                        "font-light",
                        numeralIndex === index ? "text-gold-500" : "text-gold-500/30",
                      )}
                    >
                      {numeral.number}
                    </span>
                  ))}
                </div>
                <div className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-center">
                    <div className="space-y-4">
                      <h3 className="text-h3 font-light text-balance">{title}</h3>
                      <p className="text-body text-cream-50/80 text-balance">{body}</p>
                    </div>
                    {availableImages[service.key] ? (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-cream-50/10">
                        <Image
                          src={service.image}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 360px"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center rounded-sm border border-cream-50/10 bg-navy-800 text-cream-50/60 text-small uppercase tracking-[0.3em]">
                        {t("imageFallback")}
                      </div>
                    )}
                  </div>
                  <ul className="space-y-2 text-small text-cream-50/80">
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="text-gold-500">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
        <div className="flex justify-center pt-4">
          <Link href="/services">
            <Button size="lg">{t("exploreCta")}</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
