import { validate } from "class-validator";

export class Validator {

    public validate<T extends object>(objType: new() => T){
        return(req, res, next) => {
            const obj = this.createInstanceFromJson(objType, {...req.body, ...req.params})

            validate(obj).then((err) => {
                if(err.length) {
                    res.status(400).json({ err })
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