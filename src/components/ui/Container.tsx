import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-6 md:px-12", className)}>
      {children}
    </div>
  );
}