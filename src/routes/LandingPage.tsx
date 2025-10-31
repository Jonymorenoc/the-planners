import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  PartyPopper,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { features, heroStats } from "@/data/mockData";

const heroMedia = {
  image:
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80",
  alt: "Montaje de recepción de boda en salón de hotel elegante",
  card: {
    subtitle: "Proyecto en curso",
    title: "Boda Riviera Maya · Agosto",
    stats: [
      { label: "Invitados confirmados", value: "86" },
      { label: "Semana destino", value: "04-08 OCT" },
      { label: "Estado del presupuesto", value: "72% asignado" },
    ],
  },
};

const trustMarks = [
  "Riviera Experience",
  "Casa Bonita Group",
  "Sayulita Waves",
  "Isla Mujeres Co.",
  "Merida Tales",
];

const suiteModules = [
  {
    id: "module-guests",
    badge: "Experiencia de invitados",
    title: "RSVP inteligente y comunicaciones multicanal",
    description:
      "Automatiza confirmaciones, itinerarios y mensajes VIP con branding impecable y soporte IA en cada paso.",
    bullets: [
      "Landing personalizada multi idioma",
      "Itinerarios dinámicos con recordatorios",
      "Segmentación por rol y etiqueta",
    ],
    image:
      "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Montaje de mesa elegante con centros florales para boda destino",
  },
  {
    id: "module-operations",
    badge: "Operaciones & seating",
    title: "Visualiza logística, aforos y planos en minutos",
    description:
      "Coordina seating charts, habitaciones y traslados con tableros colaborativos y alertas por capacidad.",
    bullets: [
      "Planificador drag & drop por mesa",
      "Bloques de hotel y vuelos sincronizados",
      "Panel de tareas para tu staff",
    ],
    image:
      "https://images.unsplash.com/photo-1530023367847-a683933f4173?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Equipo de planners revisando planos y laptops en un salón moderno",
  },
  {
    id: "module-insights",
    badge: "Insights & contratos",
    title: "Analítica financiera y legal con IA bilingüe",
    description:
      "Controla presupuesto, contratos y entregables con resúmenes accionables, alertas y escenarios proyectados.",
    bullets: [
      "Reportes ejecutivos listos para exportar",
      "Revisión asistida de contratos",
      "Simulador de presupuesto por destino",
    ],
    image:
      "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Planner revisando gráficos financieros en una tableta",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Discovery turbo",
    description:
      "Importa leads, plantillas y contratos en cuestión de minutos con nuestro asistente y presets por destino.",
  },
  {
    step: "02",
    title: "Diseño de experiencia",
    description:
      "Define moodboard, agenda y vendors clave con tableros compartibles y notas contextualizadas.",
  },
  {
    step: "03",
    title: "Automations",
    description:
      "Activa campañas de confirmación, recordatorios y tareas para el equipo con lógica low-code.",
  },
  {
    step: "04",
    title: "Entrega & métricas",
    description:
      "Entrega reportes ejecutivos, álbumes y contratos firmados en un hub listo para vender tu próxima boda.",
  },
];

const testimonials = [
  {
    quote:
      "Escalamos de 12 a 32 bodas destino al año manteniendo la experiencia boutique. Las automatizaciones y reportes nos permiten tomar decisiones en horas, no semanas.",
    name: "María Torres",
    role: "Fundadora",
    company: "Caribe Vows",
    image:
      "https://images.unsplash.com/photo-1521146764736-56c929d59c87?auto=format&fit=crop&w=400&q=80",
    imageAlt: "Retrato profesional de planner en hotel",
  },
  {
    quote:
      "The Planners nos ayudó a coordinar invitados en tres países y mantener contratos hoteleros bajo control. La suite es intuitiva y lista para equipos híbridos.",
    name: "Álvaro Medina",
    role: "Director de operaciones",
    company: "Latitude Weddings",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=400&q=80",
    imageAlt: "Retrato profesional de planner masculino",
  },
];

const servicePromises = [
  {
    icon: ShieldCheck,
    title: "Datos seguros",
    description: "Infraestructura con cifrado end-to-end y backups automáticos en la región.",
  },
  {
    icon: CalendarClock,
    title: "Onboarding express",
    description: "Implementación guiada en 10 días con materiales listos para tu equipo.",
  },
  {
    icon: PartyPopper,
    title: "Experiencias memorables",
    description: "Plantillas pastel, storytelling y branding que enamoran a cada pareja.",
  },
];

const ctaChecklist = [
  "Playbook completo de bodas destino",
  "Acceso a comunidad privada de planners",
  "Plantillas editables para tu próxima propuesta",
];

export function LandingPage() {
  return (
    <div className="space-y-24 pb-24 pt-12 lg:pt-20">
      <HeroSection />
      <TrustBar />
      <FeatureHighlights />
      <SuiteShowcase />
      <WorkflowSection />
      <TestimonialsSection />
      <GuaranteeSection />
      <CtaSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="container grid items-start gap-12 lg:grid-cols-[1.05fr,0.95fr]">
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-foreground/60">
          The Planners · Bodas destino
        </span>
        <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
          Suite para wedding planners de <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">bodas destino</span>
        </h1>
        <p className="text-lg text-foreground/70 md:text-xl">
          Mejora tus servicios y métodos: centraliza invitados y presupuesto, diseña propuestas visuales y automatiza el flujo de trabajo para bodas en hoteles.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button asChild variant="hero" size="lg" className="shadow-glow">
            <Link to="/onboarding">Solicitar demo guiada</Link>
          </Button>
          <Button asChild variant="glass" size="lg">
            <Link to="/dashboard">Ver producto en vivo</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {heroStats.map((stat) => (
            <div key={stat.label} className="glass-panel rounded-2xl p-4 text-center shadow-glass">
              <p className="font-display text-3xl text-primary">{stat.value}</p>
              <p className="text-xs uppercase tracking-wide text-foreground/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="glass-panel relative overflow-hidden rounded-[3rem] border border-white/60 shadow-glow">
          <img
            src={heroMedia.image}
            alt={heroMedia.alt}
            className="h-full w-full min-h-[520px] object-cover"
            loading="eager"
          />
          <span className="absolute left-8 top-8 inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs uppercase tracking-[0.35em] text-primary shadow-glass">
            <Sparkles className="h-4 w-4" /> Suite en vivo
          </span>
          <div className="absolute inset-x-6 bottom-6 rounded-3xl bg-white/85 p-6 text-sm text-foreground shadow-xl backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-foreground/45">
              {heroMedia.card.subtitle}
            </p>
            <p className="font-display text-2xl text-foreground">{heroMedia.card.title}</p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-3">
              {heroMedia.card.stats.map((stat) => (
                <li key={stat.label} className="space-y-1">
                  <p className="text-xs uppercase tracking-wide text-foreground/45">{stat.label}</p>
                  <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="container">
      <div className="glass-panel flex flex-wrap items-center justify-between gap-6 rounded-3xl px-6 py-5 shadow-sm">
        <p className="text-xs uppercase tracking-[0.4em] text-foreground/50">
          CONFIAN EN THE PLANNERS
        </p>
        <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-foreground/60">
          {trustMarks.map((brand) => (
            <span key={brand} className="tracking-[0.2em]">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureHighlights() {
  return (
    <section className="container space-y-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl text-foreground md:text-4xl">
          Todo lo que necesitas para{" "}
          <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            dirigir bodas destino
          </span>{" "}
          como una startup creativa
        </h2>
        <p className="mt-4 text-base text-foreground/70 md:text-lg">
          Conecta datos, equipos y momentos especiales en un solo lugar. Personaliza la experiencia
          sin perder control operativo ni financiero.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.name} className="h-full rounded-[2.2rem] border border-white/50 bg-white/85">
            <CardContent className="space-y-4 p-6">
              <feature.icon className="h-10 w-10 rounded-2xl bg-primary/20 p-2 text-primary shadow-glow" />
              <CardTitle>{feature.name}</CardTitle>
              <CardDescription className="text-foreground/65">
                {feature.description}
              </CardDescription>
              <Button
                variant="ghost"
                className="group w-fit px-0 text-primary hover:text-primary"
                size="sm"
              >
                Conocer módulo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function SuiteShowcase() {
  return (
    <section className="container space-y-12">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.35em] text-foreground/60">
          Suite modular
        </span>
        <h2 className="mt-4 font-display text-3xl text-foreground md:text-4xl">
          Haz que tu operación brille con entregables impecables y datos confiables
        </h2>
        <p className="mt-3 text-base text-foreground/70 md:text-lg">
          Combina módulos de invitados, operaciones e insights para ofrecer experiencias destino
          inolvidables sin sacrificar control ni creatividad.
        </p>
      </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {suiteModules.map((module) => (
              <Card
                key={module.id}
                className="flex h-full flex-col overflow-hidden rounded-[2.6rem] border border-white/60 bg-gradient-to-b from-white/92 via-white/85 to-primary/10"
              >
                <div className="relative h-64 w-full overflow-hidden rounded-t-[2.6rem]">
                  <img
                    src={module.image}
                    alt={module.imageAlt}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-white/85 px-3 py-1 text-xs uppercase tracking-[0.35em] text-primary shadow-glass">
                    {module.badge}
                  </span>
                </div>
            <CardContent className="flex flex-1 flex-col gap-4 p-6">
              <CardTitle className="text-foreground">{module.title}</CardTitle>
              <CardDescription className="text-foreground/65">
                {module.description}
              </CardDescription>
              <ul className="mt-2 space-y-2 text-sm text-foreground/65">
                {module.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4">
                <Button variant="glass" className="w-full">
                  Ver módulo
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section className="container space-y-12">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.35em] text-foreground/60">
          Workflow guiado
        </span>
        <h2 className="mt-4 font-display text-3xl text-foreground md:text-4xl">
          Implementa en semanas, escala por años
        </h2>
        <p className="mt-3 text-base text-foreground/70 md:text-lg">
          Aterriza procesos inspirados en equipos startup: descubrimiento rápido, creatividad
          compartida y métricas accionables en cada entrega.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {workflowSteps.map((step) => (
          <div
            key={step.step}
            className="glass-panel flex h-full flex-col justify-between rounded-[2.2rem] border border-white/50 p-6 text-foreground shadow-sm"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              Paso {step.step}
            </span>
            <div className="space-y-3 pt-4">
              <p className="font-display text-xl text-foreground">{step.title}</p>
              <p className="text-sm text-foreground/65">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="container space-y-12">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.35em] text-foreground/60">
          Historias reales
        </span>
        <h2 className="mt-4 font-display text-3xl text-foreground md:text-4xl">
          Planners que crecieron con The Planners
        </h2>
        <p className="mt-3 text-base text-foreground/70 md:text-lg">
          Agencias boutique y equipos híbridos que escalan sin perder el toque humano.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.name}
            className="flex h-full flex-col gap-6 rounded-[2.6rem] border border-white/55 bg-white/90 p-8 shadow-glass"
          >
            <Sparkles className="h-6 w-6 text-primary" />
            <p className="text-lg leading-relaxed text-foreground/80">
              “{testimonial.quote}”
            </p>
            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.imageAlt}
                className="h-14 w-14 rounded-full object-cover shadow-glow"
              />
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-foreground/60">
                  {testimonial.role} · {testimonial.company}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function GuaranteeSection() {
  return (
    <section className="container">
      <div className="glass-panel grid gap-6 rounded-[3rem] border border-border/60 p-10 shadow-sm lg:grid-cols-3">
        {servicePromises.map((promise) => (
          <div key={promise.title} className="space-y-4">
            <promise.icon className="h-10 w-10 rounded-2xl bg-primary/20 p-2 text-primary shadow-glow" />
            <p className="font-display text-xl text-foreground">{promise.title}</p>
            <p className="text-sm text-foreground/65">{promise.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="container">
      <div className="glass-panel grid overflow-hidden rounded-[3rem] border border-border/60 shadow-glow lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6 p-10 lg:p-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/50 px-4 py-2 text-xs uppercase tracking-[0.35em] text-foreground/60">
            Programa de lanzamiento
          </span>
          <h3 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
            Agenda una sesión con nuestro equipo y activa tu próxima boda destino.
          </h3>
          <p className="text-base text-foreground/70">
            Obtén un recorrido personalizado, migración inicial de datos y materiales listos para
            presentar a tus parejas en menos de dos semanas.
          </p>
          <ul className="space-y-3">
            {ctaChecklist.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/65">
                <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg">
              Reservar demo
            </Button>
            <Button variant="glass" size="lg">
              Descargar brochure
            </Button>
          </div>
        </div>
        <div className="relative h-full min-h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1200&q=80"
            alt="Planner organizando decoración floral en hotel para boda destino"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-background/20 to-primary/25" />
          <div className="absolute bottom-8 left-8 right-8 rounded-3xl bg-white/75 p-6 text-sm text-foreground shadow-lg backdrop-blur-md">
            <p className="font-semibold">Paquete Destination Signature</p>
            <ul className="mt-3 space-y-2 text-foreground/70">
              <li>• Sitio RSVP bilingüe con enlaces de pago</li>
              <li>• Itinerario interactivo para invitados</li>
              <li>• Plan maestro de proveedores y staff</li>
            </ul>
            <Button variant="glass" size="sm" className="mt-4">
              Ver agenda de implementación
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
