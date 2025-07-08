const prefix = 'DB_'

const filteredEnv = Object.entries(process.env).reduce(
  (obj, [key, value]) => {
    if (key.startsWith(prefix) && value !== undefined) {
      obj[key] = value
    }
    return obj
  },
  {} as Record<string, string>,
)

export const {
  DB_HOST = 'localhost',
  DB_PORT = '27017',
  DB_NAME = 'violetflow',
  DB_USER = '',
  DB_PASS = '',
} = filteredEnv
