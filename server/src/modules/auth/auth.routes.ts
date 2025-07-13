import { Router } from 'express'
import { signIn, signUp, getSession } from './auth.controller'

const router = Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/session', getSession)

export default router
