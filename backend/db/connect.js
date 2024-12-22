// Connecting database Postgres with ORM Sequelize
// Importing Sequelize and DataTypes class
const {Sequelize} = require('sequelize');
// Getting connect variables from .env
require('dotenv').config();
const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const paswd = process.env.DB_PASWD;
const db_name = process.env.DB_NAME;
// Creating sequelize instance
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: host,
    username: username,
    password: paswd,
    database: db_name,
    logging: true,
});
// Connect DB function
const connectDB = async () => {
    try{
        await sequelize.authenticate();
        console.log('Connected with DataBase.');
    } catch(err){
        console.log(`DataBase connection error: ${err}`);
    }
}
// Exporting connectDB function
module.exports = connectDB;