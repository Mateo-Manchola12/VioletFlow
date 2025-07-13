import { ApiResponse, ApiResponseStatus } from '@violetflow/types'
import express from 'express'
import { $ } from '../config/db'
const router = express.Router()

// Rutas HTTP
router.get('/', (req, res) => {
  const response: ApiResponse = {
    status: ApiResponseStatus.NoContent,
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
    res.status(200).send({ data: firstUser, status: ApiResponseStatus.Ok })
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
})

export default router
