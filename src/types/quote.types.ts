/**
 * Tipos para sistema de cotizaciones
 */

export enum QuoteStatus {
  BORRADOR = 'borrador',
  ENVIADA = 'enviada',
  REVISADA = 'revisada', // Cliente la vio
  NEGOCIACION = 'negociacion',
  ACEPTADA = 'aceptada',
  RECHAZADA = 'rechazada',
  EXPIRADA = 'expirada',
}

export enum ServiceCategory {
  HOSPEDAJE = 'hospedaje',
  VUELOS = 'vuelos',
  CEREMONIA = 'ceremonia',
  RECEPCION = 'recepcion',
  DECORACION = 'decoracion',
  CATERING = 'catering',
  FOTOGRAFIA = 'fotografia',
  VIDEO = 'video',
  MUSICA = 'musica',
  TRANSPORTE = 'transporte',
  FLORERIA = 'floreria',
  PASTEL = 'pastel',
  COORDINACION = 'coordinacion',
  ACTIVIDADES = 'actividades',
  OTRO = 'otro',
}

export interface QuoteService {
  id: string
  category: ServiceCategory
  name: string
  description: string
  quantity: number
  unitPrice: number
  totalPrice: number
  providerId?: string
  providerName?: string
  notes?: string
  isOptional: boolean
}

export interface AccommodationDetails {
  hotelName: string
  roomType: string
  nights: number
  rooms: number
  checkIn: Date
  checkOut: Date
  pricePerNight: number
  totalPrice: number
  mealPlan?: string // Todo incluido, solo desayuno, etc.
  amenities?: string[]
}

export interface FlightDetails {
  airline: string
  origin: string
  destination: string
  departureDate: Date
  returnDate: Date
  passengers: number
  class: 'economica' | 'premium' | 'business' | 'primera'
  pricePerPerson: number
  totalPrice: number
  includeBaggage: boolean
}

export interface Quote {
  id: string
  quoteNumber: string // Número de cotización (ej: COT-2024-001)

  // Cliente y evento
  clientId: string
  clientName: string
  eventId?: string // Si ya se creó el evento

  // Status
  status: QuoteStatus

  // Información básica
  title: string
  description: string
  eventDate?: Date

  // Servicios
  services: QuoteService[]
  accommodations: AccommodationDetails[]
  flights: FlightDetails[]

  // Precios
  subtotal: number
  discount: number
  discountPercentage: number
  taxes: number
  taxPercentage: number
  total: number

  // Términos
  validUntil: Date
  paymentTerms: string
  cancellationPolicy: string
  includedServices: string[]
  notIncluded: string[]
  termsAndConditions: string

  // Plan de pagos sugerido
  suggestedPaymentPlan: {
    dueDate: Date
    amount: number
    percentage: number
    description: string
  }[]

  // Historial
  version: number
  previousVersionId?: string
  sentAt?: Date
  viewedAt?: Date
  respondedAt?: Date
  acceptedAt?: Date
  rejectedAt?: Date
  rejectionReason?: string

  // Metadata
  createdBy: string
  createdByName: string
  createdAt: Date
  updatedAt: Date
  notes: string
}

export interface QuoteFormData {
  clientId: string
  clientName: string
  eventId?: string
  title: string
  description: string
  eventDate?: Date
  services: QuoteService[]
  accommodations: AccommodationDetails[]
  flights: FlightDetails[]
  discount: number
  discountPercentage: number
  taxPercentage: number
  validUntil: Date
  paymentTerms: string
  cancellationPolicy: string
  includedServices: string[]
  notIncluded: string[]
  termsAndConditions: string
  notes: string
}

export interface QuoteFilters {
  status?: QuoteStatus[]
  clientId?: string
  createdBy?: string
  dateFrom?: Date
  dateTo?: Date
  search?: string
}

// Plantillas de términos y condiciones
export const DEFAULT_PAYMENT_TERMS = `
- 50% de anticipo al confirmar la cotización
- 25% tres meses antes del evento
- 25% restante dos semanas antes del evento
`.trim()

export const DEFAULT_CANCELLATION_POLICY = `
- Cancelación 6+ meses antes: Reembolso del 80%
- Cancelación 3-6 meses antes: Reembolso del 50%
- Cancelación menos de 3 meses: No hay reembolso
- El anticipo del 50% no es reembolsable en ningún caso
`.trim()

export const DEFAULT_TERMS_AND_CONDITIONS = `
1. Los precios están sujetos a disponibilidad al momento de la reserva
2. Las tarifas de hotel pueden cambiar según la temporada
3. Se requiere pasaporte válido para todos los viajeros
4. Los vuelos están sujetos a disponibilidad y cambios de tarifa
5. El cliente es responsable de obtener cualquier visa necesaria
6. Se recomienda contratar seguro de viaje
7. Esta cotización es válida por el tiempo especificado
8. Cualquier cambio después de la confirmación puede generar cargos adicionales
`.trim()
