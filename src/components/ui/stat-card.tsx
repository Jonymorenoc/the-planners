import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  accent?: string;
};

export function StatCard({ label, value, hint, icon: Icon, accent = "bg-[#FDE8E4]" }: Props) {
  return (
    <div className={cn("glass-card flex flex-col justify-between rounded-[24px] p-5")}> 
      <div className="flex items-center gap-3">
        <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-2xl text-zinc-700", accent)}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="text-sm font-medium text-zinc-600">{label}</div>
      </div>
      <div className="mt-5 text-3xl font-semibold text-zinc-900">{value}</div>
      {hint ? <div className="mt-1 text-xs text-zinc-500">{hint}</div> : null}
    </div>
  );
}

