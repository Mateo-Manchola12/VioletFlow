// src/middleware/zodErrorHandler.ts
import { ZodError } from 'zod'
import { Request, Response, NextFunction } from 'express'
import { ApiResponseError } from '@violetflow/types'

export function zodErrorHandler(err: unknown, _req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    const error: ApiResponseError = {
      error: `Error de validación ${err.issues[0]?.path[0].toLocaleString()}: ${err.issues[0]?.message ?? 'Entrada inválida'}`,
      status: 400,
    }

    return res.status(200).json(error)
  }

  next(err)
}
