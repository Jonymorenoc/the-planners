import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/80 text-primary-foreground shadow-sm",
        success:
          "border-transparent bg-emerald-200/70 text-emerald-800 shadow-sm",
        warning:
          "border-transparent bg-amber-200/70 text-amber-900 shadow-sm",
        danger: "border-transparent bg-rose-200/75 text-rose-900 shadow-sm",
        info: "border-transparent bg-secondary/80 text-secondary-foreground",
        outline:
          "border-border/70 bg-white/40 text-foreground backdrop-blur-glass",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
