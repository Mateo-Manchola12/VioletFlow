import { Request, Response } from 'express'
import * as serverTestingService from './serverTesting.service'
import { ApiResponse, ApiResponseStatus, UserAccount } from '@violetflow/types'
import { ServerTestingUser } from './serverTesting.model'

export async function getServerTesting(req: Request, res: Response) {
  const response: ApiResponse = {
    status: ApiResponseStatus.NoContent,
    message: 'Bienvenido desde el servidor',
  }
  res.json(response)
}

export async function getServerTestingUser(req: Request, res: Response) {
  const user = await serverTestingService.getUser()
  const response: ApiResponse<UserAccount> = {
    status: ApiResponseStatus.Ok,
    data: user,
  }
  res.json(response)
}
