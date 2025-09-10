import { Privilege } from '@violetflow/types'
import { IdSchema } from './id'
import z from 'zod'

export const BaseUserSchema = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  email: z.email(),
  phone: z.string().min(9).max(15),
  is_email_verified: z.boolean().default(false),
  is_active: z.boolean().default(true),
  role: z.enum(Privilege),
})

export const CreateUserSchema = BaseUserSchema.extend({
  password: z.string().min(8).max(100),
}).omit({ role: true })

export const UserSchema = CreateUserSchema.extend({
  _id: IdSchema,
  company: z.string().min(2).max(100),
  role: z.enum(Privilege),
})

export const PublicUserSchema = BaseUserSchema
