import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type LoginForm = {
  email: string;
  password: string;
  company: string;
};

const defaultForm: LoginForm = {
  email: "planner@dreamwedding.app",
  password: "demo1234",
  company: "DreamWedding Studio",
};

export function LoginPage() {
  const [form, setForm] = useState<LoginForm>(defaultForm);

  const handleChange = <K extends keyof LoginForm>(key: K, value: LoginForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Bienvenida de nuevo", {
      description: "Accediendo a DreamWedding en modo demo.",
    });
  };

  return (
    <div className="relative flex min-h-screen items-stretch bg-background">
      <div className="relative hidden flex-1 overflow-hidden bg-card/90 lg:block">
        <img
          src="https://images.pexels.com/photos/2060240/pexels-photo-2060240.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Equipo de wedding planners organizando un evento"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/30 to-transparent" />
        <div className="absolute bottom-12 left-12 max-w-sm rounded-3xl bg-white/70 p-6 shadow-glass backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-foreground/45">The Planners Suite</p>
          <h2 className="mt-4 font-display text-3xl text-foreground">
            Coordina bodas destino con inteligencia y estilo
          </h2>
          <p className="mt-3 text-sm text-foreground/65">
            Gestiona invitados, hoteles, contratos y experiencia digital desde un único panel profesional.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center bg-white/85 px-6 py-12 shadow-inner backdrop-blur-xl lg:w-[420px]">
        <Card className="border border-border/60 bg-white/80 shadow-glass">
          <CardHeader className="space-y-2">
            <CardTitle className="font-display text-2xl text-foreground">Inicia sesión demo</CardTitle>
            <CardDescription>
              Ingresa cualquier correo y contraseña para explorar la plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="planner@tuagencia.com"
                  value={form.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(event) => handleChange("password", event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Agencia</Label>
                <Input
                  id="company"
                  placeholder="Nombre de tu agencia"
                  value={form.company}
                  onChange={(event) => handleChange("company", event.target.value)}
                />
              </div>
              <Button type="submit" variant="hero" className="w-full">
                Entrar al dashboard
              </Button>
              <Button
                type="button"
                variant="glass"
                className="w-full"
                onClick={() => {
                  setForm(defaultForm);
                  toast.info("Formulario cargado con datos demo");
                }}
              >
                Probar sin credenciales
              </Button>
            </form>
            <p className="mt-6 text-center text-xs text-foreground/50">
              ¿Aún sin cuenta? <Link to="/onboarding" className="font-semibold text-primary">Configura tu primer demo</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
