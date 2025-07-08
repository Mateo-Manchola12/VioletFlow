import { ApiResponse, ApiResponseStatus } from '@violetflow/types/src/transport/api/response'
import express from 'express'
import { $ } from '../services/db'
import { logError, logOrigin } from '../services/console'
const router = express.Router()

// Rutas HTTP
router.get('/', (req, res) => {
  const response: ApiResponse = {
    status: ApiResponseStatus.SuccessNoData,
    message: 'Bienvenido desde el servidor',
  }
  res.status(200).send(response)
})

router.get('/user', async (req, res) => {
  try {
    const users = await $.collection<{ name: string; lastname: string; age: number }>('users')
      .find()
      .toArray()

    if (!users || users.length === 0)
      return void res.status(404).send({ message: 'No users found' })

    const firstUser = users[0] as { name: string; lastname: string; age: number }
    res.status(200).send({ data: firstUser, status: ApiResponseStatus.SuccessWithData })
  } catch (error) {
    logError(`Error fetching users: ${error}`, logOrigin.DATABASE)
    res.status(500).send({ message: 'Internal Server Error' })
  }
})

export default router
