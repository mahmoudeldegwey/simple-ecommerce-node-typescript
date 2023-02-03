import express from 'express'
import {CategoryController} from '../controllers/category.controller'

const category = new CategoryController();
const router = express.Router()

router.get('/',category.index)
router.post('/store',category.store)
router.put('/update',category.update)
router.delete('/delete',category.delete)

export {router} 