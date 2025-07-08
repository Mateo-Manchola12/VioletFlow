import { $ } from '../../config/db'
import { AuthSchema } from './auth.model'

export async function getAll() {
  const data = await $.collection('auth').find().toArray()
  return data.map((item) => AuthSchema.parse(item))
}
