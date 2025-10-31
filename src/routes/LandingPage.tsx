import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { features, heroStats, ctaHighlights } from "@/data/mockData";

const heroSlides = [
  {
    id: "slide-dashboard",
    image: "https://images.pexels.com/photos/7972738/pexels-photo-7972738.jpeg?auto=compress&cs=tinysrgb&w=1600",
    badge: "Dashboard en vivo",
    title: "Controla métricas y alertas en tiempo real",
    description: "Seguimiento de invitados, vuelos confirmados y presupuesto con paneles glassmorphism.",
  },
  {
    id: "slide-seating",
    image: "https://images.pexels.com/photos/5709101/pexels-photo-5709101.jpeg?auto=compress&cs=tinysrgb&w=1600",
    badge: "Planificador visual",
    title: "Arrastra invitados y genera seating cards",
    description: "Simula entregables para producción y comparte con tu equipo de wedding planners.",
  },
  {
    id: "slide-ai",
    image: "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1600",
    badge: "IA creativa",
    title: "Genera sitios web y contratos asistidos",
    description: "Activa prompts inteligentes para contenidos destino, contratos y presupuestos.",
  },
];

const mockupPreviews = [
  {
    id: "mock-dashboard",
    image: "https://images.pexels.com/photos/5794059/pexels-photo-5794059.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Dashboard ejecutivo",
    description: "Visualiza KPIs, plantillas inteligentes y próximos hitos de cada boda destino.",
  },
  {
    id: "mock-onboarding",
    image: "https://images.pexels.com/photos/7710111/pexels-photo-7710111.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Onboarding guiado",
    description: "Briefs estratégicos, bloqueos de hotel y logística de invitados en minutos.",
  },
  {
    id: "mock-mobile",
    image: "https://images.pexels.com/photos/7972659/pexels-photo-7972659.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Experiencia móvil",
    description: "Comparte itinerarios, confirmaciones y códigos QR en dispositivos móviles.",
  },
];

export function LandingPage() {
  return (
    <div className="space-y-24 pb-20 pt-12 lg:pt-24">
      <HeroSection />
      <FeaturesSection />
      <MockupsSection />
      <CtaSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="container flex flex-col-reverse items-center gap-12 lg:flex-row">
      <div className="flex-1 space-y-6">
        <span className="inline-flex items-center rounded-full border border-border/60 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.4em] text-foreground/60 shadow-inner">
          The Planners · Bodas Destino
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
          <Button asChild variant="hero" size="lg" className="shadow-glow">
            <Link to="/dashboard">Explorar dashboard</Link>
          </Button>
          <Button asChild variant="glass" size="lg">
            <Link to="/sitio-web">Ver demo para planners</Link>
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
        <HeroSlider />
      </div>
    </section>
  );
}

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const active = heroSlides[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const indicators = useMemo(
    () =>
      heroSlides.map((slide, slideIndex) => (
        <button
          type="button"
          key={slide.id}
          onClick={() => setIndex(slideIndex)}
          className={`h-2 w-10 rounded-full transition ${
            slideIndex === index ? "bg-primary" : "bg-white/50 hover:bg-white/70"
          }`}
          aria-label={`Mostrar ${slide.badge}`}
        />
      )),
    [index],
  );

  return (
    <div className="relative">
      <div className="glass-panel relative overflow-hidden rounded-[2.8rem] border border-white/50 shadow-glow">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className="relative h-[520px] w-full"
          >
            <img src={active.image} alt={active.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 space-y-3 text-white drop-shadow-lg">
              <span className="inline-flex items-center rounded-full bg-white/25 px-3 py-1 text-xs uppercase tracking-[0.35em]">
                {active.badge}
              </span>
              <h2 className="font-display text-2xl leading-snug">{active.title}</h2>
              <p className="text-sm text-white/80">{active.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute -bottom-14 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/80 px-5 py-3 shadow-glass backdrop-blur-xl">
        {indicators}
      </div>
    </div>
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

function MockupsSection() {
  return (
    <section className="container space-y-10">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center rounded-full border border-border/60 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.35em] text-foreground/60">
          Demo visual
        </span>
        <h2 className="mt-4 font-display text-3xl text-foreground md:text-4xl">
          Presenta experiencias impecables con mockups profesionales
        </h2>
        <p className="mt-3 text-base text-foreground/70">
          Usa estas pantallas de referencia para mostrar el workflow completo de The Planners a tus clientes.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {mockupPreviews.map((preview) => (
          <Card
            key={preview.id}
            className="group h-full overflow-hidden border border-white/60 bg-white/75"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={preview.image}
                alt={preview.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
            <CardContent className="space-y-3">
              <CardTitle>{preview.title}</CardTitle>
              <CardDescription>{preview.description}</CardDescription>
              <Button variant="ghost" className="px-0 text-primary">
                Descargar mockup
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
            The Planners OS
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
            src="https://images.pexels.com/photos/1779492/pexels-photo-1779492.jpeg?auto=compress&cs=tinysrgb&w=1200"
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
