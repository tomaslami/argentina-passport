import Image from "next/image";

import { cn } from "@/lib/utils";

type LogoVariant = "monogram" | "vertical" | "horizontal";
type LogoTheme = "positive" | "negative";

type LogoProps = {
  variant?: LogoVariant;
  theme?: LogoTheme;
  className?: string;
};

/*
 * Single source file (262×100 tight crop) for all variants.
 * Color is controlled via CSS filter:
 *   positive = black logo as-is (for light/cream bg)
 *   negative = brightness(0) invert(1) → white logo (for dark/navy bg)
 * This guarantees both themes render at identical pixel dimensions.
 */
const logoSrc: Record<LogoVariant, string> = {
  horizontal: "/logo/ap-horizontal-negative-black.png",
  vertical: "/logo/ap-horizontal-negative-black.png",
  monogram: "/logo/ap-horizontal-negative-black.png",
};

const logoSize: Record<LogoVariant, { width: number; height: number }> = {
  horizontal: { width: 262, height: 100 },
  vertical: { width: 262, height: 100 },
  monogram: { width: 262, height: 100 },
};

export function Logo({ variant = "horizontal", theme = "negative", className }: LogoProps) {
  const src = logoSrc[variant];
  const { width, height } = logoSize[variant];

  return (
    <Image
      src={src}
      alt="Argentina Passport"
      width={width}
      height={height}
      className={cn(
        "object-contain object-left transition-[filter] duration-500",
        // negative = white logo for dark backgrounds
        theme === "negative" ? "brightness-0 invert" : "",
        className,
      )}
      priority
    />
  );
}
