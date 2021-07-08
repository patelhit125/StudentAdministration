import { Router } from 'express';
import { studentRoutes } from './module/student/student.route';
import { adminRoutes } from './module/Admin/admin.route';

export class Routes{
    public configure(){
        const router = Router()

        router.use("/student", studentRoutes)
        router.use("/admin", adminRoutes)

        return router
    }
}

