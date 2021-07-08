import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { CheckStudentExists } from '../validator/check-student-exists.validate';

export class StudentLoginDto{

    @MaxLength(12)
    @MinLength(12)
    @IsNotEmpty()
    @CheckStudentExists()
    public enrollmentNo: string

    @IsNotEmpty()
    public password: string
}