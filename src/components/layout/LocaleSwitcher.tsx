"use client";
// Reason: locale switching requires client-side router navigation.

import { useTransition } from "react";
import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  variant?: "header" | "footer";
  className?: string;
};

const footerLocales: Array<(typeof routing.locales)[number]> = ["en", "ru", "ar"];

export function LocaleSwitcher({ variant = "header", className }: LocaleSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

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
    startTransition(() => {
      router.replace(normalizedPathname, { locale: nextLocale });
    });
  };

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
              : "text-cream-50/70 hover:text-cream-50",
          )}
        >
          {value.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
