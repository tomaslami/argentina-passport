import { setRequestLocale } from "next-intl/server";
import { IconScale, IconBriefcase, IconShield } from "@tabler/icons-react";

import { ServicesHero } from "@/components/sections/services/Hero";
import { ServiceBlock } from "@/components/sections/services/ServiceBlock";
import { CTABanner } from "@/components/sections/CTABanner";

type ServicesPageProps = {
  params: { locale: string };
};

const LEGAL_ITEMS = [
  "legal.item1",
  "legal.item2",
  "legal.item3",
  "legal.item4",
  "legal.item5",
  "legal.item6",
] as const;

const INVESTMENT_ITEMS = [
  "investment.item1",
  "investment.item2",
  "investment.item3",
  "investment.item4",
  "investment.item5",
  "investment.item6",
] as const;

const VIP_ITEMS = [
  "vip.item1",
  "vip.item2",
  "vip.item3",
  "vip.item4",
  "vip.item5",
  "vip.item6",
] as const;

export default function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = params;
  setRequestLocale(locale);

  return (
    <>
      <ServicesHero />

      {/* Block 1 — Legal & Administrative (cream, content left) */}
      <ServiceBlock
        variant="light"
        layout="content-left"
        icon={<IconScale size={80} className="text-gold-500" stroke={1.25} aria-hidden />}
        titleKey="legal.title"
        bodyKey="legal.body"
        listTitleKey="legal.listTitle"
        itemKeys={LEGAL_ITEMS}
        namespace="services"
      />

      {/* Block 2 — Investment Advisory (navy, content right — layout inverted) */}
      <ServiceBlock
        variant="dark"
        layout="content-right"
        icon={<IconBriefcase size={80} className="text-gold-500" stroke={1.25} aria-hidden />}
        titleKey="investment.title"
        bodyKey="investment.body"
        listTitleKey="investment.listTitle"
        itemKeys={INVESTMENT_ITEMS}
        namespace="services"
      />

      {/* Block 3 — VIP Concierge (cream, content left) */}
      <ServiceBlock
        variant="light"
        layout="content-left"
        icon={<IconShield size={80} className="text-gold-500" stroke={1.25} aria-hidden />}
        titleKey="vip.title"
        bodyKey="vip.body"
        listTitleKey="vip.listTitle"
        itemKeys={VIP_ITEMS}
        namespace="services"
      />

      <CTABanner
        eyebrowKey="ctaBanner.getStarted.eyebrow"
        titleKey="ctaBanner.getStarted.title"
        highlightKey="ctaBanner.getStarted.highlight"
        ctaKey="ctaBanner.getStarted.cta"
      />
    </>
  );
}
