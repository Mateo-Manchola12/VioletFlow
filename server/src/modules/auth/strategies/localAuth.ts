import { CreateUserAccount, CreateCompanyAccount, Privilege } from '@violetflow/types'
import { registerCompany, registerUser, findUserByEmail, verifyPassword } from '../auth.service'
import { HttpError } from '../../../lib/http/HttpError'

export async function localSignUp(
  user: CreateUserAccount,
  company: CreateCompanyAccount,
): Promise<{ userId: string; companyId: string }> {
  const companyId = await registerCompany(company)
  const newUser = { ...user, company: companyId, role: Privilege.ADMIN }
  const userId = await registerUser(newUser)

  return { userId, companyId }
}

export async function localSignIn(
  email: string,
  password: string,
): Promise<{ userId: string; companyId: string; role: number }> {
  const user = await findUserByEmail(email)
  if (!user) {
    throw new HttpError(401, 'Invalid email')
  }
  if (!await verifyPassword(password, user.password)) {
    throw new HttpError(401, 'Invalid password')
  }
  return { userId: user._id?.toString(), companyId: user.company, role: user.role }
}
