import { Db, MongoClient, ServerApiVersion } from 'mongodb'

// Replace the placeholder with your Atlas connection string
const uri = 'mongodb://localhost:27017/'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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

    await client.db('violetflow').command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')
  } finally {
    await client.close()
  }
}
run().catch(console.dir)

export default client
