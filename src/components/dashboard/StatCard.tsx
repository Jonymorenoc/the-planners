import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  variant?: "default" | "secondary" | "accent";
};

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  variant = "default",
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border border-white/60 bg-white/70 shadow-glass transition-all",
        variant === "secondary" && "bg-secondary/40",
        variant === "accent" && "bg-accent/40",
      )}
    >
      <CardContent className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-foreground/60">
            {title}
          </p>
          <p className="font-display text-3xl text-foreground">{value}</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {change}
          </p>
        </div>
        <div className="rounded-3xl bg-white/50 p-3 text-primary shadow-inset">
          <Icon className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  );
}
