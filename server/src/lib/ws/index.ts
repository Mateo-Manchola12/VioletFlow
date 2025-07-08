// ws/socket.ts
import { Server } from 'socket.io'
import { registerAllEvents } from './events'
import { Server as HttpServer } from 'node:http'

export function setupSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: { origin: '*' },
  })

  io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`)

    registerAllEvents(io, socket)
  })

  return io
}
