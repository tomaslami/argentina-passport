import { setRequestLocale } from "next-intl/server";

import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

type PageProps = {
  params: { locale: string };
};

export default function AboutPage({ params }: PageProps) {
  setRequestLocale(params.locale);

  return (
    <PagePlaceholder
      titleKey="about.placeholder.title"
      bodyKey="about.placeholder.body"
      ctaKey="about.placeholder.cta"
      ctaHref="/"
    />
  );
}