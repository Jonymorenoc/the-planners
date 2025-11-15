/**
 * Tipos para gestión de proveedores
 */

export enum ProviderCategory {
  DECORACION = 'decoracion',
  CATERING = 'catering',
  FOTOGRAFIA = 'fotografia',
  VIDEO = 'video',
  MUSICA = 'musica',
  DJ = 'dj',
  FLORERIA = 'floreria',
  PASTELERIA = 'pasteleria',
  TRANSPORTE = 'transporte',
  HOTEL = 'hotel',
  SALON = 'salon',
  COORDINACION = 'coordinacion',
  ILUMINACION = 'iluminacion',
  MOBILIARIO = 'mobiliario',
  ENTRETENIMIENTO = 'entretenimiento',
  PAPELERIA = 'papeleria',
  REGALOS = 'regalos',
  BELLEZA = 'belleza',
  OTRO = 'otro',
}

export enum ProviderStatus {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
  PREFERIDO = 'preferido',
  BLOQUEADO = 'bloqueado',
}

export interface ProviderContact {
  name: string
  position?: string
  email: string
  phone: string
  isPrimary: boolean
}

export interface ProviderService {
  id: string
  name: string
  description: string
  category: ProviderCategory
  basePrice: number
  unit: string // por persona, por hora, paquete, etc.
  notes?: string
}

export interface ProviderRating {
  eventId: string
  eventName: string
  rating: number // 1-5
  review: string
  ratedBy: string
  ratedByName: string
  ratedAt: Date
  categories: {
    quality: number
    punctuality: number
    professionalism: number
    value: number
  }
}

export interface ProviderContract {
  id: string
  providerId: string
  eventId?: string

  // Detalles del contrato
  contractNumber: string
  title: string
  description: string
  services: string[]

  // Montos
  totalAmount: number
  currency: string

  // Fechas
  startDate: Date
  endDate: Date
  signedDate?: Date

  // Términos de pago
  paymentTerms: {
    dueDate: Date
    amount: number
    description: string
    status: 'pending' | 'paid' | 'overdue'
    paidAt?: Date
  }[]

  // Documentos
  documentUrl?: string
  attachments: {
    id: string
    name: string
    url: string
    uploadedAt: Date
  }[]

  // Status
  status: 'draft' | 'active' | 'completed' | 'cancelled'

  // Metadata
  createdBy: string
  createdAt: Date
  updatedAt: Date
  notes?: string
}

export interface ProviderExpense {
  id: string
  providerId: string
  providerName: string
  eventId?: string
  eventName?: string
  contractId?: string

  // Detalles del gasto
  description: string
  category: ProviderCategory
  amount: number
  currency: string

  // Fecha
  expenseDate: Date
  dueDate?: Date

  // Pago
  isPaid: boolean
  paidAmount: number
  paidDate?: Date
  paymentMethod?: string
  reference?: string

  // Factura
  invoiceNumber?: string
  invoiceUrl?: string

  // Metadata
  createdBy: string
  createdByName: string
  createdAt: Date
  updatedAt: Date
  notes?: string
}

export interface Provider {
  id: string

  // Información básica
  businessName: string
  contactName: string
  email: string
  phone: string
  website?: string
  logo?: string

  // Categoría y servicios
  categories: ProviderCategory[]
  services: ProviderService[]

  // Ubicación
  address?: string
  city?: string
  state?: string
  country?: string

  // Contactos adicionales
  contacts: ProviderContact[]

  // Status
  status: ProviderStatus

  // Calificación
  ratings: ProviderRating[]
  averageRating: number
  totalReviews: number

  // Información financiera
  paymentTerms?: string
  bankInfo?: {
    bankName: string
    accountNumber: string
    clabe?: string
    swift?: string
  }
  taxId?: string

  // Contratos
  contracts: ProviderContract[]

  // Historial
  totalEvents: number
  totalRevenue: number
  lastEventDate?: Date

  // Documentos
  documents: {
    id: string
    name: string
    type: string
    url: string
    uploadedAt: Date
  }[]

  // Metadata
  tags: string[]
  notes?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface ProviderFormData {
  businessName: string
  contactName: string
  email: string
  phone: string
  website?: string
  categories: ProviderCategory[]
  services: ProviderService[]
  address?: string
  city?: string
  state?: string
  country?: string
  contacts: ProviderContact[]
  status: ProviderStatus
  paymentTerms?: string
  bankInfo?: {
    bankName: string
    accountNumber: string
    clabe?: string
    swift?: string
  }
  taxId?: string
  tags: string[]
  notes?: string
}

export interface ProviderFilters {
  status?: ProviderStatus[]
  categories?: ProviderCategory[]
  city?: string
  state?: string
  ratingMin?: number
  search?: string
  tags?: string[]
}

export interface ProviderPerformance {
  providerId: string
  providerName: string
  category: ProviderCategory

  // Métricas
  totalEvents: number
  totalRevenue: number
  averageRating: number
  onTimeDelivery: number // %
  repeatBookings: number

  // Financiero
  totalContracts: number
  activeContracts: number
  totalExpenses: number
  pendingPayments: number

  // Tendencias
  eventsThisYear: number
  eventsLastYear: number
  revenueThisYear: number
  revenueLastYear: number
}
