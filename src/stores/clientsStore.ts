/**
 * Store de gestión de clientes/novios
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Client, ClientFormData, ClientFilters, ClientStatus, CommunicationLog } from '../types'

interface ClientsStore {
  // Estado
  clients: Client[]
  selectedClient: Client | null
  filters: ClientFilters

  // Acciones CRUD
  getClients: (filters?: ClientFilters) => Client[]
  getClientById: (id: string) => Client | undefined
  createClient: (data: ClientFormData) => Client
  updateClient: (id: string, data: Partial<Client>) => void
  deleteClient: (id: string) => void

  // Acciones de comunicación
  addCommunication: (clientId: string, communication: Omit<CommunicationLog, 'id' | 'clientId' | 'createdAt'>) => void
  getCommunicationHistory: (clientId: string) => CommunicationLog[]

  // Acciones de documentos
  addDocument: (clientId: string, document: Omit<Client['documents'][0], 'id' | 'uploadedAt'>) => void
  removeDocument: (clientId: string, documentId: string) => void

  // Filtros
  setFilters: (filters: ClientFilters) => void
  clearFilters: () => void

  // Selección
  selectClient: (client: Client | null) => void

  // Estadísticas
  getStats: () => {
    total: number
    byStatus: Record<ClientStatus, number>
    totalBudget: number
    averageBudget: number
  }
}

// Datos mock de ejemplo
const mockClients: Client[] = [
  {
    id: 'client-1',
    contacts: [
      {
        firstName: 'María',
        lastName: 'González',
        email: 'maria@example.com',
        phone: '+52 555 111 2222',
        isPrimary: true,
      },
      {
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        phone: '+52 555 333 4444',
        isPrimary: false,
      },
    ],
    status: ClientStatus.CLIENTE_ACTIVO,
    assignedTo: 'admin-1',
    assignedToName: 'Administrador Principal',
    weddingDate: new Date('2025-06-15'),
    venue: 'Hotel Xcaret, Riviera Maya',
    estimatedBudget: 450000,
    preferences: {
      budget: 450000,
      estimatedGuests: 80,
      preferredDestinations: ['Riviera Maya', 'Los Cabos'],
      weddingStyle: ['Playa', 'Elegante'],
      seasonPreference: ['Verano'],
      notes: 'Prefieren ceremonia al atardecer',
    },
    documents: [],
    communicationHistory: [
      {
        id: 'comm-1',
        clientId: 'client-1',
        userId: 'admin-1',
        userName: 'Administrador Principal',
        type: 'email',
        subject: 'Bienvenida',
        content: 'Gracias por contactarnos. Adjunto cotización inicial.',
        createdAt: new Date('2024-10-15'),
      },
    ],
    source: 'Instagram',
    tags: ['premium', 'destino'],
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date(),
    createdBy: 'admin-1',
  },
  {
    id: 'client-2',
    contacts: [
      {
        firstName: 'Ana',
        lastName: 'Martínez',
        email: 'ana@example.com',
        phone: '+52 555 555 6666',
        isPrimary: true,
      },
    ],
    status: ClientStatus.PROSPECTO,
    estimatedBudget: 300000,
    preferences: {
      budget: 300000,
      estimatedGuests: 50,
      preferredDestinations: ['Cancún'],
      weddingStyle: ['Playa'],
      seasonPreference: ['Invierno'],
      notes: '',
    },
    documents: [],
    communicationHistory: [],
    source: 'Referencia',
    tags: [],
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date(),
    createdBy: 'admin-1',
  },
]

export const useClientsStore = create<ClientsStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      clients: mockClients,
      selectedClient: null,
      filters: {},

      // Obtener clientes (con filtros opcionales)
      getClients: (filters?: ClientFilters) => {
        let clients = get().clients

        if (filters) {
          // Aplicar filtros
          if (filters.status && filters.status.length > 0) {
            clients = clients.filter(c => filters.status!.includes(c.status))
          }

          if (filters.assignedTo && filters.assignedTo.length > 0) {
            clients = clients.filter(c => c.assignedTo && filters.assignedTo!.includes(c.assignedTo))
          }

          if (filters.dateFrom) {
            clients = clients.filter(c => c.weddingDate && c.weddingDate >= filters.dateFrom!)
          }

          if (filters.dateTo) {
            clients = clients.filter(c => c.weddingDate && c.weddingDate <= filters.dateTo!)
          }

          if (filters.budgetMin) {
            clients = clients.filter(c => c.estimatedBudget >= filters.budgetMin!)
          }

          if (filters.budgetMax) {
            clients = clients.filter(c => c.estimatedBudget <= filters.budgetMax!)
          }

          if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            clients = clients.filter(c =>
              c.contacts.some(contact =>
                contact.firstName.toLowerCase().includes(searchLower) ||
                contact.lastName.toLowerCase().includes(searchLower) ||
                contact.email.toLowerCase().includes(searchLower)
              ) ||
              c.venue?.toLowerCase().includes(searchLower)
            )
          }

          if (filters.tags && filters.tags.length > 0) {
            clients = clients.filter(c =>
              filters.tags!.some(tag => c.tags.includes(tag))
            )
          }
        }

        return clients
      },

      // Obtener cliente por ID
      getClientById: (id: string) => {
        return get().clients.find(c => c.id === id)
      },

      // Crear cliente
      createClient: (data: ClientFormData) => {
        const newClient: Client = {
          id: 'client-' + Date.now(),
          ...data,
          documents: [],
          communicationHistory: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'current-user', // En producción, obtener del authStore
        }

        set(state => ({
          clients: [...state.clients, newClient],
        }))

        return newClient
      },

      // Actualizar cliente
      updateClient: (id: string, data: Partial<Client>) => {
        set(state => ({
          clients: state.clients.map(c =>
            c.id === id
              ? { ...c, ...data, updatedAt: new Date() }
              : c
          ),
        }))
      },

      // Eliminar cliente
      deleteClient: (id: string) => {
        set(state => ({
          clients: state.clients.filter(c => c.id !== id),
        }))
      },

      // Agregar comunicación
      addCommunication: (clientId: string, communication) => {
        const newComm: CommunicationLog = {
          ...communication,
          id: 'comm-' + Date.now(),
          clientId,
          createdAt: new Date(),
        }

        set(state => ({
          clients: state.clients.map(c =>
            c.id === clientId
              ? {
                  ...c,
                  communicationHistory: [...c.communicationHistory, newComm],
                  updatedAt: new Date(),
                }
              : c
          ),
        }))
      },

      // Obtener historial de comunicación
      getCommunicationHistory: (clientId: string) => {
        const client = get().clients.find(c => c.id === clientId)
        return client?.communicationHistory ?? []
      },

      // Agregar documento
      addDocument: (clientId: string, document) => {
        const newDoc = {
          ...document,
          id: 'doc-' + Date.now(),
          uploadedAt: new Date(),
        }

        set(state => ({
          clients: state.clients.map(c =>
            c.id === clientId
              ? {
                  ...c,
                  documents: [...c.documents, newDoc],
                  updatedAt: new Date(),
                }
              : c
          ),
        }))
      },

      // Eliminar documento
      removeDocument: (clientId: string, documentId: string) => {
        set(state => ({
          clients: state.clients.map(c =>
            c.id === clientId
              ? {
                  ...c,
                  documents: c.documents.filter(d => d.id !== documentId),
                  updatedAt: new Date(),
                }
              : c
          ),
        }))
      },

      // Establecer filtros
      setFilters: (filters: ClientFilters) => {
        set({ filters })
      },

      // Limpiar filtros
      clearFilters: () => {
        set({ filters: {} })
      },

      // Seleccionar cliente
      selectClient: (client: Client | null) => {
        set({ selectedClient: client })
      },

      // Obtener estadísticas
      getStats: () => {
        const { clients } = get()

        const byStatus = clients.reduce((acc, client) => {
          acc[client.status] = (acc[client.status] || 0) + 1
          return acc
        }, {} as Record<ClientStatus, number>)

        const totalBudget = clients.reduce((sum, c) => sum + c.estimatedBudget, 0)

        return {
          total: clients.length,
          byStatus,
          totalBudget,
          averageBudget: clients.length > 0 ? totalBudget / clients.length : 0,
        }
      },
    }),
    {
      name: 'the-planners-clients',
      partialize: (state) => ({
        clients: state.clients,
      }),
    }
  )
)
