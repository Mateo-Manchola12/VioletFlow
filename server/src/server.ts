// server.ts
import app from './app'
import http from 'node:http'
import { setupSocket } from './lib/ws'

const PORT = process.env.PORT || 3000

const server = http.createServer(app)
setupSocket(server)

server.listen(PORT, () => {
  console.log(`🚀 Server escuchando en puerto ${PORT}`)
})
