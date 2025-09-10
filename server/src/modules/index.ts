// modules/index.ts
import authRoutes from './auth/auth.routes'
import { registerAuthEvents } from './auth/auth.events'

// Auto generado por generate-module.js

export const moduleRoutes = [{ path: '/auth', router: authRoutes }]
export const socketEventRegistrars = [registerAuthEvents]
