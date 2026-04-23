import { setRequestLocale } from "next-intl/server";

import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ConfidentialityBlock } from "@/components/sections/contact/ConfidentialityBlock";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHero />
      <ContactForm />
      <ConfidentialityBlock />
    </>
  );
}
