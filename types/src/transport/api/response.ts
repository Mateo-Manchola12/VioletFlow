export enum ApiResponseStatus {
  SuccessNoData = 100,
  SuccessWithData = 101,
  ValidationError = 102,
  AuthError = 103,
  AuthFailed = 201,
  NotFound = 202,
  GeneralError = 300,
  DBError = 301,
  NetworkError = 302,
}

export interface ApiResponseWithData<T> {
  status: ApiResponseStatus.SuccessWithData
  data: T
  message?: string
  error?: undefined
}

export interface ApiResponseSuccessNoData {
  status: ApiResponseStatus.SuccessNoData
  message: string
  data?: undefined
  error?: undefined
}

export interface ApiResponseError {
  status:
    | ApiResponseStatus.ValidationError
    | ApiResponseStatus.AuthError
    | ApiResponseStatus.AuthFailed
    | ApiResponseStatus.NotFound
    | ApiResponseStatus.GeneralError
    | ApiResponseStatus.DBError
    | ApiResponseStatus.NetworkError
  error: string
  message?: string
  data?: undefined
}

export type ApiResponse<T = undefined> =
  | ApiResponseWithData<T>
  | ApiResponseSuccessNoData
  | ApiResponseError
