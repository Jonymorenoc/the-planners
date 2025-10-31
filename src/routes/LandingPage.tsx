import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { features, heroStats, ctaHighlights } from "@/data/mockData";

type HeroSlide = {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: Array<{ title: string; details: string }>;
  summary: { title: string; points: string[] };
};

const heroSlides: HeroSlide[] = [
  {
    id: "slide-dashboard",
    badge: "Dashboard en vivo",
    title: "Controla métricas y alertas en tiempo real",
    description:
      "Paneles ejecutivos con KPIs de invitados, vuelos y presupuesto listos para presentar a tus parejas.",
    image:
      "https://images.pexels.com/photos/8100067/pexels-photo-8100067.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Planners revisando métricas en un portátil para una boda destino",
    highlights: [
      {
        title: "Indicadores 360°",
        details: "Confirma RSVP, vuelos y pagos desde un tablero único.",
      },
      {
        title: "Alertas predictivas",
        details: "Recibe avisos cuando una categoría supera el 80% del presupuesto.",
      },
      {
        title: "Historia compartible",
        details: "Exporta reportes boutique para tus parejas o socios.",
      },
    ],
    summary: {
      title: "Panel ejecutivo",
      points: [
        "48 invitados confirmados",
        "32 vuelos con itinerario publicado",
        "$24,500 USD registrados",
      ],
    },
  },
  {
    id: "slide-seating",
    badge: "Planificador visual",
    title: "Organiza mesas y seating cards en minutos",
    description:
      "Simula layouts para recepción, asigna familias y genera tarjetas con códigos QR para tu staff.",
    image:
      "https://images.pexels.com/photos/2306286/pexels-photo-2306286.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Montaje de mesa elegante listo para recepción de boda",
    highlights: [
      {
        title: "Drag & drop intuitivo",
        details: "Reacomoda invitados y valida capacidad por mesa en tiempo real.",
      },
      {
        title: "Códigos QR por invitado",
        details: "Entrega seating cards con verificación rápida el día del evento.",
      },
      {
        title: "Briefs de producción",
        details: "Comparte PDFs y CSV con tu equipo de logística.",
      },
    ],
    summary: {
      title: "Seating planner",
      points: ["Mesas 1-6 equilibradas", "26 invitados VIP", "Acceso hostess en modo demo"],
    },
  },
  {
    id: "slide-ai",
    badge: "IA creativa",
    title: "Genera sitios destino y contratos asistidos",
    description:
      "Activa prompts inteligentes para crear webs de pareja y revisar contratos con insights automáticos.",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Equipo creativo diseñando materiales digitales para una boda destino",
    highlights: [
      {
        title: "Sitios personalizados",
        details: "Crea experiencias RSVP con branding pastel tropical.",
      },
      {
        title: "Análisis legal guiado",
        details: "Identifica montos, fechas clave y cláusulas críticas.",
      },
      {
        title: "Bundles demo",
        details: "Comparte propuestas visuales y contratos listos para revisión.",
      },
    ],
    summary: {
      title: "Suite IA",
      points: ["Landing generada en 18s", "Contrato hotel analizado", "5 prompts sugeridos"],
    },
  },
];

const mockupPreviews = [
  {
    id: "mock-dashboard",
    image:
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Planner revisando un panel digital en laptop",
    badge: "Dashboard OS",
    title: "Visibilidad total de cada boda destino",
    description: "KPIs actualizados, plantillas inteligentes y flujo de trabajo por equipos.",
  },
  {
    id: "mock-onboarding",
    image:
      "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Equipo colaborando en un tablero con notas",
    badge: "Onboarding guiado",
    title: "Briefs estratégicos en cuestión de minutos",
    description: "Define estilo, bloqueos de hotel y logística para familias y VIPs.",
  },
  {
    id: "mock-mobile",
    image:
      "https://images.pexels.com/photos/5082577/pexels-photo-5082577.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Pareja confirmando asistencia desde el móvil",
    badge: "Experiencia mobile",
    title: "Comparte itinerarios y códigos QR al instante",
    description: "Notificaciones smart y contenido pastel listo para invitados conectados.",
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            className="grid h-full min-h-[520px] w-full bg-white/40 lg:grid-cols-[1.2fr,0.9fr]"
          >
            <div className="relative flex flex-col justify-between gap-8 bg-gradient-to-br from-white/95 via-white/90 to-primary/10 p-8 sm:p-10 md:p-12">
              <div className="space-y-5">
                <span className="inline-flex items-center rounded-full border border-primary/30 bg-white px-4 py-1 text-xs uppercase tracking-[0.4em] text-primary">
                  {active.badge}
                </span>
                <h2 className="font-display text-3xl text-foreground md:text-[2.1rem]">{active.title}</h2>
                <p className="text-base text-foreground/65 md:text-lg">{active.description}</p>
              </div>
              <ul className="space-y-4">
                {active.highlights.map((item) => (
                  <li key={item.title} className="flex items-start gap-3 rounded-3xl bg-white/80 p-4 shadow-inner">
                    <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-foreground/60">{item.details}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden bg-white/40 p-6 md:p-8">
              <div className="relative h-full min-h-[340px] overflow-hidden rounded-[2.4rem] shadow-lg">
                <img
                  src={active.image}
                  alt={active.imageAlt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
              </div>
              <div className="absolute bottom-8 left-1/2 w-[calc(100%-3rem)] -translate-x-1/2 rounded-3xl bg-white/85 p-4 text-sm text-foreground shadow-xl backdrop-blur-lg md:p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-foreground/45">
                  {active.summary.title}
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-foreground/70 md:text-sm">
                  {active.summary.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute -bottom-16 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/85 px-5 py-3 shadow-glass backdrop-blur-xl">
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
            className="group flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/60 bg-gradient-to-b from-white/92 via-white/80 to-primary/10"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <img
                src={preview.image}
                alt={preview.imageAlt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/15" />
            </div>
            <CardContent className="flex flex-1 flex-col gap-4 p-6">
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.4em] text-primary">
                {preview.badge}
              </span>
              <CardTitle className="text-foreground">{preview.title}</CardTitle>
              <CardDescription className="text-foreground/65">
                {preview.description}
              </CardDescription>
              <div className="mt-auto pt-2">
                <Button variant="glass" className="w-full">
                  Ver demo del módulo
                </Button>
              </div>
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
