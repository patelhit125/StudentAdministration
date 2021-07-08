import { IsNotEmpty, MaxLength, MinLength, IsEmail, Validate} from 'class-validator';
import { PasswordValidation, PasswordValidationRequirement } from 'class-validator-password-check/lib';
import { IfStudentAlreadyExists } from '../validator/if-student-already-exists.validate';

const passwordRequirement: PasswordValidationRequirement = {
    mustContainLowerLetter: true,
    mustContainNumber: true,
    mustContainSpecialCharacter: true,
    mustContainUpperLetter: true
}

export class StudentRegisterDto{
    @MaxLength(50)
    @IsNotEmpty()
    public firstName: string

    @MaxLength(50)
    @IsNotEmpty()
    public lastName: string

    @IsNotEmpty()
    public semester: string

    @IsEmail()
    @IsNotEmpty()
    @IfStudentAlreadyExists()
    public email: string

    @Validate(PasswordValidation, [passwordRequirement])
    @MaxLength(20)
    @MinLength(5)
    @IsNotEmpty()
    public password: string

    @MaxLength(10)
    @MinLength(10)
    @IsNotEmpty()
    public mobileNo: string

    @IsNotEmpty()
    public branch: string
}