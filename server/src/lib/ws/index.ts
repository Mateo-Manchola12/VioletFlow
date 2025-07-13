// ws/socket.ts
import { Server } from 'socket.io'
import { registerAllEvents } from './events'
import { Server as HttpServer } from 'node:http'
import { CORS_ORIGIN } from '../../config/env'

export function setupSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: { origin: CORS_ORIGIN, credentials: true },
  })

  io.on('connection', (socket) => {
    registerAllEvents(io, socket)
  })

  return io
}
