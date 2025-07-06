import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'
import morgan from 'morgan'
import { query } from './db/db_methods'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

const PORT = process.env.PORT || 3000

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// Rutas HTTP
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Bienvenido desde el servidor' })
})

app.get('/user', async (req, res) => {
  try {
    const users = await query<{ name: string; lastname: string; age: number }[]>(async (db) => {
      return await db
        .collection<{ name: string; lastname: string; age: number }>('users')
        .find()
        .toArray()
    })

    if (!users || users.length === 0)
      return void res.status(404).send({ message: 'No users found' })

    const firstUser = users[0] as { name: string; lastname: string; age: number }
    res.status(200).send(firstUser)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Internal Server Error' })
  }
})

// WebSockets
io.on('connection', (socket) => {
  io.emit('active-connections', { count: io.engine.clientsCount })

  socket.emit('message', { message: 'Bienvenido desde el WebSocket' })

  socket.on('disconnect', () => {
    io.emit('active-connections', { count: io.engine.clientsCount })
  })
})

// Arranque
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
})
