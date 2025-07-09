import { ApiResponseStatus } from '@violetflow/types'

export class HttpError extends Error {
  status:
    | ApiResponseStatus.BadRequest
    | ApiResponseStatus.Unauthorized
    | ApiResponseStatus.Forbidden
    | ApiResponseStatus.NotFound
    | ApiResponseStatus.MethodNotAllowed
    | ApiResponseStatus.Conflict
    | ApiResponseStatus.Gone
    | ApiResponseStatus.PreconditionFailed
    | ApiResponseStatus.ValidationError
    | ApiResponseStatus.TooManyRequests
    | ApiResponseStatus.InternalServerError
    | ApiResponseStatus.NotImplemented
    | ApiResponseStatus.BadGateway
    | ApiResponseStatus.ServiceUnavailable
    | ApiResponseStatus.DatabaseError
    | ApiResponseStatus.NetworkError
  cause: string

  constructor(status: number, cause: string) {
    super(cause)
    this.name = 'HttpError'
    this.status = status
    this.cause = cause
    Error.captureStackTrace(this, HttpError)
  }
}
