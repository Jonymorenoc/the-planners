import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { CalendarHeart, Sparkles } from "lucide-react";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Planners",
  description: "Plataforma para bodas destino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased bg-transparent text-zinc-800"
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row">
          <Sidebar />
          <div className="relative flex flex-1 flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-3 text-xl font-semibold tracking-tight">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <CalendarHeart className="h-5 w-5 text-rose-500" />
                </span>
                The Planners
              </Link>
              <div className="flex items-center gap-4">
                <MobileNav />
                <div className="hidden rounded-full bg-white/80 px-4 py-2 text-sm text-zinc-500 shadow-sm lg:flex lg:items-center lg:gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Versión demo sin autenticación
                </div>
                <div className="hidden items-center gap-3 text-xs font-medium text-emerald-600 lg:flex">
                  Próximamente: login para planners y asistentes
                </div>
              </div>
            </div>
            <main className="hero-grid relative z-0 flex flex-1 flex-col gap-8 rounded-[28px] px-6 py-8">
              {children}
            </main>
            <footer className="pb-4 text-xs text-zinc-500">
              © {new Date().getFullYear()} The Planners. Diseñado para planners que buscan experiencias inolvidables.
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
