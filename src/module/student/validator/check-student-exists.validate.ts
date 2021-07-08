import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';

import student from '../../../models/student.model';

@ValidatorConstraint({ async: true })
export class CheckStudentExistsConstraint implements ValidatorConstraintInterface{
    public validate(enrollmentNo: string){
        return student.findOne({
            attributes: ["email"],
            where: {
                enrollmentNo
            }
        }).then((_student) => {
            if(_student) return true
            else return false
        })
    }

    public defaultMessage(){
        return "No student with Enrollment Number $value exists."
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