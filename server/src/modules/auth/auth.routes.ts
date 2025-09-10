import { Router } from 'express'
import { signIn, signUp, getSession, verifyEmail } from './auth.controller'

const router = Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/session', getSession)
router.post('/verify-email', verifyEmail)

export default router
