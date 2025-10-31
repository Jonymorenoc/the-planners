"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { plannerNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-card gradient-border hidden h-[calc(100vh-2rem)] w-64 shrink-0 flex-col justify-between rounded-[28px] p-6 lg:flex">
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">Navegación</p>
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          {plannerNav.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl px-3 py-2 transition-all",
                  active
                    ? "bg-black text-white shadow-lg"
                    : "hover:bg-black/5 text-zinc-600"
                )}
              >
                <span className={cn("flex h-9 w-9 items-center justify-center rounded-2xl text-zinc-700", item.accent, active && "bg-white/20 text-white")}> 
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="flex flex-col">
                  <span className="font-medium">{item.label}</span>
                  {item.description ? (
                    <span className="text-[11px] text-zinc-400">{item.description}</span>
                  ) : null}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="rounded-2xl bg-[#ECE9FF] p-4 text-xs text-zinc-600">
        <p className="font-medium text-zinc-700">Tip</p>
        <p>
          Usa códigos inteligentes para acelerar el onboarding de invitados y comparte el link del sitio en minutos.
        </p>
      </div>
    </aside>
  );
}

