import { DataTypes } from 'sequelize';
import { DB } from '../configs/DB';

const sequelize = DB.sq()

const department = sequelize.define('department', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    deptName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deptBlock: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deptBranch: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
})

export default department