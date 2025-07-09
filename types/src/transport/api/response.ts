export enum ApiResponseStatus {
  // 2xx: Éxito
  Ok = 200, // Acción completada exitosamente con datos
  Created = 201, // Recurso creado exitosamente
  NoContent = 204, // Acción exitosa sin contenido (por ejemplo, DELETE exitoso)

  // 3xx: Respuestas de redirección (poco comunes en APIs pero incluidas por claridad)
  NotModified = 304, // Recurso no ha cambiado (útil con cache/etag)

  // 4xx: Errores del cliente
  BadRequest = 400, // Solicitud mal formada (estructura o datos incorrectos)
  Unauthorized = 401, // No autenticado
  Forbidden = 403, // Autenticado pero sin permisos suficientes
  NotFound = 404, // Recurso no encontrado
  MethodNotAllowed = 405, // Método HTTP no permitido (por ejemplo, DELETE en una ruta bloqueada)
  Conflict = 409, // Conflicto de estado (duplicado, etc.)
  Gone = 410, // El recurso fue eliminado y no estará disponible
  PreconditionFailed = 412, // Falla en precondiciones (por ejemplo, headers If-Match fallan)
  ValidationError = 422, // Datos válidos sintácticamente pero con errores lógicos
  TooManyRequests = 429, // Se ha excedido el límite de peticiones

  // 5xx: Errores del servidor
  InternalServerError = 500, // Error inesperado del servidor
  NotImplemented = 501, // Funcionalidad aún no implementada
  BadGateway = 502, // El servidor recibió una respuesta inválida desde un upstream
  ServiceUnavailable = 503, // El servidor no está disponible temporalmente
  DatabaseError = 540, // Error interno de base de datos (no estándar pero útil)
  NetworkError = 541, // Falla al comunicarse con servicios externos o red
}

export type ApiErrorStatus =
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

export interface ApiResponseWithData<T> {
  status: ApiResponseStatus.Ok | ApiResponseStatus.Created
  data: T
  message?: string
  error?: undefined
}

export interface ApiResponseNoContent {
  status: ApiResponseStatus.NoContent
  message?: string
  data?: undefined
  error?: undefined
}

export interface ApiResponseError {
  status: ApiErrorStatus
  error: string
  message?: string
  data?: undefined
}

// Unión general para responses
export type ApiResponse<T = undefined> =
  | ApiResponseWithData<T>
  | ApiResponseNoContent
  | ApiResponseError
