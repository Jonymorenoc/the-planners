import { useState } from 'react'
import { useClientsStore } from '@/stores'
import { ClientStatus } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Search, Filter, Mail, Phone, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const statusColors: Record<ClientStatus, string> = {
  [ClientStatus.LEAD]: 'bg-gray-100 text-gray-800',
  [ClientStatus.PROSPECTO]: 'bg-blue-100 text-blue-800',
  [ClientStatus.CLIENTE_ACTIVO]: 'bg-green-100 text-green-800',
  [ClientStatus.COMPLETADO]: 'bg-purple-100 text-purple-800',
  [ClientStatus.CANCELADO]: 'bg-red-100 text-red-800',
}

const statusLabels: Record<ClientStatus, string> = {
  [ClientStatus.LEAD]: 'Lead',
  [ClientStatus.PROSPECTO]: 'Prospecto',
  [ClientStatus.CLIENTE_ACTIVO]: 'Cliente Activo',
  [ClientStatus.COMPLETADO]: 'Completado',
  [ClientStatus.CANCELADO]: 'Cancelado',
}

export default function ClientsPage() {
  const { clients, getClients, getStats } = useClientsStore()
  const [searchQuery, setSearchQuery] = useState('')
  const stats = getStats()

  // Filtrar clientes por búsqueda
  const filteredClients = getClients({
    search: searchQuery,
  })

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
          Gestión de Clientes
        </h1>
        <p className="text-gray-600">
          Administra tus clientes y novios en un solo lugar
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Clientes</div>
          <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Clientes Activos</div>
          <div className="text-3xl font-bold text-green-600">
            {stats.byStatus[ClientStatus.CLIENTE_ACTIVO] || 0}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Prospectos</div>
          <div className="text-3xl font-bold text-blue-600">
            {stats.byStatus[ClientStatus.PROSPECTO] || 0}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Presupuesto Total</div>
          <div className="text-3xl font-bold text-purple-600">
            ${(stats.totalBudget / 1000).toFixed(0)}K
          </div>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar por nombre, email o venue..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Cliente
            </Button>
          </div>
        </div>
      </Card>

      {/* Clients Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Fecha de Boda</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Presupuesto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                    {searchQuery
                      ? 'No se encontraron clientes con ese criterio'
                      : 'No hay clientes registrados. ¡Crea tu primer cliente!'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((client) => {
                  const primaryContact = client.contacts.find(c => c.isPrimary) || client.contacts[0]

                  return (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div className="font-medium text-gray-900">
                          {client.contacts.map(c => `${c.firstName} ${c.lastName}`).join(' & ')}
                        </div>
                        {client.tags.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {client.tags.map(tag => (
                              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Mail className="h-3 w-3" />
                            {primaryContact?.email}
                          </div>
                          {primaryContact?.phone && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <Phone className="h-3 w-3" />
                              {primaryContact.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {client.weddingDate ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            {format(new Date(client.weddingDate), 'dd MMM yyyy', { locale: es })}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Sin fecha</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {client.venue || '-'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium text-gray-900">
                          ${client.estimatedBudget.toLocaleString('es-MX')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[client.status]}>
                          {statusLabels[client.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Ver Detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
