// src/lib/sessionLogger.ts
type SessionInfo = {
  socketId: string
  userId: string
  companyId: string
  role: string
  connectedAt: Date
}

class SessionLogger {
  private sessionsByUser = new Map<string, SessionInfo>()
  private sessionsByCompany = new Map<string, Set<string>>() // companyId -> userIds

  addSession(socketId: string, userId: string, companyId: string, role: string) {
    const session: SessionInfo = {
      socketId,
      userId,
      companyId,
      role,
      connectedAt: new Date(),
    }

    this.sessionsByUser.set(userId, session)

    if (!this.sessionsByCompany.has(companyId)) {
      this.sessionsByCompany.set(companyId, new Set())
    }
    this.sessionsByCompany.get(companyId)?.add(userId)
  }

  removeSession(userId: string) {
    const session = this.sessionsByUser.get(userId)
    if (!session) return

    this.sessionsByUser.delete(userId)
    this.sessionsByCompany.get(session.companyId)?.delete(userId)
  }

  getSession(userId: string): SessionInfo | undefined {
    return this.sessionsByUser.get(userId)
  }

  getUsersByCompany(companyId: string): string[] {
    return Array.from(this.sessionsByCompany.get(companyId) || [])
  }

  getAllSessions(): SessionInfo[] {
    return Array.from(this.sessionsByUser.values())
  }
}

export const sessionLogger = new SessionLogger()
