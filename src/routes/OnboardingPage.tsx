import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Users, CreditCard, Sparkles, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type StepId = "company" | "team" | "services" | "complete";

const steps: Array<{ id: StepId; title: string; description: string; icon: typeof Building2 }> = [
  {
    id: "company",
    title: "Información de tu empresa",
    description: "Configura los datos básicos de tu agencia de wedding planning",
    icon: Building2,
  },
  {
    id: "team",
    title: "Tu equipo",
    description: "Invita a coordinadores y define roles de trabajo",
    icon: Users,
  },
  {
    id: "services",
    title: "Servicios y facturación",
    description: "Configura tus servicios principales y métodos de cobro",
    icon: CreditCard,
  },
  {
    id: "complete",
    title: "¡Listo para comenzar!",
    description: "Tu cuenta está configurada y lista para gestionar bodas destino",
    icon: CheckCircle2,
  },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<StepId>("company");
  const [companyData, setCompanyData] = useState({
    name: "Elite Destination Weddings",
    email: "hola@elitedestinations.com",
    phone: "+52 998 123 4567",
    website: "www.elitedestinations.com",
    description: "Agencia boutique especializada en bodas de lujo en destinos del Caribe mexicano",
  });

  const [teamMembers, setTeamMembers] = useState([
    { name: "Ana García", email: "ana@elitedestinations.com", role: "Coordinadora Senior" },
    { name: "Carlos Ruiz", email: "carlos@elitedestinations.com", role: "Coordinador de Logística" },
  ]);

  const [services, setServices] = useState([
    { name: "Coordinación completa", price: "5000" },
    { name: "Día de la boda", price: "2500" },
    { name: "Consultoría destino", price: "800" },
  ]);

  const currentStepIndex = steps.findIndex((s) => s.id === activeStep);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setActiveStep(steps[nextIndex].id);
      toast.success("Paso completado", {
        description: `Avanzando a: ${steps[nextIndex].title}`,
      });
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setActiveStep(steps[prevIndex].id);
    }
  };

  const handleComplete = () => {
    toast.success("¡Configuración completada!", {
      description: "Redirigiendo al dashboard...",
    });
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", email: "", role: "" }]);
  };

  const addService = () => {
    setServices([...services, { name: "", price: "" }]);
  };

  return (
    <div className="container space-y-8 py-10">
      <header className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/15">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-display text-4xl text-foreground">Bienvenida a The Planners</h1>
        <p className="mt-2 text-foreground/60">
          Configura tu cuenta en minutos y comienza a gestionar bodas destino de forma profesional
        </p>
      </header>

      {/* Progress indicator */}
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === activeStep;
            const isCompleted = index < currentStepIndex;

            return (
              <div key={step.id} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                      isActive
                        ? "bg-primary text-white shadow-glow"
                        : isCompleted
                          ? "bg-primary/20 text-primary"
                          : "bg-white/60 text-foreground/40"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className={`mt-2 text-xs font-medium ${isActive ? "text-primary" : "text-foreground/60"}`}>
                    Paso {index + 1}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`mx-2 h-1 flex-1 rounded ${isCompleted ? "bg-primary/30" : "bg-border/40"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="mx-auto max-w-3xl">
        <Card className="border border-border/60 bg-white/75">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {steps.find((s) => s.id === activeStep)?.title}
            </CardTitle>
            <CardDescription>{steps.find((s) => s.id === activeStep)?.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {activeStep === "company" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Nombre de la agencia *</Label>
                  <Input
                    id="companyName"
                    value={companyData.name}
                    onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                    placeholder="Nombre de tu empresa"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="email">Email corporativo *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={companyData.email}
                      onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                      placeholder="contacto@tuagencia.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      value={companyData.phone}
                      onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                      placeholder="+52 998 123 4567"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="website">Sitio web</Label>
                  <Input
                    id="website"
                    value={companyData.website}
                    onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                    placeholder="www.tuagencia.com"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descripción de servicios</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={companyData.description}
                    onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                    placeholder="Describe tu especialidad y experiencia..."
                  />
                </div>
                <div className="rounded-3xl border border-primary/30 bg-primary/10 p-4 text-sm">
                  <p className="font-semibold text-foreground">💡 Tip profesional</p>
                  <p className="mt-2 text-foreground/70">
                    Esta información aparecerá en cotizaciones, contratos y comunicaciones con clientes.
                    Asegúrate de que sea profesional y refleje tu marca.
                  </p>
                </div>
              </div>
            )}

            {activeStep === "team" && (
              <div className="space-y-4">
                <div>
                  <h3 className="mb-4 text-sm font-semibold text-foreground">Miembros del equipo</h3>
                  <div className="space-y-3">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="grid gap-3 rounded-2xl bg-white/70 p-4 md:grid-cols-3">
                        <Input
                          placeholder="Nombre completo"
                          value={member.name}
                          onChange={(e) => {
                            const newMembers = [...teamMembers];
                            newMembers[index].name = e.target.value;
                            setTeamMembers(newMembers);
                          }}
                        />
                        <Input
                          placeholder="Email"
                          type="email"
                          value={member.email}
                          onChange={(e) => {
                            const newMembers = [...teamMembers];
                            newMembers[index].email = e.target.value;
                            setTeamMembers(newMembers);
                          }}
                        />
                        <Input
                          placeholder="Rol"
                          value={member.role}
                          onChange={(e) => {
                            const newMembers = [...teamMembers];
                            newMembers[index].role = e.target.value;
                            setTeamMembers(newMembers);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <Button type="button" variant="glass" className="mt-3" onClick={addTeamMember}>
                    + Agregar otro miembro
                  </Button>
                </div>
                <div className="rounded-3xl border border-primary/30 bg-primary/10 p-4 text-sm">
                  <p className="font-semibold text-foreground">💡 Tip profesional</p>
                  <p className="mt-2 text-foreground/70">
                    Los miembros del equipo podrán acceder al sistema, gestionar eventos y recibir notificaciones.
                    Puedes agregar o editar miembros más tarde desde Configuración.
                  </p>
                </div>
              </div>
            )}

            {activeStep === "services" && (
              <div className="space-y-4">
                <div>
                  <h3 className="mb-4 text-sm font-semibold text-foreground">Tus servicios principales</h3>
                  <div className="space-y-3">
                    {services.map((service, index) => (
                      <div key={index} className="grid gap-3 rounded-2xl bg-white/70 p-4 md:grid-cols-2">
                        <Input
                          placeholder="Nombre del servicio"
                          value={service.name}
                          onChange={(e) => {
                            const newServices = [...services];
                            newServices[index].name = e.target.value;
                            setServices(newServices);
                          }}
                        />
                        <div className="flex gap-2">
                          <span className="flex items-center rounded-xl bg-white/80 px-3 text-sm text-foreground/60">
                            USD $
                          </span>
                          <Input
                            placeholder="Precio base"
                            type="number"
                            value={service.price}
                            onChange={(e) => {
                              const newServices = [...services];
                              newServices[index].price = e.target.value;
                              setServices(newServices);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button type="button" variant="glass" className="mt-3" onClick={addService}>
                    + Agregar otro servicio
                  </Button>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-foreground">Métodos de pago aceptados</h3>
                  <div className="grid gap-3 rounded-2xl bg-white/70 p-4 md:grid-cols-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Transferencia bancaria</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Stripe</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">PayPal</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Mercado Pago</span>
                    </label>
                  </div>
                </div>
                <div className="rounded-3xl border border-primary/30 bg-primary/10 p-4 text-sm">
                  <p className="font-semibold text-foreground">💡 Tip profesional</p>
                  <p className="mt-2 text-foreground/70">
                    Podrás crear paquetes personalizados y cotizaciones detalladas más tarde.
                    Esta lista es solo para comenzar rápidamente.
                  </p>
                </div>
              </div>
            )}

            {activeStep === "complete" && (
              <div className="space-y-6 py-8 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/15">
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-2xl text-foreground">
                    ¡Tu cuenta está lista, {companyData.name.split(" ")[0]}!
                  </h2>
                  <p className="mt-2 text-foreground/60">
                    Ya puedes comenzar a gestionar clientes, crear eventos y cotizaciones
                  </p>
                </div>
                <div className="mx-auto max-w-md space-y-3 rounded-3xl bg-white/70 p-6 text-left">
                  <h3 className="text-sm font-semibold text-foreground">Próximos pasos sugeridos:</h3>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Importa tu lista de proveedores preferidos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Crea tu primer cliente o evento de prueba</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Genera una cotización con el nuevo sistema</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Explora el módulo de Rooming List para hoteles</span>
                    </li>
                  </ul>
                </div>
                <Button variant="hero" size="lg" className="shadow-glow" onClick={handleComplete}>
                  Ir al Dashboard
                </Button>
              </div>
            )}

            {activeStep !== "complete" && (
              <div className="flex items-center justify-between pt-4">
                <Button
                  type="button"
                  variant="glass"
                  onClick={handlePrevious}
                  disabled={currentStepIndex === 0}
                >
                  Anterior
                </Button>
                <div className="text-xs text-foreground/50">
                  Paso {currentStepIndex + 1} de {steps.length}
                </div>
                <Button type="button" variant="hero" onClick={handleNext}>
                  {currentStepIndex === steps.length - 2 ? "Finalizar" : "Siguiente"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default OnboardingPage;
