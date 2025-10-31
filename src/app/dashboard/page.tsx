import {
  Users2,
  BedDouble,
  PlaneTakeoff,
  FileText,
  CreditCard,
  ClipboardCheck,
  BellRing,
  Send,
} from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";
import { StatCard } from "@/components/ui/stat-card";

const stats = [
  { label: "Invitados confirmados", value: "68 / 120", hint: "+12 en las últimas 48h", icon: Users2, accent: "bg-[#E6F5F1]" },
  { label: "Reservas hotel", value: "34", hint: "8 pendientes", icon: BedDouble, accent: "bg-[#ECE9FF]" },
  { label: "Vuelos emitidos", value: "52", hint: "Restan 16", icon: PlaneTakeoff, accent: "bg-[#FDE8E4]" },
  { label: "Contratos firmados", value: "5/7", hint: "Fotografía en revisión", icon: FileText, accent: "bg-[#FFF4E3]" },
  { label: "Pagos cobrados", value: "$48,900", hint: "75% del presupuesto", icon: CreditCard, accent: "bg-[#F8EFF7]" },
  { label: "Checklist", value: "18/22", hint: "Próximo: seleccionar menú", icon: ClipboardCheck, accent: "bg-[#E3F2FF]" },
];

const timeline = [
  {
    title: "Enviar recordatorio de RSVP",
    date: "Hoy, 14:00",
    detail: "Se enviará push + WhatsApp a invitados pendientes.",
  },
  {
    title: "Revisión contrato hotel",
    date: "Mañana, 09:30",
    detail: "IA sugiere cláusula de bloque adicional (10 hab).",
  },
  {
    title: "Diseños sociales",
    date: "Viernes, 17:00",
    detail: "Plantillas Instagram en espera de aprobación del planner.",
  },
];

const activity = [
  { icon: BellRing, title: "Alertas AI", desc: "4 invitados con vuelos sin pagar" },
  { icon: Send, title: "Campañas en curso", desc: "Invitaciones WhatsApp + email" },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Resumen</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Dashboard operativo</h1>
        <p className="mt-1 text-sm text-zinc-600">Sigue confirmaciones, pagos, contratos y tareas críticas desde una sola vista.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <SectionCard
          title="Timeline"
          description="Hitos próximos con recomendaciones automáticas."
          accent="bg-[#E3F2FF]"
        >
          <ol className="space-y-4">
            {timeline.map((item) => (
              <li key={item.title} className="rounded-2xl bg-white/70 p-4 shadow-sm">
                <p className="text-xs uppercase text-zinc-400">{item.date}</p>
                <p className="mt-1 font-medium text-zinc-800">{item.title}</p>
                <p className="text-xs text-zinc-500">{item.detail}</p>
              </li>
            ))}
          </ol>
        </SectionCard>
        <SectionCard
          title="Automations"
          description="Flujos activos disparados por IA."
          accent="bg-[#FDE8E4]"
        >
          <ul className="space-y-3">
            {activity.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex items-start gap-3 rounded-2xl bg-white/70 p-3">
                <span className="rounded-full bg-black/5 p-2 text-zinc-600">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-medium text-zinc-800">{title}</p>
                  <p className="text-xs text-zinc-500">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
