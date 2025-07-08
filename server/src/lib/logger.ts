export enum logOrigin {
  CLIENT = 'CLIENT',
  SERVER = 'SERVER',
  DATABASE = 'DB',
}

function getTimestamp() {
  return new Date().toISOString()
}

function isDevelopment() {
  return process.env.NODE_ENV !== 'production'
}

function log(message: string, level: string, origin: logOrigin) {
  console.log(`[${getTimestamp()}][${level}][${origin}] ${message}`)
}

export function logInfo(message: string, origin: logOrigin = logOrigin.SERVER) {
  log(message, 'INFO', origin)
}

export function logError(message: string, origin: logOrigin = logOrigin.SERVER) {
  log(message, 'ERROR', origin)
}

export function logDebug(message: string, origin: logOrigin = logOrigin.SERVER) {
  if (isDevelopment()) {
    log(message, 'DEBUG', origin)
  }
}

export function logWarning(message: string, origin: logOrigin = logOrigin.SERVER) {
  log(message, 'WARNING', origin)
}
