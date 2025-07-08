import { ObjectId } from 'mongodb'
import { z } from 'zod'

export const ServerTestingSchema = z.object({
  _id: z.any().refine((val) => val instanceof ObjectId, {
    message: '_id must be ObjectId',
  }),
  name: z.string(),
  lastname: z.string(),
  age: z.number().int().min(0).max(120),
})

export type ServerTestingUser = z.infer<typeof ServerTestingSchema>
