import { Sparkles, CalendarRange, Instagram, Facebook, DownloadCloud } from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";

export default function Social() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Narrativa</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Plan social + diseño</h1>
        <p className="mt-1 text-sm text-zinc-600">Crea campañas para redes, comparte con la pareja y programa publicaciones antes, durante y después del evento.</p>
      </header>

      <SectionCard
        title="Calendario IA"
        description="Genera una narrativa completa con momentos clave."
        accent="bg-[#E3F2FF]"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E3F2FF] text-zinc-700">
              <CalendarRange className="h-5 w-5" />
            </span>
            <p className="max-w-sm text-sm text-zinc-600">Define tono, hashtags y audiencia. La IA propone piezas pre boda, cobertura en vivo y recuerdos post evento.</p>
          </div>
          <button className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black/80">
            Generar calendario
          </button>
        </div>
      </SectionCard>

      <SectionCard
        title="Diseños automáticos"
        description="Plantillas listas para Instagram, TikTok, reels y stories."
        accent="bg-[#F0F7FF]"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[Instagram, Facebook, DownloadCloud].map((Icon, idx) => (
            <div key={idx} className="flex gap-3 rounded-2xl bg-white/75 p-4 text-sm text-zinc-600">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/5 text-zinc-700">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-zinc-800">
                  {idx === 0 ? "Stories animadas" : idx === 1 ? "Posteo Facebook" : "Descarga en lote"}
                </p>
                <p className="text-xs text-zinc-500">
                  {idx === 0
                    ? "Secuencias verticales con música y CTA personalizable."
                    : idx === 1
                      ? "Versiones horizontales listas para promocionar con pago."
                      : "Exporta en ZIP con todos los formatos y copy estratégico."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Co-creación"
        description="Comparte tablero con la pareja y aprueba contenido en segundos."
        accent="bg-[#FDE8E4]"
      >
        <div className="flex items-center gap-3 text-sm text-zinc-600">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FDE8E4] text-zinc-700">
            <Sparkles className="h-5 w-5" />
          </span>
          La IA aprende del feedback y ajusta automáticamente colores, tipografías y copy para mantener consistencia.
        </div>
      </SectionCard>
    </div>
  );
}
