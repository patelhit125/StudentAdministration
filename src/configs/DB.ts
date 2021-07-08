import { Sequelize } from 'sequelize';
import env from './env';

export class DB{
    public static instance: DB;
    private sequelize: Sequelize;

    public static resetDBIfNeeded(): void {
        if((env.nodeEnv && env.nodeEnv === "development") &&
          (env.dropAndCreate && env.dropAndCreate === "true")){
                DB.sq().sync({ force: true }).then(() => {
                    console.log("Database Reseted")
                })
          }
    }

    public static sq(): Sequelize{
        return DB.gI().sequelize;
    }

    public static gI(): DB {
        if(!DB.instance){
            DB.instance = new DB()
        }

        return DB.instance
    }

    constructor() {
        this.sequelize = new Sequelize(
            env.dbName, env.dbUser, env.dbPassword, {
                host:env.dbHost,
                dialect: "mysql"
            }
        )

        this.sequelize.authenticate()
            .then(() => {
                console.log("DB connection established successfully")
            })
            .catch((err) => {
                console.log(`Failed to set up connection with DB\n: ${err}`)
            })
        
        this.sequelize.sync()
    }
}