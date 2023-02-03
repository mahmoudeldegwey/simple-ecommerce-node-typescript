import jwt from 'jsonwebtoken'
import { Response,Request,NextFunction } from 'express';
import { User } from '../models/user';

export class JWTTokens {

    public generateToken(user:User){
        return jwt.sign({
            id:user.id,
            username:user.username,
            email:user.email
        },
        "epmdjuk9q",
        {expiresIn:'2 days' });
    }

    public async verifyToken(req:Request,res:Response,next:NextFunction){
        try{

            let token =   req.headers.authorization;
            let strToken =  String(token?.replace("Bearer ",""))
            
            if(!token){
               res.status(500).send({error:'invalid token'})
            }
    
            let decodeToken  =  jwt.verify(strToken,"epmdjuk9q")
            let user = JSON.parse(JSON.stringify(decodeToken))

            req.body.user = {
                id:user.id,
                username:user.username,
                email:user.email
            }

            next();
        }catch(error){
            console.log(error)
            next(error);
        }
    }
}