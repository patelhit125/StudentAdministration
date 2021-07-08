import { Request, Response } from 'express';
import admin from '../../models/admin.model';
import { Crypter } from '../../helper/Crypt.helper';
import { Jwt } from '../../helper/jwt.helper';
import { AdminRegisterDto } from './dto/admin-register.dto';

export class AdminController{
    public async register(req: Request, res: Response) {
        const {firstName, lastName, email, 
               password, mobileNo} = req.dto as AdminRegisterDto
        
        const encryptPass = await Crypter.encrypt(password)

        const _admin = await admin.create({
            firstName,
            lastName,
            email: email.trim(),
            password,
            mobileNo
        }) as any

        if(_admin){
            const token = Jwt.encode(_admin.id)
            res.status(200).json({
                "success": true,
                "token": token
            })
        } else {
            res.status(500).json({
                "success": false,
                "message": "Registration Failed!!"
            })
        }
    }
}