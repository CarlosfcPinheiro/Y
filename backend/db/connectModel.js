const {Sequelize} = require('sequelize');
const password = 'yweb135792468YWEB'
// Getting var envs
require('dotenv').config();
const host = process.env.DB_HOST;
const db_name = process.env.DB_NAME;
const port = process.env.DB_PORT;
const paswd = process.env.DB_PASWD;
const user = process.env.DB_USER;
// Instanciating Sequelize class => Manage and config database creating models

const sequelize = new Sequelize(`postgres://${user}:${paswd}@${host}:${port}/${db_name}`, 
    {
        dialect:'postgres',
        define: {
            schema: 'yweb'
        }
    }
);
// Exporting sequelize instance
module.exports = sequelize;