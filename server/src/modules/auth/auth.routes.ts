import { Router } from 'express'
import { getAuth } from './auth.controller'

const router = Router()

router.get('/', getAuth)

export default router
