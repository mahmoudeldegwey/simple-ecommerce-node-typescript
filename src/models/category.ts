import {  Model, DataTypes } from 'sequelize';
import { sequelize } from '../db'

export class Category extends Model {
    declare id: number;
    declare name: string;    
}
Category.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    sequelize,
    tableName:'categories',
    timestamps:true
});
