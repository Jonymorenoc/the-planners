import { useState } from 'react'
import { useEventsStore } from '@/stores'
import { EventStatus } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Search, Calendar, MapPin, Users } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const statusColors: Record<EventStatus, string> = {
  [EventStatus.PLANEANDO]: 'bg-yellow-100 text-yellow-800',
  [EventStatus.CONFIRMADO]: 'bg-green-100 text-green-800',
  [EventStatus.EN_PROGRESO]: 'bg-blue-100 text-blue-800',
  [EventStatus.COMPLETADO]: 'bg-purple-100 text-purple-800',
  [EventStatus.CANCELADO]: 'bg-red-100 text-red-800',
}

export default function EventsPage() {
  const { events, getEvents, getStats } = useEventsStore()
  const [searchQuery, setSearchQuery] = useState('')
  const stats = getStats()

  const filteredEvents = getEvents({ search: searchQuery })

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
          Gestión de Eventos
        </h1>
        <p className="text-gray-600">Administra todas tus bodas destino</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Eventos</div>
          <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Próximos</div>
          <div className="text-3xl font-bold text-blue-600">{stats.upcoming}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Este Mes</div>
          <div className="text-3xl font-bold text-green-600">{stats.thisMonth}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Ingresos</div>
          <div className="text-3xl font-bold text-purple-600">
            ${(stats.totalRevenue / 1000).toFixed(0)}K
          </div>
        </Card>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar eventos..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Evento
          </Button>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evento</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Invitados</TableHead>
                <TableHead>Presupuesto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                    No hay eventos registrados
                  </TableCell>
                </TableRow>
              ) : (
                filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div className="font-medium text-gray-900">{event.eventName}</div>
                      <div className="text-sm text-gray-500">{event.clientName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        {format(new Date(event.weddingDate), 'dd MMM yyyy', { locale: es })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        {event.venue.name}
                      </div>
                      <div className="text-xs text-gray-500">{event.venue.city}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="h-3 w-3 text-gray-400" />
                        {event.confirmedGuests}/{event.estimatedGuests}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">${event.estimatedBudget.toLocaleString('es-MX')}</div>
                      <div className="text-xs text-gray-500">Saldo: ${event.balance.toLocaleString('es-MX')}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[event.status]}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Ver Detalles</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
