"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { duration, ease } from "@/lib/motion";

type ExperienceCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  body: string;
  priority?: boolean;
};

function ExperienceCard({ imageSrc, imageAlt, title, body, priority }: ExperienceCardProps) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <h3 className="text-h3 font-light text-cream-50">{title}</h3>
        <p className="mt-2 max-w-[420px] text-body font-light text-cream-50/85">{body}</p>
      </div>
    </div>
  );
}

const containerVariants = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 16 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.out },
  },
};

export function ExperiencesGrid() {
  const t = useTranslations("vips.experiences");
  const prefersReduced = useReducedMotion();

  const cards = [
    {
      key: "wine",
      imageSrc: "/images/vips/wine.jpg",
      imageAlt: t("wine.title"),
      title: t("wine.title"),
      body: t("wine.body"),
      priority: true,
    },
    {
      key: "polo",
      imageSrc: "/images/vips/polo.jpg",
      imageAlt: t("polo.title"),
      title: t("polo.title"),
      body: t("polo.body"),
    },
    {
      key: "culture",
      imageSrc: "/images/vips/culture.jpg",
      imageAlt: t("culture.title"),
      title: t("culture.title"),
      body: t("culture.body"),
    },
    {
      key: "patagonia",
      imageSrc: "/images/vips/patagonia.jpg",
      imageAlt: t("patagonia.title"),
      title: t("patagonia.title"),
      body: t("patagonia.body"),
    },
  ];

  return (
    <section className="bg-cream-50 py-16 md:py-24 lg:py-32">
      <Container className="mb-12 md:mb-16">
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        <h2 className="mt-4 max-w-[700px] text-h1 font-light text-navy-900">
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </h2>
      </Container>

      <motion.div
        className="mx-auto grid max-w-[1280px] grid-cols-1 px-6 md:grid-cols-2 md:px-12"
        variants={prefersReduced ? undefined : containerVariants}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
      >
        {cards.map((card) => (
          <motion.div
            key={card.key}
            variants={prefersReduced ? undefined : itemVariants}
          >
            <ExperienceCard {...card} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
