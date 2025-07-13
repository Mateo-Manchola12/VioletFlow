import { $ } from '../../config/db'
import { UserSchema } from '../../lib/schemas/user.schema'
import { UserAccount, CreateUserAccount, CreateCompanyAccount, Session } from '@violetflow/types'
import { checkUnique } from '../../lib/utils/checkUnique'
import { HttpError } from '../../lib/http/HttpError'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config/env'
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'

export async function registerCompany(company: CreateCompanyAccount): Promise<string> {
  const { acknowledged, insertedId } = await $.collection('companies').insertOne(company)

  if (!acknowledged) {
    throw new Error('Error al registrar la empresa')
  }

  return insertedId.toString()
}

export async function registerUser(
  user: CreateUserAccount & { company: string; role: number },
): Promise<string> {
  const existingUser = await checkUnique({ name: 'email', value: user.email }, 'users')

  if (!existingUser) {
    throw new HttpError(409, 'El correo electrónico ya está registrado')
  }

  user.password = await bcrypt.hash(user.password, 10)
  const { acknowledged, insertedId } = await $.collection('users').insertOne(user)

  if (!acknowledged) {
    throw new Error('Error al registrar el usuario')
  }

  return insertedId.toString()
}

export async function startSession(
  userId: string,
  companyId: string,
  role: number,
): Promise<string> {
  const session = { userId, companyId, role }
  const token = jwt.sign(session, JWT_SECRET, { expiresIn: '1h' })
  return token
}

export async function findUserByEmail(email: string): Promise<UserAccount | null> {
  const user = await $.collection<UserAccount>('users').findOne({ email })
  return user ? UserSchema.parse(user) : null
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
export async function getSession(token: string): Promise<UserAccount | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as Session
    const user = await $.collection<UserAccount>('users').findOne({ _id: new ObjectId(decoded.userId) })
    if (!user) {
      return null
    }
    return UserSchema.parse(user)
  } catch (error) {
    return null
  }
}
