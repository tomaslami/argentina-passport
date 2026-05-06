import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse" | "navy";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gold-500 text-navy-900 transition-colors duration-200 hover:bg-gold-400 active:bg-gold-400/90",
  secondary:
    "border border-cream-50 text-cream-50 transition-all duration-200 hover:bg-cream-50/10 active:bg-cream-50/20",
  ghost:
    "text-gold-500 transition-colors duration-200 hover:text-gold-400 active:text-gold-400/80",
  inverse:
    "bg-cream-50 text-navy-900 transition-colors duration-200 hover:bg-cream-50/90 active:bg-cream-50/80",
  // Scrolled nav: navy bg + cream text (Figma node 20-78)
  navy:
    "bg-navy-900 text-cream-50 transition-colors duration-200 hover:bg-navy-800 active:bg-navy-800/90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-small tracking-wide",
  md: "px-6 py-3 text-small font-medium tracking-wider",
  lg: "px-8 py-4 text-body font-medium tracking-wider",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center uppercase font-medium rounded-none cursor-pointer disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
