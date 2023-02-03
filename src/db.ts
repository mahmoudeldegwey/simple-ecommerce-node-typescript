import { Sequelize} from 'sequelize';

export const sequelize = new Sequelize("ecommerce-app", "root", "root", {
  host: "localhost",
  dialect: 'mysql'
});