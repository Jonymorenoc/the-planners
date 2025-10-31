import {
  dashboardStats,
  guestLogisticTemplates,
  plannerEvents,
  quickActions,
  recentActivity,
} from "@/data/mockData";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const activityVariant = {
  success: "success",
  pending: "warning",
  info: "info",
} as const;

export function DashboardPage() {
  return (
    <div className="container space-y-10 py-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/60 px-3 py-1 text-xs uppercase tracking-[0.35em] text-foreground/60">
            Panel en tiempo real
          </span>
          <h1 className="mt-4 font-display text-4xl text-foreground">
            Bienvenida, planner
          </h1>
          <p className="text-sm text-foreground/60 sm:text-base">
            Controla cada experiencia de boda destino con métricas claras, actividades recientes y automatizaciones inteligentes.
          </p>
        </div>
        <Button variant="hero" className="shadow-glow">
          Crear nueva boda
        </Button>
      </header>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            variant={index % 2 === 0 ? "default" : "accent"}
          />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card className="border border-border/60">
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Actividad reciente</CardTitle>
              <CardDescription>
                Seguimiento en vivo de tu equipo y proveedores conectados.
              </CardDescription>
            </div>
            <Button variant="glass" size="sm">
              Ver todo
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 rounded-2xl border border-white/50 bg-white/60 px-4 py-3 shadow-inner sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-foreground/60">{item.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={activityVariant[item.type]}>{item.timeAgo}</Badge>
                  <Button variant="ghost" size="sm">
                    Detalles
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-white/75">
          <CardHeader>
            <CardTitle>Acciones rápidas</CardTitle>
            <CardDescription>
              Incrementa tu productividad con accesos de tu flujo diario.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action) => (
              <button
                key={action.title}
                className="group flex w-full items-start gap-4 rounded-2xl border border-transparent bg-white/50 p-4 text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <action.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">{action.title}</p>
                  <p className="text-sm text-foreground/60">{action.description}</p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
            <div className="rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/25 to-accent/30 p-4 text-sm text-foreground shadow-inner">
              <p className="flex items-center gap-2 font-medium">
                <Sparkles className="h-4 w-4" /> Tip del día
              </p>
              <p className="mt-1 text-foreground/70">
                Duplica tableros para bodas similares y personaliza plantillas en minutos.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.6fr,1fr]">
        <Card className="border border-border/60 bg-white/75">
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Portafolio de bodas destino</CardTitle>
              <CardDescription>
                Vista ejecutiva de tus eventos activos y próximos hitos.
              </CardDescription>
            </div>
            <Button variant="glass" size="sm">
              Exportar pipeline
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {plannerEvents.map((event) => {
              const eventDate = format(new Date(event.date), "d 'de' MMMM yyyy", {
                locale: es,
              });
              return (
                <div
                  key={event.id}
                  className="rounded-3xl border border-white/60 bg-white/50 p-5 shadow-inner transition hover:-translate-y-[2px] hover:shadow-glow"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.32em] text-foreground/40">
                        {event.brand}
                      </p>
                      <p className="mt-1 font-display text-xl text-foreground">
                        {event.couple}
                      </p>
                      <p className="flex items-center gap-2 text-sm text-foreground/60">
                        <MapPin className="h-4 w-4" /> {event.destination}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="bg-white/70 text-foreground/70">
                        {eventDate}
                      </Badge>
                      <p className="mt-2 text-xs uppercase tracking-wide text-foreground/50">
                        {event.nextMilestone}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-foreground/50">
                        Avance general
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <ProgressBar value={event.progress} className="flex-1" />
                        <span className="text-sm font-semibold text-foreground">
                          {event.progress}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-foreground/50">
                        Alojamiento bloqueado
                      </p>
                      <p className="mt-2 text-sm text-foreground/70">
                        {event.accommodations.roomsReserved} habitaciones · {event.accommodations.suites} suites en {event.accommodations.hotel}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-foreground/50">
                        Invitados
                      </p>
                      <p className="mt-2 text-sm text-foreground/70">
                        {event.guests.confirmed}/{event.guests.total} confirmados · {event.guests.families} familias
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-white/80">
          <CardHeader>
            <CardTitle>Plantillas inteligentes</CardTitle>
            <CardDescription>
              Activa guías según el tipo de grupo o experiencia.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {guestLogisticTemplates.map((template) => (
              <div
                key={template.id}
                className="rounded-3xl border border-transparent bg-white/70 p-4 shadow-inner transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-glow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{template.title}</p>
                    <p className="text-xs uppercase tracking-wide text-foreground/40">
                      {template.focus}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Activar flujo
                  </Button>
                </div>
                <p className="mt-3 text-sm text-foreground/60">
                  {template.description}
                </p>
                <div className="mt-4 grid gap-3 text-sm text-foreground/65">
                  {template.actions.map((action) => (
                    <div key={action.label} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                        <action.icon className="h-4 w-4" />
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{action.label}</p>
                        <p className="text-xs uppercase tracking-wide text-foreground/45">
                          SLA {action.eta}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-wide text-foreground/45">
                  {template.stats.map((stat) => (
                    <span key={stat.label} className="rounded-full bg-white/80 px-3 py-1 text-foreground">
                      {stat.label}: {stat.value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
