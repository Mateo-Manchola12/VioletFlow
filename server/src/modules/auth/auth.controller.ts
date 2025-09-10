import { Request, Response } from 'express'
import * as authService from './auth.service'
import { ApiResponse, ApiResponseStatus, Privilege, PublicUserAccount } from '@violetflow/types'
import { localSignIn, localSignUp } from './strategies/localAuth'
import { CreateUserSchema, PublicUserSchema } from '../../lib/schemas/user.schema'
import { CreateCompanySchema } from '../../lib/schemas/company.schema'
import { HttpError } from '../../lib/http/HttpError'
import { ENV } from '../../config/env'

export async function signUp(req: Request, res: Response): Promise<void> {
  const { user, company } = req.body

  let parsedUser = CreateUserSchema.parse(user)
  let parsedCompany = CreateCompanySchema.parse(company)

  const { userId, companyId } = await localSignUp(parsedUser, parsedCompany)
  const token = await authService.startSession(userId, companyId, Privilege.ADMIN)
  res
    .cookie('session', token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
      secure: ENV === 'PRODUCTION', // Use secure cookies in production
      sameSite: 'lax', // Prevent CSRF attacks
    })
    .json({ status: ApiResponseStatus.Created, message: 'Usuario registrado correctamente' })
}

export async function signIn(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body
  const { userId, companyId, role } = await localSignIn(email, password)
  const token = await authService.startSession(userId, companyId, role)
  res
    .cookie('session', token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
      secure: ENV === 'PRODUCTION', // Use secure cookies in production
      sameSite: 'lax', // Prevent CSRF attacks
    })
    .json({ status: ApiResponseStatus.Ok, message: 'Usuario autenticado correctamente' })
}

export async function getSession(req: Request, res: Response): Promise<void> {
  if (!req.cookies || !req.cookies.session) {
    throw new HttpError(401, 'No se ha iniciado sesión')
  }

  const session = await authService.getSession(req.cookies.session)
  if (!session) {
    throw new HttpError(401, 'Sesión no válida')
  }

  const response: ApiResponse<PublicUserAccount> = {
    status: ApiResponseStatus.Ok,
    data: PublicUserSchema.parse(session),
  }
  res.json(response)
}

export async function verifyEmail(req: Request, res: Response): Promise<void> {
  const session = await authService.getSession(req.cookies.session)

  if (!session) {
    throw new HttpError(401, 'No se ha iniciado sesión')
  }
  if (session.is_email_verified) {
    throw new HttpError(400, 'El correo electrónico ya está verificado')
  }

  await authService.verifyEmail(session._id)

  res.json({ status: ApiResponseStatus.Ok, message: 'Correo electrónico verificado correctamente' })
}