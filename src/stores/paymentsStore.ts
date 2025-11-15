/**
 * Store de gestión de pagos y cobranza
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  Payment,
  PaymentFormData,
  PaymentFilters,
  PaymentStatus,
  PaymentPlanItem,
  AccountStatement,
} from '../types'

interface PaymentsStore {
  payments: Payment[]
  paymentPlans: PaymentPlanItem[]
  selectedPayment: Payment | null
  filters: PaymentFilters

  getPayments: (filters?: PaymentFilters) => Payment[]
  getPaymentById: (id: string) => Payment | undefined
  getPaymentsByEvent: (eventId: string) => Payment[]
  getPaymentsByClient: (clientId: string) => Payment[]
  createPayment: (data: PaymentFormData) => Payment
  updatePayment: (id: string, data: Partial<Payment>) => void
  deletePayment: (id: string) => void
  validatePayment: (id: string, userId: string, userName: string) => void

  // Plan de pagos
  createPaymentPlan: (plan: Omit<PaymentPlanItem, 'id' | 'createdAt' | 'updatedAt'>) => PaymentPlanItem
  updatePaymentPlanItem: (id: string, data: Partial<PaymentPlanItem>) => void
  deletePaymentPlanItem: (id: string) => void
  getPaymentPlanByEvent: (eventId: string) => PaymentPlanItem[]

  // Estados de cuenta
  getAccountStatement: (eventId: string, guestId?: string) => AccountStatement | null

  setFilters: (filters: PaymentFilters) => void
  clearFilters: () => void
  selectPayment: (payment: Payment | null) => void

  getStats: (eventId?: string) => {
    totalPayments: number
    totalAmount: number
    totalPending: number
    overdueCount: number
    overdueAmount: number
  }
}

let paymentCounter = 1

export const usePaymentsStore = create<PaymentsStore>()(
  persist(
    (set, get) => ({
      payments: [],
      paymentPlans: [],
      selectedPayment: null,
      filters: {},

      getPayments: (filters?: PaymentFilters) => {
        let payments = get().payments

        if (filters) {
          if (filters.eventId) {
            payments = payments.filter(p => p.eventId === filters.eventId)
          }
          if (filters.clientId) {
            payments = payments.filter(p => p.clientId === filters.clientId)
          }
          if (filters.guestId) {
            payments = payments.filter(p => p.guestId === filters.guestId)
          }
          if (filters.status && filters.status.length > 0) {
            payments = payments.filter(p => filters.status!.includes(p.status))
          }
          if (filters.method && filters.method.length > 0) {
            payments = payments.filter(p => filters.method!.includes(p.method))
          }
          if (filters.type && filters.type.length > 0) {
            payments = payments.filter(p => filters.type!.includes(p.type))
          }
          if (filters.dateFrom) {
            payments = payments.filter(p => p.paymentDate >= filters.dateFrom!)
          }
          if (filters.dateTo) {
            payments = payments.filter(p => p.paymentDate <= filters.dateTo!)
          }
          if (filters.amountMin) {
            payments = payments.filter(p => p.amount >= filters.amountMin!)
          }
          if (filters.amountMax) {
            payments = payments.filter(p => p.amount <= filters.amountMax!)
          }
          if (filters.isValidated !== undefined) {
            payments = payments.filter(p => p.isValidated === filters.isValidated)
          }
          if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            payments = payments.filter(p =>
              p.paymentNumber.toLowerCase().includes(searchLower) ||
              p.clientName.toLowerCase().includes(searchLower) ||
              p.reference?.toLowerCase().includes(searchLower)
            )
          }
        }

        return payments
      },

      getPaymentById: (id: string) => get().payments.find(p => p.id === id),

      getPaymentsByEvent: (eventId: string) => {
        return get().payments.filter(p => p.eventId === eventId)
      },

      getPaymentsByClient: (clientId: string) => {
        return get().payments.filter(p => p.clientId === clientId)
      },

      createPayment: (data: PaymentFormData) => {
        const year = new Date().getFullYear()
        const paymentNumber = `PAG-${year}-${String(paymentCounter++).padStart(4, '0')}`

        const newPayment: Payment = {
          id: 'payment-' + Date.now(),
          paymentNumber,
          eventId: data.eventId,
          eventName: '', // Se debe obtener del store de eventos
          clientId: data.clientId,
          clientName: '', // Se debe obtener del store de clientes
          guestId: data.guestId,
          guestName: data.guestId ? '' : undefined,
          type: data.type,
          method: data.method,
          amount: data.amount,
          currency: data.currency,
          status: PaymentStatus.COMPLETADO,
          paymentDate: data.paymentDate,
          reference: data.reference,
          transactionId: data.transactionId,
          bankName: data.bankName,
          notes: data.notes,
          isValidated: false,
          notificationSent: false,
          createdBy: 'current-user',
          createdByName: 'Usuario Actual',
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set(state => ({ payments: [...state.payments, newPayment] }))
        return newPayment
      },

      updatePayment: (id: string, data: Partial<Payment>) => {
        set(state => ({
          payments: state.payments.map(p =>
            p.id === id ? { ...p, ...data, updatedAt: new Date() } : p
          ),
        }))
      },

      deletePayment: (id: string) => {
        set(state => ({ payments: state.payments.filter(p => p.id !== id) }))
      },

      validatePayment: (id: string, userId: string, userName: string) => {
        set(state => ({
          payments: state.payments.map(p =>
            p.id === id
              ? {
                  ...p,
                  isValidated: true,
                  validatedBy: userId,
                  validatedByName: userName,
                  validatedAt: new Date(),
                  updatedAt: new Date(),
                }
              : p
          ),
        }))
      },

      createPaymentPlan: (planData) => {
        const newPlan: PaymentPlanItem = {
          ...planData,
          id: 'plan-' + Date.now(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set(state => ({ paymentPlans: [...state.paymentPlans, newPlan] }))
        return newPlan
      },

      updatePaymentPlanItem: (id: string, data: Partial<PaymentPlanItem>) => {
        set(state => ({
          paymentPlans: state.paymentPlans.map(p =>
            p.id === id ? { ...p, ...data, updatedAt: new Date() } : p
          ),
        }))
      },

      deletePaymentPlanItem: (id: string) => {
        set(state => ({ paymentPlans: state.paymentPlans.filter(p => p.id !== id) }))
      },

      getPaymentPlanByEvent: (eventId: string) => {
        return get().paymentPlans.filter(p => p.eventId === eventId)
      },

      getAccountStatement: (eventId: string, guestId?: string) => {
        const { payments, paymentPlans } = get()

        const relevantPayments = payments.filter(p =>
          p.eventId === eventId && (!guestId || p.guestId === guestId)
        )

        const relevantPlan = paymentPlans.filter(p =>
          p.eventId === eventId && (!guestId || p.guestId === guestId)
        )

        const totalAmount = relevantPlan.reduce((sum, p) => sum + p.amount, 0)
        const paidAmount = relevantPayments
          .filter(p => p.status === PaymentStatus.COMPLETADO)
          .reduce((sum, p) => sum + p.amount, 0)

        const now = new Date()
        const overduePlans = relevantPlan.filter(
          p => p.status === PaymentStatus.PENDIENTE && p.dueDate < now
        )

        return {
          eventId,
          eventName: '',
          guestId,
          guestName: guestId ? '' : undefined,
          totalAmount,
          paidAmount,
          pendingAmount: totalAmount - paidAmount,
          advancePayments: 0,
          paymentPlan: relevantPlan,
          payments: relevantPayments,
          isOverdue: overduePlans.length > 0,
          nextPaymentDue: relevantPlan.find(p => p.status === PaymentStatus.PENDIENTE)?.dueDate,
          nextPaymentAmount: relevantPlan.find(p => p.status === PaymentStatus.PENDIENTE)?.amount,
          generatedAt: new Date(),
          generatedBy: 'current-user',
        }
      },

      setFilters: (filters: PaymentFilters) => set({ filters }),
      clearFilters: () => set({ filters: {} }),
      selectPayment: (payment: Payment | null) => set({ selectedPayment: payment }),

      getStats: (eventId?: string) => {
        let payments = get().payments

        if (eventId) {
          payments = payments.filter(p => p.eventId === eventId)
        }

        const totalAmount = payments
          .filter(p => p.status === PaymentStatus.COMPLETADO)
          .reduce((sum, p) => sum + p.amount, 0)

        const pendingPlans = get().paymentPlans.filter(p =>
          (!eventId || p.eventId === eventId) &&
          p.status === PaymentStatus.PENDIENTE
        )

        const totalPending = pendingPlans.reduce((sum, p) => sum + p.pendingAmount, 0)

        const now = new Date()
        const overdue = pendingPlans.filter(p => p.dueDate < now)

        return {
          totalPayments: payments.length,
          totalAmount,
          totalPending,
          overdueCount: overdue.length,
          overdueAmount: overdue.reduce((sum, p) => sum + p.pendingAmount, 0),
        }
      },
    }),
    {
      name: 'the-planners-payments',
      partialize: (state) => ({
        payments: state.payments,
        paymentPlans: state.paymentPlans,
      }),
    }
  )
)
