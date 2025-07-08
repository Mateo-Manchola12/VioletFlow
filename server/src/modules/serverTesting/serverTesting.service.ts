import { $ } from '../../config/db'
import { ServerTestingSchema } from './serverTesting.model'

export async function getUser() {
  const data = await $.collection('users').findOne()
  return ServerTestingSchema.parse(data)
}
