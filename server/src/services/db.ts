import { MongoClient, ServerApiVersion } from 'mongodb'
import { logInfo, logOrigin } from './console'
import { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } from '../constants/db'

const uri = DB_USER
  ? `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/`
  : `mongodb://${DB_HOST}:${DB_PORT}/`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    await client.connect()
    await client.db(DB_NAME).command({ ping: 1 })
    logInfo(`Base de datos ${DB_NAME} conectada correctamente`, logOrigin.DATABASE)
  } catch (error) {
    logInfo(`Error al conectar a la base de datos: ${error}`, logOrigin.DATABASE)
  }
}

await run()

process.on('SIGINT', async () => {
  await client.close()
  logInfo('Conexión a la base de datos cerrada correctamente', logOrigin.DATABASE)
  process.exit(0)
})

export const $ = client.db(DB_NAME) // Export the connected database instance
