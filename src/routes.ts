import { Router } from 'express';
import { studentRouter } from './module/student/student.route';

export class Routes{
    public configure(){
        const router = Router()

        router.use("/student", studentRouter)

        return router
    }
}

