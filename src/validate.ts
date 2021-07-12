import { validate } from "class-validator";
import { Request, Response } from 'express';

export class Validator {

    public validate<T extends object>(objType: new() => T){
        return(req: Request, res: Response, next) => {
            const obj = this.createInstanceFromJson(objType, {...req.body, ...req.params})
            
            validate(obj).then((err) => {
                if(err.length) {
                    const _error = err[0].constraints;
                    const [first] = Object.keys(_error);
                    const error = _error[first];
                    return res.status(400).json({ error });
                } 
                
                req.dto = obj
                next()
            })
        }
    }

    public createInstanceFromJson<T>(objType: new () => T, json: any) {
        const newObj = new objType()
        for(const ppty in json){
            if({}.propertyIsEnumerable.call(json, ppty)) {
                newObj[ppty] = json[ppty]
            }
        }

        return newObj
    }
}