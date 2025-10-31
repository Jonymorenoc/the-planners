import { Instagram, Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/30 bg-white/30 backdrop-blur-xl">
      <div className="container flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 shadow-glow">
            <picture>
              <source srcSet="/the-planners-logo.png" type="image/png" />
              <img src="/the-planners-logo.svg" alt="The Planners" className="h-9 w-9" />
            </picture>
          </span>
          <div>
            <p className="font-display text-xl text-foreground">The Planners</p>
            <p className="text-sm text-foreground/60">
              Bodas destino diseñadas con amor, datos y creatividad.
            </p>
          </div>
        </div>
        <div className="grid gap-4 text-sm text-foreground/70 md:grid-cols-3 md:gap-8">
          <div>
            <p className="font-semibold uppercase tracking-wide text-foreground/60">
              Contacto
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +52 55 1234 5678
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> hola@theplanners.app
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-wide text-foreground/60">
              Social
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4" /> @theplanners.app
              </li>
              <li className="flex items-center gap-2">
                <Send className="h-4 w-4" /> Newsletter mensual
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="font-semibold uppercase tracking-wide text-foreground/60">
              Agenda una demo
            </p>
            <p>
              Descubre cómo escalar tu agencia de bodas destino con automatización
              y experiencias memorables.
            </p>
            <Button variant="hero" className="shadow-glow">
              Reservar sesión
            </Button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/30 py-4">
        <div className="container flex flex-col items-center justify-between gap-2 text-xs text-foreground/40 md:flex-row">
          <p>© {new Date().getFullYear()} The Planners · Creado para planners visionarios.</p>
          <div className="flex gap-4">
            <span>Términos</span>
            <span>Privacidad</span>
            <span>Soporte</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
