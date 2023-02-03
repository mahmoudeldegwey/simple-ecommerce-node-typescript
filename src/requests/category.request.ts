import Validator from 'validatorjs';
import { Request } from 'express';

export class CategoryRequest {

    public rules (req:Request){
    
        let validation = new Validator(req.body, {
            name:'required'
        });

        return validation;
    }
}