import express from 'express'
import {CartController} from '../controllers/cart.controller'

const cart = new CartController();
const router = express.Router()

router.get('/',cart.productsList)
router.post('/store',cart.storeProduct)
router.put('/update',cart.updateQunatity)
router.delete('/delete',cart.deleteProduct)

export {router} 