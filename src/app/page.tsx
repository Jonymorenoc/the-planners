import Link from "next/link";
import { ArrowRight, CalendarHeart, Sparkles, ShieldCheck, Clock3 } from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";
import { cn } from "@/lib/utils";

const quickLinks = [
  { label: "Dashboard", href: "/dashboard", description: "Resumen vivo de invitados, pagos y tareas" },
  { label: "Generar sitio", href: "/site", description: "Crea un micrositio en minutos con CMS" },
  { label: "Invitaciones", href: "/admin/invitations", description: "Comparte códigos express por email o WhatsApp" },
];

const pillars = [
  {
    title: "Operaciones",
    bullets: [
      "Onboarding inteligente por códigos",
      "Gestión de vuelos, hoteles y pagos",
      "Planeador de asientos drag & drop",
    ],
    accent: "bg-[#E6F5F1]",
  },
  {
    title: "Experiencia",
    bullets: [
      "Generador de sitio + RSVP", "Diseños sociales con IA", "Álbum fotográfico colaborativo",
    ],
    accent: "bg-[#ECE9FF]",
  },
  {
    title: "Legal & Finanzas",
    bullets: [
      "Contratos asistidos por IA", "Firma digital y sumatoria automática", "Cotizador dinámico por perfiles",
    ],
    accent: "bg-[#FFF4E3]",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="glass-card gradient-border rounded-[32px] p-10">
          <div className="flex items-center gap-3 text-sm text-rose-400">
            <CalendarHeart className="h-4 w-4" />
            Bodas destino sin fricción
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-snug text-zinc-900">
            Diseña, coordina y despliega la boda perfecta con asistencia IA.
          </h1>
          <p className="mt-4 max-w-xl text-base text-zinc-600">
            The Planners centraliza el viaje de tus invitados, la logística con proveedores y la narrativa visual del evento desde un mismo panel.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black/80"
            >
              Entrar al dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-black/5"
            >
              Ver demo guiada
            </Link>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-zinc-600 md:grid-cols-3">
            {[
              { icon: Sparkles, label: "Plantillas personalizadas", detail: "Diseños listos para redes y sitio" },
              { icon: ShieldCheck, label: "Checklist legal", detail: "Contratos con firma digital y sumatoria" },
              { icon: Clock3, label: "Automatización", detail: "Recordatorios multicanal y IA" },
            ].map(({ icon: Icon, label, detail }) => (
              <div key={label} className="rounded-2xl bg-white/70 p-3 shadow-sm">
                <div className="flex items-center gap-2 text-zinc-700">
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-semibold">{label}</span>
                </div>
                <p className="mt-1 text-xs text-zinc-500">{detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-[32px] p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">Quick actions</h2>
          <div className="mt-6 space-y-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col rounded-2xl bg-gradient-to-r from-white/80 to-white px-5 py-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-base font-semibold text-zinc-800">{link.label}</span>
                <span className="text-xs text-zinc-500">{link.description}</span>
              </Link>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-[#FDE8E4]/70 p-4 text-xs text-zinc-600">
            Sube tu branding y deja que la IA genere posts, invitaciones y landing pages alineadas a la estética de la pareja.
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="glass-card rounded-[28px] p-6">
            <div className={cn("w-fit rounded-full px-3 py-1 text-xs font-semibold text-zinc-700", pillar.accent)}>
              {pillar.title}
            </div>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600">
              {pillar.bullets.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SectionCard
        title="The Planner OS"
        description="Controla cada etapa desde un hub en la nube, comparte avances con la pareja y automatiza seguimiento con invitados."
        accent="bg-[#ECE9FF]"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase text-zinc-400">Suite IA</p>
            <p>Asistente contextual para hotelería, vuelos y contratos. Genera respuestas personalizadas según el perfil del planner.</p>
          </div>
          <div>
            <p className="text-xs uppercase text-zinc-400">Workflow visual</p>
            <p>Timeline colaborativo con hitos, presupuestos y checklist legal. Exporta PDF o comparte en modo lectura.</p>
          </div>
          <div>
            <p className="text-xs uppercase text-zinc-400">Analytics</p>
            <p>Seguimiento en tiempo real de pagos, asistencia confirmada y ocupación hotelera con alertas inteligentes.</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
