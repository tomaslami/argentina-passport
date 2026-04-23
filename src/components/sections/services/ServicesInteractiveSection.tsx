import { IconScales } from "@/components/ui/icons/IconScales";
import { IconBriefcaseBrand } from "@/components/ui/icons/IconBriefcase";
import { IconShieldBrand } from "@/components/ui/icons/IconShield";
import { ServiceBlock } from "./ServiceBlock";

const itemKeys = (key: string): readonly string[] =>
  Array.from({ length: 6 }, (_, i) => `${key}.item${i + 1}`);

export function ServicesInteractiveSection() {
  return (
    <>
      <ServiceBlock
        variant="light"
        layout="content-left"
        icon={<IconScales size={40} className="text-gold-500" />}
        titleKey="legal.title"
        bodyKey="legal.body"
        listTitleKey="legal.listTitle"
        itemKeys={itemKeys("legal")}
        namespace="services"
      />
      <ServiceBlock
        variant="dark"
        layout="content-right"
        icon={<IconBriefcaseBrand size={40} className="text-gold-500" />}
        titleKey="investment.title"
        bodyKey="investment.body"
        listTitleKey="investment.listTitle"
        itemKeys={itemKeys("investment")}
        namespace="services"
      />
      <ServiceBlock
        variant="light"
        layout="content-left"
        icon={<IconShieldBrand size={40} className="text-gold-500" />}
        titleKey="vip.title"
        bodyKey="vip.body"
        listTitleKey="vip.listTitle"
        itemKeys={itemKeys("vip")}
        namespace="services"
      />
    </>
  );
}
