import express from 'express'
import {OrderController} from '../controllers/order.controller'

const order = new OrderController();
const router = express.Router()

router.get('/',order.index)
router.post('/store',order.store)
router.delete('/delete',order.delete)

export {router} 