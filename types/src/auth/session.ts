import { Socket } from 'socket.io'
import { Privilege } from './privilege'

export interface Session {
  id: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface SessionUser {
  id: string
  email: string
  name?: string
  privilege: Privilege
}

export interface SessionWithUser extends Session {
  user: SessionUser
}

export interface LiveSession extends SessionWithUser {
  socket: Socket
}

export interface JwtPayload {
  sub: string
  email: string
  privilege: Privilege
  iat: number
  exp: number
}
