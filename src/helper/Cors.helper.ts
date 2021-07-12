import cors from "cors";
import { Application } from 'express';
import env from '../configs/env';

export class Cors{
    public static enable(app: Application): void {
        
        const whitelist = env.corsDomain.split(",")

        var corsOption = {
            origin: function(origin, callback) {
                if(!origin || whitelist.indexOf(origin) !== -1){
                    callback(null, true)
                } else {
                    callback(new Error("Not allowed by CORS"))
                }
            }
        }

        app.use((cors(corsOption)))
        app.options("*", cors())
    }
}