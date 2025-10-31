"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { plannerNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
        aria-label="Abrir menú"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open ? (
        <div className="glass-card absolute inset-x-4 top-20 z-20 space-y-2 rounded-3xl p-4">
          {plannerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn("flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-zinc-700 hover:bg-black/5", item.accent)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

