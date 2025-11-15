/**
 * Tipos para sistema de cobranza y pagos
 */

export enum PaymentMethod {
  TRANSFERENCIA = 'transferencia',
  TARJETA_CREDITO = 'tarjeta_credito',
  TARJETA_DEBITO = 'tarjeta_debito',
  EFECTIVO = 'efectivo',
  CHEQUE = 'cheque',
  PAYPAL = 'paypal',
  STRIPE = 'stripe',
  MERCADO_PAGO = 'mercado_pago',
  OPEN_PAY = 'open_pay',
  BANORTE = 'banorte',
  OTRO = 'otro',
}

export enum PaymentStatus {
  PENDIENTE = 'pendiente',
  PROCESANDO = 'procesando',
  COMPLETADO = 'completado',
  RECHAZADO = 'rechazado',
  CANCELADO = 'cancelado',
  REEMBOLSADO = 'reembolsado',
  VENCIDO = 'vencido',
}

export enum PaymentType {
  ANTICIPO = 'anticipo',
  PARCIALIDAD = 'parcialidad',
  PAGO_FINAL = 'pago_final',
  PAGO_COMPLETO = 'pago_completo',
  REEMBOLSO = 'reembolso',
  AJUSTE = 'ajuste',
}

export interface PaymentPlanItem {
  id: string
  eventId: string
  guestId?: string // Si el pago es individual por invitado

  // Detalles del pago
  description: string
  dueDate: Date
  amount: number
  percentage: number // % del total

  // Status
  status: PaymentStatus
  paidAmount: number
  pendingAmount: number

  // Recordatorios
  reminderSent: boolean
  reminderSentAt?: Date

  // Metadata
  createdAt: Date
  updatedAt: Date
}

export interface Payment {
  id: string
  paymentNumber: string // Número de pago (ej: PAG-2024-001)

  // Relaciones
  eventId: string
  eventName: string
  clientId: string
  clientName: string
  guestId?: string // Si es un pago de invitado específico
  guestName?: string
  paymentPlanItemId?: string

  // Detalles del pago
  type: PaymentType
  method: PaymentMethod
  amount: number
  currency: string // MXN, USD, etc.

  // Status
  status: PaymentStatus

  // Fechas
  paymentDate: Date
  dueDate?: Date
  processedAt?: Date

  // Información bancaria/transacción
  reference?: string // Número de referencia bancaria
  transactionId?: string // ID de transacción de procesador (Stripe, PayPal, etc.)
  bankName?: string
  accountLast4?: string

  // Comprobante
  receiptUrl?: string
  invoiceUrl?: string

  // Notas
  notes?: string
  internalNotes?: string

  // Validación
  isValidated: boolean
  validatedBy?: string
  validatedByName?: string
  validatedAt?: Date

  // Notificación
  notificationSent: boolean
  notificationSentAt?: Date

  // Metadata
  createdBy: string
  createdByName: string
  createdAt: Date
  updatedAt: Date
}

export interface PaymentFormData {
  eventId: string
  clientId: string
  guestId?: string
  type: PaymentType
  method: PaymentMethod
  amount: number
  currency: string
  paymentDate: Date
  reference?: string
  transactionId?: string
  bankName?: string
  notes?: string
  receiptFile?: File
}

export interface AccountStatement {
  eventId: string
  eventName: string
  guestId?: string
  guestName?: string

  // Resumen financiero
  totalAmount: number
  paidAmount: number
  pendingAmount: number
  advancePayments: number

  // Pagos programados
  paymentPlan: PaymentPlanItem[]

  // Historial de pagos
  payments: Payment[]

  // Status general
  isOverdue: boolean
  nextPaymentDue?: Date
  nextPaymentAmount?: number

  // Generado
  generatedAt: Date
  generatedBy: string
}

export interface PaymentSummary {
  // Por evento
  eventId: string
  eventName: string

  // Totales
  totalRevenue: number
  totalCollected: number
  totalPending: number
  collectionPercentage: number

  // Breakdown por método
  byMethod: {
    method: PaymentMethod
    count: number
    total: number
  }[]

  // Status
  overduePayments: number
  overdueAmount: number
  upcomingPayments: number
  upcomingAmount: number

  // Tendencias
  paymentsThisMonth: number
  amountThisMonth: number
  paymentsLastMonth: number
  amountLastMonth: number
}

export interface PaymentFilters {
  eventId?: string
  clientId?: string
  guestId?: string
  status?: PaymentStatus[]
  method?: PaymentMethod[]
  type?: PaymentType[]
  dateFrom?: Date
  dateTo?: Date
  amountMin?: number
  amountMax?: number
  isValidated?: boolean
  search?: string
}

// Configuración de integraciones de pago
export interface PaymentIntegrationConfig {
  provider: 'paypal' | 'stripe' | 'mercadopago' | 'openpay' | 'banorte'
  isEnabled: boolean
  apiKey?: string
  secretKey?: string
  publicKey?: string
  merchantId?: string
  sandboxMode: boolean
  webhookUrl?: string
  supportedCurrencies: string[]
  fees: {
    percentage: number
    fixed: number
  }
}

export interface OnlinePaymentLink {
  id: string
  eventId: string
  guestId?: string
  amount: number
  description: string
  expiresAt: Date
  url: string
  token: string
  status: 'active' | 'used' | 'expired' | 'cancelled'
  paidAt?: Date
  paymentId?: string
  createdAt: Date
}
