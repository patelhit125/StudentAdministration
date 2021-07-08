import { IsNotEmpty, IsEmail } from 'class-validator';
import { CheckStudentExists } from '../validator/check-student-exists.validate';

export class StudentLoginDto{

    @IsNotEmpty()
    @IsEmail()
    @CheckStudentExists()
    public email: string

    @IsNotEmpty()
    public password: string
}