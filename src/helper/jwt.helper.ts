import * as jwt from 'jsonwebtoken';
import env from '../configs/env';

export class Jwt {
    public static encode(code){
        return jwt.sign(code, env.jwtSecret)
    }

    public static decode(token){
        if(token){
            try{
                return jwt.verify(token, env.jwtSecret)
            } catch(err){
                return false
            }
        }
        return false
    }
}