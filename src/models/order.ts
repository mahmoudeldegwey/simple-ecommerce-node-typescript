import {  Model, DataTypes } from 'sequelize';
import { sequelize } from '../db'

export class Order extends Model {
    declare id: number;
    declare user_id: number;
    declare total_price:number;
    declare total_quantity: number;
    declare order_number: string;
    declare payment_type: string; 
    declare shipping_type: string; 
}
Order.init({
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  order_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  payment_type: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  shippin_type: {
    type: DataTypes.STRING,
    allowNull: false
  },

},{
    sequelize,
    tableName:'orders',
    timestamps:true
});