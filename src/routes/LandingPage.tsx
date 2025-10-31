import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { features, heroStats, ctaHighlights } from "@/data/mockData";

export function LandingPage() {
  return (
    <div className="space-y-24 pb-20 pt-12 lg:pt-24">
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="container flex flex-col-reverse items-center gap-12 lg:flex-row">
      <div className="flex-1 space-y-6">
        <span className="inline-flex items-center rounded-full border border-border/60 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.4em] text-foreground/60 shadow-inner">
          DreamWedding · Bodas Destino
        </span>
        <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
          Diseña bodas destino memorables con{" "}
          <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            inteligencia y estilo
          </span>
        </h1>
        <p className="text-lg text-foreground/70 md:text-xl">
          Coordina invitados, presupuesto, experiencias y proveedores desde un
          panel elegante con automatizaciones locales y datos seguros. Personaliza
          cada detalle y sorprende a tus parejas.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="hero" size="lg" className="shadow-glow">
            Explorar dashboard
          </Button>
          <Button variant="glass" size="lg">
            Ver demo para planners
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-6">
          {heroStats.map((stat) => (
            <div key={stat.label} className="glass-panel rounded-2xl p-4 text-center shadow-glass">
              <p className="font-display text-3xl text-primary">{stat.value}</p>
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="glass-panel relative overflow-hidden rounded-[2.5rem] border border-white/50 shadow-glow">
            <img
              src="https://images.unsplash.com/photo-1511288594014-82e9260b162a?auto=format&fit=crop&w=1200&q=80"
              alt="Playa tropical para bodas destino"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/40" />
            <div className="absolute bottom-8 left-8 space-y-2 text-white drop-shadow-lg">
              <p className="text-xs uppercase tracking-[0.35em]">Destination</p>
              <h2 className="font-display text-3xl">Tulum · Riviera Maya</h2>
              <p className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4" /> Planificación integral con IA
              </p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute -bottom-8 right-8 w-60 rounded-2xl bg-card p-4 shadow-glass"
          >
            <p className="text-sm font-semibold text-foreground/80">
              Checklist automatizado
            </p>
            <ul className="mt-3 space-y-2 text-xs text-foreground/60">
              <li>✓ Confirmación de invitados</li>
              <li>✓ Itinerario de vuelos</li>
              <li>✓ Reservas de hotel</li>
              <li>✓ Alertas de presupuesto</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="container space-y-12">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl text-foreground md:text-4xl">
          Un ecosistema completo para{" "}
          <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            wedding planners
          </span>{" "}
          de clase mundial
        </h2>
        <p className="mt-4 text-base text-foreground/70 md:text-lg">
          Estructura cada etapa del proyecto con paneles visuales, automatización
          y experiencias memorables para tus parejas y sus invitados.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.name} className="h-full animate-[float_12s_ease-in-out_infinite]">
            <CardContent className="space-y-4">
              <feature.icon className="h-10 w-10 rounded-2xl bg-primary/20 p-2 text-primary shadow-glow" />
              <CardTitle>{feature.name}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
              <Button variant="ghost" className="group w-fit px-0 text-primary hover:text-primary">
                Ver más detalles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="container">
      <div className="glass-panel grid overflow-hidden rounded-[3rem] border border-border/60 shadow-glow lg:grid-cols-2">
        <div className="space-y-6 p-10 lg:p-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/50 px-4 py-2 text-xs uppercase tracking-[0.4em] text-foreground/60">
            DreamWedding OS
          </span>
          <h3 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
            Coordina tus bodas destino con una plataforma diseñada para planners
            exigentes.
          </h3>
          <p className="text-base text-foreground/70">
            Paneles interactivos, motor de IA propio y base de datos local para automatizaciones listas para personalizar tus experiencias.
          </p>
          <div className="space-y-4">
            {ctaHighlights.map((highlight) => (
              <div key={highlight.title} className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{highlight.title}</p>
                  <p className="text-sm text-foreground/60">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg">
              Crear cuenta de planner
            </Button>
            <Button variant="glass" size="lg">
              Descargar brochure
            </Button>
          </div>
        </div>
        <div className="relative h-full min-h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1533991310907-736c3c3ea7c2?auto=format&fit=crop&w=1200&q=80"
            alt="Invitación elegante para boda destino"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/0 via-background/30 to-primary/25" />
          <div className="absolute bottom-8 left-8 right-8 rounded-3xl bg-white/70 p-6 text-sm text-foreground shadow-lg backdrop-blur-md">
            <p className="font-semibold">Paquete Destination Signature</p>
            <ul className="mt-3 space-y-2 text-foreground/70">
              <li>• Sitio web personalizado con RSVP automático</li>
              <li>• Itinerario dinámico con recordatorios</li>
              <li>• Álbum compartido y branding de la experiencia</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
