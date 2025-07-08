import { Server, Socket } from 'socket.io'

export function registerServerTestingEvents(io: Server, socket: Socket) {
  io.emit('active-connections', { count: io.engine.clientsCount })

  socket.emit('message', { message: 'Bienvenido desde el WebSocket' })

  socket.on('disconnect', () => {
    io.emit('active-connections', { count: io.engine.clientsCount })
  })
}
