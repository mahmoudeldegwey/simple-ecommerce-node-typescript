import { Order } from '../models/order';
import { Response,Request } from 'express';
import Validator from 'validatorjs';
import { OrderRequest } from '../requests/order.request';

export class OrderController{
    
    public async index (req:Request ,res:Response){
        try {

            const orders = await Order.findAll();

            return res.status(200).send(orders)

        } catch (error) {
            console.log('error',error)
        }
    }
    
    public async store(req:Request ,res:Response){
        try {
            
            let validation = new OrderRequest().rules(req);
            
            if(!validation.passes()){
                return res.status(500).send(validation.errors.all())
            }

            const {total_price,total_quantity,payment_type,shipping_type,user} = req.body;
            const order_number = `OR-${new Date().toString()}`;
            const user_id = user.id;

            const order = await Order.create({user_id:user_id,order_number:order_number,total_price:total_price,total_quantity:total_quantity,shipping_type:shipping_type,payment_type:payment_type})
            
            return res.status(200).send({message:"create order successfully"})

        } catch (error) {
            console.log(error)
            return res.status(500).send(error)            
        }
    }

    public async delete(req:Request ,res:Response){
        try {
            
            let validation = new Validator(req.body, {
                order_id:'required'
            });
            
            if(!validation.passes()){
                return res.status(500).send(validation.errors.all())
            }

            const {order_id} = req.body;
            
            await Order.destroy({
                where:{
                    id:order_id
                }
            })

            return res.status(200).send({message:"deleted successfully"})

        } catch (error) {
            console.log(error)
            return res.status(500).send(error)            
        }
    }

}