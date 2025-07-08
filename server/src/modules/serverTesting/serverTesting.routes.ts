import { Router } from 'express'
import { getServerTesting, getServerTestingUser } from './serverTesting.controller'

const router = Router()

router.get('/', getServerTesting)
router.get('/user', getServerTestingUser)

export default router
