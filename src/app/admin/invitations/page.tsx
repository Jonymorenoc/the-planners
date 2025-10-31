import { Sparkles, Mail, MessageCircle } from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";

export default function Invitations() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Comunicación</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900">Invitaciones inteligentes</h1>
        <p className="mt-1 text-sm text-zinc-600">Envía invitaciones personalizadas por email o WhatsApp con códigos únicos y seguimiento automático.</p>
      </header>

      <SectionCard
        title="Generador de códigos"
        description="Configura mensaje y canal"
        accent="bg-[#FDE8E4]"
      >
        <form className="grid gap-4 md:grid-cols-2">
          <label className="text-xs uppercase text-zinc-400">
            Correo del invitado
            <input className="mt-1 w-full rounded-2xl border border-black/10 bg-white/80 px-3 py-2 text-sm" placeholder="invitado@correo.com" />
          </label>
          <label className="text-xs uppercase text-zinc-400">
            Canal preferido
            <select className="mt-1 w-full rounded-2xl border border-black/10 bg-white/80 px-3 py-2 text-sm">
              <option>Email</option>
              <option>WhatsApp</option>
              <option>Email + WhatsApp</option>
            </select>
          </label>
          <label className="md:col-span-2 text-xs uppercase text-zinc-400">
            Mensaje personalizado
            <textarea className="mt-1 w-full rounded-2xl border border-black/10 bg-white/80 px-3 py-2 text-sm" rows={3} placeholder="Hola {Nombre}, te esperamos en Riviera Maya..." />
          </label>
          <div className="md:col-span-2 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black/80">
              Generar y enviar
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-black/5">
              Copiar link
            </button>
          </div>
        </form>
      </SectionCard>

      <SectionCard
        title="Automatizaciones"
        description="Recordatorios y seguimiento"
        accent="bg-[#ECE9FF]"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {[Mail, MessageCircle].map((Icon, idx) => (
            <div key={idx} className="flex gap-3 rounded-2xl bg-white/70 p-4 text-sm text-zinc-600">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/5 text-zinc-700">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-zinc-800">{idx === 0 ? "Email tracking" : "Flujo WhatsApp"}</p>
                <p className="text-xs text-zinc-500">
                  {idx === 0 ? "Open rate, clicks y RSVP en un tablero" : "Respuestas automáticas + confirmación inmediata"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="IA Copy"
        description="Genera mensajes adaptados al tono de la boda"
        accent="bg-[#E6F5F1]"
      >
        <div className="flex items-center gap-3 text-sm text-zinc-600">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F5F1] text-zinc-700">
            <Sparkles className="h-5 w-5" />
          </span>
          Sugiere copy según moodboard y estilo de pareja. Ajusta idioma, formalidad y llamadas a la acción.
        </div>
      </SectionCard>
    </div>
  );
}
