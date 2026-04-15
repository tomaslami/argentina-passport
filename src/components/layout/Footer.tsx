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
    <footer className="bg-navy-900 border-t border-cream-50/10">
      <Container className="grid gap-12 py-16 text-start md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo className="h-10 w-auto" />
          <p className="max-w-xs text-body text-cream-50/80">{tFooter("tagline")}</p>
          <Link href="/contact" className="inline-flex">
            <Button variant="secondary" size="md">
              {tFooter("cta")}
            </Button>
          </Link>
        </div>
        <div>
          <span className="text-small uppercase tracking-[0.2em] text-cream-50/60">
            {tFooter("navigation")}
          </span>
          <nav className="mt-4 flex flex-col gap-2 text-body">
            {footerNav.map((key) => (
              <Link
                key={key}
                href={key === "home" ? "/" : `/${key}`}
                className="text-cream-50/80 hover:text-cream-50"
              >
                {tNav(key)}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <span className="text-small uppercase tracking-[0.2em] text-cream-50/60">
            {tFooter("contact")}
          </span>
          <div className="mt-4 space-y-2">
            <a href={`mailto:${tFooter("email")}`} className="text-body text-cream-50/80 hover:text-cream-50">
              {tFooter("email")}
            </a>
          </div>
        </div>
        <div>
          <span className="text-small uppercase tracking-[0.2em] text-cream-50/60">
            {tFooter("languages")}
          </span>
          <LocaleSwitcher variant="footer" className="mt-4" />
        </div>
      </Container>
      <div className="border-t border-cream-50/10">
        <Container className="flex flex-col gap-4 py-6 text-small text-cream-50/70 lg:flex-row lg:items-center lg:justify-between">
          <span>{tFooter("copyright")}</span>
          <div className="flex items-center gap-3 text-cream-50/70">
            <span>{tFooter("privacyPolicy")}</span>
            <span>·</span>
            <span>{tFooter("terms")}</span>
            <span>·</span>
            <span>{tFooter("cookies")}</span>
          </div>
          <a href="https://synera.dev" target="_blank" rel="noreferrer" className="text-cream-50 hover:text-gold-500">
            {tFooter("designedBy")}
          </a>
        </Container>
      </div>
    </footer>
  );
}