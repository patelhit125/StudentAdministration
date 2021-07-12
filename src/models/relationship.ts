import student from './student.model';
import department from './department.model';

export class Relationship{
    public static define(){
        student.belongsTo(department)
    }
}