import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 4, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "w-full border border-cream-50/20 bg-transparent px-4 py-3 text-body text-cream-50 placeholder:text-cream-50/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500",
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";