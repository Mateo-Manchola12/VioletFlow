import { ObjectId } from 'mongodb'
import { z } from 'zod'

export const IdSchema = z.any().refine((val) => val instanceof ObjectId, {
  message: '_id must be ObjectId',
})

export type Id = z.infer<typeof IdSchema>
