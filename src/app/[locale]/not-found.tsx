import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

// not-found.tsx does not receive route params in Next.js 16.
// Use getLocale() from next-intl to read the active locale.
export default async function LocaleNotFound() {
  const locale = await getLocale();
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
