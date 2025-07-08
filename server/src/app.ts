// app.ts
import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api', router)

export default app
