import { CloudUpload, Images, Wand2 } from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";

export default function Albums() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Memorias</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Álbum fotográfico</h1>
        <p className="mt-1 text-sm text-zinc-600">Comparte galerías privadas, recibe contenido de invitados y genera slideshows automáticos.</p>
      </header>

      <SectionCard
        title="Carga inteligente"
        description="Sincroniza Google Drive, Dropbox o carga directa."
        accent="bg-[#FDE8E4]"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-sm text-zinc-600">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FDE8E4] text-zinc-700">
              <CloudUpload className="h-5 w-5" />
            </span>
            <p>Arrastra fotos y la IA agrupa por momentos: getting ready, ceremonia, after party.</p>
          </div>
          <button className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black/80">
            Crear álbum
          </button>
        </div>
      </SectionCard>

      <SectionCard
        title="Historias generadas"
        description="Videos y slideshows listos para compartir en recepción."
        accent="bg-[#ECE9FF]"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {[Images, Wand2].map((Icon, idx) => (
            <div key={idx} className="flex gap-3 rounded-2xl bg-white/70 p-4 text-sm text-zinc-600">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/5 text-zinc-700">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-zinc-800">{idx === 0 ? "Galerías por pareja" : "Reels automáticos"}</p>
                <p className="text-xs text-zinc-500">
                  {idx === 0
                    ? "Crea secciones exclusivas para cada familia y amigos."
                    : "IA selecciona mejores fotos + música para redes."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
