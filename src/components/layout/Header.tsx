"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { Logo } from "@/components/layout/Logo";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
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
            className="h-9 w-auto md:h-10"
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

        {/* Mobile toggle — two lines (20px + 12px) that morph into X */}
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
                ? "w-6 rotate-45 bg-navy-900"
                : scrolled
                  ? "w-5 -translate-y-[3px] bg-navy-900"
                  : "w-5 -translate-y-[3px] bg-cream-50",
            )}
          />
          <span
            className={cn(
              "absolute block h-px transition-all duration-300 ease-out",
              isOpen
                ? "w-6 -rotate-45 bg-navy-900"
                : scrolled
                  ? "w-3 translate-y-[3px] bg-navy-900"
                  : "w-3 translate-y-[3px] bg-cream-50",
            )}
          />
        </button>
      </div>

      {/* Mobile fullscreen overlay — cream bg, navy foreground */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex h-[100dvh] flex-col overflow-y-auto bg-cream-50 pt-[72px] transition-opacity duration-300 ease-out lg:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-1 flex-col px-6 pt-8 pb-8">
          {/* Section label */}
          <SectionEyebrow className="mb-6 text-gold-500">
            {t("menu")}
          </SectionEyebrow>

          {/* Nav links — navy, large, left-aligned with gold rule between */}
          <nav className="flex flex-col divide-y divide-navy-900/10 border-y border-navy-900/10">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    "group flex items-center justify-between py-5 transition-opacity duration-200 hover:opacity-70",
                  )}
                >
                  <span
                    className={cn(
                      "text-[28px] font-light leading-none tracking-tight text-navy-900 transition-colors",
                      isActive && "text-gold-500",
                    )}
                  >
                    {t(link.key)}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "text-body font-light transition-colors",
                      isActive ? "text-gold-500" : "text-navy-900/30",
                    )}
                  >
                    →
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Primary CTA */}
          <Link
            href="/contact"
            onClick={closeMenu}
            className="mt-8 inline-flex"
          >
            <Button variant="primary" size="md" className="w-full">
              {t("contact")}
            </Button>
          </Link>

          {/* Languages row */}
          <div className="mt-10 flex items-center justify-between border-t border-navy-900/10 pt-6">
            <span className="text-eyebrow uppercase tracking-[0.2em] text-navy-900/55">
              {t("language")}
            </span>
            <LocaleSwitcher variant="header" theme="dark" />
          </div>

          {/* Footer line */}
          <div className="mt-auto flex items-center justify-between pt-10 text-eyebrow uppercase tracking-[0.2em] text-navy-900/45">
            <span>Buenos Aires</span>
            <span>{locale.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
