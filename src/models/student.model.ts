import { DataTypes } from "sequelize";
import { DB } from '../configs/DB';

const sequelize = DB.sq()

const student = sequelize.define('student', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    semester: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobileNo: {
        type: DataTypes.BIGINT,
        unique: true
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: true
})

export default student