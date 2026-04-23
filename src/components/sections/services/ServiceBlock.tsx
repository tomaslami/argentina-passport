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
  /** "content-left" = icon+title+body LEFT, list RIGHT
   *  "content-right" = list LEFT, icon+title+body RIGHT */
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
  const prefersReduced = useReducedMotion();

  const isDark = variant === "dark";
  const isContentRight = layout === "content-right";

  const titleColor = isDark ? "text-cream-50" : "text-navy-900";
  const bodyColor = isDark ? "text-cream-50/65" : "text-text-muted";
  const bulletTextColor = isDark ? "text-cream-50/80" : "text-navy-900/75";

  const contentCol = (
    <motion.div
      className="flex flex-col gap-7"
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: duration.base, ease: ease.out }}
    >
      <div>{icon}</div>
      <h2 className={cn("text-[2.5rem] font-light leading-tight", titleColor)}>
        {t(titleKey)}
      </h2>
      <p className={cn("text-body font-light leading-[1.7]", bodyColor)}>
        {t(bodyKey)}
      </p>
    </motion.div>
  );

  const listCol = (
    <div className="flex flex-col gap-5">
      <motion.p
        className="text-body-lg font-medium text-gold-500"
        initial={prefersReduced ? {} : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: duration.base, ease: ease.out }}
      >
        {t(listTitleKey)}
      </motion.p>
      <motion.ul
        className="flex flex-col gap-[0.65rem]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: prefersReduced ? 0 : 0.06 },
          },
        }}
      >
        {itemKeys.map((key) => (
          <motion.li
            key={key}
            variants={{
              hidden: { opacity: 0, y: prefersReduced ? 0 : 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: duration.base, ease: ease.out },
              },
            }}
            className="flex items-start gap-3"
          >
            {/* Small gold dot bullet */}
            <span
              className="mt-[0.45em] h-[5px] w-[5px] shrink-0 rounded-full bg-gold-500"
              aria-hidden
            />
            <span className={cn("text-body font-light leading-snug", bulletTextColor)}>
              {t(key)}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );

  return (
    <section className={cn("py-20 md:py-28", isDark ? "bg-navy-900" : "bg-cream-50")}>
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {isContentRight ? (
            <>
              <div className="order-2 lg:order-1">{listCol}</div>
              <div className="order-1 lg:order-2">{contentCol}</div>
            </>
          ) : (
            <>
              <div>{contentCol}</div>
              <div>{listCol}</div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
