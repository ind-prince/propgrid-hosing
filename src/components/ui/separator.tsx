import type { HTMLAttributes } from "react";

interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export function Separator({
  className = "",
  orientation = "horizontal",
  ...props
}: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      data-orientation={orientation}
      className={`${orientation === "horizontal" ? "h-px w-full" : "h-full w-px"} shrink-0 bg-slate-200 ${className}`}
      {...props}
    />
  );
}
