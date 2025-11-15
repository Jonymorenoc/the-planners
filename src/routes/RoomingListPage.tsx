import { useState } from 'react'
import { useRoomingStore, useEventsStore } from '@/stores'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Download, Upload, Plus, FileSpreadsheet, FileText } from 'lucide-react'

export default function RoomingListPage() {
  const { roomingLists, getRoomingLists, getStats } = useRoomingStore()
  const { events } = useEventsStore()
  const [selectedEventId, setSelectedEventId] = useState<string>('')

  const selectedList = selectedEventId
    ? roomingLists.find(l => l.eventId === selectedEventId && l.isCurrentVersion)
    : null

  const stats = selectedList ? getStats(selectedList.id) : null

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
          Rooming List
        </h1>
        <p className="text-gray-600">
          Gestiona las habitaciones y asignaciones de invitados
        </p>
      </div>

      {/* Event Selector */}
      <Card className="p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Evento
            </label>
            <Select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full"
            >
              <option value="">-- Selecciona un evento --</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.eventName} - {new Date(event.weddingDate).toLocaleDateString('es-MX')}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importar Excel
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button className="bg-primary">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Lista
            </Button>
          </div>
        </div>
      </Card>

      {selectedList ? (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="text-sm font-medium text-gray-600 mb-1">Total Invitados</div>
              <div className="text-3xl font-bold text-gray-900">{stats?.totalGuests || 0}</div>
            </Card>
            <Card className="p-6">
              <div className="text-sm font-medium text-gray-600 mb-1">Confirmados</div>
              <div className="text-3xl font-bold text-green-600">{stats?.confirmedGuests || 0}</div>
            </Card>
            <Card className="p-6">
              <div className="text-sm font-medium text-gray-600 mb-1">Total Habitaciones</div>
              <div className="text-3xl font-bold text-blue-600">{stats?.totalRooms || 0}</div>
            </Card>
            <Card className="p-6">
              <div className="text-sm font-medium text-gray-600 mb-1">Ocupación</div>
              <div className="text-3xl font-bold text-purple-600">
                {stats?.occupancyRate.toFixed(0) || 0}%
              </div>
            </Card>
          </div>

          {/* Guests Table */}
          <Card className="mb-6">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Invitados</h3>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Habitación</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedList.guests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                        No hay invitados registrados para este evento
                      </TableCell>
                    </TableRow>
                  ) : (
                    selectedList.guests.map(guest => (
                      <TableRow key={guest.id}>
                        <TableCell className="font-medium">
                          {guest.firstName} {guest.lastName}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{guest.email}</TableCell>
                        <TableCell className="text-sm text-gray-600">{guest.phone || '-'}</TableCell>
                        <TableCell className="text-sm">
                          {guest.roomAssignmentId ? 'Asignada' : 'Sin asignar'}
                        </TableCell>
                        <TableCell className="text-sm">-</TableCell>
                        <TableCell className="text-sm">-</TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded ${
                            guest.confirmationStatus === 'confirmado'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {guest.confirmationStatus}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Export Options */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exportar Rooming List</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Formato México (Operadores)
              </Button>
              <Button variant="outline">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Excel Detallado
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                PDF Resumen
              </Button>
            </div>
          </Card>
        </>
      ) : (
        <Card className="p-12">
          <div className="text-center text-gray-500">
            <div className="mb-4">
              <FileSpreadsheet className="h-16 w-16 mx-auto text-gray-300" />
            </div>
            <p className="text-lg font-medium">Selecciona un evento para ver su Rooming List</p>
            <p className="text-sm mt-2">
              Aquí podrás gestionar habitaciones y asignaciones de invitados
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
