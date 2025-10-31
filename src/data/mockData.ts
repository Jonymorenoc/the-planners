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
  Building,
  Glasses,
  CalendarDays,
  Baby,
  BedDouble,
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
  image: string;
};

export const photoCollections: PhotoCollection[] = [
  {
    id: "album-1",
    title: "Save the Date",
    photoCount: 48,
    updatedAt: "2024-09-12T18:30:00Z",
    image: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "album-2",
    title: "Sesión en Playa",
    photoCount: 72,
    updatedAt: "2024-08-28T14:10:00Z",
    image: "https://images.pexels.com/photos/235725/pexels-photo-235725.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "album-3",
    title: "Cena de Ensayo",
    photoCount: 36,
    updatedAt: "2024-09-30T20:45:00Z",
    image: "https://images.pexels.com/photos/317173/pexels-photo-317173.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "album-4",
    title: "Ceremonia",
    photoCount: 128,
    updatedAt: "2024-10-03T22:20:00Z",
    image: "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=1200",
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

export type PlannerEvent = {
  id: string;
  couple: string;
  brand: string;
  destination: string;
  date: string;
  progress: number;
  status: "planificación" | "ejecución" | "cierre";
  nextMilestone: string;
  accommodations: {
    hotel: string;
    roomsReserved: number;
    suites: number;
  };
  guests: {
    confirmed: number;
    total: number;
    families: number;
  };
};

export const plannerEvents: PlannerEvent[] = [
  {
    id: "pe-1",
    couple: "Ana & Roberto",
    brand: "Aurora Eventos",
    destination: "Riviera Maya, México",
    date: "2025-03-28",
    progress: 68,
    status: "planificación",
    nextMilestone: "Confirmar experiencias welcome party",
    accommodations: {
      hotel: "Hotel Coral Reef",
      roomsReserved: 32,
      suites: 4,
    },
    guests: {
      confirmed: 86,
      total: 120,
      families: 21,
    },
  },
  {
    id: "pe-2",
    couple: "Elena & Marco",
    brand: "The Planners Studio",
    destination: "Cartagena, Colombia",
    date: "2025-06-14",
    progress: 42,
    status: "planificación",
    nextMilestone: "Revisión de contrato audiovisual",
    accommodations: {
      hotel: "Santorini Bay Hotel",
      roomsReserved: 24,
      suites: 6,
    },
    guests: {
      confirmed: 64,
      total: 95,
      families: 15,
    },
  },
  {
    id: "pe-3",
    couple: "Michelle & David",
    brand: "The Planners Lab",
    destination: "Lisboa, Portugal",
    date: "2025-09-07",
    progress: 25,
    status: "planificación",
    nextMilestone: "Bloquear tarifas aéreas flexibles",
    accommodations: {
      hotel: "Palacio Atlántico",
      roomsReserved: 18,
      suites: 3,
    },
    guests: {
      confirmed: 42,
      total: 110,
      families: 9,
    },
  },
];

export type HotelSuggestion = {
  id: string;
  name: string;
  location: string;
  rating: number;
  vibe: "boho" | "luxury" | "family" | "urban";
  perks: string[];
  roomTypes: Array<{
    label: string;
    occupancy: string;
    pricePerNight: string;
    includesKidsClub?: boolean;
  }>;
  availability: {
    totalRooms: number;
    suites: number;
    holdsUntil: string;
  };
};

export const hotelSuggestions: HotelSuggestion[] = [
  {
    id: "hotel-1",
    name: "Coral Reef Grand Resort",
    location: "Playa del Carmen, México",
    rating: 4.8,
    vibe: "luxury",
    perks: [
      "Coordinador VIP dedicado",
      "Ceremonia en gazebo oceánico",
      "Spa con ritual maya para la pareja",
    ],
    roomTypes: [
      {
        label: "Suite Ocean Breeze",
        occupancy: "2 adultos",
        pricePerNight: "$420 USD",
      },
      {
        label: "Family Lagoon",
        occupancy: "2 adultos · 2 niños",
        pricePerNight: "$480 USD",
        includesKidsClub: true,
      },
      {
        label: "Penthouse Romance",
        occupancy: "2 adultos",
        pricePerNight: "$690 USD",
      },
    ],
    availability: {
      totalRooms: 45,
      suites: 8,
      holdsUntil: "15 de enero 2025",
    },
  },
  {
    id: "hotel-2",
    name: "Isla Mar Boutique",
    location: "Isla Mujeres, México",
    rating: 4.6,
    vibe: "boho",
    perks: [
      "Club de playa exclusivo",
      "Decoración sostenible y artesanal",
      "Barra mixología signature",
    ],
    roomTypes: [
      {
        label: "Suite Garden",
        occupancy: "2 adultos",
        pricePerNight: "$310 USD",
      },
      {
        label: "Loft Familiar",
        occupancy: "2 adultos · 2 niños",
        pricePerNight: "$355 USD",
        includesKidsClub: true,
      },
      {
        label: "Villa Rooftop",
        occupancy: "4 adultos",
        pricePerNight: "$520 USD",
      },
    ],
    availability: {
      totalRooms: 28,
      suites: 6,
      holdsUntil: "2 de febrero 2025",
    },
  },
  {
    id: "hotel-3",
    name: "Palacio Atlántico",
    location: "Lisboa, Portugal",
    rating: 4.9,
    vibe: "urban",
    perks: [
      "Terraza panorámica con vista al río Tajo",
      "Menú degustación por chef con estrella Michelin",
      "Traslados privados para invitados",
    ],
    roomTypes: [
      {
        label: "Suite Executive",
        occupancy: "2 adultos",
        pricePerNight: "€390",
      },
      {
        label: "Residencia Family",
        occupancy: "2 adultos · 2 niños",
        pricePerNight: "€430",
        includesKidsClub: false,
      },
      {
        label: "Penthouse Heritage",
        occupancy: "2 adultos",
        pricePerNight: "€610",
      },
    ],
    availability: {
      totalRooms: 34,
      suites: 7,
      holdsUntil: "20 de marzo 2025",
    },
  },
];

export type GuestLogisticTemplate = {
  id: string;
  title: string;
  focus: string;
  description: string;
  actions: Array<{
    label: string;
    icon: LucideIcon;
    eta: string;
  }>;
  stats: Array<{
    label: string;
    value: string;
  }>;
};

export const guestLogisticTemplates: GuestLogisticTemplate[] = [
  {
    id: "gl-1",
    title: "Reservas con familias",
    focus: "Habitaciones dobles y suites kid friendly",
    description:
      "Flujo recomendado para familias con niños. Incluye anticipación de cunas, club infantil y menús especiales.",
    actions: [
      { label: "Enviar formulario de edades", icon: Baby, eta: "1 día" },
      { label: "Bloquear habitaciones Family", icon: BedDouble, eta: "3 días" },
      { label: "Confirmar upgrades con hotel", icon: Building, eta: "5 días" },
    ],
    stats: [
      { label: "Familias", value: "18 confirmadas" },
      { label: "Habitaciones", value: "26 reservadas" },
      { label: "Niños", value: "32 registrados" },
    ],
  },
  {
    id: "gl-2",
    title: "Grupo amigos VIP",
    focus: "Suites y experiencias lifestyle",
    description:
      "Coordina suites conectadas, traslados privados y experiencias sunset para el grupo VIP.",
    actions: [
      { label: "Asignar concierge privado", icon: Glasses, eta: "6 horas" },
      { label: "Reservar rooftop sunset", icon: CalendarDays, eta: "2 días" },
      { label: "Configurar códigos VIP", icon: CheckCircle2, eta: "1 día" },
    ],
    stats: [
      { label: "Suites", value: "12 confirmadas" },
      { label: "Traslados", value: "6 pendientes" },
      { label: "Experiencias", value: "4 diseñadas" },
    ],
  },
];
