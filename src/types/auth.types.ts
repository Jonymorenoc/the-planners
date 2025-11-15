/**
 * Tipos para autenticación y gestión de usuarios
 */

export enum UserRole {
  ADMIN = 'admin',
  COORDINADOR = 'coordinador',
  VENDEDOR = 'vendedor',
}

export enum Permission {
  // Clientes
  VIEW_CLIENTS = 'view_clients',
  CREATE_CLIENTS = 'create_clients',
  EDIT_CLIENTS = 'edit_clients',
  DELETE_CLIENTS = 'delete_clients',

  // Eventos
  VIEW_EVENTS = 'view_events',
  CREATE_EVENTS = 'create_events',
  EDIT_EVENTS = 'edit_events',
  DELETE_EVENTS = 'delete_events',

  // Cotizaciones
  VIEW_QUOTES = 'view_quotes',
  CREATE_QUOTES = 'create_quotes',
  EDIT_QUOTES = 'edit_quotes',
  DELETE_QUOTES = 'delete_quotes',

  // Pagos
  VIEW_PAYMENTS = 'view_payments',
  CREATE_PAYMENTS = 'create_payments',
  EDIT_PAYMENTS = 'edit_payments',
  DELETE_PAYMENTS = 'delete_payments',

  // Proveedores
  VIEW_PROVIDERS = 'view_providers',
  CREATE_PROVIDERS = 'create_providers',
  EDIT_PROVIDERS = 'edit_providers',
  DELETE_PROVIDERS = 'delete_providers',

  // Reportes
  VIEW_REPORTS = 'view_reports',
  EXPORT_REPORTS = 'export_reports',

  // Configuración
  VIEW_SETTINGS = 'view_settings',
  EDIT_SETTINGS = 'edit_settings',

  // Usuarios
  VIEW_USERS = 'view_users',
  CREATE_USERS = 'create_users',
  EDIT_USERS = 'edit_users',
  DELETE_USERS = 'delete_users',
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  permissions: Permission[]
  avatar?: string
  phone?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  role: UserRole
  phone?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export interface CompanySettings {
  id: string
  companyName: string
  logo?: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  email: string
  phone: string
  address: string
  website?: string
  goals: {
    monthlyRevenue?: number
    monthlyEvents?: number
    conversionRate?: number
  }
  createdAt: Date
  updatedAt: Date
}

// Permisos por rol predefinidos
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: Object.values(Permission),
  [UserRole.COORDINADOR]: [
    Permission.VIEW_CLIENTS,
    Permission.EDIT_CLIENTS,
    Permission.VIEW_EVENTS,
    Permission.CREATE_EVENTS,
    Permission.EDIT_EVENTS,
    Permission.VIEW_QUOTES,
    Permission.CREATE_QUOTES,
    Permission.EDIT_QUOTES,
    Permission.VIEW_PAYMENTS,
    Permission.CREATE_PAYMENTS,
    Permission.VIEW_PROVIDERS,
    Permission.VIEW_REPORTS,
  ],
  [UserRole.VENDEDOR]: [
    Permission.VIEW_CLIENTS,
    Permission.CREATE_CLIENTS,
    Permission.EDIT_CLIENTS,
    Permission.VIEW_EVENTS,
    Permission.VIEW_QUOTES,
    Permission.CREATE_QUOTES,
    Permission.EDIT_QUOTES,
    Permission.VIEW_REPORTS,
  ],
}
