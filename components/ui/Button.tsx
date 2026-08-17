import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "outline";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors",
        variant === "primary" &&
          "bg-foreground text-background hover:opacity-90",
        variant === "outline" &&
          "border border-border hover:bg-surface-card",
        className
      )}
      {...props}
    />
  );
}

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "outline";
};

export function LinkButton({
  className,
  variant = "primary",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors",
        variant === "primary" &&
          "bg-foreground text-background hover:opacity-90",
        variant === "outline" &&
          "border border-border hover:bg-surface-card",
        className
      )}
      {...props}
    />
  );
}
