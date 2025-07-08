import { Request, Response } from 'express'
import * as authService from './auth.service'

export async function getAuth(req: Request, res: Response) {
  const data = await authService.getAll()
  res.json(data)
}
