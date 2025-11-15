/**
 * Store de autenticación y gestión de usuarios
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  User,
  UserRole,
  Permission,
  ROLE_PERMISSIONS,
  LoginCredentials,
  RegisterData,
  CompanySettings,
} from '../types'

interface AuthStore {
  // Estado
  user: User | null
  token: string | null
  isAuthenticated: boolean
  companySettings: CompanySettings | null
  users: User[]

  // Acciones de autenticación
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
  register: (data: RegisterData) => Promise<boolean>
  updateProfile: (data: Partial<User>) => void

  // Acciones de usuarios
  getUsers: () => User[]
  getUserById: (id: string) => User | undefined
  createUser: (data: RegisterData) => Promise<User>
  updateUser: (id: string, data: Partial<User>) => void
  deleteUser: (id: string) => void
  toggleUserStatus: (id: string) => void

  // Permisos
  hasPermission: (permission: Permission) => boolean
  hasAnyPermission: (permissions: Permission[]) => boolean
  hasAllPermissions: (permissions: Permission[]) => boolean

  // Configuración de empresa
  getCompanySettings: () => CompanySettings | null
  updateCompanySettings: (settings: Partial<CompanySettings>) => void
}

// Usuario administrador por defecto (para desarrollo)
const defaultAdminUser: User = {
  id: 'admin-1',
  email: 'admin@theplanners.com',
  firstName: 'Administrador',
  lastName: 'Principal',
  role: UserRole.ADMIN,
  permissions: ROLE_PERMISSIONS[UserRole.ADMIN],
  isActive: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
  phone: '+52 555 123 4567',
}

// Configuración de empresa por defecto
const defaultCompanySettings: CompanySettings = {
  id: 'company-1',
  companyName: 'The Planners - Bodas Destino',
  primaryColor: 'hsl(329 84% 54%)',
  secondaryColor: 'hsl(272 46% 74%)',
  accentColor: 'hsl(24 84% 64%)',
  email: 'contacto@theplanners.com',
  phone: '+52 555 123 4567',
  address: 'Ciudad de México, México',
  website: 'https://theplanners.com',
  goals: {
    monthlyRevenue: 500000,
    monthlyEvents: 10,
    conversionRate: 30,
  },
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      token: null,
      isAuthenticated: false,
      companySettings: defaultCompanySettings,
      users: [defaultAdminUser],

      // Login
      login: async (credentials: LoginCredentials) => {
        // Simulación de login (sin backend real)
        // En producción, aquí iría la llamada a la API

        // Login simple para desarrollo
        if (credentials.email === 'admin@theplanners.com' && credentials.password === 'admin123') {
          set({
            user: defaultAdminUser,
            token: 'mock-token-' + Date.now(),
            isAuthenticated: true,
          })
          return true
        }

        // Buscar usuario en la lista
        const user = get().users.find(u => u.email === credentials.email)
        if (user && user.isActive) {
          set({
            user: { ...user, lastLogin: new Date() },
            token: 'mock-token-' + Date.now(),
            isAuthenticated: true,
          })
          return true
        }

        return false
      },

      // Logout
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      // Registro
      register: async (data: RegisterData) => {
        const newUser: User = {
          id: 'user-' + Date.now(),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
          permissions: ROLE_PERMISSIONS[data.role],
          phone: data.phone,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set(state => ({
          users: [...state.users, newUser],
        }))

        return true
      },

      // Actualizar perfil
      updateProfile: (data: Partial<User>) => {
        const { user } = get()
        if (!user) return

        const updatedUser = {
          ...user,
          ...data,
          updatedAt: new Date(),
        }

        set(state => ({
          user: updatedUser,
          users: state.users.map(u => (u.id === user.id ? updatedUser : u)),
        }))
      },

      // Obtener todos los usuarios
      getUsers: () => {
        return get().users
      },

      // Obtener usuario por ID
      getUserById: (id: string) => {
        return get().users.find(u => u.id === id)
      },

      // Crear usuario
      createUser: async (data: RegisterData) => {
        const newUser: User = {
          id: 'user-' + Date.now(),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
          permissions: ROLE_PERMISSIONS[data.role],
          phone: data.phone,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set(state => ({
          users: [...state.users, newUser],
        }))

        return newUser
      },

      // Actualizar usuario
      updateUser: (id: string, data: Partial<User>) => {
        set(state => ({
          users: state.users.map(u =>
            u.id === id
              ? { ...u, ...data, updatedAt: new Date() }
              : u
          ),
        }))
      },

      // Eliminar usuario
      deleteUser: (id: string) => {
        set(state => ({
          users: state.users.filter(u => u.id !== id),
        }))
      },

      // Activar/desactivar usuario
      toggleUserStatus: (id: string) => {
        set(state => ({
          users: state.users.map(u =>
            u.id === id
              ? { ...u, isActive: !u.isActive, updatedAt: new Date() }
              : u
          ),
        }))
      },

      // Verificar permiso
      hasPermission: (permission: Permission) => {
        const { user } = get()
        return user?.permissions.includes(permission) ?? false
      },

      // Verificar si tiene alguno de los permisos
      hasAnyPermission: (permissions: Permission[]) => {
        const { user } = get()
        if (!user) return false
        return permissions.some(p => user.permissions.includes(p))
      },

      // Verificar si tiene todos los permisos
      hasAllPermissions: (permissions: Permission[]) => {
        const { user } = get()
        if (!user) return false
        return permissions.every(p => user.permissions.includes(p))
      },

      // Obtener configuración de empresa
      getCompanySettings: () => {
        return get().companySettings
      },

      // Actualizar configuración de empresa
      updateCompanySettings: (settings: Partial<CompanySettings>) => {
        set(state => ({
          companySettings: state.companySettings
            ? { ...state.companySettings, ...settings, updatedAt: new Date() }
            : null,
        }))
      },
    }),
    {
      name: 'the-planners-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        companySettings: state.companySettings,
        users: state.users,
      }),
    }
  )
)
