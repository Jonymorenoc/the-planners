import type { LucideIcon } from "lucide-react";
import {
  PlaneTakeoff,
  Banknote,
  CalendarClock,
  Camera,
  CheckCircle2,
  Globe2,
  Handshake,
  Heart,
  Hotel,
  Mail,
  PartyPopper,
  Plane,
  ScrollText,
  UserPlus,
  Users,
  Workflow,
} from "lucide-react";

export type Feature = {
  name: string;
  description: string;
  icon: LucideIcon;
};

export const heroStats = [
  { label: "Bodas celebradas", value: "500+" },
  { label: "Satisfacción", value: "98%" },
  { label: "Destinos", value: "50+" },
];

export const features: Feature[] = [
  {
    name: "Planificación integral",
    description:
      "Administra invitados, presupuesto, vuelos y contratos en un solo lugar con visibilidad total.",
    icon: Workflow,
  },
  {
    name: "IA para tu sitio web",
    description:
      "Genera experiencias digitales únicas para tus parejas con contenido personalizado en segundos.",
    icon: Globe2,
  },
  {
    name: "Seguimiento de viajes",
    description:
      "Monitorea vuelos y hoteles confirmados con actualizaciones visuales para cada invitado.",
    icon: Plane,
  },
  {
    name: "Presupuesto inteligente",
    description:
      "Visualiza gastos por categoría y recibe alertas proactivas antes de llegar al límite.",
    icon: Banknote,
  },
  {
    name: "Contratos asistidos",
    description:
      "Analiza cláusulas críticas y extrae montos y fechas clave con Gemini Flash integrado.",
    icon: ScrollText,
  },
  {
    name: "Álbum compartido",
    description:
      "Comparte colecciones fotográficas listas para descargar, compartir o presentar al cliente.",
    icon: Camera,
  },
];

export const ctaHighlights = [
  {
    title: "Convierte sueños en experiencias memorables",
    description:
      "Crea itinerarios visuales, comunicaciones automatizadas y tableros de control en cuestión de minutos.",
    icon: Heart,
  },
  {
    title: "Comunicación impecable",
    description:
      "Envía invitaciones personalizadas, confirma asistencia y comparte actualizaciones clave por email o SMS.",
    icon: Mail,
  },
  {
    title: "Operaciones sin fricción",
    description:
      "Conecta proveedores, gestiona contratos y coordina equipos desde un panel intuitivo y colaborativo.",
    icon: Handshake,
  },
];

export type Guest = {
  id: string;
  name: string;
  email: string;
  code: string;
  flightStatus: "confirmado" | "pendiente" | "sin vuelo";
  hotelStatus: "confirmado" | "pendiente" | "sin hotel";
  paymentStatus: "pagado" | "parcial" | "pendiente";
};

export const guests: Guest[] = [
  {
    id: "g-1",
    name: "María González",
    email: "maria.gonzalez@example.com",
    code: "DW-1201",
    flightStatus: "confirmado",
    hotelStatus: "confirmado",
    paymentStatus: "pagado",
  },
  {
    id: "g-2",
    name: "Carlos Pérez",
    email: "carlos.perez@example.com",
    code: "DW-1202",
    flightStatus: "pendiente",
    hotelStatus: "confirmado",
    paymentStatus: "parcial",
  },
  {
    id: "g-3",
    name: "Ana Rodríguez",
    email: "ana.rodriguez@example.com",
    code: "DW-1203",
    flightStatus: "confirmado",
    hotelStatus: "pendiente",
    paymentStatus: "pendiente",
  },
  {
    id: "g-4",
    name: "Luis Fernández",
    email: "luis.fernandez@example.com",
    code: "DW-1204",
    flightStatus: "sin vuelo",
    hotelStatus: "pendiente",
    paymentStatus: "pagado",
  },
  {
    id: "g-5",
    name: "Paula Martínez",
    email: "paula.martinez@example.com",
    code: "DW-1205",
    flightStatus: "confirmado",
    hotelStatus: "confirmado",
    paymentStatus: "pagado",
  },
  {
    id: "g-6",
    name: "Javier López",
    email: "javier.lopez@example.com",
    code: "DW-1206",
    flightStatus: "pendiente",
    hotelStatus: "sin hotel",
    paymentStatus: "parcial",
  },
  {
    id: "g-7",
    name: "Valentina Ruiz",
    email: "valentina.ruiz@example.com",
    code: "DW-1207",
    flightStatus: "confirmado",
    hotelStatus: "confirmado",
    paymentStatus: "pagado",
  },
  {
    id: "g-8",
    name: "Diego Ramírez",
    email: "diego.ramirez@example.com",
    code: "DW-1208",
    flightStatus: "pendiente",
    hotelStatus: "pendiente",
    paymentStatus: "pendiente",
  },
];

export type BudgetCategory = {
  name: string;
  allocated: number;
  spent: number;
  icon: LucideIcon;
};

export const budgetOverview = {
  totalAllocated: 45000,
  totalSpent: 24500,
  currency: "USD",
  categories: [
    {
      name: "Lugar",
      allocated: 15000,
      spent: 12000,
      icon: PartyPopper,
    },
    {
      name: "Catering",
      allocated: 10000,
      spent: 5400,
      icon: Users,
    },
    {
      name: "Fotografía",
      allocated: 5000,
      spent: 3800,
      icon: Camera,
    },
    {
      name: "Decoración",
      allocated: 6000,
      spent: 4100,
      icon: Heart,
    },
    {
      name: "Entretenimiento",
      allocated: 5000,
      spent: 2600,
      icon: PartyPopper,
    },
    {
      name: "Otros",
      allocated: 4000,
      spent: 1600,
      icon: CalendarClock,
    },
  ] satisfies BudgetCategory[],
  highlights: [
    {
      title: "Control en tiempo real",
      description:
        "Recibe alertas automáticas cuando una categoría supera el 80% del presupuesto asignado.",
    },
    {
      title: "Costos negociados",
      description:
        "Comparte métricas con tu equipo y proveedores para optimizar tarifas y descuentos.",
    },
  ],
};

export type PhotoCollection = {
  id: string;
  title: string;
  photoCount: number;
  updatedAt: string;
};

export const photoCollections: PhotoCollection[] = [
  {
    id: "album-1",
    title: "Save the Date",
    photoCount: 48,
    updatedAt: "2024-09-12T18:30:00Z",
  },
  {
    id: "album-2",
    title: "Sesión en Playa",
    photoCount: 72,
    updatedAt: "2024-08-28T14:10:00Z",
  },
  {
    id: "album-3",
    title: "Cena de Ensayo",
    photoCount: 36,
    updatedAt: "2024-09-30T20:45:00Z",
  },
  {
    id: "album-4",
    title: "Ceremonia",
    photoCount: 128,
    updatedAt: "2024-10-03T22:20:00Z",
  },
];

export const quickActions = [
  {
    title: "Añadir invitado",
    description: "Invita a nuevos asistentes con códigos únicos.",
    icon: UserPlus,
  },
  {
    title: "Crear sitio web",
    description: "Genera un sitio personalizado con IA.",
    icon: Globe2,
  },
  {
    title: "Planear asientos",
    description: "Organiza mesas y confirma distribución.",
    icon: Users,
  },
  {
    title: "Revisar contratos",
    description: "Sube documentos y analiza cláusulas clave.",
    icon: ScrollText,
  },
  {
    title: "Generar código",
    description: "Crea códigos para check-in y RSVP.",
    icon: CheckCircle2,
  },
];

export const recentActivity = [
  {
    id: "act-1",
    title: "Contrato de Fotografía aprobado",
    type: "success" as const,
    timeAgo: "Hace 2 horas",
    description: "Gemini confirmó pagos en tres entregas y derechos de uso ampliados.",
  },
  {
    id: "act-2",
    title: "Invitado pendiente de vuelo",
    type: "pending" as const,
    timeAgo: "Hace 3 horas",
    description: "Se solicitó confirmación del vuelo para Carlos Pérez.",
  },
  {
    id: "act-3",
    title: "Nuevo álbum compartido",
    type: "info" as const,
    timeAgo: "Ayer",
    description: "La pareja recibió la galería 'Sesión en Playa'.",
  },
];

export const seatingGuests = guests.map((guest) => ({
  id: guest.id,
  name: guest.name,
  code: guest.code,
}));

export const seatingTables = [
  "Mesa 1",
  "Mesa 2",
  "Mesa 3",
  "Mesa 4",
  "Mesa 5",
  "Mesa 6",
];

export const aiSystemPrompts = {
  website:
    "Diseñador web experto en bodas destino, genera contenido HTML/CSS elegante",
  contract:
    "Analiza contratos y extrae fechas, montos, términos clave",
};

export const dashboardStats = [
  {
    title: "Total de invitados",
    value: 48,
    change: "+12 confirmados esta semana",
    icon: Users,
  },
  {
    title: "Vuelos confirmados",
    value: 32,
    change: "10 pendientes",
    icon: PlaneTakeoff,
  },
  {
    title: "Hoteles reservados",
    value: 28,
    change: "6 pendientes",
    icon: Hotel,
  },
  {
    title: "Presupuesto activo",
    value: "$24,500 / $45,000",
    change: "54% utilizado",
    icon: Banknote,
  },
];
