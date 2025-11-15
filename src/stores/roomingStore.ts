/**
 * Store de gestión de Rooming List
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  RoomingList,
  RoomAssignment,
  Guest,
  RoomingListFilters,
  ConfirmationStatus,
  RoomType,
  GuestType,
} from '../types'

interface RoomingStore {
  roomingLists: RoomingList[]
  selectedRoomingList: RoomingList | null
  filters: RoomingListFilters

  getRoomingLists: (filters?: RoomingListFilters) => RoomingList[]
  getRoomingListById: (id: string) => RoomingList | undefined
  getRoomingListByEvent: (eventId: string) => RoomingList | undefined
  createRoomingList: (eventId: string, eventName: string, hotelName: string) => RoomingList
  updateRoomingList: (id: string, data: Partial<RoomingList>) => void
  deleteRoomingList: (id: string) => void

  // Gestión de invitados
  addGuest: (roomingListId: string, guest: Omit<Guest, 'id' | 'createdAt' | 'updatedAt'>) => Guest
  updateGuest: (guestId: string, data: Partial<Guest>) => void
  deleteGuest: (guestId: string) => void
  getGuestsByEvent: (eventId: string) => Guest[]
  assignGuestToRoom: (guestId: string, roomAssignmentId: string) => void
  unassignGuestFromRoom: (guestId: string) => void

  // Gestión de habitaciones
  addRoomAssignment: (roomingListId: string, room: Omit<RoomAssignment, 'id' | 'createdAt' | 'updatedAt'>) => RoomAssignment
  updateRoomAssignment: (roomId: string, data: Partial<RoomAssignment>) => void
  deleteRoomAssignment: (roomId: string) => void
  getRoomsByEvent: (eventId: string) => RoomAssignment[]

  // Importación/Exportación
  importGuestsFromCSV: (roomingListId: string, data: any[]) => void
  generateRoomingListReport: (roomingListId: string, format: 'mexico' | 'standard' | 'detailed') => any

  setFilters: (filters: RoomingListFilters) => void
  clearFilters: () => void
  selectRoomingList: (roomingList: RoomingList | null) => void

  getStats: (roomingListId: string) => {
    totalGuests: number
    confirmedGuests: number
    pendingGuests: number
    totalRooms: number
    confirmedRooms: number
    occupancyRate: number
  }
}

export const useRoomingStore = create<RoomingStore>()(
  persist(
    (set, get) => ({
      roomingLists: [],
      selectedRoomingList: null,
      filters: {},

      getRoomingLists: (filters?: RoomingListFilters) => {
        let lists = get().roomingLists

        if (filters) {
          if (filters.eventId) {
            lists = lists.filter(l => l.eventId === filters.eventId)
          }
          if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            lists = lists.filter(l =>
              l.eventName.toLowerCase().includes(searchLower) ||
              l.hotelName.toLowerCase().includes(searchLower)
            )
          }
        }

        return lists
      },

      getRoomingListById: (id: string) => get().roomingLists.find(l => l.id === id),

      getRoomingListByEvent: (eventId: string) => {
        return get().roomingLists.find(l => l.eventId === eventId && l.isCurrentVersion)
      },

      createRoomingList: (eventId: string, eventName: string, hotelName: string) => {
        const newList: RoomingList = {
          id: 'rooming-' + Date.now(),
          eventId,
          eventName,
          hotelName,
          roomAssignments: [],
          guests: [],
          totalGuests: 0,
          confirmedGuests: 0,
          pendingGuests: 0,
          summary: [],
          version: 1,
          isCurrentVersion: true,
          createdBy: 'current-user',
          createdByName: 'Usuario Actual',
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set(state => ({ roomingLists: [...state.roomingLists, newList] }))
        return newList
      },

      updateRoomingList: (id: string, data: Partial<RoomingList>) => {
        set(state => ({
          roomingLists: state.roomingLists.map(l =>
            l.id === id ? { ...l, ...data, updatedAt: new Date() } : l
          ),
        }))
      },

      deleteRoomingList: (id: string) => {
        set(state => ({ roomingLists: state.roomingLists.filter(l => l.id !== id) }))
      },

      addGuest: (roomingListId: string, guestData) => {
        const newGuest: Guest = {
          ...guestData,
          id: 'guest-' + Date.now(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set(state => ({
          roomingLists: state.roomingLists.map(l => {
            if (l.id === roomingListId) {
              const updatedGuests = [...l.guests, newGuest]
              return {
                ...l,
                guests: updatedGuests,
                totalGuests: updatedGuests.length,
                confirmedGuests: updatedGuests.filter(g => g.confirmationStatus === ConfirmationStatus.CONFIRMADO).length,
                pendingGuests: updatedGuests.filter(g => g.confirmationStatus === ConfirmationStatus.PENDIENTE).length,
                updatedAt: new Date(),
              }
            }
            return l
          }),
        }))

        return newGuest
      },

      updateGuest: (guestId: string, data: Partial<Guest>) => {
        set(state => ({
          roomingLists: state.roomingLists.map(l => ({
            ...l,
            guests: l.guests.map(g =>
              g.id === guestId ? { ...g, ...data, updatedAt: new Date() } : g
            ),
            updatedAt: new Date(),
          })),
        }))
      },

      deleteGuest: (guestId: string) => {
        set(state => ({
          roomingLists: state.roomingLists.map(l => ({
            ...l,
            guests: l.guests.filter(g => g.id !== guestId),
            updatedAt: new Date(),
          })),
        }))
      },

      getGuestsByEvent: (eventId: string) => {
        const list = get().roomingLists.find(l => l.eventId === eventId && l.isCurrentVersion)
        return list?.guests ?? []
      },

      assignGuestToRoom: (guestId: string, roomAssignmentId: string) => {
        set(state => ({
          roomingLists: state.roomingLists.map(l => ({
            ...l,
            guests: l.guests.map(g =>
              g.id === guestId
                ? { ...g, roomAssignmentId, updatedAt: new Date() }
                : g
            ),
            updatedAt: new Date(),
          })),
        }))
      },

      unassignGuestFromRoom: (guestId: string) => {
        set(state => ({
          roomingLists: state.roomingLists.map(l => ({
            ...l,
            guests: l.guests.map(g =>
              g.id === guestId
                ? { ...g, roomAssignmentId: undefined, updatedAt: new Date() }
                : g
            ),
            updatedAt: new Date(),
          })),
        }))
      },

      addRoomAssignment: (roomingListId: string, roomData) => {
        const newRoom: RoomAssignment = {
          ...roomData,
          id: 'room-' + Date.now(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set(state => ({
          roomingLists: state.roomingLists.map(l =>
            l.id === roomingListId
              ? {
                  ...l,
                  roomAssignments: [...l.roomAssignments, newRoom],
                  updatedAt: new Date(),
                }
              : l
          ),
        }))

        return newRoom
      },

      updateRoomAssignment: (roomId: string, data: Partial<RoomAssignment>) => {
        set(state => ({
          roomingLists: state.roomingLists.map(l => ({
            ...l,
            roomAssignments: l.roomAssignments.map(r =>
              r.id === roomId ? { ...r, ...data, updatedAt: new Date() } : r
            ),
            updatedAt: new Date(),
          })),
        }))
      },

      deleteRoomAssignment: (roomId: string) => {
        set(state => ({
          roomingLists: state.roomingLists.map(l => ({
            ...l,
            roomAssignments: l.roomAssignments.filter(r => r.id !== roomId),
            updatedAt: new Date(),
          })),
        }))
      },

      getRoomsByEvent: (eventId: string) => {
        const list = get().roomingLists.find(l => l.eventId === eventId && l.isCurrentVersion)
        return list?.roomAssignments ?? []
      },

      importGuestsFromCSV: (roomingListId: string, data: any[]) => {
        // Implementación simplificada - en producción parsear CSV correctamente
        const newGuests: Guest[] = data.map((row, index) => ({
          id: 'guest-import-' + Date.now() + '-' + index,
          eventId: '',
          firstName: row.firstName || '',
          lastName: row.lastName || '',
          email: row.email || '',
          phone: row.phone,
          guestType: GuestType.INVITADO,
          isPlusOne: false,
          confirmationStatus: ConfirmationStatus.PENDIENTE,
          totalDue: 0,
          amountPaid: 0,
          pendingAmount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))

        set(state => ({
          roomingLists: state.roomingLists.map(l =>
            l.id === roomingListId
              ? {
                  ...l,
                  guests: [...l.guests, ...newGuests],
                  totalGuests: l.guests.length + newGuests.length,
                  updatedAt: new Date(),
                }
              : l
          ),
        }))
      },

      generateRoomingListReport: (roomingListId: string, format: 'mexico' | 'standard' | 'detailed') => {
        const list = get().roomingLists.find(l => l.id === roomingListId)
        if (!list) return null

        // Implementación simplificada - en producción generar PDF/Excel real
        return {
          format,
          eventName: list.eventName,
          hotelName: list.hotelName,
          totalGuests: list.totalGuests,
          totalRooms: list.roomAssignments.length,
          rooms: list.roomAssignments.map(room => ({
            roomType: room.roomType,
            guests: room.occupants.map(o => `${o.firstName} ${o.lastName}`).join(', '),
            checkIn: room.checkIn,
            checkOut: room.checkOut,
            status: room.confirmationStatus,
          })),
        }
      },

      setFilters: (filters: RoomingListFilters) => set({ filters }),
      clearFilters: () => set({ filters: {} }),
      selectRoomingList: (roomingList: RoomingList | null) => set({ selectedRoomingList: roomingList }),

      getStats: (roomingListId: string) => {
        const list = get().roomingLists.find(l => l.id === roomingListId)
        if (!list) {
          return {
            totalGuests: 0,
            confirmedGuests: 0,
            pendingGuests: 0,
            totalRooms: 0,
            confirmedRooms: 0,
            occupancyRate: 0,
          }
        }

        const confirmedRooms = list.roomAssignments.filter(
          r => r.confirmationStatus === ConfirmationStatus.CONFIRMADO
        ).length

        return {
          totalGuests: list.totalGuests,
          confirmedGuests: list.confirmedGuests,
          pendingGuests: list.pendingGuests,
          totalRooms: list.roomAssignments.length,
          confirmedRooms,
          occupancyRate: list.roomAssignments.length > 0
            ? (confirmedRooms / list.roomAssignments.length) * 100
            : 0,
        }
      },
    }),
    {
      name: 'the-planners-rooming',
      partialize: (state) => ({ roomingLists: state.roomingLists }),
    }
  )
)
