import serverTestingRoutes from './serverTesting/serverTesting.routes'
import { registerServerTestingEvents } from './serverTesting/serverTesting.events'

// modules/index.ts
import authRoutes from './auth/auth.routes'
import { registerAuthEvents } from './auth/auth.events'

// Auto generado por generate-module.js

export const moduleRoutes = [
  { path: '/serverTesting', router: serverTestingRoutes },
  { path: '/auth', router: authRoutes },]
export const socketEventRegistrars = [
  registerServerTestingEvents,
  registerAuthEvents,]
