import { Server } from 'socket.io'
import setupSocketEvents from './events'

export default function setupSocket(io: Server) {
  io.on('connection', (socket) => {
    setupSocketEvents(io, socket)
  })
}
