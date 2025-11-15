/**
 * Store de gestión de cotizaciones
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Quote, QuoteFormData, QuoteFilters, QuoteStatus } from '../types'

interface QuotesStore {
  quotes: Quote[]
  selectedQuote: Quote | null
  filters: QuoteFilters

  getQuotes: (filters?: QuoteFilters) => Quote[]
  getQuoteById: (id: string) => Quote | undefined
  getQuotesByClient: (clientId: string) => Quote[]
  createQuote: (data: QuoteFormData) => Quote
  updateQuote: (id: string, data: Partial<Quote>) => void
  deleteQuote: (id: string) => void
  duplicateQuote: (id: string) => Quote
  sendQuote: (id: string) => void
  acceptQuote: (id: string) => void
  rejectQuote: (id: string, reason: string) => void
  setFilters: (filters: QuoteFilters) => void
  clearFilters: () => void
  selectQuote: (quote: Quote | null) => void
  getStats: () => {
    total: number
    byStatus: Record<QuoteStatus, number>
    totalValue: number
    conversionRate: number
  }
}

let quoteCounter = 1

export const useQuotesStore = create<QuotesStore>()(
  persist(
    (set, get) => ({
      quotes: [],
      selectedQuote: null,
      filters: {},

      getQuotes: (filters?: QuoteFilters) => {
        let quotes = get().quotes

        if (filters) {
          if (filters.status && filters.status.length > 0) {
            quotes = quotes.filter(q => filters.status!.includes(q.status))
          }
          if (filters.clientId) {
            quotes = quotes.filter(q => q.clientId === filters.clientId)
          }
          if (filters.createdBy) {
            quotes = quotes.filter(q => q.createdBy === filters.createdBy)
          }
          if (filters.dateFrom) {
            quotes = quotes.filter(q => q.createdAt >= filters.dateFrom!)
          }
          if (filters.dateTo) {
            quotes = quotes.filter(q => q.createdAt <= filters.dateTo!)
          }
          if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            quotes = quotes.filter(q =>
              q.title.toLowerCase().includes(searchLower) ||
              q.clientName.toLowerCase().includes(searchLower) ||
              q.quoteNumber.toLowerCase().includes(searchLower)
            )
          }
        }

        return quotes
      },

      getQuoteById: (id: string) => get().quotes.find(q => q.id === id),

      getQuotesByClient: (clientId: string) => {
        return get().quotes.filter(q => q.clientId === clientId)
      },

      createQuote: (data: QuoteFormData) => {
        const year = new Date().getFullYear()
        const quoteNumber = `COT-${year}-${String(quoteCounter++).padStart(3, '0')}`

        const subtotal =
          data.services.reduce((sum, s) => sum + s.totalPrice, 0) +
          data.accommodations.reduce((sum, a) => sum + a.totalPrice, 0) +
          data.flights.reduce((sum, f) => sum + f.totalPrice, 0)

        const discountAmount = data.discountPercentage > 0
          ? subtotal * (data.discountPercentage / 100)
          : data.discount

        const afterDiscount = subtotal - discountAmount
        const taxes = afterDiscount * (data.taxPercentage / 100)
        const total = afterDiscount + taxes

        const newQuote: Quote = {
          id: 'quote-' + Date.now(),
          quoteNumber,
          ...data,
          status: QuoteStatus.BORRADOR,
          subtotal,
          discount: discountAmount,
          taxes,
          total,
          version: 1,
          suggestedPaymentPlan: [
            { dueDate: new Date(), amount: total * 0.5, percentage: 50, description: 'Anticipo (50%)' },
            { dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), amount: total * 0.25, percentage: 25, description: 'Segundo pago (25%)' },
            { dueDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), amount: total * 0.25, percentage: 25, description: 'Pago final (25%)' },
          ],
          createdBy: 'current-user',
          createdByName: 'Usuario Actual',
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set(state => ({ quotes: [...state.quotes, newQuote] }))
        return newQuote
      },

      updateQuote: (id: string, data: Partial<Quote>) => {
        set(state => ({
          quotes: state.quotes.map(q =>
            q.id === id ? { ...q, ...data, updatedAt: new Date() } : q
          ),
        }))
      },

      deleteQuote: (id: string) => {
        set(state => ({ quotes: state.quotes.filter(q => q.id !== id) }))
      },

      duplicateQuote: (id: string) => {
        const original = get().quotes.find(q => q.id === id)
        if (!original) throw new Error('Quote not found')

        const year = new Date().getFullYear()
        const quoteNumber = `COT-${year}-${String(quoteCounter++).padStart(3, '0')}`

        const duplicate: Quote = {
          ...original,
          id: 'quote-' + Date.now(),
          quoteNumber,
          status: QuoteStatus.BORRADOR,
          version: 1,
          previousVersionId: undefined,
          sentAt: undefined,
          viewedAt: undefined,
          respondedAt: undefined,
          acceptedAt: undefined,
          rejectedAt: undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set(state => ({ quotes: [...state.quotes, duplicate] }))
        return duplicate
      },

      sendQuote: (id: string) => {
        set(state => ({
          quotes: state.quotes.map(q =>
            q.id === id
              ? { ...q, status: QuoteStatus.ENVIADA, sentAt: new Date(), updatedAt: new Date() }
              : q
          ),
        }))
      },

      acceptQuote: (id: string) => {
        set(state => ({
          quotes: state.quotes.map(q =>
            q.id === id
              ? { ...q, status: QuoteStatus.ACEPTADA, acceptedAt: new Date(), updatedAt: new Date() }
              : q
          ),
        }))
      },

      rejectQuote: (id: string, reason: string) => {
        set(state => ({
          quotes: state.quotes.map(q =>
            q.id === id
              ? {
                  ...q,
                  status: QuoteStatus.RECHAZADA,
                  rejectedAt: new Date(),
                  rejectionReason: reason,
                  updatedAt: new Date(),
                }
              : q
          ),
        }))
      },

      setFilters: (filters: QuoteFilters) => set({ filters }),
      clearFilters: () => set({ filters: {} }),
      selectQuote: (quote: Quote | null) => set({ selectedQuote: quote }),

      getStats: () => {
        const { quotes } = get()

        const byStatus = quotes.reduce((acc, quote) => {
          acc[quote.status] = (acc[quote.status] || 0) + 1
          return acc
        }, {} as Record<QuoteStatus, number>)

        const totalValue = quotes.reduce((sum, q) => sum + q.total, 0)
        const accepted = byStatus[QuoteStatus.ACEPTADA] || 0
        const conversionRate = quotes.length > 0 ? (accepted / quotes.length) * 100 : 0

        return {
          total: quotes.length,
          byStatus,
          totalValue,
          conversionRate,
        }
      },
    }),
    {
      name: 'the-planners-quotes',
      partialize: (state) => ({ quotes: state.quotes }),
    }
  )
)
