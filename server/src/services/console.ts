export enum logOrigin {
  CLIENT = 'CLIENT',
  SERVER = 'SERVER',
  DATABASE = 'DB',
}

export function logInfo(message: string, origin: logOrigin = logOrigin.SERVER) {
  console.log(`[INFO][${origin}] ${message}`)
}

export function logError(message: string, origin: logOrigin = logOrigin.SERVER) {
  console.error(`[ERROR][${origin}] ${message}`)
}
export function logDebug(message: string, origin: logOrigin = logOrigin.SERVER) {
  console.debug(`[DEBUG][${origin}] ${message}`)
}
export function logWarning(message: string, origin: logOrigin = logOrigin.SERVER) {
  console.warn(`[WARNING][${origin}] ${message}`)
}
