// src/routes/auth.routes.js
import { Router } from 'express'
import authController from '../controller/authController.js'

const router = Router()

router.post('/login', authController.login)
router.post('/register', authController.register)

export default router