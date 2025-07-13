import z from 'zod'

z.config({
  customError: (issue) => {
    if (issue.code === 'invalid_type')
      return {
        message: `Tipo inválido. Se esperaba ${issue.expected}, pero se recibió ${issue.received}.`,
      }
    if (issue.code === 'too_small')
      return {
        message: `El valor es demasiado pequeño. Mínimo permitido: ${issue.minimum}.`,
      }
    if (issue.code === 'too_big')
      return {
        message: `El valor es demasiado grande. Máximo permitido: ${issue.maximum}.`,
      }
    if (issue.code === 'invalid_format')
      return {
        message: `Formato inválido: ${issue.validation}.`,
      }
    if (issue.code === 'invalid_union')
      return {
        message: `La unión no es válida.`,
      }
    if (issue.code === 'not_multiple_of')
      return {
        message: `El valor debe ser un múltiplo de ${issue.multipleOf}.`,
      }
    if (issue.code === 'unrecognized_keys')
      return {
        message: `Se encontraron claves no reconocidas: ${issue.keys.join(', ')}.`,
      }
  },
})
