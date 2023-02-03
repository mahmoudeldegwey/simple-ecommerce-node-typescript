import { Cart } from '../models/cart';
import { Response,Request } from 'express';
import Validator from 'validatorjs';
import { CartRequest } from '../requests/cart.request';

export class CartController{
    
    public async productsList (req:Request ,res:Response){
        try {

            const products = await Cart.findAll();

            return res.status(200).send(products)

        } catch (error) {
            console.log('error',error)
        }
    }
    
    public async storeProduct(req:Request ,res:Response){
        try {
            
            let validation = new CartRequest().rules(req);
            
            if(!validation.passes()){
                return res.status(500).send(validation.errors.all())
            }

            const {product_id,product_name,product_image,quantity,total_price,user} = req.body;
            const user_id = user.id;

            await Cart.create({user_id:user_id,product_id:product_id,product_name:product_name,product_image:product_image,quantity:quantity,total_price:total_price})
            
            return res.status(200).send({message:"store product to cart successfully"})

        } catch (error) {
            console.log(error)
            return res.status(500).send(error)            
        }
    }

    public async updateQunatity(req:Request ,res:Response){
        try {
            
            let validation = new Validator(req.body, {
                cart_id:'required',
                quantity:'required'
            });

            if(!validation.passes()){
                return res.status(500).send(validation.errors.all())
            }

            const {quantity,cart_id} = req.body;
            
            const updateCart = await Cart.update({quantity:quantity},{
                where:{
                    id:cart_id
                }
            })
            
            return res.status(200).send({message:"update product quantity successfully"})

        } catch (error) {
            return res.status(500).send(error)            
        }
    }

    public async deleteProduct(req:Request ,res:Response){
        try {
            
            let validation = new Validator(req.body, {
                cart_id:'required'
            });
            
            if(!validation.passes()){
                return res.status(500).send(validation.errors.all())
            }

            const {cart_id} = req.body;
            
            await Cart.destroy({
                where:{
                    id:cart_id
                }
            })

            return res.status(200).send({message:"deleted successfully"})

        } catch (error) {
            console.log(error)
            return res.status(500).send(error)            
        }
    }

}