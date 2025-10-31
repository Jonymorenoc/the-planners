import { FileText, PenTool, Calculator, ShieldCheck } from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";

const templates = [
  { title: "Fotografía", detail: "Entrega digital, impresiones y uso redes" },
  { title: "Hotel", detail: "Bloque, upgrades, penalizaciones" },
  { title: "Venue", detail: "Horario extendido, montaje, proveedores externos" },
  { title: "Otros", detail: "Catering, música, transporte" },
];

export default function Contracts() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Legal & Finanzas</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Contratos inteligentes</h1>
        <p className="mt-1 text-sm text-zinc-600">Centraliza contratos, haz seguimiento de firmas y deja que la IA calcule totales y riesgos.</p>
      </header>

      <SectionCard
        title="Plantillas base"
        description="Personaliza cláusulas y genera PDF firmables."
        accent="bg-[#FFF4E3]"
      >
        <div className="grid gap-3 md:grid-cols-2">
          {templates.map((tpl) => (
            <div key={tpl.title} className="flex items-center justify-between rounded-2xl bg-white/75 p-4 shadow-sm">
              <div>
                <p className="text-sm font-semibold text-zinc-800">{tpl.title}</p>
                <p className="text-xs text-zinc-500">{tpl.detail}</p>
              </div>
              <button className="rounded-full bg-black/80 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-black/90">
                Abrir
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Chat legal"
        description="Haz preguntas, resume cláusulas y genera anexos automáticos."
        accent="bg-[#ECE9FF]"
      >
        <div className="grid gap-3 md:grid-cols-2">
          {[FileText, ShieldCheck, Calculator, PenTool].map((Icon, idx) => (
            <div key={idx} className="flex gap-3 rounded-2xl bg-white/70 p-4 text-sm text-zinc-600">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/5 text-zinc-700">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold text-zinc-800">
                  {[
                    "Resúmenes en segundos",
                    "Alertas de riesgo",
                    "Sumatoria automática",
                    "Track de firmas",
                  ][idx]}
                </p>
                <p className="text-xs text-zinc-500">
                  {[
                    "Sy resume contratos largos a bullets accionables",
                    "IA detecta cláusulas sensibles y propone ajustes",
                    "Calcula totales por proveedor e impuestos",
                    "Controla firma electrónica y vencimientos",
                  ][idx]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
