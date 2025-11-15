import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, PieChart, TrendingUp, FileText, Download } from 'lucide-react'

export default function ReportsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Reportes y Análisis</h1>
        <p className="text-gray-600">Visualiza métricas y genera reportes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rooming List Reports */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Rooming List</h3>
              <p className="text-sm text-gray-600 mb-4">
                Genera reportes de ocupación y listas de habitaciones
              </p>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Generar Reporte
              </Button>
            </div>
          </div>
        </Card>

        {/* Financial Reports */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Reporte Financiero</h3>
              <p className="text-sm text-gray-600 mb-4">
                Análisis de ingresos, gastos y rentabilidad
              </p>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Generar Reporte
              </Button>
            </div>
          </div>
        </Card>

        {/* Sales Reports */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Reporte de Ventas</h3>
              <p className="text-sm text-gray-600 mb-4">
                Análisis de cotizaciones y conversión
              </p>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Generar Reporte
              </Button>
            </div>
          </div>
        </Card>

        {/* Payments Reports */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <PieChart className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Reporte de Cobranza</h3>
              <p className="text-sm text-gray-600 mb-4">
                Estado de pagos y cuentas por cobrar
              </p>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Generar Reporte
              </Button>
            </div>
          </div>
        </Card>

        {/* Coordinator Performance */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-cyan-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Desempeño de Coordinadores</h3>
              <p className="text-sm text-gray-600 mb-4">
                Métricas de rendimiento por coordinador
              </p>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Generar Reporte
              </Button>
            </div>
          </div>
        </Card>

        {/* Provider Spending */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-pink-100 rounded-lg">
              <PieChart className="h-6 w-6 text-pink-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Gastos de Proveedores</h3>
              <p className="text-sm text-gray-600 mb-4">
                Análisis de gastos por proveedor y categoría
              </p>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Generar Reporte
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
