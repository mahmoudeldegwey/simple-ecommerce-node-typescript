import {  Model, DataTypes } from 'sequelize';
import { sequelize } from '../db'

export class Cart extends Model {
    declare id: number;
    declare product_id: number;    
    declare user_id: number;
    declare quantity: number;
    declare product_name: string;
    declare product_image: string; 
    declare total_price: number; 
}
Cart.init({
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  product_image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total_price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
},{
    sequelize,
    tableName:'cart',
    timestamps:true
});