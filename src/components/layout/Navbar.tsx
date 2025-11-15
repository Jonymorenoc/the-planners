import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const mainLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/clientes", label: "Clientes" },
  { to: "/eventos", label: "Eventos" },
  { to: "/rooming-list", label: "Rooming List" },
  { to: "/pagos", label: "Pagos" },
];

const moreLinks = [
  { to: "/cotizaciones", label: "Cotizaciones" },
  { to: "/proveedores", label: "Proveedores" },
  { to: "/reportes", label: "Reportes" },
  { to: "/invitados", label: "Invitados" },
  { to: "/presupuesto", label: "Presupuesto" },
  { to: "/sitio-web", label: "Sitio Web" },
  { to: "/planificador", label: "Planificador de Asientos" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full backdrop-blur-xl transition-shadow duration-300",
        isLanding ? "bg-transparent" : "bg-white/90 shadow-glow",
      )}
    >
      <nav className="container flex items-center justify-between py-4">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex flex-col leading-tight">
            <span className="font-display text-xl text-foreground md:text-2xl">The Planners</span>
            <span className="text-[0.65rem] tracking-[0.35em] text-foreground/60">
              BODAS DESTINO
            </span>
          </div>
        </NavLink>

        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-1 text-sm">
            {mainLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-xl px-3 py-2 font-medium transition-all hover:text-primary",
                    isActive && "bg-primary/15 text-primary",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="glass" size="sm" className="font-medium">
                Más
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {moreLinks.map((link) => (
                <DropdownMenuItem
                  key={link.to}
                  asChild
                  className={cn(
                    location.pathname === link.to && "bg-primary/15 text-primary",
                  )}
                >
                  <NavLink to={link.to}>{link.label}</NavLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="glass" size="icon" asChild aria-label="Iniciar sesión">
            <NavLink to="/login">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
            </NavLink>
          </Button>
          <Button variant="hero" size="sm" className="shadow-glow" asChild>
            <NavLink to="/onboarding">Iniciar demo</NavLink>
          </Button>
        </div>

        <Button
          variant="glass"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Mostrar menú"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {isOpen && (
        <div className="border-t border-border/60 bg-card/95 px-6 py-4 shadow-glass lg:hidden">
          <div className="space-y-2">
            {[...mainLinks, ...moreLinks].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block rounded-2xl px-4 py-3 text-sm font-semibold transition hover:bg-primary/10",
                    isActive && "bg-primary/15 text-primary",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  "block rounded-2xl px-4 py-3 text-sm font-semibold transition hover:bg-primary/10",
                  isActive && "bg-primary/15 text-primary",
                )
              }
            >
              Iniciar sesión
            </NavLink>
            <Button variant="hero" className="w-full" asChild>
              <NavLink to="/onboarding">Iniciar demo</NavLink>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
