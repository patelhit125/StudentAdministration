import * as dotenv from 'dotenv';
import { IsIn, IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

dotenv.config({ path: '../.env' })

class Env{

    @IsNotEmpty()
    public dbName: string
    
    @IsNotEmpty()
    public dbHost: string

    @IsNotEmpty()
    public dbUser: string

    @IsNotEmpty()
    public dbPassword: string

    @IsOptional()
    @IsIn(["true", "false"])
    public dropAndCreate: string

    @IsInt()
    @Min(2000)
    @Max(9999)
    public port: number

    @IsNotEmpty()
    public nodeEnv: string

    @IsNotEmpty()
    public jwtSecret: string

    @IsNotEmpty()
    public corsDomain: string

}

const env = new Env()
env.dbName = process.env.DB_NAME
env.dbHost = process.env.DB_HOST
env.dbUser = process.env.DB_USER
env.dbPassword = process.env.DB_PASSWORD
env.dropAndCreate = process.env.DROP_AND_RECREATE_DB

env.port = +(process.env.PORT)

env.nodeEnv = process.env.NODE_ENV

env.jwtSecret = process.env.JWT_SECRET

env.corsDomain = process.env.CORS_DOMAIN
export default env