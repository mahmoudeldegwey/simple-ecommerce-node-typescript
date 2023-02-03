import express from 'express'
import {Authenticate} from '../controllers/authenticate.controller'

const authenticate = new Authenticate();
const router = express.Router()

router.post('/login',authenticate.login)
router.post('/register',authenticate.register)

export {router} 