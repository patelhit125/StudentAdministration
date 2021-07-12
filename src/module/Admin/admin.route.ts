import { Router } from 'express'
import { Middleware } from '../../middelware';
import { AdminController } from './admin.controller';
import { Validator } from '../../validate';
import { AdminRegisterDto } from './dto/admin-register.dto';
import { AdminLoginDto } from './dto/admin-login.dto';

const v = new Validator()
const adminController = new AdminController()
const router: Router = Router()

router.post("/register", v.validate(AdminRegisterDto), adminController.register)
router.post("/login", v.validate(AdminLoginDto), adminController.login)
router.get("/get-students", Middleware.pagination, adminController.getStudents)

export const adminRoutes: Router = router