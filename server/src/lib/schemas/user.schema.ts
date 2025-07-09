import { Privilege } from '@violetflow/types'
import { z } from 'zod'
import { IdSchema } from './id'

export const UserSchema = z.object({
  _id: IdSchema.optional(),
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(9).max(15),
  password: z.string().min(8).max(100),
  company: z.string().min(2).max(100),
  role: z.nativeEnum(Privilege),
})
