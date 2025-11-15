/**
 * Store de gestión de eventos/bodas
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  WeddingEvent,
  EventFormData,
  EventFilters,
  EventStatus,
  EventType,
  EventTask,
  EventTimeline,
  EventItinerary,
  DEFAULT_TIMELINE_TEMPLATE,
} from '../types'

interface EventsStore {
  // Estado
  events: WeddingEvent[]
  selectedEvent: WeddingEvent | null
  filters: EventFilters

  // Acciones CRUD
  getEvents: (filters?: EventFilters) => WeddingEvent[]
  getEventById: (id: string) => WeddingEvent | undefined
  createEvent: (data: EventFormData) => WeddingEvent
  updateEvent: (id: string, data: Partial<WeddingEvent>) => void
  deleteEvent: (id: string) => void

  // Timeline
  addTimelineItem: (eventId: string, item: Omit<EventTimeline, 'id'>) => void
  updateTimelineItem: (eventId: string, itemId: string, data: Partial<EventTimeline>) => void
  deleteTimelineItem: (eventId: string, itemId: string) => void
  toggleTimelineComplete: (eventId: string, itemId: string, userId: string, userName: string) => void

  // Tareas
  addTask: (task: Omit<EventTask, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTask: (taskId: string, data: Partial<EventTask>) => void
  deleteTask: (taskId: string) => void
  getTasksByEvent: (eventId: string) => EventTask[]
  getTasksByUser: (userId: string) => EventTask[]

  // Itinerario
  addItineraryItem: (eventId: string, item: Omit<EventItinerary, 'id'>) => void
  updateItineraryItem: (eventId: string, itemId: string, data: Partial<EventItinerary>) => void
  deleteItineraryItem: (eventId: string, itemId: string) => void

  // Notas internas
  addInternalNote: (eventId: string, content: string, userId: string, userName: string, mentions?: string[]) => void

  // Filtros
  setFilters: (filters: EventFilters) => void
  clearFilters: () => void

  // Selección
  selectEvent: (event: WeddingEvent | null) => void

  // Estadísticas
  getStats: () => {
    total: number
    byStatus: Record<EventStatus, number>
    upcoming: number
    thisMonth: number
    totalBudget: number
    totalRevenue: number
  }
}

// Mock data de ejemplo
const mockEvents: WeddingEvent[] = [
  {
    id: 'event-1',
    clientId: 'client-1',
    clientName: 'María González & Juan Pérez',
    eventName: 'Boda González-Pérez',
    eventType: EventType.BODA_DESTINO,
    status: EventStatus.CONFIRMADO,
    weddingDate: new Date('2025-06-15'),
    startDate: new Date('2025-06-13'),
    endDate: new Date('2025-06-17'),
    venue: {
      name: 'Hotel Xcaret',
      type: 'resort',
      address: 'Carretera Chetumal-Puerto Juárez Km 282',
      city: 'Playa del Carmen',
      state: 'Quintana Roo',
      country: 'México',
      capacity: 150,
      contactName: 'Carlos López',
      contactEmail: 'eventos@hotelxcaret.com',
      contactPhone: '+52 984 123 4567',
    },
    estimatedBudget: 450000,
    actualCost: 380000,
    balance: 70000,
    estimatedGuests: 80,
    confirmedGuests: 65,
    coordinators: [
      {
        userId: 'admin-1',
        userName: 'Administrador Principal',
        role: 'principal',
        assignedAt: new Date('2024-10-15'),
      },
    ],
    timeline: DEFAULT_TIMELINE_TEMPLATE.map((item, index) => ({
      ...item,
      id: `timeline-${index + 1}`,
    })),
    tasks: [],
    itinerary: [
      {
        id: 'itinerary-1',
        eventId: 'event-1',
        date: new Date('2025-06-15'),
        startTime: '17:00',
        endTime: '18:00',
        title: 'Ceremonia',
        description: 'Ceremonia en la playa',
        location: 'Playa Principal - Hotel Xcaret',
        type: 'ceremony',
        attendees: 'all',
      },
      {
        id: 'itinerary-2',
        eventId: 'event-1',
        date: new Date('2025-06-15'),
        startTime: '19:00',
        endTime: '23:00',
        title: 'Recepción',
        description: 'Cena y baile',
        location: 'Salón Jardín - Hotel Xcaret',
        type: 'reception',
        attendees: 'all',
      },
    ],
    internalNotes: [],
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date(),
    createdBy: 'admin-1',
  },
]

export const useEventsStore = create<EventsStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      events: mockEvents,
      selectedEvent: null,
      filters: {},

      // Obtener eventos (con filtros opcionales)
      getEvents: (filters?: EventFilters) => {
        let events = get().events

        if (filters) {
          if (filters.status && filters.status.length > 0) {
            events = events.filter(e => filters.status!.includes(e.status))
          }

          if (filters.eventType && filters.eventType.length > 0) {
            events = events.filter(e => filters.eventType!.includes(e.eventType))
          }

          if (filters.coordinatorId && filters.coordinatorId.length > 0) {
            events = events.filter(e =>
              e.coordinators.some(c => filters.coordinatorId!.includes(c.userId))
            )
          }

          if (filters.dateFrom) {
            events = events.filter(e => e.weddingDate >= filters.dateFrom!)
          }

          if (filters.dateTo) {
            events = events.filter(e => e.weddingDate <= filters.dateTo!)
          }

          if (filters.venue) {
            const venueLower = filters.venue.toLowerCase()
            events = events.filter(e => e.venue.name.toLowerCase().includes(venueLower))
          }

          if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            events = events.filter(e =>
              e.eventName.toLowerCase().includes(searchLower) ||
              e.clientName.toLowerCase().includes(searchLower) ||
              e.venue.name.toLowerCase().includes(searchLower)
            )
          }
        }

        return events
      },

      // Obtener evento por ID
      getEventById: (id: string) => {
        return get().events.find(e => e.id === id)
      },

      // Crear evento
      createEvent: (data: EventFormData) => {
        const newEvent: WeddingEvent = {
          id: 'event-' + Date.now(),
          ...data,
          actualCost: 0,
          balance: data.estimatedBudget,
          confirmedGuests: 0,
          timeline: DEFAULT_TIMELINE_TEMPLATE.map((item, index) => ({
            ...item,
            id: `timeline-${Date.now()}-${index}`,
          })),
          tasks: [],
          itinerary: [],
          internalNotes: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'current-user', // En producción, obtener del authStore
        }

        set(state => ({
          events: [...state.events, newEvent],
        }))

        return newEvent
      },

      // Actualizar evento
      updateEvent: (id: string, data: Partial<WeddingEvent>) => {
        set(state => ({
          events: state.events.map(e =>
            e.id === id
              ? { ...e, ...data, updatedAt: new Date() }
              : e
          ),
        }))
      },

      // Eliminar evento
      deleteEvent: (id: string) => {
        set(state => ({
          events: state.events.filter(e => e.id !== id),
        }))
      },

      // Agregar item al timeline
      addTimelineItem: (eventId: string, item) => {
        const newItem: EventTimeline = {
          ...item,
          id: 'timeline-' + Date.now(),
        }

        set(state => ({
          events: state.events.map(e =>
            e.id === eventId
              ? {
                  ...e,
                  timeline: [...e.timeline, newItem],
                  updatedAt: new Date(),
                }
              : e
          ),
        }))
      },

      // Actualizar item del timeline
      updateTimelineItem: (eventId: string, itemId: string, data) => {
        set(state => ({
          events: state.events.map(e =>
            e.id === eventId
              ? {
                  ...e,
                  timeline: e.timeline.map(item =>
                    item.id === itemId ? { ...item, ...data } : item
                  ),
                  updatedAt: new Date(),
                }
              : e
          ),
        }))
      },

      // Eliminar item del timeline
      deleteTimelineItem: (eventId: string, itemId: string) => {
        set(state => ({
          events: state.events.map(e =>
            e.id === eventId
              ? {
                  ...e,
                  timeline: e.timeline.filter(item => item.id !== itemId),
                  updatedAt: new Date(),
                }
              : e
          ),
        }))
      },

      // Toggle completado del timeline
      toggleTimelineComplete: (eventId: string, itemId: string, userId: string, userName: string) => {
        set(state => ({
          events: state.events.map(e =>
            e.id === eventId
              ? {
                  ...e,
                  timeline: e.timeline.map(item =>
                    item.id === itemId
                      ? {
                          ...item,
                          completed: !item.completed,
                          completedAt: !item.completed ? new Date() : undefined,
                          completedBy: !item.completed ? userName : undefined,
                        }
                      : item
                  ),
                  updatedAt: new Date(),
                }
              : e
          ),
        }))
      },

      // Agregar tarea
      addTask: (task) => {
        const newTask: EventTask = {
          ...task,
          id: 'task-' + Date.now(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set(state => ({
          events: state.events.map(e =>
            e.id === task.eventId
              ? {
                  ...e,
                  tasks: [...e.tasks, newTask],
                  updatedAt: new Date(),
                }
              : e
          ),
        }))
      },

      // Actualizar tarea
      updateTask: (taskId: string, data) => {
        set(state => ({
          events: state.events.map(e => ({
            ...e,
            tasks: e.tasks.map(task =>
              task.id === taskId
                ? { ...task, ...data, updatedAt: new Date() }
                : task
            ),
          })),
        }))
      },

      // Eliminar tarea
      deleteTask: (taskId: string) => {
        set(state => ({
          events: state.events.map(e => ({
            ...e,
            tasks: e.tasks.filter(task => task.id !== taskId),
          })),
        }))
      },

      // Obtener tareas por evento
      getTasksByEvent: (eventId: string) => {
        const event = get().events.find(e => e.id === eventId)
        return event?.tasks ?? []
      },

      // Obtener tareas por usuario
      getTasksByUser: (userId: string) => {
        const allTasks: EventTask[] = []
        get().events.forEach(event => {
          event.tasks.forEach(task => {
            if (task.assignedTo === userId) {
              allTasks.push(task)
            }
          })
        })
        return allTasks
      },

      // Agregar item al itinerario
      addItineraryItem: (eventId: string, item) => {
        const newItem: EventItinerary = {
          ...item,
          id: 'itinerary-' + Date.now(),
        }

        set(state => ({
          events: state.events.map(e =>
            e.id === eventId
              ? {
                  ...e,
                  itinerary: [...e.itinerary, newItem],
                  updatedAt: new Date(),
                }
              : e
          ),
        }))
      },

      // Actualizar item del itinerario
      updateItineraryItem: (eventId: string, itemId: string, data) => {
        set(state => ({
          events: state.events.map(e =>
            e.id === eventId
              ? {
                  ...e,
                  itinerary: e.itinerary.map(item =>
                    item.id === itemId ? { ...item, ...data } : item
                  ),
                  updatedAt: new Date(),
                }
              : e
          ),
        }))
      },

      // Eliminar item del itinerario
      deleteItineraryItem: (eventId: string, itemId: string) => {
        set(state => ({
          events: state.events.map(e =>
            e.id === eventId
              ? {
                  ...e,
                  itinerary: e.itinerary.filter(item => item.id !== itemId),
                  updatedAt: new Date(),
                }
              : e
          ),
        }))
      },

      // Agregar nota interna
      addInternalNote: (eventId: string, content: string, userId: string, userName: string, mentions?: string[]) => {
        const newNote = {
          id: 'note-' + Date.now(),
          content,
          createdBy: userId,
          createdByName: userName,
          createdAt: new Date(),
          mentions,
        }

        set(state => ({
          events: state.events.map(e =>
            e.id === eventId
              ? {
                  ...e,
                  internalNotes: [...e.internalNotes, newNote],
                  updatedAt: new Date(),
                }
              : e
          ),
        }))
      },

      // Establecer filtros
      setFilters: (filters: EventFilters) => {
        set({ filters })
      },

      // Limpiar filtros
      clearFilters: () => {
        set({ filters: {} })
      },

      // Seleccionar evento
      selectEvent: (event: WeddingEvent | null) => {
        set({ selectedEvent: event })
      },

      // Obtener estadísticas
      getStats: () => {
        const { events } = get()
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

        const byStatus = events.reduce((acc, event) => {
          acc[event.status] = (acc[event.status] || 0) + 1
          return acc
        }, {} as Record<EventStatus, number>)

        const upcoming = events.filter(e => e.weddingDate > now).length
        const thisMonth = events.filter(
          e => e.weddingDate >= startOfMonth && e.weddingDate <= endOfMonth
        ).length

        const totalBudget = events.reduce((sum, e) => sum + e.estimatedBudget, 0)
        const totalRevenue = events.reduce((sum, e) => sum + (e.estimatedBudget - e.balance), 0)

        return {
          total: events.length,
          byStatus,
          upcoming,
          thisMonth,
          totalBudget,
          totalRevenue,
        }
      },
    }),
    {
      name: 'the-planners-events',
      partialize: (state) => ({
        events: state.events,
      }),
    }
  )
)
