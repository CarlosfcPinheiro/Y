// Post entity model ============
// Importing Sequelize and DataTypes class
const {Sequelize, DataTypes} = require('sequelize');
// Import sequelize class to database connect
const sequelize = require('../db/connectModel');
// Import User model entity
const User = require('./user');
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
        userid:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'users',
                key: 'id'
            }
        }
    },
    {
        schema: 'yweb',
        tableName: 'posts',
        timestamps: false
    }
);

// Associations (User -> 1:n -> Post)
Post.belongsTo(User, {foreignKey: 'userid', as: 'author'});
User.hasMany(Post, {foreignKey: 'userid', as: 'posts'});

// Test function to sync database's entity
const testPostModel = async() => {
    try{
        sequelize.sync();
    }catch(err){
        console.log(err);
    }
};
// Exporting Post Model
module.exports = Post;