"use client";

import { useState, useEffect } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-[background-color,box-shadow] duration-500 ease-out",
        scrolled ? "bg-cream-50 shadow-sm" : "bg-transparent",
      )}
    >
      <div className="relative flex h-16 items-center justify-between px-6 md:h-[80px] md:px-12 lg:px-20">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          aria-label="Argentina Passport home"
          className="relative z-10 transition-opacity duration-300 hover:opacity-70"
        >
          <Logo
            theme={scrolled ? "positive" : "negative"}
            className="h-9 w-auto md:h-12"
          />
        </Link>

        {/* Centered nav — full white by default, dims on hover */}
        <nav className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={cn(
                "pointer-events-auto text-small font-normal uppercase tracking-wider transition-opacity duration-300",
                scrolled
                  ? cn(
                      "text-navy-900 hover:opacity-50",
                      pathname === link.href &&
                        "border-b border-navy-900 pb-0.5 opacity-100",
                    )
                  : cn(
                      "text-cream-50 hover:opacity-50",
                      pathname === link.href &&
                        "border-b border-gold-500 pb-0.5 opacity-100",
                    ),
              )}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher variant="dropdown" theme={scrolled ? "dark" : "light"} />
          <Link href="/contact">
            <Button
              variant={scrolled ? "navy" : "secondary"}
              size="sm"
              className="h-9 px-5 tracking-widest"
            >
              {t("contact")}
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={cn(
            "inline-flex cursor-pointer items-center justify-center transition-opacity duration-300 hover:opacity-60 lg:hidden",
            scrolled ? "text-navy-900" : "text-cream-50",
          )}
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation"
        >
          <IconMenu2 size={24} stroke={1.25} />
        </button>
      </div>

      {/* Mobile fullscreen overlay */}
      <div
        className={cn(
          "fixed inset-0 flex h-full flex-col bg-navy-900/95 px-6 py-10 transition-opacity duration-300 ease-out lg:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/" onClick={closeMenu} aria-label="Argentina Passport home">
            <Logo theme="negative" className="h-9 w-auto" />
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation"
            className="cursor-pointer text-cream-50 transition-opacity duration-300 hover:opacity-60"
          >
            <IconX size={24} stroke={1.25} />
          </button>
        </div>
        <div className="mt-10 flex flex-col gap-6 text-h3 font-light">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={closeMenu}
              className="text-cream-50 transition-opacity duration-300 hover:opacity-60"
            >
              {t(link.key)}
            </Link>
          ))}
          <Link href="/contact" onClick={closeMenu}>
            <Button className="w-full" size="md">
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
