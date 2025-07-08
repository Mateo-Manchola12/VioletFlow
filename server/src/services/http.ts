import { Express } from 'express'
import { createServer, Server } from 'node:http'

let server: Server

export function initHttp(app: Express) {
  server = createServer(app)
}

export { server }
