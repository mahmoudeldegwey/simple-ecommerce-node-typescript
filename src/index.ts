import express from 'express'
import * as dotenv from 'dotenv'
import * as bodyParser from 'body-parser'
import {router as authRouter } from './routes/authRoutes'
import {router as categoryRouter } from './routes/categoryRoutes'
import {router as productRouter } from './routes/productRoutes'
import {router as orderRouter } from './routes/orderRoutes'
import {router as cartRouter } from './routes/cartRoutes'
import { JWTTokens } from './utill/JWTTokens'
import { upload } from './utill/UploadFile'

dotenv.config()


const app = express()
const port = process.env.PORT
const userMiddleWare = new JWTTokens()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/auth',authRouter);
app.use('/categories',userMiddleWare.verifyToken,categoryRouter);
app.use('/products',userMiddleWare.verifyToken,upload,productRouter);
app.use('/cart',userMiddleWare.verifyToken,cartRouter);
app.use('/order',userMiddleWare.verifyToken,orderRouter);


app.listen(port);