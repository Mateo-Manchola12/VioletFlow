// app.ts
import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { errorHandler } from './lib/http/httpMiddleware'

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api', router)

app.use(errorHandler)

export default app
