/**
 * Tipos para gestión de clientes/novios
 */

export enum ClientStatus {
  LEAD = 'lead', // Primer contacto
  PROSPECTO = 'prospecto', // En proceso de cotización
  CLIENTE_ACTIVO = 'cliente_activo', // Boda confirmada
  COMPLETADO = 'completado', // Boda realizada
  CANCELADO = 'cancelado',
}

export interface ClientContact {
  firstName: string
  lastName: string
  email: string
  phone: string
  isPrimary: boolean
}

export interface ClientPreferences {
  budget: number
  estimatedGuests: number
  preferredDestinations: string[]
  weddingStyle: string[] // Playa, Jardín, Elegante, Rústico, etc.
  seasonPreference: string[] // Verano, Invierno, etc.
  notes: string
}

export interface CommunicationLog {
  id: string
  clientId: string
  userId: string // Usuario que realizó la comunicación
  userName: string
  type: 'email' | 'phone' | 'whatsapp' | 'meeting' | 'note'
  subject?: string
  content: string
  attachments?: string[]
  createdAt: Date
}

export interface Client {
  id: string
  // Contactos (novios)
  contacts: ClientContact[]

  // Status
  status: ClientStatus
  assignedTo?: string // ID del coordinador/vendedor asignado
  assignedToName?: string

  // Información de la boda
  weddingDate?: Date
  venue?: string

  // Presupuesto
  estimatedBudget: number
  preferences: ClientPreferences

  // Documentos
  documents: {
    id: string
    name: string
    url: string
    type: string
    uploadedAt: Date
  }[]

  // Historial
  communicationHistory: CommunicationLog[]

  // Metadata
  source?: string // Cómo llegó el cliente (referencia, web, redes sociales, etc.)
  tags: string[]
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export interface ClientFormData {
  contacts: ClientContact[]
  status: ClientStatus
  assignedTo?: string
  weddingDate?: Date
  venue?: string
  estimatedBudget: number
  preferences: ClientPreferences
  source?: string
  tags: string[]
}

export interface ClientFilters {
  status?: ClientStatus[]
  assignedTo?: string[]
  dateFrom?: Date
  dateTo?: Date
  budgetMin?: number
  budgetMax?: number
  search?: string
  tags?: string[]
}
