import { Server, Socket } from 'socket.io'

type EventHandler = (io: Server, socket: Socket) => void

class EventRegistry {
  private handlers: EventHandler[] = []

  add(handler: EventHandler) {
    this.handlers.push(handler)
  }

  register(io: Server, socket: Socket) {
    this.handlers.forEach((handler) => handler(io, socket))
  }
}

export default new EventRegistry()
export type { EventHandler }
export { EventRegistry }