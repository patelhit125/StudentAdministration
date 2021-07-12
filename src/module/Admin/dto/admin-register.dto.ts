import { IsNotEmpty, MaxLength, MinLength, IsEmail, Validate} from 'class-validator';
import { PasswordValidation, PasswordValidationRequirement } from 'class-validator-password-check/lib';

const passwordRequirement: PasswordValidationRequirement = {
    mustContainLowerLetter: true,
    mustContainNumber: true,
    mustContainSpecialCharacter: true,
    mustContainUpperLetter: true
}

export class AdminRegisterDto{
    @MaxLength(50)
    @IsNotEmpty()
    public firstName: string

    @MaxLength(50)
    @IsNotEmpty()
    public lastName: string

    @IsEmail()
    @IsNotEmpty()
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
}