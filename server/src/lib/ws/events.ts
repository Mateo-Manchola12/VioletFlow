import { Server, Socket } from 'socket.io'
import { socketEventRegistrars } from '../../modules'

export function registerAllEvents(io: Server, socket: Socket) {
  socketEventRegistrars.forEach((register) => register(io, socket))
}
