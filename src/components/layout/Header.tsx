"use client";

import { useState, useEffect } from "react";
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

  // Lock body scroll while overlay is open (mobile).
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-[background-color,box-shadow] duration-500 ease-out",
        scrolled ? "bg-cream-50 shadow-sm" : "bg-transparent",
      )}
    >
      <div className="relative flex h-16 items-center justify-between px-6 md:h-[72px] md:px-8 lg:px-12 xl:px-16">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          aria-label="Argentina Passport home"
          className="relative z-[60] transition-opacity duration-300 hover:opacity-70"
        >
          <Logo
            theme={scrolled || isOpen ? "positive" : "negative"}
            className={cn(
              "h-9 w-auto md:h-10",
              isOpen && "opacity-0 pointer-events-none",
            )}
          />
        </Link>

        {/* Centered nav — desktop only (>= 1024px) */}
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

        {/* Right controls — desktop only */}
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

        {/* Mobile toggle — two lines (20px + 12px, 5px gap) that morph into X */}
        <button
          type="button"
          className="relative z-[60] inline-flex h-11 w-11 cursor-pointer items-center justify-center lg:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
        >
          <span
            className={cn(
              "absolute block h-px transition-all duration-300 ease-out",
              isOpen
                ? "w-6 rotate-45 bg-cream-50"
                : scrolled
                  ? "w-5 -translate-y-[3px] bg-navy-900"
                  : "w-5 -translate-y-[3px] bg-cream-50",
            )}
          />
          <span
            className={cn(
              "absolute block h-px transition-all duration-300 ease-out",
              isOpen
                ? "w-6 -rotate-45 bg-cream-50"
                : scrolled
                  ? "w-3 translate-y-[3px] bg-navy-900"
                  : "w-3 translate-y-[3px] bg-cream-50",
            )}
          />
        </button>
      </div>

      {/* Mobile fullscreen overlay (navy) */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex h-[100dvh] flex-col bg-navy-900 px-6 pt-24 pb-10 transition-opacity duration-300 ease-out lg:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-1 flex-col items-center justify-center gap-0 text-center">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={closeMenu}
              className={cn(
                "block py-6 text-[32px] font-light leading-none text-cream-50 transition-opacity duration-300 hover:opacity-60",
                pathname === link.href && "text-gold-500",
              )}
            >
              {t(link.key)}
            </Link>
          ))}

          <Link href="/contact" onClick={closeMenu} className="mt-10 block">
            <Button variant="primary" size="lg" className="px-10">
              {t("contact")}
            </Button>
          </Link>
        </nav>

        <div className="flex items-center justify-between border-t border-cream-50/10 pt-6">
          <LocaleSwitcher variant="header" />
          <span className="text-eyebrow tracking-label uppercase text-cream-50/55">
            {locale.toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  );
}
