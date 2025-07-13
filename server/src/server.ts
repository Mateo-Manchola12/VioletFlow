// server.ts
import app from './app'
import http from 'node:http'
import { setupSocket } from './lib/ws'
import { PORT } from './config/env'
import { logInfo } from './lib/logger'

const server = http.createServer(app)
setupSocket(server)

server.listen(PORT, () => {
  logInfo(`🚀 Server escuchando en puerto ${PORT}`)
})
