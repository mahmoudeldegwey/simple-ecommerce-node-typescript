import { User as UserModel, User } from '../models/user';
import { Response,Request } from 'express';
import Validator from 'validatorjs';
import bcrypt from 'bcrypt';
import { JWTTokens } from '../utill/JWTTokens';
import jwt from 'jsonwebtoken';

export class Authenticate{
    
    public async login (req:Request ,res:Response){

        try {
            
            let validation = new Validator(req.body, {
                password:'required',
                email:'required|email',
            });
            
            if(!validation.passes()){
                return res.status(500).send(validation.errors.all())
            }

            const {email,password} = req.body;
            
            const user = await UserModel.findOne({ where: { email: email } });

            if(!user){
                return res.status(500).send({message:"this user not found, incroect email or password"})
            }            

            const checkPassword = await bcrypt.compare(password, user.password);
        
            // if(!checkPassword) {
            //     return res.status(500).send({message:"this user not found, incroect email or password"})
            // }

            const  token = new JWTTokens().generateToken(user);

            return res.status(200).send({token:token})

        } catch (error) {
            console.log('error',error)
        }
    }
    
    public async register(req:Request ,res:Response){
        try {
            
            let validation = new Validator(req.body, {
                username:'required',
                email:'required|email',
                password:'required|confirmed'
            });
            
            if(!validation.passes()){
                return res.status(500).send(validation.errors.all())
            }

            const {username,email,password} = req.body;
            
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);

            const userExist = await UserModel.findOne({ where: { email: email } });

            if(userExist){
                return res.status(200).send({message:"this email already exist, please login "})
            }            

            const user = await UserModel.create({username:username,email:email,password:hashPassword})
            
            const  token = new JWTTokens().generateToken(user);

            return res.status(200).send({message:'Success Register',token:token})

        } catch (error) {
            console.log(error)
            return res.status(500).send(error)            
        }

    }
}