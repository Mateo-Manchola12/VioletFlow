import { Server, Socket } from 'socket.io'
import { EventRegistry } from '../eventRegistry'
import main from './main'

const events: EventRegistry[] = [main]

export default function setupSocketEvents(io: Server, socket: Socket) {
  events.forEach((event) => {
    event.register(io, socket)
  })
}
