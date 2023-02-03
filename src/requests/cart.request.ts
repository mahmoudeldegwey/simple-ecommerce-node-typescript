import Validator from 'validatorjs';
import { Request } from 'express';

export class CartRequest {

    public rules (req:Request){
    
        let validation = new Validator(req.body, {
            product_id:'required',
            product_name:'required',
            product_image:'required',
            quantity:'required',
            total_price:'required',
        });

        return validation;
    }
}