// Connecting database Postgres with ORM Sequelize
// Importing Sequelize and DataTypes class
const {Sequelize} = require('sequelize');
// Getting connect variables from .env
require('dotenv').config();
const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const pswd = process.env.DB_PSWD;
// Creating sequelize instance
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: host,
    username: username,
    password: pswd,
    database: 'postgres',
    logging: true,
});

const connectDB = async () => {
    try{
        await sequelize.authenticate();
        console.log('Connected with DataBase.');
    } catch(err){
        console.log(`DataBase connection error: ${err}`);
    }
}

module.exports = connectDB;