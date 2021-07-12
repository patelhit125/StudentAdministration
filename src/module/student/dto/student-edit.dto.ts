import { IsNotEmpty, MaxLength, MinLength, IsEmail} from 'class-validator';

export class StudentEditDto{

    @MaxLength(50)
    @IsNotEmpty()
    public firstName: string

    @MaxLength(50)
    @IsNotEmpty()
    public lastName: string

    @IsNotEmpty()
    public semester: string

    @IsNotEmpty()
    public dob: string

    @IsNotEmpty()
    public gender: string

    @IsEmail()
    @IsNotEmpty()
    public email: string

    @MaxLength(10)
    @MinLength(10)
    @IsNotEmpty()
    public mobileNo: string

    @IsNotEmpty()
    public branch: string
}