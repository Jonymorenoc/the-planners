/**
 * Store de gestión de proveedores
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  Provider,
  ProviderFormData,
  ProviderFilters,
  ProviderExpense,
  ProviderContract,
  ProviderStatus,
} from '../types'

interface ProvidersStore {
  providers: Provider[]
  expenses: ProviderExpense[]
  selectedProvider: Provider | null
  filters: ProviderFilters

  getProviders: (filters?: ProviderFilters) => Provider[]
  getProviderById: (id: string) => Provider | undefined
  createProvider: (data: ProviderFormData) => Provider
  updateProvider: (id: string, data: Partial<Provider>) => void
  deleteProvider: (id: string) => void

  // Contratos
  addContract: (providerId: string, contract: Omit<ProviderContract, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateContract: (contractId: string, data: Partial<ProviderContract>) => void
  deleteContract: (contractId: string) => void
  getContractsByProvider: (providerId: string) => ProviderContract[]

  // Gastos
  createExpense: (expense: Omit<ProviderExpense, 'id' | 'createdAt' | 'updatedAt'>) => ProviderExpense
  updateExpense: (id: string, data: Partial<ProviderExpense>) => void
  deleteExpense: (id: string) => void
  getExpensesByProvider: (providerId: string) => ProviderExpense[]
  getExpensesByEvent: (eventId: string) => ProviderExpense[]

  // Calificaciones
  addRating: (providerId: string, rating: Provider['ratings'][0]) => void

  setFilters: (filters: ProviderFilters) => void
  clearFilters: () => void
  selectProvider: (provider: Provider | null) => void

  getStats: () => {
    total: number
    active: number
    totalSpending: number
    pendingPayments: number
  }
}

export const useProvidersStore = create<ProvidersStore>()(
  persist(
    (set, get) => ({
      providers: [],
      expenses: [],
      selectedProvider: null,
      filters: {},

      getProviders: (filters?: ProviderFilters) => {
        let providers = get().providers

        if (filters) {
          if (filters.status && filters.status.length > 0) {
            providers = providers.filter(p => filters.status!.includes(p.status))
          }
          if (filters.categories && filters.categories.length > 0) {
            providers = providers.filter(p =>
              p.categories.some(c => filters.categories!.includes(c))
            )
          }
          if (filters.city) {
            providers = providers.filter(p => p.city?.toLowerCase().includes(filters.city!.toLowerCase()))
          }
          if (filters.state) {
            providers = providers.filter(p => p.state?.toLowerCase().includes(filters.state!.toLowerCase()))
          }
          if (filters.ratingMin) {
            providers = providers.filter(p => p.averageRating >= filters.ratingMin!)
          }
          if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            providers = providers.filter(p =>
              p.businessName.toLowerCase().includes(searchLower) ||
              p.contactName.toLowerCase().includes(searchLower) ||
              p.email.toLowerCase().includes(searchLower)
            )
          }
          if (filters.tags && filters.tags.length > 0) {
            providers = providers.filter(p =>
              filters.tags!.some(tag => p.tags.includes(tag))
            )
          }
        }

        return providers
      },

      getProviderById: (id: string) => get().providers.find(p => p.id === id),

      createProvider: (data: ProviderFormData) => {
        const newProvider: Provider = {
          id: 'provider-' + Date.now(),
          ...data,
          ratings: [],
          averageRating: 0,
          totalReviews: 0,
          contracts: [],
          totalEvents: 0,
          totalRevenue: 0,
          documents: [],
          createdBy: 'current-user',
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set(state => ({ providers: [...state.providers, newProvider] }))
        return newProvider
      },

      updateProvider: (id: string, data: Partial<Provider>) => {
        set(state => ({
          providers: state.providers.map(p =>
            p.id === id ? { ...p, ...data, updatedAt: new Date() } : p
          ),
        }))
      },

      deleteProvider: (id: string) => {
        set(state => ({ providers: state.providers.filter(p => p.id !== id) }))
      },

      addContract: (providerId: string, contractData) => {
        const newContract: ProviderContract = {
          ...contractData,
          id: 'contract-' + Date.now(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set(state => ({
          providers: state.providers.map(p =>
            p.id === providerId
              ? {
                  ...p,
                  contracts: [...p.contracts, newContract],
                  updatedAt: new Date(),
                }
              : p
          ),
        }))
      },

      updateContract: (contractId: string, data: Partial<ProviderContract>) => {
        set(state => ({
          providers: state.providers.map(p => ({
            ...p,
            contracts: p.contracts.map(c =>
              c.id === contractId ? { ...c, ...data, updatedAt: new Date() } : c
            ),
            updatedAt: new Date(),
          })),
        }))
      },

      deleteContract: (contractId: string) => {
        set(state => ({
          providers: state.providers.map(p => ({
            ...p,
            contracts: p.contracts.filter(c => c.id !== contractId),
          })),
        }))
      },

      getContractsByProvider: (providerId: string) => {
        const provider = get().providers.find(p => p.id === providerId)
        return provider?.contracts ?? []
      },

      createExpense: (expenseData) => {
        const newExpense: ProviderExpense = {
          ...expenseData,
          id: 'expense-' + Date.now(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set(state => ({ expenses: [...state.expenses, newExpense] }))
        return newExpense
      },

      updateExpense: (id: string, data: Partial<ProviderExpense>) => {
        set(state => ({
          expenses: state.expenses.map(e =>
            e.id === id ? { ...e, ...data, updatedAt: new Date() } : e
          ),
        }))
      },

      deleteExpense: (id: string) => {
        set(state => ({ expenses: state.expenses.filter(e => e.id !== id) }))
      },

      getExpensesByProvider: (providerId: string) => {
        return get().expenses.filter(e => e.providerId === providerId)
      },

      getExpensesByEvent: (eventId: string) => {
        return get().expenses.filter(e => e.eventId === eventId)
      },

      addRating: (providerId: string, rating) => {
        set(state => ({
          providers: state.providers.map(p => {
            if (p.id === providerId) {
              const newRatings = [...p.ratings, rating]
              const totalRating = newRatings.reduce((sum, r) => sum + r.rating, 0)
              const averageRating = totalRating / newRatings.length

              return {
                ...p,
                ratings: newRatings,
                averageRating,
                totalReviews: newRatings.length,
                updatedAt: new Date(),
              }
            }
            return p
          }),
        }))
      },

      setFilters: (filters: ProviderFilters) => set({ filters }),
      clearFilters: () => set({ filters: {} }),
      selectProvider: (provider: Provider | null) => set({ selectedProvider: provider }),

      getStats: () => {
        const { providers, expenses } = get()

        const active = providers.filter(p => p.status === ProviderStatus.ACTIVO).length

        const totalSpending = expenses.reduce((sum, e) => sum + e.amount, 0)
        const pendingPayments = expenses
          .filter(e => !e.isPaid)
          .reduce((sum, e) => sum + (e.amount - e.paidAmount), 0)

        return {
          total: providers.length,
          active,
          totalSpending,
          pendingPayments,
        }
      },
    }),
    {
      name: 'the-planners-providers',
      partialize: (state) => ({
        providers: state.providers,
        expenses: state.expenses,
      }),
    }
  )
)
