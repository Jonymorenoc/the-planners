/**
 * Tipos para sistema de reportes y análisis
 */

export enum ReportType {
  ROOMING_LIST = 'rooming_list',
  OCCUPANCY = 'occupancy',
  SALES = 'sales',
  PAYMENTS = 'payments',
  FINANCIAL = 'financial',
  COORDINATOR_PERFORMANCE = 'coordinator_performance',
  PROVIDER_SPENDING = 'provider_spending',
  CONVERSION = 'conversion',
  CUSTOM = 'custom',
}

export enum ReportPeriod {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
  CUSTOM = 'custom',
}

export enum ExportFormat {
  PDF = 'pdf',
  EXCEL = 'excel',
  CSV = 'csv',
  JSON = 'json',
}

// Dashboard Metrics
export interface DashboardMetrics {
  // Eventos
  totalEvents: number
  upcomingEvents: number
  ongoingEvents: number
  completedEvents: number

  // Clientes
  totalClients: number
  activeClients: number
  leads: number
  conversionRate: number

  // Financiero
  totalRevenue: number
  collectedAmount: number
  pendingAmount: number
  monthlyRevenue: number
  projectedRevenue: number

  // Cotizaciones
  totalQuotes: number
  acceptedQuotes: number
  pendingQuotes: number
  quoteConversionRate: number

  // Invitados
  totalGuests: number
  confirmedGuests: number
  pendingConfirmations: number

  // Comparaciones (vs mes anterior)
  revenueGrowth: number // %
  eventsGrowth: number // %
  clientsGrowth: number // %

  // Período
  periodStart: Date
  periodEnd: Date
}

// Reporte de Ocupación
export interface OccupancyReport {
  eventId: string
  eventName: string
  hotelName: string

  // Habitaciones
  totalRoomsBlocked: number
  totalRoomsConfirmed: number
  totalRoomsPending: number
  occupancyRate: number // %

  // Por tipo de habitación
  byRoomType: {
    roomType: string
    blocked: number
    confirmed: number
    pending: number
    rate: number
  }[]

  // Invitados
  totalGuests: number
  confirmedGuests: number
  pendingGuests: number

  // Fechas
  checkInDate: Date
  checkOutDate: Date

  // Generado
  generatedAt: Date
}

// Reporte de Ventas
export interface SalesReport {
  // Período
  periodStart: Date
  periodEnd: Date

  // Cotizaciones
  totalQuotes: number
  quotesAccepted: number
  quotesRejected: number
  quotesPending: number
  conversionRate: number

  // Valor de cotizaciones
  totalQuotedValue: number
  acceptedQuotedValue: number
  averageQuoteValue: number

  // Por coordinador/vendedor
  byCoordinator: {
    userId: string
    userName: string
    totalQuotes: number
    acceptedQuotes: number
    conversionRate: number
    totalValue: number
  }[]

  // Pipeline
  pipeline: {
    stage: string
    count: number
    value: number
  }[]

  // Tendencias
  dailySales: {
    date: Date
    quotes: number
    accepted: number
    value: number
  }[]
}

// Reporte Financiero
export interface FinancialReport {
  eventId?: string
  eventName?: string

  // Período
  periodStart: Date
  periodEnd: Date

  // Ingresos
  totalRevenue: number
  collectedRevenue: number
  pendingRevenue: number
  collectionRate: number

  // Gastos
  totalExpenses: number
  paidExpenses: number
  pendingExpenses: number

  // Rentabilidad
  grossProfit: number
  profitMargin: number

  // Breakdown de ingresos
  revenueByCategory: {
    category: string
    amount: number
    percentage: number
  }[]

  // Breakdown de gastos
  expensesByCategory: {
    category: string
    amount: number
    percentage: number
  }[]

  // Por evento (si es reporte general)
  byEvent?: {
    eventId: string
    eventName: string
    revenue: number
    expenses: number
    profit: number
    margin: number
  }[]

  // Flujo de efectivo
  cashFlow: {
    date: Date
    income: number
    expenses: number
    balance: number
  }[]
}

// Reporte de Pagos
export interface PaymentsReport {
  // Período
  periodStart: Date
  periodEnd: Date

  // Totales
  totalPayments: number
  totalAmount: number
  averagePaymentAmount: number

  // Por método
  byMethod: {
    method: string
    count: number
    amount: number
    percentage: number
  }[]

  // Por status
  byStatus: {
    status: string
    count: number
    amount: number
  }[]

  // Pagos vencidos
  overduePayments: number
  overdueAmount: number

  // Próximos pagos
  upcomingPayments: {
    dueDate: Date
    count: number
    amount: number
  }[]

  // Por evento
  byEvent: {
    eventId: string
    eventName: string
    totalDue: number
    collected: number
    pending: number
    collectionRate: number
  }[]

  // Tendencia
  paymentTrend: {
    date: Date
    count: number
    amount: number
  }[]
}

// Reporte de Desempeño de Coordinador
export interface CoordinatorPerformanceReport {
  userId: string
  userName: string

  // Período
  periodStart: Date
  periodEnd: Date

  // Eventos
  totalEvents: number
  completedEvents: number
  ongoingEvents: number
  upcomingEvents: number

  // Clientes
  totalClients: number
  newClients: number
  clientSatisfaction: number // promedio de ratings

  // Ventas
  totalQuotes: number
  acceptedQuotes: number
  conversionRate: number
  totalSalesValue: number

  // Pagos
  collectedAmount: number
  pendingAmount: number
  collectionRate: number

  // Eficiencia
  averageResponseTime: number // horas
  tasksCompleted: number
  tasksOnTime: number
  onTimeRate: number

  // Comparación con equipo
  teamAverageConversion: number
  teamAverageRevenue: number
  ranking: number // posición en el equipo
}

// Reporte de Proveedores
export interface ProviderSpendingReport {
  // Período
  periodStart: Date
  periodEnd: Date

  // Totales
  totalProviders: number
  activeProviders: number
  totalSpending: number
  paidSpending: number
  pendingSpending: number

  // Por categoría
  byCategory: {
    category: string
    providers: number
    spending: number
    percentage: number
  }[]

  // Top proveedores
  topProviders: {
    providerId: string
    providerName: string
    category: string
    totalSpending: number
    events: number
    rating: number
  }[]

  // Por evento
  byEvent: {
    eventId: string
    eventName: string
    providers: number
    totalCost: number
  }[]

  // Pagos pendientes
  pendingPayments: {
    providerId: string
    providerName: string
    amount: number
    dueDate: Date
    isOverdue: boolean
  }[]
}

// Reporte de Conversión
export interface ConversionReport {
  // Período
  periodStart: Date
  periodEnd: Date

  // Funnel
  leads: number
  contacted: number
  quoted: number
  negotiating: number
  closed: number

  // Tasas de conversión
  leadToContact: number // %
  contactToQuote: number // %
  quoteToClose: number // %
  overallConversion: number // %

  // Tiempo promedio
  averageTimeToQuote: number // días
  averageTimeToClose: number // días
  averageSalesCycle: number // días

  // Por fuente
  bySource: {
    source: string
    leads: number
    closed: number
    conversion: number
    revenue: number
  }[]

  // Razones de rechazo
  rejectionReasons: {
    reason: string
    count: number
    percentage: number
  }[]
}

// Configuración de reporte personalizado
export interface CustomReport {
  id: string
  name: string
  description: string
  type: ReportType
  filters: {
    dateFrom?: Date
    dateTo?: Date
    eventIds?: string[]
    clientIds?: string[]
    coordinatorIds?: string[]
    categories?: string[]
    [key: string]: any
  }
  columns: string[]
  sortBy?: string
  sortOrder: 'asc' | 'desc'
  groupBy?: string
  createdBy: string
  createdAt: Date
  isFavorite: boolean
}

// Reporte generado
export interface GeneratedReport {
  id: string
  reportType: ReportType
  customReportId?: string
  name: string
  period: ReportPeriod
  periodStart: Date
  periodEnd: Date
  data: any // El tipo específico depende del reportType
  generatedBy: string
  generatedByName: string
  generatedAt: Date
  expiresAt?: Date
}

export interface ReportFilters {
  type?: ReportType[]
  period?: ReportPeriod
  dateFrom?: Date
  dateTo?: Date
  eventId?: string
  coordinatorId?: string
  search?: string
}
