import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.string().default('27017'),
  DB_NAME: z.string().default('violetflow'),
  DB_USER: z.string().optional(),
  DB_PASS: z.string().optional(),
  JWT_SECRET: z.string().default('violetflow'),
  ENV: z.enum(['DEVELOPMENT', 'PRODUCTION']).default('DEVELOPMENT'),
  CORS_ORIGIN: z.string().default('http://100.95.205.45:4200'),
  PORT: z.string().default('3000'),
})

const env = envSchema.parse(process.env)

export const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, JWT_SECRET, ENV, CORS_ORIGIN, PORT } = env
