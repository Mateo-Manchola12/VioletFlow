// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express'
import { HttpError } from './HttpError'
import { ApiResponseError } from '@violetflow/types'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof HttpError) {
    const error: ApiResponseError = {
      error: err.message,
      status: err.status || 500,
    }
    res.json(error)
    return
  }

  console.error('Error no manejado:', err)
  res.status(500).json({ error: 'Error interno del servidor' })
}
