// app.ts
import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { errorHandler } from './lib/http/httpMiddleware'
import { zodErrorHandler } from './lib/zod/zodMiddleware'
import cookieParser from 'cookie-parser'
import './lib/zod/zodConfig'
import { CORS_ORIGIN } from './config/env'

const app = express()
app.use(morgan('dev'))
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api', router)

app.use(zodErrorHandler)
app.use(errorHandler)

export default app
