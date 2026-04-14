import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { cn } from "@/lib/utils";

type CTABannerProps = {
  eyebrowKey: string;
  titleKey: string;
  highlightKey: string;
  subtitleKey?: string;
  ctaKey: string;
  ctaHref?: string;
  backgroundImage?: string;
  className?: string;
};

export async function CTABanner({
  eyebrowKey,
  titleKey,
  highlightKey,
  subtitleKey,
  ctaKey,
  ctaHref = "/contact",
  backgroundImage = "/images/cta-patagonia.png",
  className,
}: CTABannerProps) {
  const t = await getTranslations();
  const subtitle = subtitleKey ? t(subtitleKey) : null;

  return (
    <section className={cn("relative isolate py-24", className)}>
      <Image
        src={backgroundImage}
        alt="View of Patagonian mountains and lake"
        fill
        sizes="100vw"
        className="object-cover"
        priority={false}
      />
      <div className="absolute inset-0 bg-navy-900/80" aria-hidden />
      <Container className="relative z-10 text-center">
        <SectionEyebrow>{t(eyebrowKey)}</SectionEyebrow>
        <h2 className="mt-4 text-h2 font-light text-cream-50">
          {t(titleKey)} <span className="text-gold-500">{t(highlightKey)}</span>
        </h2>
        {subtitle ? (
          <p className="mt-4 text-body text-cream-50/80 text-balance">
            {subtitle}
          </p>
        ) : null}
        <Link href={ctaHref} className="mt-8 inline-flex">
          <Button size="lg">{t(ctaKey)}</Button>
        </Link>
      </Container>
    </section>
  );
}