"use client";
// Reason: motion/react stagger animations on list items.

import { type ReactNode } from "react";
import { motion } from "motion/react";
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
}: ServiceBlockProps) {
  const t = useTranslations(namespace);

  const isDark = variant === "dark";
  const isContentRight = layout === "content-right";

  const textColor = isDark ? "text-cream-50" : "text-navy-900";
  const bulletTextColor = isDark ? "text-cream-50" : "text-navy-900";

  const contentCol = (
    <div className="flex flex-col gap-10">
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
    <div className="flex flex-col gap-8">
      <p className="text-[2rem] font-bold text-gold-500">
        {t(listTitleKey)}
      </p>
      <motion.ul
        className="flex flex-col gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07 } },
        }}
      >
        {itemKeys.map((key) => (
          <motion.li
            key={key}
            variants={{
              hidden: { opacity: 0, y: 12 },
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
    <section className={cn("py-24 md:py-32", isDark ? "bg-navy-900" : "bg-cream-50")}>
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[55fr_45fr] lg:gap-20">
          {/* Content col */}
          <div className={cn(isContentRight ? "order-1 lg:order-2" : "order-1")}>
            {contentCol}
          </div>
          {/* List col */}
          <div className={cn(isContentRight ? "order-2 lg:order-1" : "order-2")}>
            {listCol}
          </div>
        </div>
      </Container>
    </section>
  );
}
