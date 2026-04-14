import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full border border-cream-50/20 bg-transparent px-4 py-3 text-body text-cream-50 placeholder:text-cream-50/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";