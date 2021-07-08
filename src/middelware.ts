import { Request, Response } from 'express';
import { Jwt } from './helper/jwt.helper';
import student from './models/student.model';

export class Middleware{
    public static auth = async (req: Request, res: Response, next: () => void) => {
        
        //  Check header for token
        if(req.headers.authorization){
            const tokenInfo = Jwt.decode(req.headers.authorization.toString().replace("Bearer ", ""))
    
            if(tokenInfo){
                const _student = await student.findOne({
                    attributes: ["id", "email", "mobileNo"],
                    where: {
                        id: tokenInfo
                    },
                    raw: true
                }) as any

                if(_student) {
                    req.me = _student
                    next()
                } else{
                    res.status(401).json({
                        "success": false,
                        "message": "Unauthorized User" 
                    })
                }
            } else{
                res.status(401).json({
                    "success": false,
                    "message": "Unauthorized User" 
                })
            }
        }
    }
}

