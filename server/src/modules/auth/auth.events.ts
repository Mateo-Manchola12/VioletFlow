import { Server, Socket } from 'socket.io'
import { JWT_SECRET } from '../../config/env'
import jwt, { Jwt } from 'jsonwebtoken'
import { sessionLogger } from '../../lib/sessionLogger'

export function registerAuthEvents(io: Server, socket: Socket) {
  const token = socket.handshake.headers.cookie
    ?.split('; ')
    .find((cookie) => cookie.startsWith('session='))
    ?.split('=')[1]

  if (!token) {
    socket.disconnect()
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    if (typeof decoded !== 'object' || decoded === null) {
      socket.disconnect()
      return
    }
    const { userId, companyId, role } = decoded as {
      userId: string
      companyId: string
      role: string
    }

    sessionLogger.addSession(socket.id, userId, companyId, role)

    socket.on('disconnect', () => {
      sessionLogger.removeSession(userId)
    })
  } catch (error) {
    socket.disconnect()
  }
}
