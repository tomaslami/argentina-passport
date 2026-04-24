import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";

export function QuoteBlock() {
  const t = useTranslations("vips.quote");

  return (
    <section className="bg-cream-50 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-[800px] border-t border-navy-900/12 pt-12 text-start md:text-end">
          <p className="text-h3 font-light italic text-navy-900">
            &ldquo;{t("text")}&rdquo;
          </p>
          <p className="mt-6 text-body font-light text-text-muted">
            {t("description")}
          </p>
          <p className="mt-4 text-small font-light text-gold-500">
            &mdash; {t("attribution")}
          </p>
        </div>
      </Container>
    </section>
  );
}
