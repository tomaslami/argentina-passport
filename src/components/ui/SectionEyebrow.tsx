import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionEyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  return (
    <span
      className={cn(
        "text-eyebrow font-extralight tracking-[0.1em] uppercase text-gold-500 inline-block",
        className,
      )}
    >
      /{children}
    </span>
  );
}