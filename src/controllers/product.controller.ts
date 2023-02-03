import { Product } from '../models/product';
import { Response,Request } from 'express';
import Validator from 'validatorjs';
import { ProductRequest } from '../requests/product.request';
import jwt from 'jsonwebtoken'

export class ProductController{
    
    public async index (req:Request ,res:Response){

        try {
            
            const products = await Product.findAll();

            return res.status(200).send(products)

        } catch (error) {
            console.log('error',error)
        }
    }
    
    public async store(req:Request ,res:Response){
        try {
            
            let validation = new ProductRequest().rules(req);
            
            if(!validation.passes()){
                return res.status(500).send(validation.errors.all())
            }

            const {name,description,price,category_id,quantity} = req.body;
            const image = req.file?.path;

            const product = await Product.create({name:name,description:description,price:price,category_id:category_id,quantity:quantity,image:image})
            
            return res.status(200).send({data:product})

        } catch (error) {
            console.log(error)
            return res.status(500).send(error)            
        }
    }

    public async update(req:Request ,res:Response){
        try {
            
            let validation = new ProductRequest().rules(req);
            
            if(!validation.passes()){
                return res.status(500).send(validation.errors.all())
            }

            const {name:name,description:description,price:price,category_id:category_id,product_id,quantity:quantity} = req.body;
            const image = req.file?.path
            
            const updateProduct = await Product.update({name:name,description:description,price:price,category_id:category_id,quantity:quantity,image:image},{
                where:{
                    id:product_id
                }
            })
            
            if(updateProduct){
                const product = await Product.findByPk(product_id)
                return res.status(200).send({product:product})
            }else{
                return res.status(200).send({message:"failed to update product"})
            }

        } catch (error) {
            return res.status(500).send(error)            
        }
    }

    public async delete(req:Request ,res:Response){
        try {
            
            let validation = new Validator(req.body, {
                product_id:'required'
            });
            
            if(!validation.passes()){
                return res.status(500).send(validation.errors.all())
            }

            const {product_id} = req.body;
            
            const category = await Product.destroy({
                where:{
                    id:product_id
                }
            })

            return res.status(200).send({message:"deleted successfully"})

        } catch (error) {
            console.log(error)
            return res.status(500).send(error)            
        }
    }

    public decodeJwt(token:string) {

        var base64Payload = token.split(".")[1];
      
        var payloadBuffer = Buffer.from(base64Payload, "base64");
      
        return JSON.parse(payloadBuffer.toString());
      
      }
}