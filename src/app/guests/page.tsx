import { Mail, UsersRound, Sparkles, MessageCircle } from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";

const segments = [
  {
    title: "Invitados prioridad",
    value: "24",
    detail: "VIP con upgrade de habitación y concierge dedicado.",
    accent: "bg-[#FDE8E4]",
  },
  {
    title: "Pendientes RSVP",
    value: "18",
    detail: "Se enviará recordatorio híbrido (email + WhatsApp).",
    accent: "bg-[#ECE9FF]",
  },
  {
    title: "Con hijos",
    value: "12",
    detail: "Activar beneficios kids club y transporte.",
    accent: "bg-[#E6F5F1]",
  },
];

export default function Guests() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Invitados</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Gestión y seguimiento</h1>
        <p className="mt-1 text-sm text-zinc-600">Segmenta, envía códigos inteligentes y monitorea pagos y reservas en un timeline colaborativo.</p>
      </header>

      <SectionCard
        title="Onboarding express"
        description="Genera códigos personalizados para que tus invitados confirmen asistencia, vuelo y hotel en minutos."
        accent="bg-[#E6F5F1]"
      >
        <ul className="grid gap-4 md:grid-cols-3">
          {[UsersRound, Mail, MessageCircle].map((Icon, idx) => (
            <li key={idx} className="rounded-2xl bg-white/70 p-4 shadow-sm">
              <Icon className="h-5 w-5 text-zinc-600" />
              <p className="mt-2 text-sm font-semibold text-zinc-800">
                {[
                  "Carga sobres masivos desde Excel o CRM",
                  "Envía invitaciones con branding por email",
                  "Sigue respuestas y recordatorios por WhatsApp",
                ][idx]}
              </p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard
        title="Segmentos dinámicos"
        description="Visualiza grupos clave y acciones recomendadas."
        accent="bg-[#ECE9FF]"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {segments.map((segment) => (
            <div key={segment.title} className="rounded-2xl bg-white/75 p-5 shadow-sm">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold uppercase text-zinc-400">{segment.title}</span>
                <span className="text-2xl font-semibold text-zinc-900">{segment.value}</span>
              </div>
              <p className="mt-2 text-xs text-zinc-500">{segment.detail}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="IA de invitados"
        description="Sugiere respuestas automáticas según perfil: alergias, upgrades, transfer y seguimiento de pagos."
        accent="bg-[#FFF4E3]"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-sm text-zinc-600">
            Activa flujos condicionados (ej. “familia con niños” → enviar paquete kids club + upgrade). La IA sugerirá el mejor canal y mensaje.
          </p>
          <button className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black/80">
            <Sparkles className="h-4 w-4" />
            Diseñar flujo
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
