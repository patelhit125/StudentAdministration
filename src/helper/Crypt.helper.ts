import bcrypt from 'bcrypt';

export class Crypter {
    public static encrypt(password: string){
        return bcrypt.hash(password, 10)
    }

    public static compare(plainPass: string, hashPass: string){
        return bcrypt.compare(plainPass, hashPass)
    }
}