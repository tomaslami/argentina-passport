import { setRequestLocale } from "next-intl/server";

import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

type PageProps = {
  params: { locale: string };
};

export default function InvestmentsPage({ params }: PageProps) {
  setRequestLocale(params.locale);

  return (
    <PagePlaceholder
      titleKey="investments.placeholder.title"
      bodyKey="investments.placeholder.body"
      ctaKey="investments.placeholder.cta"
      ctaHref="/vips"
    />
  );
}