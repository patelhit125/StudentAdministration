import student from './student.model';
import course from './course.model';
import department from './department.model';

export class Relationship{
    public static define(){
        student.belongsTo(department)
        student.belongsToMany(course, { through: "studCourse" })
    }
}