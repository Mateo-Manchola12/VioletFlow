const prefix = 'APP_'

const filteredEnv = Object.entries(process.env).reduce(
  (obj, [key, value]) => {
    if (key.startsWith(prefix) && value !== undefined) {
      obj[key] = value
    }
    return obj
  },
  {} as Record<string, string>,
)

export const { APP_HOST = 'localhost', APP_PORT = '3000' } = filteredEnv
