import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';

import student from '../../../models/student.model';

@ValidatorConstraint({ async: true })
export class CheckStudentExistsConstraint implements ValidatorConstraintInterface{
    public validate(email: string){
        return student.findOne({
            attributes: ["id"],
            where: {
                email: email.trim()
            }
        }).then((_student) => {
            if(_student) return true
            else return false
        })
    }

    public defaultMessage(){
        return "No student with $value exists."
    }
}

export function CheckStudentExists(validationOptions?: ValidationOptions){
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: CheckStudentExistsConstraint
        })
    }
}