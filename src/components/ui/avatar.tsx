import type { HTMLAttributes } from "react";

export function Avatar({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="avatar"
      className={`relative flex shrink-0 overflow-hidden rounded-full ${className}`}
      {...props}
    />
  );
}

export function AvatarFallback({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="avatar-fallback"
      className={`flex h-full w-full items-center justify-center rounded-full ${className}`}
      {...props}
    />
  );
}
