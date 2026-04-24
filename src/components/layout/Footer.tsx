import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { Logo } from "@/components/layout/Logo";

const footerNav = ["home", "about", "services", "process", "investments", "vips"] as const;

export async function Footer() {
  const tFooter = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  return (
    <footer className="bg-navy-900 border-t border-gold-500">
      <Container className="grid gap-10 py-12 text-start md:grid-cols-2 md:gap-12 md:py-16 lg:grid-cols-4">
        <div className="space-y-6">
          <Logo className="h-8 w-auto md:h-10" />
          <Link href="/contact" className="inline-flex">
            <Button variant="secondary" size="md" className="w-full sm:w-auto">
              {tFooter("cta")}
            </Button>
          </Link>
        </div>
        <div>
          <span className="text-small font-normal uppercase tracking-[0.12em] text-gold-500">
            {tFooter("navigation")}
          </span>
          <nav className="mt-5 flex flex-col gap-3 text-body">
            {footerNav.map((key) => (
              <Link
                key={key}
                href={key === "home" ? "/" : `/${key}`}
                className="text-cream-50/80 transition-opacity duration-200 hover:opacity-90"
              >
                {tNav(key)}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <span className="text-small font-normal uppercase tracking-[0.12em] text-gold-500">
            {tFooter("contact")}
          </span>
          <div className="mt-5 space-y-2">
            <a
              href={`mailto:${tFooter("email")}`}
              className="text-body text-slate transition-opacity duration-200 hover:opacity-90"
            >
              {tFooter("email")}
            </a>
          </div>
        </div>
        <div>
          <span className="text-small font-normal uppercase tracking-[0.12em] text-gold-500">
            {tFooter("languages")}
          </span>
          <LocaleSwitcher variant="footer" className="mt-5" />
        </div>
      </Container>
      <div className="border-t border-gold-500 bg-navy-deep">
        <Container className="flex flex-col gap-3 py-6 text-small text-slate md:flex-row md:items-center md:justify-between md:gap-4">
          <span>{tFooter("copyright")}</span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{tFooter("privacyPolicy")}</span>
            <span aria-hidden>·</span>
            <span>{tFooter("terms")}</span>
            <span aria-hidden>·</span>
            <span>{tFooter("cookies")}</span>
          </div>
          <a
            href="https://synera.com.ar"
            target="_blank"
            rel="noreferrer"
            className="text-cream-50/70 transition-opacity duration-200 hover:opacity-90"
          >
            {tFooter("designedBy")}
          </a>
        </Container>
      </div>
    </footer>
  );
}
