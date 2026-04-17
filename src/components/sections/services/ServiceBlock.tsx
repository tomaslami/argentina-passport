"use client";
// Reason: motion/react stagger animations on list items.

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { duration, ease } from "@/lib/motion";

type ServiceBlockProps = {
  /** "light" = cream bg (text navy), "dark" = navy bg (text cream) */
  variant: "light" | "dark";
  /** "content-left" = icon+title+body LEFT, list RIGHT (blocks 1 & 3)
   *  "content-right" = list LEFT, icon+title+body RIGHT (block 2)   */
  layout: "content-left" | "content-right";
  icon: ReactNode;
  titleKey: string;
  bodyKey: string;
  listTitleKey: string;
  itemKeys: readonly string[];
  namespace: string;
  /**
   * When true: section fills the full viewport height (h-screen) for the
   * sticky scroll-reveal effect. Content is centered vertically.
   * When false (default): normal py-24 md:py-32 padding.
   */
  fullScreen?: boolean;
  className?: string;
};

export function ServiceBlock({
  variant,
  layout,
  icon,
  titleKey,
  bodyKey,
  listTitleKey,
  itemKeys,
  namespace,
  fullScreen = false,
  className,
}: ServiceBlockProps) {
  const t = useTranslations(namespace);
  const prefersReduced = useReducedMotion();

  const isDark = variant === "dark";
  const isContentRight = layout === "content-right";

  const textColor = isDark ? "text-cream-50" : "text-navy-900";
  const bulletTextColor = isDark ? "text-cream-50" : "text-navy-900";

  const contentCol = (
    <div className="flex flex-col gap-8 lg:gap-10">
      {icon}
      <h2 className={cn("text-card-title font-normal leading-tight", textColor)}>
        {t(titleKey)}
      </h2>
      <p className={cn("text-h4 font-normal", textColor)}>
        {t(bodyKey)}
      </p>
    </div>
  );

  const listCol = (
    <div className="flex flex-col gap-6 lg:gap-8">
      <p className="text-[2rem] font-bold text-gold-500">
        {t(listTitleKey)}
      </p>
      <motion.ul
        className="flex flex-col gap-4 lg:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: prefersReduced ? 0 : 0.07 },
          },
        }}
      >
        {itemKeys.map((key) => (
          <motion.li
            key={key}
            variants={{
              hidden: { opacity: 0, y: prefersReduced ? 0 : 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: duration.base, ease: ease.out },
              },
            }}
            className="flex items-baseline gap-3"
          >
            <span className="shrink-0 text-gold-500" aria-hidden>•</span>
            <span className={cn("text-h4 font-normal", bulletTextColor)}>
              {t(key)}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );

  return (
    <section
      className={cn(
        isDark ? "bg-navy-900" : "bg-cream-50",
        fullScreen
          ? "flex h-screen items-center overflow-hidden"
          : "py-24 md:py-32",
        className,
      )}
    >
      <Container>
        {/*
          content-left → [55fr content | 45fr list]
          content-right → [45fr list | 55fr content]
          Mobile: content always first (order-1), list second (order-2).
        */}
        {isContentRight ? (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[45fr_55fr] lg:gap-20">
            {/* List — visual left on desktop, below on mobile */}
            <div className="order-2 lg:order-1">{listCol}</div>
            {/* Content — visual right on desktop, above on mobile */}
            <div className="order-1 lg:order-2">{contentCol}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[55fr_45fr] lg:gap-20">
            {/* Content — visual left on desktop, above on mobile */}
            <div>{contentCol}</div>
            {/* List — visual right on desktop, below on mobile */}
            <div>{listCol}</div>
          </div>
        )}
      </Container>
    </section>
  );
}
