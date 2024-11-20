// User entity model =============
// Importing Sequelize and DataTypes class
const {Sequelize, DataTypes} = require('sequelize');
// Getting var env
const sequelize = require('../db/connectModel');

// Defining User model
const User = sequelize.define(
    'User',
    {
        // Defining attributes
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING(40),
            allowNull: false
        },
        password:{
            type: DataTypes.STRING(16),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(40),
            allowNull: false
        },
        posts_qnt:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW
        }
    },
    {
        tableName: 'users',
        timestamps: false
    }
);
// Test function to sync database's entity
const testUserModel = () => {
    try{
        sequelize.sync();
    } catch(err){
        console.log(err);
    }
}
testUserModel();
// Exporting User model
module.exports = User;