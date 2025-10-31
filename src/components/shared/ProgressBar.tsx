import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  size?: "sm" | "md";
  className?: string;
};

export function ProgressBar({
  value,
  size = "md",
  className,
}: ProgressBarProps) {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-white/40 shadow-inner",
        size === "sm" ? "h-2.5" : "h-3.5",
        className,
      )}
    >
      <div
        className="h-full w-full rounded-full bg-gradient-to-r from-primary via-primary-glow to-secondary transition-all duration-500 ease-out"
        style={{ transform: `translateX(${safeValue - 100}%)` }}
      />
    </div>
  );
}
