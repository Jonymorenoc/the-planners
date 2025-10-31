import { Plane, CreditCard, Info } from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";

const lanes = [
  {
    title: "Por emitir",
    items: ["12 invitados con reserva sin boleto", "Requiere confirmación de nombres legales"],
    accent: "bg-[#FDE8E4]",
  },
  {
    title: "Pagados",
    items: ["52 boletos emitidos", "Total cobrado: $28,400"],
    accent: "bg-[#E6F5F1]",
  },
  {
    title: "Alertas",
    items: ["2 vuelos con cambio de itinerario", "4 pasajeros sin información de pasaporte"],
    accent: "bg-[#ECE9FF]",
  },
];

export default function Flights() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Logística</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Gestión de vuelos</h1>
        <p className="mt-1 text-sm text-zinc-600">Cotiza rutas, divide pagos y sincroniza alertas con invitados y proveedores aéreos.</p>
      </header>

      <SectionCard
        title="Pipeline"
        description="Estado general de reservas aéreas"
        accent="bg-[#FDE8E4]"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {lanes.map((lane) => (
            <div key={lane.title} className="rounded-2xl bg-white/75 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-zinc-400">{lane.title}</span>
                <Plane className="h-4 w-4 text-zinc-500" />
              </div>
              <ul className="mt-3 space-y-2 text-xs text-zinc-600">
                {lane.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Pagos divididos"
        description="Define quién paga qué y permite fraccionar por invitado, familia o empresa."
        accent="bg-[#FFF4E3]"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase text-zinc-400">Modelo sugerido</p>
            <p className="text-sm text-zinc-600">Niños pagan 50%, adultos 100%, staff cubierto por la empresa. Los upgrades se prorratean con pago directo vía link seguro.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black/80">
            <CreditCard className="h-4 w-4" />
            Configurar reglas
          </button>
        </div>
      </SectionCard>

      <SectionCard
        title="Control de incidencias"
        description="Alertas automáticas cuando hay cambios, cancelaciones o upgrades disponibles."
        accent="bg-[#E6F5F1]"
      >
        <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 text-xs text-zinc-600">
          <Info className="h-4 w-4 text-amber-500" />
          <span>Activa el canal de WhatsApp para enviar cambios de gate o reembolsos inmediatos.</span>
        </div>
      </SectionCard>
    </div>
  );
}
