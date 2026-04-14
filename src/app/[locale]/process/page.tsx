import { setRequestLocale } from "next-intl/server";

import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

type PageProps = {
  params: { locale: string };
};

export default function ProcessPage({ params }: PageProps) {
  setRequestLocale(params.locale);

  return (
    <PagePlaceholder
      titleKey="process.placeholder.title"
      bodyKey="process.placeholder.body"
      ctaKey="process.placeholder.cta"
      ctaHref="/investments"
    />
  );
}