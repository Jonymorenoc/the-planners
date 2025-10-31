import { budgetOverview } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { formatCurrency } from "@/utils/format";
import { TrendingUp } from "lucide-react";

export function BudgetPage() {
  const { totalAllocated, totalSpent, currency, categories, highlights } = budgetOverview;
  const remaining = totalAllocated - totalSpent;
  const usage = Math.round((totalSpent / totalAllocated) * 100);

  return (
    <div className="container space-y-10 py-10">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Control de presupuesto</h1>
          <p className="text-sm text-foreground/60">
            Visualiza gastos por categoría, negocia con proveedores y activa alertas preventivas.
          </p>
        </div>
        <Button variant="hero" className="shadow-glow">
          Generar reporte
        </Button>
      </header>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card className="border border-border/60">
          <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Resumen general</CardTitle>
              <CardDescription>
                {formatCurrency(totalSpent, currency)} gastados de{" "}
                {formatCurrency(totalAllocated, currency)} asignados.
              </CardDescription>
            </div>
            <Badge variant="info" className="uppercase tracking-wide">
              {usage}% utilizado
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <ProgressBar value={usage} />
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-foreground/60">
                <span>
                  Restante:{" "}
                  <strong className="text-foreground">
                    {formatCurrency(remaining, currency)}
                  </strong>
                </span>
                <span>Alertas automáticas al 80% por categoría.</span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {categories.map((category) => {
                const categoryUsage = Math.round(
                  (category.spent / category.allocated) * 100,
                );
                return (
                  <div
                    key={category.name}
                    className="rounded-3xl border border-white/60 bg-white/50 p-4 shadow-inner"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                          <category.icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-semibold text-foreground">{category.name}</p>
                          <p className="text-xs uppercase tracking-wide text-foreground/50">
                            {formatCurrency(category.spent, currency)} gastados
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          categoryUsage >= 80
                            ? "danger"
                            : categoryUsage >= 60
                              ? "warning"
                              : "success"
                        }
                      >
                        {categoryUsage}%
                      </Badge>
                    </div>
                    <ProgressBar value={categoryUsage} size="sm" className="mt-4" />
                    <div className="mt-2 flex items-center justify-between text-xs text-foreground/60">
                      <span>
                        Asignado:{" "}
                        <strong className="text-foreground">
                          {formatCurrency(category.allocated, currency)}
                        </strong>
                      </span>
                      <span>
                        Restante:{" "}
                        {formatCurrency(category.allocated - category.spent, currency)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-white/75">
          <CardHeader>
            <CardTitle>Insights sugeridos</CardTitle>
            <CardDescription>
              Recomendaciones basadas en tu ritmo de gasto y condiciones de proveedores.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl bg-white/60 p-4 shadow-inner transition hover:shadow-glow"
              >
                <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  {highlight.title}
                </p>
                <p className="mt-2 text-sm text-foreground/60">{highlight.description}</p>
              </div>
            ))}
            <Button variant="glass" className="w-full">
              Activar automatizaciones
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
