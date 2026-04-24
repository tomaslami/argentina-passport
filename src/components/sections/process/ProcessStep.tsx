"use client";
// Reason: motion/react scroll reveal animations.

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { duration, ease } from "@/lib/motion";

type ProcessStepProps = {
  number: "01" | "02" | "03" | "04";
  /** true = image on the left, text on the right (desktop) */
  reverse?: boolean;
  imageSrc: string;
  imageAlt: string;
  stepLabelKey: string;
  titleKey: string;
  body1Key: string;
  body2Key: string;
  priority?: boolean;
};

export function ProcessStep({
  number,
  reverse = false,
  imageSrc,
  imageAlt,
  stepLabelKey,
  titleKey,
  body1Key,
  body2Key,
  priority = false,
}: ProcessStepProps) {
  const t = useTranslations("process");
  const prefersReduced = useReducedMotion();

  const textCol = (
    <div className="flex flex-col gap-10">
      {/* Number + step label */}
      <div>
        <p className="text-service-number font-light leading-none text-gold-500">{number}</p>
        <p className="text-step font-light uppercase tracking-[0.08em] text-text-muted">
          {t(stepLabelKey)}
        </p>
      </div>

      {/* Title + body */}
      <div className="flex flex-col gap-4">
        <h2 className="text-card-title font-light text-navy-900">{t(titleKey)}</h2>
        <p className="text-h4 font-light text-navy-900">{t(body1Key)}</p>
        <p className="text-h4 font-light text-navy-900">{t(body2Key)}</p>
      </div>
    </div>
  );

  const imageCol = (
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 1023px) 100vw, 50vw"
        className="object-cover"
        priority={priority}
      />
    </div>
  );

  return (
    <motion.div
      className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20"
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: duration.base, ease: ease.out }}
    >
      {/*
        Per designer spec: on mobile, text (content) ALWAYS comes first and
        the image (complementary visual) ALWAYS comes below.
        Desktop (reverse=false): text LEFT, image RIGHT.
        Desktop (reverse=true):  image LEFT, text RIGHT.
      */}
      <div
        className={
          reverse
            ? "order-1 lg:order-1" // image: below text on mobile, left on desktop
            : "order-2 lg:order-2" // image: below text on mobile, right on desktop
        }
      >
        {imageCol}
      </div>

      <div
        className={
          reverse
            ? "order-2 lg:order-2" // text: first on mobile, right on desktop
            : "order-1 lg:order-1" // text: first on mobile, left on desktop
        }
      >
        {textCol}
      </div>
    </motion.div>
  );
}
