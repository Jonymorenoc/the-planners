import { useMemo, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Baby, CalendarCheck, Compass, Hotel, MapPinned, PlaneTakeoff, Sparkles, UsersRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { guestLogisticTemplates, hotelSuggestions, plannerEvents } from "@/data/mockData";

type StepId = "brief" | "hotels" | "logistics" | "review";

const steps: Array<{ id: StepId; title: string; description: string }> = [
  {
    id: "brief",
    title: "Brief estratégico",
    description: "Define estilo, prioridades y expectativas de la pareja.",
  },
  {
    id: "hotels",
    title: "Hoteles & bloqueos",
    description: "Selecciona hoteles aliados, habitaciones y políticas para niños.",
  },
  {
    id: "logistics",
    title: "Logística de invitados",
    description: "Configura flujos de registro, suites especiales y seguimiento.",
  },
  {
    id: "review",
    title: "Resumen & acciones",
    description: "Confirma la información clave y asigna próximos pasos.",
  },
];

const defaultBrief = {
  couple: "Valeria & Tomás",
  eventDate: "2025-08-22",
  destination: "Tulum, México",
  vibe: "Pastel tropical con acentos glam",
  guestCount: 95,
  kidsExpected: 14,
  notes:
    "La pareja busca una experiencia inmersiva con beach club privado, brunch de despedida y actividades para familias.",
};

export function OnboardingPage() {
  const [activeStep, setActiveStep] = useState<StepId>("brief");
  const [brief, setBrief] = useState(defaultBrief);
  const [selectedHotelId, setSelectedHotelId] = useState(hotelSuggestions[0].id);
  const [includeKidsClub, setIncludeKidsClub] = useState(true);
  const [suiteCount, setSuiteCount] = useState(8);

  const selectedHotel = useMemo(
    () => hotelSuggestions.find((hotel) => hotel.id === selectedHotelId) ?? hotelSuggestions[0],
    [selectedHotelId],
  );

  const eventDateLabel = useMemo(
    () =>
      format(new Date(brief.eventDate), "EEEE d 'de' MMMM yyyy", {
        locale: es,
      }),
    [brief.eventDate],
  );

  const nextMilestone = plannerEvents[0];

  return (
    <div className="container space-y-8 py-10">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/60 px-3 py-1 text-xs uppercase tracking-[0.35em] text-foreground/60">
            The Planners · Onboarding inteligente
          </span>
          <h1 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
            Diseña un evento destino en minutos
          </h1>
          <p className="text-sm text-foreground/60 md:text-base">
            Centraliza briefing, bloqueos de hotel y logística de invitados. Esta plantilla es editable y pensada para demos.
          </p>
        </div>
        <Card className="max-w-sm border border-border/60 bg-white/70">
          <CardHeader>
            <CardTitle>Contexto rápido</CardTitle>
            <CardDescription>
              <span className="font-semibold text-foreground">{brief.couple}</span> · {brief.destination}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-foreground/70">
            <p className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-primary" /> {eventDateLabel}
            </p>
            <p className="flex items-center gap-2">
              <UsersRound className="h-4 w-4 text-primary" /> {brief.guestCount} invitados · {brief.kidsExpected} niños
            </p>
            <p className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-primary" /> {brief.vibe}
            </p>
          </CardContent>
        </Card>
      </header>

      <section className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr] xl:grid-cols-[0.8fr,1.2fr]">
        <Card className="h-fit border border-border/60 bg-white/75">
          <CardHeader>
            <CardTitle>Pasos del onboarding</CardTitle>
            <CardDescription>
              Selecciona cada etapa para ver recomendaciones y datos dummy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {steps.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition ${
                  activeStep === step.id
                    ? "border-primary bg-primary/15 text-foreground shadow-glow"
                    : "border-border/60 bg-white/60 text-foreground/70 hover:border-primary/30 hover:text-foreground"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{step.title}</p>
                  <p className="text-xs text-foreground/50">{step.description}</p>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          {activeStep === "brief" && (
            <Card className="border border-border/60 bg-white/75">
              <CardHeader>
                <CardTitle>Brief estratégico</CardTitle>
                <CardDescription>
                  Completa esta información para iniciar la simulación del evento.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-wide text-foreground/50">
                      Pareja
                    </label>
                    <Input
                      value={brief.couple}
                      onChange={(event) => setBrief((prev) => ({ ...prev, couple: event.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wide text-foreground/50">
                      Fecha tentativa
                    </label>
                    <Input
                      type="date"
                      value={brief.eventDate}
                      onChange={(event) => setBrief((prev) => ({ ...prev, eventDate: event.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-wide text-foreground/50">
                      Destino sugerido
                    </label>
                    <Input
                      value={brief.destination}
                      onChange={(event) => setBrief((prev) => ({ ...prev, destination: event.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wide text-foreground/50">
                      Número de invitados
                    </label>
                    <Input
                      type="number"
                      min={0}
                      value={brief.guestCount}
                      onChange={(event) => setBrief((prev) => ({ ...prev, guestCount: Number(event.target.value) }))}
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-wide text-foreground/50">
                      Niños estimados
                    </label>
                    <Input
                      type="number"
                      min={0}
                      value={brief.kidsExpected}
                      onChange={(event) => setBrief((prev) => ({ ...prev, kidsExpected: Number(event.target.value) }))}
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wide text-foreground/50">
                      Estilo y vibe
                    </label>
                    <Input
                      value={brief.vibe}
                      onChange={(event) => setBrief((prev) => ({ ...prev, vibe: event.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wide text-foreground/50">
                    Notas rápidas
                  </label>
                  <Textarea
                    rows={4}
                    value={brief.notes}
                    onChange={(event) => setBrief((prev) => ({ ...prev, notes: event.target.value }))}
                  />
                </div>
                <div className="rounded-3xl border border-dashed border-primary/30 bg-primary/10 p-4 text-sm text-foreground">
                  <p className="font-semibold text-foreground">Sugerencia IA demo</p>
                  <p className="mt-2 text-foreground/70">
                    Crea una propuesta que combine welcome cocktail al atardecer, experiencia cenote para el grupo VIP y brunch de despedida con música en vivo.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeStep === "hotels" && (
            <Card className="border border-border/60 bg-white/75">
              <CardHeader>
                <CardTitle>Selección de hoteles aliados</CardTitle>
                <CardDescription>
                  Elige un hotel base para el evento y configura el bloqueo de habitaciones.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  {hotelSuggestions.map((hotel) => (
                    <button
                      key={hotel.id}
                      type="button"
                      onClick={() => setSelectedHotelId(hotel.id)}
                      className={`flex h-full flex-col rounded-3xl border p-5 text-left transition hover:-translate-y-1 hover:shadow-glow ${
                        hotel.id === selectedHotelId
                          ? "border-primary bg-primary/15"
                          : "border-border/60 bg-white/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-foreground">{hotel.name}</p>
                          <p className="text-xs uppercase tracking-wide text-foreground/50">
                            {hotel.location}
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-white/80 text-foreground">
                          {hotel.rating.toFixed(1)} ★
                        </Badge>
                      </div>
                      <p className="mt-3 text-sm text-foreground/60">
                        {hotel.perks.join(" · ")}
                      </p>
                      <div className="mt-4 space-y-2 rounded-2xl bg-white/70 p-3 text-xs text-foreground/60">
                        {hotel.roomTypes.map((room) => (
                          <p key={room.label} className="flex flex-wrap items-center justify-between gap-2">
                            <span>{room.label} · {room.occupancy}</span>
                            <span className="font-medium text-foreground">{room.pricePerNight}</span>
                          </p>
                        ))}
                      </div>
                      <p className="mt-3 text-xs uppercase tracking-wide text-foreground/45">
                        Bloqueo: {hotel.availability.totalRooms} habitaciones · {hotel.availability.suites} suites · Retención hasta {hotel.availability.holdsUntil}
                      </p>
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-foreground">¿Incluir Kids Club?</span>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant={includeKidsClub ? "hero" : "glass"}
                      onClick={() => setIncludeKidsClub(true)}
                    >
                      Sí
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={!includeKidsClub ? "hero" : "glass"}
                      onClick={() => setIncludeKidsClub(false)}
                    >
                      No
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-wide text-foreground/50">
                      Suites requeridas
                    </label>
                    <Input
                      type="number"
                      min={0}
                      value={suiteCount}
                      onChange={(event) => setSuiteCount(Number(event.target.value))}
                    />
                  </div>
                  <div className="rounded-2xl border border-dashed border-border/60 bg-white/60 p-4 text-sm text-foreground/65">
                    <p className="font-semibold text-foreground">Recomendación</p>
                    <p className="mt-1">
                      Bloquea {suiteCount} suites y habilita la tarifa Family Lagoon para familias confirmadas. Kids Club {includeKidsClub ? "incluido" : "opcional"}.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeStep === "logistics" && (
            <Card className="border border-border/60 bg-white/75">
              <CardHeader>
                <CardTitle>Logística y registros</CardTitle>
                <CardDescription>
                  Configura acciones dummy para la demo con seguimiento por tipo de invitado.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  {guestLogisticTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="rounded-3xl border border-transparent bg-white/70 p-5 shadow-inner transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-glow"
                    >
                      <p className="font-semibold text-foreground">{template.title}</p>
                      <p className="text-xs uppercase tracking-wide text-foreground/45">
                        {template.focus}
                      </p>
                      <p className="mt-3 text-sm text-foreground/60">{template.description}</p>
                      <div className="mt-4 space-y-2 text-sm text-foreground/65">
                        {template.actions.map((action) => (
                          <div key={action.label} className="flex items-center gap-2">
                            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                              <action.icon className="h-4 w-4" />
                            </span>
                            <div>
                              <p className="font-medium text-foreground">{action.label}</p>
                              <p className="text-xs uppercase tracking-wide text-foreground/45">SLA {action.eta}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-wide text-foreground/45">
                        {template.stats.map((stat) => (
                          <span key={stat.label} className="rounded-full bg-white/80 px-3 py-1 text-foreground">
                            {stat.label}: {stat.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-3xl border border-border/60 bg-white/70 p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <PlaneTakeoff className="h-4 w-4 text-primary" /> Agenda de vuelos sugerida
                  </p>
                  <div className="mt-4 grid gap-3 text-sm text-foreground/60 md:grid-cols-2">
                    <div className="rounded-2xl bg-white/70 p-4 shadow-inner">
                      <p className="text-xs uppercase tracking-wide text-foreground/45">Grupo CDMX</p>
                      <p className="mt-2 font-medium text-foreground">Vuelo AM 452 · 45 pax</p>
                      <p className="text-xs text-foreground/45">Salida 08:10 · llegada 10:25</p>
                    </div>
                    <div className="rounded-2xl bg-white/70 p-4 shadow-inner">
                      <p className="text-xs uppercase tracking-wide text-foreground/45">Grupo Miami</p>
                      <p className="mt-2 font-medium text-foreground">Vuelo AA 335 · 18 pax</p>
                      <p className="text-xs text-foreground/45">Salida 11:20 · llegada 13:30</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeStep === "review" && (
            <Card className="border border-border/60 bg-white/75">
              <CardHeader>
                <CardTitle>Resumen ejecutivo</CardTitle>
                <CardDescription>
                  Visualiza el estado del onboarding y comparte con tu equipo demo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-inner">
                    <p className="text-xs uppercase tracking-wide text-foreground/45">Paquete base</p>
                    <p className="mt-2 font-display text-xl text-foreground">{selectedHotel.name}</p>
                    <p className="text-sm text-foreground/60">{selectedHotel.location}</p>
                    <div className="mt-3 text-sm text-foreground/70">
                      <p>Habitaciones bloqueadas: {selectedHotel.availability.totalRooms}</p>
                      <p>Suites estimadas: {suiteCount}</p>
                      <p>Kids Club: {includeKidsClub ? "Incluido" : "No aplicado"}</p>
                    </div>
                  </div>
                  <div className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-inner">
                    <p className="text-xs uppercase tracking-wide text-foreground/45">Próximo hito</p>
                    <p className="mt-2 font-display text-xl text-foreground">{nextMilestone.couple}</p>
                    <p className="flex items-center gap-2 text-sm text-foreground/60">
                      <MapPinned className="h-4 w-4" /> {nextMilestone.destination}
                    </p>
                    <div className="mt-4">
                      <ProgressBar value={nextMilestone.progress} />
                      <p className="mt-2 text-xs uppercase tracking-wide text-foreground/45">
                        {nextMilestone.progress}% completado · {nextMilestone.nextMilestone}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-border/60 bg-white/70 p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Sparkles className="h-4 w-4 text-primary" /> Acciones sugeridas
                  </p>
                  <div className="mt-4 grid gap-3 text-sm text-foreground/70 md:grid-cols-2">
                    <div className="rounded-2xl bg-white/75 p-4 shadow-inner">
                      <p className="font-semibold text-foreground">1. Confirmar bloqueo hotel</p>
                      <p className="mt-1 text-xs uppercase tracking-wide text-foreground/45">Hotel elegido</p>
                      <p className="text-sm text-foreground/70">
                        Validar contrato demo con {selectedHotel.name} y asignar responsable de pagos.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/75 p-4 shadow-inner">
                      <p className="font-semibold text-foreground">2. Activar formulario RSVP</p>
                      <p className="mt-1 text-xs uppercase tracking-wide text-foreground/45">Invitados</p>
                      <p className="text-sm text-foreground/70">
                        Publicar landing con códigos únicos y preferencia de habitación por invitado.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/75 p-4 shadow-inner">
                      <p className="font-semibold text-foreground">3. Personalizar itinerario familias</p>
                      <p className="mt-1 text-xs uppercase tracking-wide text-foreground/45">Familias</p>
                      <p className="text-sm text-foreground/70">
                        Coordinar horarios de Kids Club y transporte para las excursiones.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/75 p-4 shadow-inner">
                      <p className="font-semibold text-foreground">4. Revisión legal</p>
                      <p className="mt-1 text-xs uppercase tracking-wide text-foreground/45">Contratos</p>
                      <p className="text-sm text-foreground/70">
                        Enviar contrato de fotografía a The Planners AI para comentarios preliminares.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button variant="hero">
                      Generar plan de proyecto demo
                    </Button>
                    <Button variant="glass">Compartir con cliente</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <Card className="border border-border/60 bg-white/80">
          <div className="relative h-52 overflow-hidden rounded-[28px]">
            <img
              src="https://images.pexels.com/photos/214748/pexels-photo-214748.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Ceremonia destino en playa"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-2xl bg-white/75 px-4 py-2 text-xs uppercase tracking-[0.3em] text-foreground/60 shadow-glass">
              Plan Maestro · Demo
            </div>
          </div>
          <CardHeader>
            <CardTitle>Agenda tentantiva</CardTitle>
            <CardDescription>
              Construye una narrativa desde la llegada hasta el brunch de despedida.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-foreground/70">
            <div className="flex items-start gap-3 rounded-3xl bg-white/75 p-4 shadow-inner">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <PlaneTakeoff className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold text-foreground">Día 1 · Llegadas y coctel sunset</p>
                <p className="text-xs uppercase tracking-wide text-foreground/45">
                  Shuttle escalonado · registro acelerado con códigos QR
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-3xl bg-white/75 p-4 shadow-inner">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Hotel className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold text-foreground">Día 2 · Ceremonia & recepción</p>
                <p className="text-xs uppercase tracking-wide text-foreground/45">
                  Ceremonia en gazebo · cena degustación · after party en beach club
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-3xl bg-white/75 p-4 shadow-inner">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Baby className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold text-foreground">Día 3 · Experiencia familias</p>
                <p className="text-xs uppercase tracking-wide text-foreground/45">
                  Kids club tematizado · tour cenote familiar · cena privada para VIPs
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/25">
          <div className="relative h-48 overflow-hidden rounded-[28px]">
            <img
              src="https://images.pexels.com/photos/3407779/pexels-photo-3407779.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Planner revisando timeline"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/30 to-transparent" />
          </div>
          <CardHeader>
            <CardTitle>Simulación de panel planner</CardTitle>
            <CardDescription>
              Vista rápida para presentar la demo a clientes potenciales.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-foreground/75">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-foreground/50">Evento actual</p>
                <p className="font-semibold text-foreground">{brief.couple}</p>
              </div>
              <Badge variant="outline" className="bg-white/70 text-foreground">
                Demo activa
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Brief</span>
                <span className="font-medium text-foreground">Completado</span>
              </div>
              <ProgressBar value={activeStep === "brief" ? 40 : activeStep === "hotels" ? 60 : activeStep === "logistics" ? 80 : 100} />
            </div>
            <div className="rounded-2xl bg-white/70 p-4 shadow-inner">
              <p className="text-xs uppercase tracking-wide text-foreground/45">Próxima acción</p>
              <p className="mt-2 text-sm text-foreground">
                Enviar propuesta de habitaciones a {selectedHotel.name} y compartir onboarding con la pareja.
              </p>
            </div>
            <div className="rounded-2xl bg-white/60 p-4 shadow-inner">
              <p className="text-xs uppercase tracking-wide text-foreground/45">Checklist demo</p>
              <ul className="mt-2 list-disc space-y-1 pl-4">
                <li>Generar sitio web automático en modo demo.</li>
                <li>Activar análisis de contrato de fotografía.</li>
                <li>Configurar seating plan con familias confirmadas.</li>
              </ul>
            </div>
            <Button variant="hero" className="w-full">
              Lanzar experiencia demo completa
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default OnboardingPage;
