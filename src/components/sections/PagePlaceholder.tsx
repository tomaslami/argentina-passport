import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export type PagePlaceholderProps = {
  eyebrowKey?: string;
  titleKey: string;
  bodyKey: string;
  ctaKey: string;
  ctaHref?: string;
};

export async function PagePlaceholder({
  eyebrowKey,
  titleKey,
  bodyKey,
  ctaKey,
  ctaHref = "/",
}: PagePlaceholderProps) {
  const t = await getTranslations();

  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-3xl text-center">
        {eyebrowKey ? <SectionEyebrow>{t(eyebrowKey)}</SectionEyebrow> : null}
        <h1 className="mt-6 text-h2 font-light text-cream-50 text-balance">
          {t(titleKey)}
        </h1>
        <p className="mt-4 text-body-lg text-cream-50/80 text-balance">
          {t(bodyKey)}
        </p>
        <Link href={ctaHref} className="mt-8 inline-flex justify-center">
          <Button size="md" variant="secondary">
            {t(ctaKey)}
          </Button>
        </Link>
      </Container>
    </section>
  );
}