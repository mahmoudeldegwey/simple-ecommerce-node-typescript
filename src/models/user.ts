import {  Model, DataTypes } from 'sequelize';
import { sequelize } from '../db'

export class User extends Model {
    declare id: number;
    declare username: string;
    declare email: string;
    declare password: string;
    
}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    sequelize,
    tableName:'users',
    timestamps:false
});
