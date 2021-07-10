import { Request, Response } from 'express';
import admin from '../../models/admin.model';
import { Crypter } from '../../helper/Crypt.helper';
import { Jwt } from '../../helper/jwt.helper';
import { AdminRegisterDto } from './dto/admin-register.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import student from '../../models/student.model';
import department from '../../models/department.model';

export class AdminController{
    public async register(req: Request, res: Response) {
        const {firstName, lastName, email, 
               password, mobileNo} = req.dto as AdminRegisterDto
        
        const encryptPass = await Crypter.encrypt(password)

        const _admin = await admin.create({
            firstName,
            lastName,
            email: email.trim(),
            password: encryptPass,
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

    public async login(req: Request, res: Response) {
        const { email, password } = req.dto as AdminLoginDto

        const _admin = await admin.findOne({
            attributes: ["id", "password"],
            where: {
                email: email.trim()
            }
        }) as any

        if(_admin) {
            const isPassValid = await Crypter.compare(password, _admin.password)
            if(isPassValid){
                const token = Jwt.encode(_admin.id)

                res.status(200).json({
                    "success": true,
                    "token": token,
                })
            } else {
                res.status(401).json({
                    "success": false,
                    "message": "Unauthorized User"
                })
            }
        } else {
            res.status(401).json({
                "success": false,
                "message": "Unauthorized User"
            })
        }
    }

    public async getStudents(req: Request, res: Response) {
        const { page, limit } = req.pager

        const _students = await student.findAll({
            attributes: {
                exclude: ["password", "departmentId"]
            },
            include: [{
                model: department,
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            }],
            offset: (page - 1) * limit,
            limit: limit
        })

        if(_students) {
            res.status(200).json({
                "success": true,
                "data": _students
            })
        } else{
            res.status(500).json({
                "success": false,
                "message": "Failed to load data."
            })
        }
    }
}