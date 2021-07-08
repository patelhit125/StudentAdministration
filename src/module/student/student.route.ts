import { StudentController } from "./student.controller";
import { Router } from 'express';
import { Validator } from '../../validate';
import { StudentRegisterDto } from "./dto/student-register.dto";
import { StudentLoginDto } from "./dto/student-login.dto";
import { StudentEditDto } from "./dto/student-edit.dto";
import { Middleware } from "../../middelware";

const studentController = new StudentController()
const router: Router = Router()
const v = new Validator()

router.post("/register", v.validate(StudentRegisterDto), studentController.register)
router.post("/login", v.validate(StudentLoginDto), studentController.login)
router.put("/edit", v.validate(StudentEditDto), Middleware.auth, studentController.edit)
router.get("/get-profile", Middleware.auth, studentController.getProfile)
router.delete("/delete", Middleware.auth, studentController.deleteAcc)

export const studentRoutes: Router = router