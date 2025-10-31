import { Palette, Sparkles, LayoutTemplate } from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";

const templates = [
  { name: "Mediterranean Dream", palette: "Blanco, arena, azul marino" },
  { name: "Jungle Romance", palette: "Verde oliva, dorado, blush" },
  { name: "Minimal Pastel", palette: "Lavanda, menta, rosa suave" },
];

export default function Templates() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Diseño</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Galería de templates</h1>
        <p className="mt-1 text-sm text-zinc-600">Genera sitios y kits visuales con IA a partir del moodboard de la pareja.</p>
      </header>

      <SectionCard
        title="Selección sugerida"
        description="Estilos curados para bodas destino"
        accent="bg-[#ECE9FF]"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {templates.map((template) => (
            <div key={template.name} className="space-y-3 rounded-2xl bg-white/70 p-4 shadow-sm">
              <div className="flex h-32 items-center justify-center rounded-2xl bg-gradient-to-br from-white via-[#FDE8E4] to-[#ECE9FF] text-zinc-500">
                <LayoutTemplate className="h-8 w-8" />
              </div>
              <p className="text-sm font-semibold text-zinc-800">{template.name}</p>
              <p className="text-xs text-zinc-500">{template.palette}</p>
              <button className="rounded-full bg-black/80 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-black/90">
                Personalizar
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="IA de branding"
        description="Sube referencias de la pareja y obtén un sistema visual completo."
        accent="bg-[#FDE8E4]"
      >
        <div className="flex items-center gap-3 text-sm text-zinc-600">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FDE8E4] text-zinc-700">
            <Palette className="h-5 w-5" />
          </span>
          <p>Define moodboard, tipografías y variantes de logo. Exporta paquetes para sitio, redes, invitaciones impresas y señalética.</p>
        </div>
      </SectionCard>

      <SectionCard
        title="Modo colaborativo"
        description="Comparte con diseñadores y planners asociados."
        accent="bg-[#E6F5F1]"
      >
        <div className="flex items-center gap-3 text-sm text-zinc-600">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F5F1] text-zinc-700">
            <Sparkles className="h-5 w-5" />
          </span>
          Revisa versiones, deja comentarios y aprueba cambios con historial respaldado.
        </div>
      </SectionCard>
    </div>
  );
}
