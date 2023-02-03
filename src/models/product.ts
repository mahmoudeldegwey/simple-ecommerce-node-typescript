import {  Model, DataTypes } from 'sequelize';
import { sequelize } from '../db'

export class Product extends Model {
    declare id: number;
    declare name: string;    
    declare description: string;
    declare price: number;
    declare category_id: number;
    declare image: string; 
    declare quantity: number; 
}
Product.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
},{
    sequelize,
    tableName:'products',
    timestamps:true
});