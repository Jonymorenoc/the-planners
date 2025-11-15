/**
 * Tipos para Rooming List (Lista de Habitaciones)
 */

export enum RoomType {
  SENCILLA = 'sencilla',
  DOBLE = 'doble',
  DOBLE_CAMAS = 'doble_camas', // Dos camas
  TRIPLE = 'triple',
  CUADRUPLE = 'cuadruple',
  SUITE = 'suite',
  SUITE_JUNIOR = 'suite_junior',
  SUITE_PRESIDENCIAL = 'suite_presidencial',
  VILLA = 'villa',
}

export enum GuestType {
  NOVIO = 'novio',
  NOVIA = 'novia',
  PADRINO = 'padrino',
  MADRINA = 'madrina',
  FAMILIA_NOVIO = 'familia_novio',
  FAMILIA_NOVIA = 'familia_novia',
  AMIGO = 'amigo',
  INVITADO = 'invitado',
}

export enum ConfirmationStatus {
  PENDIENTE = 'pendiente',
  CONFIRMADO = 'confirmado',
  CANCELADO = 'cancelado',
  NO_ASISTIRA = 'no_asistira',
}

export interface RoomOccupant {
  guestId: string
  firstName: string
  lastName: string
  age?: number
  specialRequests?: string
}

export interface RoomAssignment {
  id: string
  eventId: string
  roomNumber?: string // Número de habitación asignado por el hotel
  roomType: RoomType
  occupants: RoomOccupant[]
  maxOccupancy: number

  // Fechas
  checkIn: Date
  checkOut: Date
  nights: number

  // Precio
  pricePerNight: number
  totalPrice: number
  mealPlan?: string

  // Status
  confirmationStatus: ConfirmationStatus
  confirmationNumber?: string
  confirmedAt?: Date

  // Pagos
  isPaid: boolean
  paidAmount: number
  pendingAmount: number

  // Notas
  specialRequests?: string[]
  internalNotes?: string

  // Metadata
  createdAt: Date
  updatedAt: Date
}

export interface Guest {
  id: string
  eventId: string

  // Información personal
  firstName: string
  lastName: string
  email: string
  phone?: string
  age?: number
  gender?: 'M' | 'F' | 'Otro'

  // Tipo de invitado
  guestType: GuestType
  isPlusOne: boolean
  invitedBy?: string // ID del invitado que lo invitó (para +1)

  // Asignación de habitación
  roomAssignmentId?: string

  // Vuelo
  flightDetails?: {
    arrivalFlight?: string
    arrivalDate?: Date
    arrivalTime?: string
    departureFlight?: string
    departureDate?: Date
    departureTime?: string
    requiresTransport: boolean
  }

  // Confirmación
  confirmationStatus: ConfirmationStatus
  confirmedAt?: Date
  rsvpDate?: Date

  // Pagos
  totalDue: number
  amountPaid: number
  pendingAmount: number
  paymentPlan?: {
    dueDate: Date
    amount: number
    status: 'pending' | 'paid' | 'overdue'
  }[]

  // Preferencias
  dietaryRestrictions?: string[]
  allergies?: string[]
  specialRequests?: string[]
  notes?: string

  // Portal
  portalToken?: string // Token único para acceder al portal
  lastPortalAccess?: Date

  // Metadata
  createdAt: Date
  updatedAt: Date
}

export interface RoomingList {
  id: string
  eventId: string
  eventName: string

  // Hotel
  hotelName: string
  hotelContactName?: string
  hotelContactEmail?: string
  hotelContactPhone?: string

  // Habitaciones
  roomAssignments: RoomAssignment[]

  // Invitados
  guests: Guest[]
  totalGuests: number
  confirmedGuests: number
  pendingGuests: number

  // Resumen de habitaciones
  summary: {
    roomType: RoomType
    quantity: number
    totalOccupants: number
    confirmedRooms: number
    pendingRooms: number
  }[]

  // Versiones
  version: number
  isCurrentVersion: boolean

  // Metadata
  createdBy: string
  createdByName: string
  createdAt: Date
  updatedAt: Date
  notes?: string
}

export interface RoomingListExportFormat {
  // Formatos de exportación
  MEXICO_STANDARD: 'mexico_standard'
  EXCEL_DETAILED: 'excel_detailed'
  PDF_SUMMARY: 'pdf_summary'
  HOTEL_SPECIFIC: 'hotel_specific'
}

export interface RoomingListFilters {
  eventId?: string
  confirmationStatus?: ConfirmationStatus[]
  roomType?: RoomType[]
  guestType?: GuestType[]
  isPaid?: boolean
  search?: string
}

// Estructura para importación desde Excel
export interface RoomingListImportRow {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  roomType: string
  checkIn: string | Date
  checkOut: string | Date
  specialRequests?: string
}

// Template para Rooming List México (operadores hoteleros)
export interface MexicoRoomingListFormat {
  eventName: string
  hotelName: string
  checkInDate: Date
  checkOutDate: Date
  totalRooms: number
  totalGuests: number
  rooms: {
    roomNumber?: string
    roomType: string
    guestName: string
    checkIn: Date
    checkOut: Date
    nights: number
    rate: number
    total: number
    confirmationNumber?: string
  }[]
}
