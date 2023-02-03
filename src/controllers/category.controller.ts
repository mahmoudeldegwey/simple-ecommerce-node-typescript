import { Category } from '../models/category';
import { Response,Request } from 'express';
import Validator from 'validatorjs';
import { CategoryRequest } from '../requests/category.request';

export class CategoryController{
    
    public async index (req:Request ,res:Response){

        try {

            const categories = await Category.findAll();

            return res.status(200).send(categories)

        } catch (error) {
            console.log('error',error)
        }
    }
    
    public async store(req:Request ,res:Response){
        try {
            
            let validation = new CategoryRequest().rules(req);
            
            if(!validation.passes()){
                return res.status(500).send(validation.errors.all())
            }

            const {name} = req.body;

            const category = await Category.create({name:name})
            
            return res.status(200).send({data:category})

        } catch (error) {
            console.log(error)
            return res.status(500).send(error)            
        }
    }

    public async update(req:Request ,res:Response){
        try {
            
            let validation = new CategoryRequest().rules(req);

            if(!validation.passes()){
                return res.status(500).send(validation.errors.all())
            }

            const {name,category_id} = req.body;
            
            const updateCategory = await Category.update({name:name},{
                where:{
                    id:category_id
                }
            })
            
            if(updateCategory){
                const category = await Category.findByPk(category_id)
                return res.status(200).send({data:category})
            }else{
                return res.status(200).send({message:"failed to update category"})
            }

        } catch (error) {
            return res.status(500).send(error)            
        }
    }

    public async delete(req:Request ,res:Response){
        try {
            
            let validation = new Validator(req.body, {
                category_id:'required'
            });
            
            if(!validation.passes()){
                return res.status(500).send(validation.errors.all())
            }

            const {category_id} = req.body;
            
            const category = await Category.destroy({
                where:{
                    id:category_id
                }
            })

            return res.status(200).send({message:"deleted successfully"})

        } catch (error) {
            console.log(error)
            return res.status(500).send(error)            
        }
    }

}