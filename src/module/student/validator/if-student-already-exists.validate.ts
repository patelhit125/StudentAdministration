import  {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';

import student from '../../../models/student.model';

@ValidatorConstraint({ async: true })
export class IfStudentAlreadyExistsConstriant implements ValidatorConstraintInterface{
    public validate(email: string){
        return student.findOne({
            attributes: ["id"],
            where: {
                email: email.trim()
            }
        }).then((_student) => {
            if(_student) return false
            else return true
        })
    }

    public defaultMessage(){
        return "Student with $value already exists."
    }
}

export function IfStudentAlreadyExists(validationOptions?: ValidationOptions){
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IfStudentAlreadyExistsConstriant
        })
    }
}