const prefix = 'AUTH_'

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
    AUTH_SECRET = 'VioletFlowSecret',
    AUTH_EXPIRES_IN = '1d',
 } = filteredEnv
