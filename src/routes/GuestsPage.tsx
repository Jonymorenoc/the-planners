import { useMemo, useState } from "react";
import { Search, UploadCloud, UserPlus } from "lucide-react";
import { guests } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const flightVariant = {
  confirmado: "success",
  pendiente: "warning",
  "sin vuelo": "outline",
} as const;

const hotelVariant = {
  confirmado: "success",
  pendiente: "warning",
  "sin hotel": "outline",
} as const;

const paymentVariant = {
  pagado: "success",
  parcial: "warning",
  pendiente: "danger",
} as const;

export function GuestsPage() {
  const [query, setQuery] = useState("");

  const filteredGuests = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return guests;
    return guests.filter(
      (guest) =>
        guest.name.toLowerCase().includes(normalized) ||
        guest.email.toLowerCase().includes(normalized) ||
        guest.code.toLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <div className="container space-y-8 py-10">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Gestión de invitados</h1>
          <p className="text-sm text-foreground/60">
            Centraliza confirmaciones, códigos únicos, vuelos y hoteles con vistas en tiempo real.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="glass">
            <UploadCloud className="mr-2 h-4 w-4" />
            Importar CSV
          </Button>
          <Button variant="hero">
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo invitado
          </Button>
        </div>
      </header>

      <Card className="border border-border/60">
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Listado maestro</CardTitle>
              <CardDescription>
                {filteredGuests.length} invitados · Códigos generados automáticamente.
              </CardDescription>
            </div>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
              <Input
                placeholder="Buscar por nombre, email o código..."
                className="pl-10"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Vuelo</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Pago</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell className="font-medium">{guest.name}</TableCell>
                  <TableCell className="text-foreground/70">{guest.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-semibold">
                      {guest.code}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={flightVariant[guest.flightStatus]}>
                      {guest.flightStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={hotelVariant[guest.hotelStatus]}>
                      {guest.hotelStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={paymentVariant[guest.paymentStatus]}>
                      {guest.paymentStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
