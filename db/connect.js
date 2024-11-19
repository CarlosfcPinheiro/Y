// Connecting database Postgres with ORM Sequelize
// Importing Sequelize and DataTypes class
const {Sequelize} = require('sequelize');
// Creating sequelize instance
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    username: 'postgres.wotdyyymccicaspuxktw',
    password: 'toor!@#123R',
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

connectDB();
