import { Request, Response } from 'express'
import * as authService from './auth.service'
import { ApiResponseStatus, Privilege } from '@violetflow/types'
import { localSignUp } from './strategys/localAuth'

export async function signUp(req: Request, res: Response): Promise<void> {
  const { user, company } = req.body
  user.role = Privilege.ADMIN
  const { userId, companyId } = await localSignUp(user, company)
  const token = await authService.startSession(userId, companyId, user.role)
  res.cookie('session', token, {
    httpOnly: true,
    maxAge: 3600000, // 1 hour
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
  }).json({status: ApiResponseStatus.Created, message: 'Usuario registrado correctamente', })
}
