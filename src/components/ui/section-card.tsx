import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  accent?: string;
  children?: ReactNode;
  className?: string;
};

export function SectionCard({ title, description, accent = "bg-white/80", children, className }: Props) {
  return (
    <section className={cn("gradient-border glass-card rounded-[24px] p-6", className)}>
      <div className="flex flex-col gap-2">
        <div className={cn("inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium text-zinc-700", accent)}>
          {title}
        </div>
        {description ? <p className="max-w-2xl text-sm text-zinc-600">{description}</p> : null}
      </div>
      {children ? <div className="mt-4 space-y-4 text-sm text-zinc-600">{children}</div> : null}
    </section>
  );
}

