import { DataTypes } from 'sequelize';
import { DB } from '../configs/DB';

const sequelize = DB.sq()

const admin = sequelize.define('admin', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobileNo: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
}, {
    timestamps: true
})

export default admin