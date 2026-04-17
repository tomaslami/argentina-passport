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
 * Sizes reflect the natural proportions of each variant.
 * The horizontal imagotipo asset from Figma is used as the primary logo.
 * Additional variant assets (monogram, vertical) to be added when delivered by Synera.
 */
const logoAssets: Record<LogoVariant, Record<LogoTheme, { src: string; width: number; height: number }>> = {
  horizontal: {
    negative: { src: "/logo/logo-wordmark.png", width: 1200, height: 300 },
    positive: { src: "/logo/logo-wordmark.png", width: 1200, height: 300 },
  },
  vertical: {
    negative: { src: "/logo/logo-wordmark.png", width: 1200, height: 300 },
    positive: { src: "/logo/logo-wordmark.png", width: 1200, height: 300 },
  },
  monogram: {
    negative: { src: "/logo/ap-horizontal-negative.png", width: 1601, height: 901 },
    positive: { src: "/logo/ap-horizontal-negative.png", width: 1601, height: 901 },
  },
};

export function Logo({ variant = "horizontal", theme = "negative", className }: LogoProps) {
  const asset = logoAssets[variant][theme];

  return (
    <Image
      src={asset.src}
      alt="Argentina Passport"
      width={asset.width}
      height={asset.height}
      className={cn("object-contain", className)}
      priority
    />
  );
}
