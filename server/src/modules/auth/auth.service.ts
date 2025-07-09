import { $ } from '../../config/db'
import { UserSchema } from '../../lib/schemas/user.schema'
import { CompanySchema } from '../../lib/schemas/company.schema'
import { UserAccount, CompanyAccount } from '@violetflow/types'
import { checkUnique } from '../../lib/utils/checkUnique'
import { HttpError } from '../../lib/http/HttpError'
import jwt, { Jwt } from 'jsonwebtoken'
import { JWT_SECRET } from '../../config/env'

export async function registerCompany(company: CompanyAccount): Promise<string> {
  const parsedCompany = CompanySchema.parse(company)
  const { acknowledged, insertedId } = await $.collection('companies').insertOne(parsedCompany)

  if (!acknowledged) {
    throw new Error('Error al registrar la empresa')
  }

  return insertedId.toString()
}

export async function registerUser(user: UserAccount): Promise<string> {
  const parsedUser = UserSchema.parse(user)

  const existingUser = await checkUnique({ name: 'email', value: parsedUser.email }, 'users')

  if (!existingUser) {
    throw new HttpError(409, 'El correo electrónico ya está registrado')
  }

  const { acknowledged, insertedId } = await $.collection('users').insertOne(parsedUser)

  if (!acknowledged) {
    throw new Error('Error al registrar el usuario')
  }

  return insertedId.toString()
}

export async function startSession(userId, companyId, role): Promise<string> {
  const session = { userId, companyId, role }
  const token = jwt.sign(session, JWT_SECRET, { expiresIn: '1h' })
  return token
}