"use client";

import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { Logo } from "@/components/layout/Logo";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type NavKey = "home" | "about" | "services" | "process" | "investments" | "vips";

type NavLink = {
  href: "/" | "/about" | "/services" | "/process" | "/investments" | "/vips";
  key: NavKey;
};

const links: NavLink[] = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/process", key: "process" },
  { href: "/investments", key: "investments" },
  { href: "/vips", key: "vips" },
];

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cream-50/10 bg-navy-900/80 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between md:h-24">
        <Link href="/" onClick={closeMenu} aria-label="Argentina Passport home">
          <Logo className="" />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={cn(
                "text-body uppercase tracking-[0.2em] text-cream-50/80 transition-colors duration-200",
                pathname === link.href && "border-b-2 border-gold-500 pb-2 text-cream-50",
              )}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-6 lg:flex">
          <LocaleSwitcher />
          <Link href="/contact">
            <Button size="md">{t("contact")}</Button>
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center text-cream-50 lg:hidden cursor-pointer"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation"
        >
          <IconMenu2 size={28} stroke={1.25} />
        </button>
      </Container>
      <div
        className={cn(
          "fixed inset-0 flex h-full flex-col bg-navy-900/95 px-6 py-10 transition-opacity duration-200 lg:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/" onClick={closeMenu} aria-label="Argentina Passport home">
            <Logo className="h-10 w-auto" />
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation"
            className="text-cream-50 cursor-pointer"
          >
            <IconX size={28} stroke={1.25} />
          </button>
        </div>
        <div className="mt-10 flex flex-col gap-6 text-h3 font-light">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={closeMenu}
              className="text-cream-50"
            >
              {t(link.key)}
            </Link>
          ))}
          <Link href="/contact" onClick={closeMenu}>
            <Button className="w-full" size="lg">
              {t("contact")}
            </Button>
          </Link>
        </div>
        <LocaleSwitcher variant="header" className="mt-8" />
        <p className="mt-auto text-small text-cream-50/60">
          {locale.toUpperCase()} · Argentina Passport
        </p>
      </div>
    </header>
  );
}
