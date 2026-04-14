import { cn } from "@/lib/utils";

type LogoVariant = "monogram" | "vertical" | "horizontal";
type LogoTheme = "positive" | "negative";

type LogoProps = {
  variant?: LogoVariant;
  theme?: LogoTheme;
  className?: string;
};

const viewBoxes: Record<LogoVariant, string> = {
  monogram: "0 0 64 64",
  vertical: "0 0 80 96",
  horizontal: "0 0 160 64",
};

export function Logo({ variant = "monogram", theme = "negative", className }: LogoProps) {
  const fill = theme === "negative" ? "currentColor" : "#1A3557";

  return (
    <svg
      aria-hidden
      focusable="false"
      role="img"
      viewBox={viewBoxes[variant]}
      className={cn("block", className)}
    >
      {/* Placeholder geometric mark until official SVG assets are delivered */}
      {variant === "monogram" && (
        <g fill={fill}>
          <path d="M10 8h12v48H10z" />
          <path d="M42 8h12v48H42z" />
          <path d="M22 28h20v8H22z" />
        </g>
      )}
      {variant === "vertical" && (
        <g fill={fill}>
          <path d="M12 12h56v12H12z" />
          <path d="M28 24h24v52H28z" />
          <path d="M16 80h48v8H16z" />
        </g>
      )}
      {variant === "horizontal" && (
        <g fill={fill}>
          <path d="M12 12h20v40H12z" />
          <path d="M40 12h20v40H40z" />
          <path d="M68 26h80v8H68z" />
        </g>
      )}
    </svg>
  );
}