import { setRequestLocale } from "next-intl/server";

import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

type PageProps = {
  params: { locale: string };
};

export default function ServicesPage({ params }: PageProps) {
  setRequestLocale(params.locale);

  return (
    <PagePlaceholder
      titleKey="services.placeholder.title"
      bodyKey="services.placeholder.body"
      ctaKey="services.placeholder.cta"
      ctaHref="/contact"
    />
  );
}