import { Calculator, Coins, Users, Percent } from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";

const rules = [
  { label: "Niños", detail: "50% tarifa habitación + vuelo" },
  { label: "Habitación doble", detail: "Tarifa estándar / 2 por huésped" },
  { label: "Suite nupcial", detail: "Incluye amenities + upgrade cortesía" },
  { label: "Staff", detail: "Cubierto al 100% por la agencia" },
];

export default function Pricing() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Finanzas</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Cotizador dinámico</h1>
        <p className="mt-1 text-sm text-zinc-600">Aplica reglas por tipo de huésped, habitación y proveedor, con cálculo automático de comisiones.</p>
      </header>

      <SectionCard
        title="Reglas activas"
        description="Personaliza porcentajes y excepciones."
        accent="bg-[#FFF4E3]"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {rules.map((rule) => (
            <div key={rule.label} className="rounded-2xl bg-white/75 p-4 shadow-sm">
              <p className="text-sm font-semibold text-zinc-800">{rule.label}</p>
              <p className="text-xs text-zinc-500">{rule.detail}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Resumen"
        description="Totales estimados"
        accent="bg-[#E6F5F1]"
      >
        <div className="grid gap-3 md:grid-cols-3">
          {[Coins, Users, Percent].map((Icon, idx) => (
            <div key={idx} className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 text-sm text-zinc-600">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/5 text-zinc-700">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-zinc-800">
                  {idx === 0 ? "Total estimado" : idx === 1 ? "Huéspedes" : "Comisión"}
                </p>
                <p className="text-xs text-zinc-500">
                  {idx === 0 ? "$68,400" : idx === 1 ? "120 personas" : "12% agencia"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Simular escenarios"
        description="Genera proformas en PDF para la pareja y proveedores"
        accent="bg-[#ECE9FF]"
      >
        <div className="flex flex-col gap-4 text-sm text-zinc-600 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl">Configura diferentes combinaciones de habitaciones y fechas. El cotizador sugiere el escenario más rentable y el más conveniente para invitados.</p>
          <button className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black/80">
            <Calculator className="h-4 w-4" />
            Crear proforma
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
