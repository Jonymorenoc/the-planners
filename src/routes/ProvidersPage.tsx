import { useProvidersStore } from '@/stores'
import { ProviderStatus } from '@/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Star } from 'lucide-react'

export default function ProvidersPage() {
  const { providers, getProviders, getStats } = useProvidersStore()
  const stats = getStats()

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Proveedores</h1>
        <p className="text-gray-600">Gestiona tu red de proveedores</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Total</div>
          <div className="text-3xl font-bold">{stats.total}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Activos</div>
          <div className="text-3xl font-bold text-green-600">{stats.active}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Gastado</div>
          <div className="text-3xl font-bold text-blue-600">
            ${(stats.totalSpending / 1000).toFixed(0)}K
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Por Pagar</div>
          <div className="text-3xl font-bold text-red-600">
            ${(stats.pendingPayments / 1000).toFixed(0)}K
          </div>
        </Card>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex justify-end">
          <Button className="bg-primary">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Proveedor
          </Button>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proveedor</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Calificación</TableHead>
                <TableHead>Eventos</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                    No hay proveedores registrados
                  </TableCell>
                </TableRow>
              ) : (
                providers.map(provider => (
                  <TableRow key={provider.id}>
                    <TableCell className="font-medium">{provider.businessName}</TableCell>
                    <TableCell className="text-sm">{provider.categories.join(', ')}</TableCell>
                    <TableCell className="text-sm">
                      <div>{provider.contactName}</div>
                      <div className="text-gray-500">{provider.email}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{provider.averageRating.toFixed(1)}</span>
                        <span className="text-xs text-gray-500">({provider.totalReviews})</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{provider.totalEvents}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded ${
                        provider.status === ProviderStatus.ACTIVO
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {provider.status}
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
