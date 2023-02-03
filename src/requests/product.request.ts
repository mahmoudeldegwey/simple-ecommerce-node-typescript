import Validator from 'validatorjs';
import { Request } from 'express';

export class ProductRequest {

    public rules (req:Request){
    
        let validation = new Validator(req.body, {
            name:'required',
            description:'required',
            price:'required',
    //        image:'required',
            category_id:'required',
            quantity:'required'
        });

        return validation;
    }
}