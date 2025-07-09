import { $ } from '../../config/db'
import { HttpError } from '../../lib/http/HttpError'
import { UserSchema } from '../../lib/schemas/user.schema'
import { ServerTestingSchema } from './serverTesting.model'

export async function getUser() {
  const data = await $.collection('users').findOne()
  if (!data) {
    throw new HttpError(404, 'No user found')
  }
  return UserSchema.parse(data)
}
