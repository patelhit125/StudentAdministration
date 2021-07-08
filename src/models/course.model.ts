import { DataTypes } from "sequelize";
import { DB } from '../configs/DB';

const sequelize = DB.sq()

const course = sequelize.define('course', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    courseCode: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
})

export default course