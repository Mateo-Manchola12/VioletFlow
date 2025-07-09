import { Router } from 'express'
import { signUp } from './auth.controller'

const router = Router()

router.post('/register', signUp)

export default router
