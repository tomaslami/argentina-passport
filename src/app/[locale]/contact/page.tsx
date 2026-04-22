import { setRequestLocale } from "next-intl/server";

import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PagePlaceholder
      titleKey="contact.placeholder.title"
      bodyKey="contact.placeholder.body"
      ctaKey="contact.placeholder.cta"
      ctaHref="/"
    />
  );
}