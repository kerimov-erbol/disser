import {Sequelize} from'sequelize'

const sequelize = new Sequelize(
  process.env.DB_NAME,  //название БД
  process.env.DB_USER,       //пользователь БД
  process.env.DB_PASSWORD,          //пароль
   {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT
  }
);
export default sequelize





