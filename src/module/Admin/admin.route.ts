import { Router } from 'express'
import { Middleware } from '../../middelware';
import { AdminController } from './admin.controller';
import { Validator } from '../../validate';
import { AdminRegisterDto } from './dto/admin-register.dto';

const v = new Validator()
const adminController = new AdminController()
const router: Router = Router()

router.post("/register", v.validate(AdminRegisterDto), adminController.register)