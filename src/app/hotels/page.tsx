import { BedDouble, Wand2, Hotel, Star } from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";

const blocks = [
  {
    title: "Negociación",
    details: [
      "IA genera propuesta de bloque + contrato",
      "Comparativa de tarifas por categoría",
      "Cláusulas sugeridas (hab extra, cancelación)",
    ],
  },
  {
    title: "Bloque vivo",
    details: [
      "Visualiza ocupación en tiempo real",
      "Configura upgrades automáticos",
      "Sincroniza pagos parciales",
    ],
  },
];

export default function Hotels() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Hotelería</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Reservas y onboarding</h1>
        <p className="mt-1 text-sm text-zinc-600">Administra bloqueos, upgrades y asignación de habitaciones desde un panel inteligente.</p>
      </header>

      <SectionCard
        title="Buscador inteligente"
        description="Asistente IA que filtra hoteles por estilo, presupuesto y disponibilidad."
        accent="bg-[#ECE9FF]"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex gap-3 rounded-2xl bg-white/75 p-4 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ECE9FF] text-zinc-700">
              <Wand2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-zinc-800">Sugiere combos</p>
              <p className="text-xs text-zinc-500">Hoteles + actividades cercanas, filtros por family friendly, adults only, boutique.</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-2xl bg-white/75 p-4 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FDE8E4] text-zinc-700">
              <Star className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-zinc-800">Benchmark dinámico</p>
              <p className="text-xs text-zinc-500">Compara reseñas, servicios y tarifas con gráficas rápidas.</p>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Gestión de bloque"
        description="Controla el estado de habitaciones y tareas con el hotel."
        accent="bg-[#FDE8E4]"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {blocks.map((block) => (
            <div key={block.title} className="rounded-2xl bg-white/75 p-5 shadow-sm">
              <p className="text-xs uppercase text-zinc-400">{block.title}</p>
              <ul className="mt-3 space-y-2 text-xs text-zinc-600">
                {block.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Asignación automática"
        description="Asigna habitaciones según preferencias, tipo de familia y presupuesto."
        accent="bg-[#E6F5F1]"
      >
        <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 text-xs text-zinc-600">
          <BedDouble className="h-4 w-4 text-emerald-500" />
          <span>Elige las reglas (ej. niños → habitación familiar) y deja que la IA distribuya y envíe confirmaciones al huésped.</span>
        </div>
      </SectionCard>
    </div>
  );
}
