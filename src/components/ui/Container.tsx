import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Horizontal padding per designer spec:
 *   390px → 24px  /  768px → 32px  /  1024px → 48px  /  1440px+ → 64px
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1280px] px-6 md:px-8 lg:px-12 xl:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
