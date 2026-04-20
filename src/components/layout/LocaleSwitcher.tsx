"use client";
// Reason: locale switching requires client-side router navigation and dropdown state.

import { useEffect, useRef, useState, useTransition } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  variant?: "header" | "footer" | "dropdown";
  /** "light" = cream text (on dark bg), "dark" = navy text (on cream bg) */
  theme?: "light" | "dark";
  className?: string;
};

const footerLocales: Array<(typeof routing.locales)[number]> = ["en", "ru", "ar"];

export function LocaleSwitcher({
  variant = "header",
  theme = "light",
  className,
}: LocaleSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const locales = variant === "footer" ? footerLocales : routing.locales;

  const normalizedPathname = (() => {
    if (!pathname) {
      return "/";
    }
    const stripped = pathname.replace(
      new RegExp(`^/(?:${routing.locales.join("|")})(?=/|$)`),
      "",
    );
    return stripped.length === 0 ? "/" : stripped;
  })();

  const handleChange = (nextLocale: string) => {
    setIsOpen(false);
    startTransition(() => {
      router.replace(normalizedPathname, { locale: nextLocale });
    });
  };

  useEffect(() => {
    if (variant !== "dropdown" || !isOpen) {
      return;
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [variant, isOpen]);

  if (variant === "dropdown") {
    return (
      <div ref={containerRef} className={cn("relative", className)}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={cn(
            "inline-flex h-9 items-center gap-1 border px-2.5 text-small font-normal uppercase tracking-wider transition-opacity duration-300",
            theme === "dark"
              ? "border-navy-900 text-navy-900 hover:opacity-50"
              : "border-cream-50 text-cream-50 hover:opacity-50",
          )}
        >
          <span>{locale}</span>
          <IconChevronDown
            size={24}
            stroke={1.5}
            className={cn(
              "transition-transform duration-200",
              isOpen && "rotate-180",
            )}
            aria-hidden
          />
        </button>
        {isOpen ? (
          <ul
            role="listbox"
            className={cn(
              "absolute end-0 top-full z-50 mt-2 min-w-full border",
              theme === "dark"
                ? "border-navy-900 bg-cream-50"
                : "border-cream-50 bg-navy-900",
            )}
          >
            {locales.map((value) => (
              <li key={value} role="option" aria-selected={value === locale}>
                <button
                  type="button"
                  disabled={isPending || value === locale}
                  onClick={() => handleChange(value)}
                  className={cn(
                    "block w-full px-3 py-2 text-start text-small font-normal uppercase tracking-wider transition-opacity duration-300 disabled:cursor-not-allowed",
                    theme === "dark"
                      ? value === locale
                        ? "text-navy-900"
                        : "text-navy-900 hover:opacity-50"
                      : value === locale
                        ? "text-gold-500"
                        : "text-cream-50 hover:opacity-50",
                  )}
                >
                  {value}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3 text-small uppercase", className)}>
      {locales.map((value) => (
        <button
          key={value}
          type="button"
          disabled={isPending || value === locale}
          onClick={() => handleChange(value)}
          aria-pressed={value === locale}
          className={cn(
            "cursor-pointer transition-colors duration-200 disabled:cursor-not-allowed",
            value === locale
              ? "text-gold-500"
              : theme === "dark"
                ? "text-navy-900/60 hover:text-navy-900"
                : "text-cream-50/70 hover:text-cream-50",
          )}
        >
          {value.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
