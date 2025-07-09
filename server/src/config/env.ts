import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envSchema = z.object({
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.string().default('27017'),
  DB_NAME: z.string().default('violetflow'),
  DB_USER: z.string().optional(),
  DB_PASS: z.string().optional(),
  JWT_SECRET: z.string().default('violetflow'),
})

const env = envSchema.parse(process.env)

export const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, JWT_SECRET } = env
