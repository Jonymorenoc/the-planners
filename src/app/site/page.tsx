"use client";

import { useState } from "react";
import { Eye, Save, Sparkles } from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";

const sections = ["Bienvenida", "Agenda", "Hoteles", "Vuelos", "RSVP", "Preguntas frecuentes"];

export default function Site() {
  const [slug, setSlug] = useState("mi-boda");
  const [theme, setTheme] = useState("Pastel romántico");

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Experiencia</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Generador de micrositio</h1>
        <p className="mt-1 text-sm text-zinc-600">Diseña un sitio para invitados con branding personalizado, CMS y vista previa en vivo.</p>
      </header>

      <SectionCard
        title="Configuración"
        description="Define URL y estética"
        accent="bg-[#E6F5F1]"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs uppercase text-zinc-400">
            Slug del sitio
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-black/10 bg-white/80 px-3 py-2 text-sm"
            />
            <span className="mt-1 block text-[11px] text-zinc-500">URL: theplanners.app/{slug || "tu-sitio"}</span>
          </label>
          <label className="text-xs uppercase text-zinc-400">
            Tema visual
            <input
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-black/10 bg-white/80 px-3 py-2 text-sm"
            />
            <span className="mt-1 block text-[11px] text-zinc-500">Combina colores, tipografías y moodboard.</span>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black/80">
            <Save className="h-4 w-4" />
            Guardar borrador
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-black/5">
            <Eye className="h-4 w-4" />
            Ver preview
          </button>
        </div>
      </SectionCard>

      <SectionCard
        title="Secciones activas"
        description="Ordena y edita bloques desde el CMS"
        accent="bg-[#ECE9FF]"
      >
        <ul className="grid gap-3 text-sm text-zinc-600 md:grid-cols-3">
          {sections.map((section) => (
            <li key={section} className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm">
              {section}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard
        title="Contenido asistido"
        description="IA propone copy y assets según el perfil de la pareja"
        accent="bg-[#FDE8E4]"
      >
        <div className="flex items-center gap-3 text-sm text-zinc-600">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FDE8E4] text-zinc-700">
            <Sparkles className="h-5 w-5" />
          </span>
          Sube referentes visuales y deja que la IA sugiera copy, imágenes y CTA personalizados para cada sección.
        </div>
      </SectionCard>
    </div>
  );
}
