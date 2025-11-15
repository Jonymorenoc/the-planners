import { useState } from 'react'
import { usePaymentsStore, useEventsStore } from '@/stores'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, DollarSign, AlertCircle, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function PaymentsPage() {
  const { payments, getPayments, getStats } = usePaymentsStore()
  const { events } = useEventsStore()
  const [selectedEventId, setSelectedEventId] = useState<string>('')

  const filteredPayments = selectedEventId
    ? getPayments({ eventId: selectedEventId })
    : getPayments()

  const stats = getStats(selectedEventId || undefined)

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
          Gestión de Pagos
        </h1>
        <p className="text-gray-600">Control total de cobranza y pagos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Cobrado</div>
          <div className="text-3xl font-bold text-green-600">
            ${(stats.totalAmount / 1000).toFixed(0)}K
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Por Cobrar</div>
          <div className="text-3xl font-bold text-blue-600">
            ${(stats.totalPending / 1000).toFixed(0)}K
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Pagos Vencidos</div>
          <div className="text-3xl font-bold text-red-600">{stats.overdueCount}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Pagos</div>
          <div className="text-3xl font-bold text-gray-900">{stats.totalPayments}</div>
        </Card>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <Select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full"
            >
              <option value="">Todos los eventos</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.eventName}
                </option>
              ))}
            </Select>
          </div>
          <Button className="bg-primary">
            <Plus className="h-4 w-4 mr-2" />
            Registrar Pago
          </Button>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No. Pago</TableHead>
                <TableHead>Evento</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                    No hay pagos registrados
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map(payment => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-mono text-sm">{payment.paymentNumber}</TableCell>
                    <TableCell className="text-sm">{payment.eventName}</TableCell>
                    <TableCell className="text-sm">{payment.clientName}</TableCell>
                    <TableCell className="text-sm">
                      {format(new Date(payment.paymentDate), 'dd MMM yyyy', { locale: es })}
                    </TableCell>
                    <TableCell className="text-sm capitalize">{payment.method.replace('_', ' ')}</TableCell>
                    <TableCell className="font-medium">
                      ${payment.amount.toLocaleString('es-MX')}
                    </TableCell>
                    <TableCell>
                      {payment.isValidated ? (
                        <span className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle className="h-3 w-3" />
                          Validado
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-yellow-600">
                          <AlertCircle className="h-3 w-3" />
                          Pendiente
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Ver</Button>
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
