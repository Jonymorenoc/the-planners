import { useQuotesStore } from '@/stores'
import { QuoteStatus } from '@/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const statusColors: Record<QuoteStatus, string> = {
  [QuoteStatus.BORRADOR]: 'bg-gray-100 text-gray-800',
  [QuoteStatus.ENVIADA]: 'bg-blue-100 text-blue-800',
  [QuoteStatus.REVISADA]: 'bg-yellow-100 text-yellow-800',
  [QuoteStatus.NEGOCIACION]: 'bg-orange-100 text-orange-800',
  [QuoteStatus.ACEPTADA]: 'bg-green-100 text-green-800',
  [QuoteStatus.RECHAZADA]: 'bg-red-100 text-red-800',
  [QuoteStatus.EXPIRADA]: 'bg-gray-100 text-gray-600',
}

export default function QuotesPage() {
  const { quotes, getQuotes, getStats } = useQuotesStore()
  const stats = getStats()

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Cotizaciones</h1>
        <p className="text-gray-600">Gestiona cotizaciones y propuestas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Total</div>
          <div className="text-3xl font-bold">{stats.total}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Aceptadas</div>
          <div className="text-3xl font-bold text-green-600">
            {stats.byStatus[QuoteStatus.ACEPTADA] || 0}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Conversión</div>
          <div className="text-3xl font-bold text-blue-600">{stats.conversionRate.toFixed(0)}%</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Valor Total</div>
          <div className="text-3xl font-bold text-purple-600">
            ${(stats.totalValue / 1000).toFixed(0)}K
          </div>
        </Card>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex justify-end">
          <Button className="bg-primary">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Cotización
          </Button>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No. Cotización</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No hay cotizaciones registradas</p>
                  </TableCell>
                </TableRow>
              ) : (
                quotes.map(quote => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-mono text-sm">{quote.quoteNumber}</TableCell>
                    <TableCell>{quote.clientName}</TableCell>
                    <TableCell>{quote.title}</TableCell>
                    <TableCell className="text-sm">
                      {format(new Date(quote.createdAt), 'dd MMM yyyy', { locale: es })}
                    </TableCell>
                    <TableCell className="font-medium">${quote.total.toLocaleString('es-MX')}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded ${statusColors[quote.status]}`}>
                        {quote.status}
                      </span>
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
