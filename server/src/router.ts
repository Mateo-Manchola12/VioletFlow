// router.ts
import express from 'express'
import { moduleRoutes } from './modules'

const router = express.Router()

moduleRoutes.forEach(({ path, router: moduleRouter }) => {
  router.use(path, moduleRouter)
})

export default router
