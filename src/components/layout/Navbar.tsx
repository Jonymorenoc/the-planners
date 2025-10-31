import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
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
  { to: "/invitados", label: "Invitados" },
  { to: "/presupuesto", label: "Presupuesto" },
  { to: "/fotos", label: "Fotos" },
];

const moreLinks = [
  { to: "/sitio-web", label: "Sitio Web" },
  { to: "/planificador", label: "Planificador de Asientos" },
  { to: "/contratos", label: "Contratos" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full backdrop-blur-xl transition-shadow duration-300",
        isLanding ? "bg-transparent" : "bg-card/80 shadow-glow",
      )}
    >
      <nav className="container flex items-center justify-between py-4">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-primary-glow text-white shadow-glow">
            <Heart className="h-5 w-5" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg text-foreground">DreamWedding</span>
            <span className="text-xs tracking-[0.35em] text-foreground/60">
              DESTINATION
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
                    isActive && "bg-primary/15 text-primary-foreground",
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

          <Button variant="hero" size="sm" className="shadow-glow">
            Solicitar demo
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
            <Button variant="hero" className="w-full">
              Solicitar demo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
