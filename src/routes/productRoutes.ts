import express from 'express'
import {ProductController} from '../controllers/product.controller'
import { JWTTokens } from '../utill/JWTTokens';

const product = new ProductController();
const router = express.Router()

router.get('/',product.index)
router.post('/store',product.store)
router.put('/update',product.update)
router.delete('/delete',product.delete)

export {router} 