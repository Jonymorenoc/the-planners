/**
 * Tipos para gestión de eventos/bodas
 */

export enum EventStatus {
  PLANEANDO = 'planeando',
  CONFIRMADO = 'confirmado',
  EN_PROGRESO = 'en_progreso',
  COMPLETADO = 'completado',
  CANCELADO = 'cancelado',
}

export enum EventType {
  BODA_DESTINO = 'boda_destino',
  BODA_LOCAL = 'boda_local',
  LUNA_MIEL = 'luna_miel',
  RENOVACION_VOTOS = 'renovacion_votos',
  OTRO = 'otro',
}

export interface EventCoordinator {
  userId: string
  userName: string
  role: 'principal' | 'asistente'
  assignedAt: Date
}

export interface EventTimeline {
  id: string
  title: string
  description: string
  dueDate: Date
  completed: boolean
  completedAt?: Date
  completedBy?: string
  category: 'payment' | 'planning' | 'logistics' | 'coordination' | 'other'
}

export interface EventTask {
  id: string
  eventId: string
  title: string
  description: string
  assignedTo: string
  assignedToName: string
  dueDate: Date
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface EventVenue {
  name: string
  type: 'hotel' | 'resort' | 'salon' | 'jardin' | 'playa' | 'otro'
  address: string
  city: string
  state: string
  country: string
  capacity: number
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  notes?: string
}

export interface EventItinerary {
  id: string
  eventId: string
  date: Date
  startTime: string
  endTime: string
  title: string
  description: string
  location: string
  type: 'ceremony' | 'reception' | 'activity' | 'transport' | 'other'
  attendees?: 'all' | 'couple' | 'vip' | 'custom'
  notes?: string
}

export interface WeddingEvent {
  id: string

  // Cliente asociado
  clientId: string
  clientName: string

  // Información básica
  eventName: string
  eventType: EventType
  status: EventStatus

  // Fechas
  weddingDate: Date
  startDate: Date // Inicio de actividades (puede ser antes de la boda)
  endDate: Date // Fin de actividades

  // Ubicación
  venue: EventVenue

  // Presupuesto
  estimatedBudget: number
  actualCost: number
  balance: number

  // Invitados
  estimatedGuests: number
  confirmedGuests: number

  // Coordinadores
  coordinators: EventCoordinator[]

  // Cronograma y tareas
  timeline: EventTimeline[]
  tasks: EventTask[]

  // Itinerario
  itinerary: EventItinerary[]

  // Notas internas (visibles solo para equipo)
  internalNotes: {
    id: string
    content: string
    createdBy: string
    createdByName: string
    createdAt: Date
    mentions?: string[] // IDs de usuarios mencionados
  }[]

  // Metadata
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export interface EventFormData {
  clientId: string
  clientName: string
  eventName: string
  eventType: EventType
  status: EventStatus
  weddingDate: Date
  startDate: Date
  endDate: Date
  venue: EventVenue
  estimatedBudget: number
  estimatedGuests: number
  coordinators: EventCoordinator[]
}

export interface EventFilters {
  status?: EventStatus[]
  eventType?: EventType[]
  coordinatorId?: string[]
  dateFrom?: Date
  dateTo?: Date
  venue?: string
  search?: string
}

// Plantilla de timeline por defecto (meses antes de la boda)
export const DEFAULT_TIMELINE_TEMPLATE: Omit<EventTimeline, 'id'>[] = [
  {
    title: 'Primer pago (50% del total)',
    description: 'Recibir el 50% del costo total del evento',
    dueDate: new Date(), // Se calcula dinámicamente: 6 meses antes
    completed: false,
    category: 'payment',
  },
  {
    title: 'Confirmar rooming list preliminar',
    description: 'Obtener lista preliminar de invitados y habitaciones',
    dueDate: new Date(), // 4 meses antes
    completed: false,
    category: 'planning',
  },
  {
    title: 'Segundo pago (25% del total)',
    description: 'Recibir el 25% del costo total del evento',
    dueDate: new Date(), // 3 meses antes
    completed: false,
    category: 'payment',
  },
  {
    title: 'Confirmar proveedores',
    description: 'Confirmar todos los proveedores (decoración, música, fotografía, etc.)',
    dueDate: new Date(), // 2 meses antes
    completed: false,
    category: 'planning',
  },
  {
    title: 'Rooming list final',
    description: 'Recibir lista final de invitados y confirmar habitaciones',
    dueDate: new Date(), // 1 mes antes
    completed: false,
    category: 'logistics',
  },
  {
    title: 'Pago final (25% restante)',
    description: 'Recibir el pago final del evento',
    dueDate: new Date(), // 2 semanas antes
    completed: false,
    category: 'payment',
  },
  {
    title: 'Coordinación final con hotel',
    description: 'Reunión final con el hotel para confirmar todos los detalles',
    dueDate: new Date(), // 1 semana antes
    completed: false,
    category: 'coordination',
  },
]
