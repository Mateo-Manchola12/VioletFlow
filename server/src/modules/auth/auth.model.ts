import { z } from 'zod'

export const AuthSchema = z.object({
  _id: z.string().optional(),
  // Añade aquí los campos reales
  name: z.string(),
})

export type Auth = z.infer<typeof AuthSchema>
