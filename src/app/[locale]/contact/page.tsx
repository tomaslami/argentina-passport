import { setRequestLocale } from "next-intl/server";

import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

type PageProps = {
  params: { locale: string };
};

export default function ContactPage({ params }: PageProps) {
  setRequestLocale(params.locale);

  return (
    <PagePlaceholder
      titleKey="contact.placeholder.title"
      bodyKey="contact.placeholder.body"
      ctaKey="contact.placeholder.cta"
      ctaHref="/"
    />
  );
}