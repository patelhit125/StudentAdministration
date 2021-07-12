import { IsNotEmpty, IsEmail } from 'class-validator';

export class AdminLoginDto{

    @IsNotEmpty()
    @IsEmail()
    public email: string

    @IsNotEmpty()
    public password: string
}