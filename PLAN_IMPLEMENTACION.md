# Plan de Implementación - Planners Edition Features

## Visión General

Este documento describe el plan de implementación de las funcionalidades de **Planners Edition** para la aplicación de bodas destino "The Planners".

### Arquitectura Actual
- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Radix UI + Tailwind CSS
- **Routing**: React Router 6 (HashRouter)
- **Estado**: useState local (sin gestión centralizada)
- **Backend**: Mock data (sin base de datos real)

### Arquitectura Propuesta
- **Gestión de Estado**: Zustand (ligero, moderno, TypeScript-first)
- **Persistencia**: localStorage + IndexedDB (para funcionar offline)
- **Validación**: Zod (ya instalado)
- **Estructura**: Feature-based folders

---

## FASE 1: Infraestructura Base ✅

### 1.1 Sistema de Gestión de Estado
- [x] Instalar Zustand
- [x] Crear stores base:
  - `useAuthStore` - Autenticación y usuarios
  - `useClientsStore` - Clientes/novios
  - `useEventsStore` - Eventos/bodas
  - `useQuotesStore` - Cotizaciones
  - `usePaymentsStore` - Pagos y cobranza
  - `useProvidersStore` - Proveedores
  - `useSettingsStore` - Configuración de empresa

### 1.2 Modelos de Datos TypeScript
- [x] Definir interfaces y types en `/src/types/`:
  - `auth.types.ts` - Usuario, roles, permisos
  - `client.types.ts` - Cliente, preferencias, historial
  - `event.types.ts` - Evento, cronograma, coordinadores
  - `quote.types.ts` - Cotización, servicios, precios
  - `rooming.types.ts` - Rooming list, habitaciones, asignaciones
  - `payment.types.ts` - Pagos, planes, estados de cuenta
  - `provider.types.ts` - Proveedores, contratos, gastos
  - `report.types.ts` - Reportes, métricas, KPIs

### 1.3 Componentes UI Adicionales
- [x] Crear componentes necesarios:
  - `Select` - Selector dropdown
  - `Checkbox` - Casillas de verificación
  - `Switch` - Toggle switch
  - `Tabs` - Pestañas
  - `Toast` - Notificaciones (Sonner ya instalado)
  - `DatePicker` - Selector de fechas
  - `Avatar` - Avatar de usuario

---

## FASE 2: Gestión de Usuarios y Autenticación

### 2.1 Sistema de Autenticación
- [ ] Mejorar `LoginPage.tsx` con autenticación real
- [ ] Crear roles: Admin, Coordinador, Vendedor
- [ ] Implementar permisos por módulo
- [ ] Agregar página de registro de usuarios
- [ ] Middleware de protección de rutas

### 2.2 Configuración de Empresa
- [ ] Página de configuración (`/configuracion`)
- [ ] Personalización de marca:
  - Logo corporativo
  - Colores de marca
  - Datos de contacto
  - Metas comerciales
- [ ] Multi-usuario (hasta 10 usuarios simultáneos)

---

## FASE 3: Gestión de Clientes/Novios

### 3.1 Base de Datos de Clientes
- [ ] Nueva página `/clientes`
- [ ] CRUD completo de clientes
- [ ] Campos:
  - Datos personales (nombres, emails, teléfonos)
  - Presupuesto total
  - Fecha de boda
  - Preferencias y notas
  - Historial de comunicaciones
  - Status (Lead, Prospecto, Cliente activo)

### 3.2 Perfiles de Cliente
- [ ] Vista detallada de cliente
- [ ] Timeline de interacciones
- [ ] Documentos adjuntos
- [ ] Notas y comentarios

---

## FASE 4: Gestión de Eventos/Bodas

### 4.1 Creación y Configuración de Eventos
- [ ] Mejorar `/dashboard` con lista de eventos
- [ ] Página de creación de evento (`/eventos/nuevo`)
- [ ] Campos:
  - Cliente asignado
  - Fecha y hora
  - Ubicación/hotel
  - Coordinador(es) asignados
  - Presupuesto estimado
  - Status (Planeando, Confirmado, Completado)

### 4.2 Cronograma y Timeline
- [ ] Vista de cronograma por evento
- [ ] Hitos importantes
- [ ] Fechas límite de pagos
- [ ] Tareas pendientes

### 4.3 Calendario de Eventos
- [ ] Vista de calendario mensual
- [ ] Filtros por coordinador, hotel, status
- [ ] Sincronización con Google Calendar (opcional)

---

## FASE 5: Sistema de Cotizaciones y Reservas

### 5.1 Creación de Cotizaciones
- [ ] Nueva página `/cotizaciones`
- [ ] Generador de cotizaciones:
  - Servicios de hospedaje
  - Vuelos
  - Servicios generales (decoración, catering, fotografía)
  - Actividades adicionales
- [ ] Plantillas de cotización personalizables
- [ ] Cálculo automático de totales

### 5.2 Gestión de Reservas
- [ ] Vista de reservas activas
- [ ] Bloqueo de habitaciones en hoteles
- [ ] Reservas de vuelos
- [ ] Estado de confirmación

### 5.3 Contratos
- [ ] Mejorar `/contratos` existente
- [ ] Pre-contratos y contratos finales
- [ ] Firma electrónica (integración futura)
- [ ] Versionado de contratos

---

## FASE 6: Rooming List (Funcionalidad Estrella)

### 6.1 Generación de Rooming List
- [ ] Nueva página `/rooming-list`
- [ ] Importación de invitados desde Excel
- [ ] Asignación manual de habitaciones
- [ ] Drag & drop para reorganizar
- [ ] Múltiples formatos de exportación:
  - Formato México (operadores hoteleros)
  - Formato estándar
  - PDF para impresión
  - Excel editable

### 6.2 Gestión de Invitados por Evento
- [ ] Mejorar `/invitados` con filtro por evento
- [ ] Tipos de habitación (sencilla, doble, suite)
- [ ] Fechas de check-in/check-out
- [ ] Status de confirmación
- [ ] Tracking de pagos individuales

### 6.3 Herramientas de Coordinación
- [ ] Generación rápida (en segundos)
- [ ] Validación automática de capacidad
- [ ] Detección de conflictos
- [ ] Historial de cambios

---

## FASE 7: Sistema de Cobranza y Pagos

### 7.1 Planes de Pago
- [ ] Nueva página `/pagos`
- [ ] Configuración de planes de pago por evento:
  - Pagos en parcialidades
  - Fechas de vencimiento
  - Monto de enganche
  - Saldo pendiente
- [ ] Estados de cuenta individuales por invitado

### 7.2 Registro de Pagos
- [ ] Formulario de registro manual de pago
- [ ] Métodos de pago:
  - Transferencia bancaria
  - Tarjeta de crédito
  - Efectivo
  - PayPal
  - Stripe
  - Otros
- [ ] Validación de pagos bancarios
- [ ] Notificaciones automáticas de pago recibido

### 7.3 Control de Saldos
- [ ] Dashboard de cobranza
- [ ] Listado de saldos pendientes
- [ ] Alertas de pagos próximos a vencer
- [ ] Reportes de morosidad

### 7.4 Integraciones de Pago (Futuro)
- [ ] PayPal (estándar y Plus)
- [ ] Stripe
- [ ] Mercado Pago
- [ ] Open Pay
- [ ] Banorte
- [ ] Webhooks para pagos automáticos

---

## FASE 8: Portal del Invitado

### 8.1 Acceso Autónomo
- [ ] Nueva ruta `/portal/:eventId/:guestToken`
- [ ] Sistema de tokens únicos por invitado
- [ ] Login sin contraseña (magic link)

### 8.2 Funcionalidades del Portal
- [ ] Vista de reservación:
  - Detalles de habitación
  - Fechas de hospedaje
  - Servicios incluidos
- [ ] Estado de cuenta:
  - Pagos realizados
  - Saldo pendiente
  - Próximos vencimientos
- [ ] Información del evento:
  - Itinerario
  - Mapas del hotel
  - Actividades programadas
- [ ] Realización de pagos online
- [ ] Descarga de comprobantes

### 8.3 Comunicación
- [ ] Chat con coordinador
- [ ] Notificaciones por email
- [ ] FAQ del evento

---

## FASE 9: Gestión de Proveedores

### 9.1 Base de Datos de Proveedores
- [ ] Nueva página `/proveedores`
- [ ] CRUD de proveedores:
  - Información de contacto
  - Servicios ofrecidos
  - Tarifas
  - Términos de pago
  - Evaluaciones
- [ ] Categorías (Decoración, Catering, Fotografía, etc.)

### 9.2 Control de Gastos
- [ ] Presupuesto vs real por proveedor
- [ ] Registro de facturas
- [ ] Calendario de pagos a proveedores
- [ ] Historial de servicios

### 9.3 Contratos con Proveedores
- [ ] Almacenamiento de contratos
- [ ] Términos y condiciones
- [ ] Vencimientos de contratos
- [ ] Renovaciones

---

## FASE 10: Sistema de Reportes y Análisis

### 10.1 Reportes de Hospedaje
- [ ] Rooming list por operador
- [ ] Reporte de ocupación
- [ ] Confirmaciones vs pendientes
- [ ] Exportación a Excel/PDF

### 10.2 Reportes Operacionales
- [ ] Reporte de ventas
- [ ] Pipeline de cotizaciones
- [ ] Conversión de leads
- [ ] Actividad por coordinador

### 10.3 Reportes Financieros
- [ ] Estado financiero por evento
- [ ] Ingresos vs gastos
- [ ] Rentabilidad
- [ ] Proyecciones de ingresos
- [ ] Cuentas por cobrar/pagar

### 10.4 Métricas y KPIs
- [ ] Dashboard de métricas:
  - Tasa de conversión
  - Ticket promedio
  - Tiempo de cierre
  - Satisfacción de cliente
  - Puntualidad de pagos
- [ ] Gráficas interactivas (Chart.js o Recharts)

---

## FASE 11: Herramientas de Coordinación

### 11.1 Dashboard de Coordinador
- [ ] Vista personalizada por coordinador
- [ ] Eventos asignados
- [ ] Tareas pendientes
- [ ] Alertas y notificaciones
- [ ] Calendario personal

### 11.2 Sistema de Tareas
- [ ] Creación de tareas por evento
- [ ] Asignación a coordinadores
- [ ] Fechas de vencimiento
- [ ] Status (Pendiente, En progreso, Completada)
- [ ] Checklists

### 11.3 Comunicación Interna
- [ ] Notas por evento (visibles para equipo)
- [ ] Menciones (@coordinador)
- [ ] Notificaciones push

---

## FASE 12: Comunicación Masiva

### 12.1 Envío Masivo de Emails
- [ ] Nueva página `/comunicaciones`
- [ ] Selección de destinatarios:
  - Todos los invitados de un evento
  - Invitados con saldo pendiente
  - Invitados sin confirmar
  - Custom selection
- [ ] Editor de emails con plantillas
- [ ] Personalización con variables (nombre, evento, fecha)

### 12.2 Plantillas de Email
- [ ] Plantillas predefinidas:
  - Bienvenida
  - Recordatorio de pago
  - Confirmación de reserva
  - Información de evento
  - Follow-up
- [ ] Editor visual
- [ ] Preview antes de enviar

### 12.3 Historial de Comunicaciones
- [ ] Log de emails enviados
- [ ] Tracking de apertura (si API lo soporta)
- [ ] Respuestas recibidas

---

## FASE 13: Funciones Específicas para Bodas Destino

### 13.1 Gestión de Traslados
- [ ] Nueva sección en evento para traslados
- [ ] Aeropuerto → Hotel
- [ ] Hotel → Aeropuerto
- [ ] Actividades
- [ ] Asignación de vehículos/capacidad

### 13.2 Control de Vuelos
- [ ] Registro de itinerarios de vuelo
- [ ] Horarios de llegada/salida
- [ ] Asignación de traslados automática
- [ ] Alertas de vuelos

### 13.3 Actividades Pre/Post Boda
- [ ] Catálogo de actividades
- [ ] Inscripción de invitados
- [ ] Control de capacidad
- [ ] Coordinación con proveedores

### 13.4 Welcome Bags
- [ ] Checklist de contenido
- [ ] Control de entregas
- [ ] Status por invitado

---

## FASE 14: Sistema de Notificaciones

### 14.1 Notificaciones en App
- [ ] Sistema de notificaciones en tiempo real (Sonner ya instalado)
- [ ] Centro de notificaciones
- [ ] Marcar como leída
- [ ] Filtros por tipo

### 14.2 Tipos de Notificaciones
- [ ] Nuevo pago recibido
- [ ] Pago próximo a vencer
- [ ] Nueva cotización creada
- [ ] Cambio en rooming list
- [ ] Mensaje de invitado
- [ ] Tarea asignada
- [ ] Evento próximo

### 14.3 Configuración de Notificaciones
- [ ] Preferencias de usuario
- [ ] Activar/desactivar por tipo
- [ ] Canales (App, Email, SMS - futuro)

---

## FASE 15: Mejoras UX/UI

### 15.1 Responsive Design
- [ ] Optimizar todas las páginas para móvil
- [ ] Menú lateral colapsable
- [ ] Cards responsivas
- [ ] Tablas con scroll horizontal

### 15.2 Accesibilidad
- [ ] ARIA labels
- [ ] Navegación por teclado
- [ ] Contraste de colores (WCAG AA)
- [ ] Skip links

### 15.3 Performance
- [ ] Code splitting por ruta
- [ ] Lazy loading de componentes
- [ ] Optimización de imágenes
- [ ] Virtual scrolling en listas grandes

---

## FASE 16: Testing y Documentación

### 16.1 Testing
- [ ] Unit tests (Vitest)
- [ ] Integration tests
- [ ] E2E tests (Playwright)

### 16.2 Documentación
- [ ] Guía de usuario
- [ ] Documentación técnica
- [ ] Guía de contribución
- [ ] Changelog

---

## Priorización de Implementación

### Semana 1-2: Fundamentos
- Fase 1: Infraestructura base
- Fase 2: Autenticación y usuarios

### Semana 3-4: Core Features
- Fase 3: Gestión de clientes
- Fase 4: Gestión de eventos
- Fase 5: Cotizaciones

### Semana 5-6: Funcionalidad Estrella
- Fase 6: Rooming List (funcionalidad más importante)
- Fase 7: Sistema de pagos

### Semana 7-8: Portal y Proveedores
- Fase 8: Portal del invitado
- Fase 9: Gestión de proveedores

### Semana 9-10: Análisis y Coordinación
- Fase 10: Reportes
- Fase 11: Dashboard de coordinadores

### Semana 11-12: Comunicación y Extras
- Fase 12: Comunicación masiva
- Fase 13: Funciones específicas destino
- Fase 14: Notificaciones

### Semana 13-14: Polish
- Fase 15: UX/UI improvements
- Fase 16: Testing y documentación

---

## Stack Tecnológico Final

```json
{
  "frontend": "React 18 + TypeScript",
  "build": "Vite",
  "routing": "React Router 6",
  "state": "Zustand + localStorage",
  "ui": "Radix UI + Tailwind CSS",
  "forms": "React Hook Form + Zod",
  "dates": "date-fns",
  "charts": "Recharts",
  "drag-drop": "@dnd-kit",
  "notifications": "Sonner",
  "icons": "Lucide React",
  "animations": "Framer Motion",
  "excel": "xlsx",
  "pdf": "jsPDF + html2canvas"
}
```

---

## Notas Importantes

1. **Persistencia**: Como no hay backend real, todos los datos se almacenarán en localStorage/IndexedDB
2. **Escalabilidad**: La arquitectura está diseñada para migrar fácilmente a un backend real en el futuro
3. **Offline-first**: La app funcionará sin conexión a internet
4. **Importación/Exportación**: Excel/CSV para migración de datos
5. **Backup**: Funcionalidad de exportar todo el estado a JSON

---

Este plan está diseñado para ser implementado de manera incremental, permitiendo validar cada funcionalidad antes de pasar a la siguiente.
