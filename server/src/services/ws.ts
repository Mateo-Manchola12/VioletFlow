import { Server } from 'socket.io'
import { server } from './http';

let io: Server

export function initWs() {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  })
}

export { io };