import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type NotFoundProps = {
  params: { locale: string };
};

export default async function LocaleNotFound({ params }: NotFoundProps) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <section className="py-24">
      <Container className="text-center">
        <h1 className="text-h2 font-light text-cream-50">{t("title")}</h1>
        <p className="mt-4 text-body text-cream-50/80">{t("body")}</p>
        <Link href="/" locale={locale} className="mt-8 inline-flex justify-center">
          <Button size="md">{t("cta")}</Button>
        </Link>
      </Container>
    </section>
  );
}