import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/Container";

export async function IntroStatement() {
  const t = await getTranslations("home.intro");

  return (
    <section className="bg-cream-50 py-24 md:py-32 text-navy-900">
      <Container className="grid gap-10 md:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)]">
        <h2 className="text-h2 font-light text-balance">{t("title")}</h2>
        <p className="text-body-lg text-text-muted text-balance">{t("body")}</p>
      </Container>
    </section>
  );
}
