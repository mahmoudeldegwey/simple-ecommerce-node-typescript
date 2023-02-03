import Validator from 'validatorjs';
import { Request } from 'express';

export class OrderRequest {

    public rules (req:Request){
    
        let validation = new Validator(req.body, {
            total_price:'required',
            shipping_type:'required',
            payment_type:'required',
            total_quantity:'required',
        });

        return validation;
    }
}