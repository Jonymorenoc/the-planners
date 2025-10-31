import { dashboardStats, quickActions, recentActivity } from "@/data/mockData";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

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
    </div>
  );
}
