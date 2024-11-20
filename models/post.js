// Post entity model ============
// Importing Sequelize and DataTypes class
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../db/connectModel');
const { postUser } = require('../controllers/user');
// Creating Post Model
const Post = sequelize.define(
    'Post',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING(200),
            allowNull: true
        },
        img_data:{
            type: DataTypes.BLOB,
            allowNull: true
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'users',
                key: 'id'
            }
        }
    },
    {
        tableName: 'posts',
        timestamps: false
    }
);

// Test function to sync database's entity
const testPostModel = () => {
    try{
        sequelize.sync();
    }catch(err){
        console.log(err);
    }
};
testPostModel();

// Exporting Post Model
module.exports = Post;