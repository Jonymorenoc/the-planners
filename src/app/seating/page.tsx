import { SectionCard } from "@/components/ui/section-card";

const tables = [
  { name: "Mesa 1 — Familia", seats: "10 / 10", status: "Completa", accent: "#E6F5F1" },
  { name: "Mesa 2 — Amigos", seats: "8 / 10", status: "2 lugares libres", accent: "#ECE9FF" },
  { name: "Mesa 3 — Staff", seats: "6 / 8", status: "Pendiente confirmar", accent: "#FFF4E3" },
];

export default function Seating() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Experiencia</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Planner de asientos</h1>
        <p className="mt-1 text-sm text-zinc-600">Organiza mesas, preferencias y restricciones alimentarias con una vista visual drag & drop.</p>
      </header>

      <SectionCard
        title="Estado de mesas"
        description="Distribuye invitados por afinidad, familia o idioma."
        accent="bg-[#E6F0FF]"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {tables.map((table) => (
            <div key={table.name} className="rounded-2xl bg-white/80 p-5 shadow-sm">
              <div className="text-sm font-semibold text-zinc-800">{table.name}</div>
              <p className="text-xs text-zinc-500">{table.seats}</p>
              <p className="mt-2 inline-flex rounded-full px-3 py-1 text-[11px] font-medium text-zinc-600" style={{ backgroundColor: table.accent }}>
                {table.status}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Vista de mapa"
        description="Dibuja layout del venue, arrastra mesas y genera impresión lista para el hotel."
        accent="bg-[#FDE8E4]"
      >
        <div className="flex flex-col gap-4 text-sm text-zinc-600 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl">
            Usa la cuadrícula inteligente para acomodar mesas redondas o imperiales. La IA sugiere reacomodos según afinidad o necesidades especiales.
          </p>
          <button className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black/80">
            Abrir canvas
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
