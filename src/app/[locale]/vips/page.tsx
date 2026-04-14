import { setRequestLocale } from "next-intl/server";

import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

type PageProps = {
  params: { locale: string };
};

export default function VipsPage({ params }: PageProps) {
  setRequestLocale(params.locale);

  return (
    <PagePlaceholder
      titleKey="vips.placeholder.title"
      bodyKey="vips.placeholder.body"
      ctaKey="vips.placeholder.cta"
      ctaHref="/contact"
    />
  );
}