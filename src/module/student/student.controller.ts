import { Request, Response } from 'express';
import student  from '../../models/student.model';
import department from '../../models/department.model';
import { StudentRegisterDto } from './dto/student-register.dto';
import { Crypter } from '../../helper/Crypt.helper';
import { Jwt } from '../../helper/jwt.helper'
import { StudentLoginDto } from './dto/student-login.dto';
import { StudentEditDto } from './dto/student-edit.dto';

export class StudentController{

    public async register(req: Request, res: Response){
        const {enrollmentNo, firstName, lastName, semester, dob, gender, 
            email, password, branch, mobileNo} = req.dto as StudentRegisterDto
        
        const _dept = await department.findOne({
            attributes: ["id"],
            where: {
                deptBranch: branch
            }
        }) as any
        
        const cryptPass = await Crypter.encrypt(password)

        const _student = await student.create({
            enrollmentNo,
            firstName: firstName,
            lastName: lastName,
            semester: semester,
            dob,
            gender,
            email: email.trim(),
            password: cryptPass,
            mobileNo: mobileNo,
            branch: branch,
            departmentId: _dept.id
        }) as any

        if(_student) {
            const jwtToken = Jwt.encode(_student.enrollmentNo)
            res.status(200).json({
                "success": true,
                "token": jwtToken
            })
        }else{
            res.status(400).json({
                "success": false,
                "message": "Failed to Register student."
            })
        }
    }

    public async login(req: Request, res: Response) {
        const { enrollmentNo, password } = req.dto as StudentLoginDto

        const _student = await student.findOne({
            attributes: ["email", "password", "mobileNo"],
            where: {
                enrollmentNo
            }
        }) as any

        if(_student) {
            const compare = await Crypter.compare(password, _student.password)
            if(compare){
                const token = Jwt.encode(enrollmentNo)

                res.status(200).json({
                    "success": true,
                    "token": token
                })
            } else {
                res.status(401).json({
                    "success": false,
                    "message": "Unauthorized User."
                })
            }
        } else {
            res.status(401).json({
                "success": false,
                "message": "Failed to login in."
            })
        }  
    }

    public async edit(req: Request, res: Response) {
        
        const {firstName, lastName, semester, 
            email, mobileNo, branch } = req.dto as StudentEditDto
        
        const { enrollmentNo } = req.me

        const _dept = await department.findOne({
            attributes: ["id"],
            where: {
                deptBranch: branch
            }
        }) as any

        const _student = await student.update({
            firstName,
            lastName, 
            semester,
            email,
            mobileNo,
            branch,
            departmentId: _dept.id
        },{ 
            where: {
                enrollmentNo
            }
        }) as any

        if(_student) {

            res.status(200).json({
                "success": true,
                "message": "Student Information modified successfully"
            })
        }
    }

    public async getProfile(req: Request, res: Response){
        const { enrollmentNo } = req.me 

        const _student = await student.findOne({
            attributes: {
                exclude: ["password", "departmentId"]
            }, 
            where: {
                enrollmentNo,
            },
            include: [{
                model: department,
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            }]
        })

        if(_student){
            res.status(200).json({
                "success": true,
                "data": _student
            })
        } else {
            res.status(404).json({
                "success": false,
                "message": "Resource not available"
            })
        }
    }

    public async deleteAcc(req: Request, res: Response) {
        const { enrollmentNo } = req.me

        const _validation = await student.destroy({
            where: {
                enrollmentNo: enrollmentNo
            }
        })

        res.status(200).json({
            "success": true,
            "data": _validation
        })
    }
}
