// Importing User model
const User = require('../models/user');
// Importing Post model
const Post = require('../models/post');
const { where } = require('sequelize');

// Creating post controlelrs
const getAllPosts = async (req, res) => {
    try{
        // Getting all posts and the model vinculated with it (User) based on id
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['id', 'name']
                }
            ]
        });
        res.status(200).json(posts);
    } catch (err){
        res.status(500).json({
            message: 'Error retriving posts',
            error: err.message
        });
    }
}
// Get a posts by userId
const getPost = async (req, res) => {
    const {id} = req.param;
    try{
        const posts = await Post.findAll({
            where: {userid:id}
        });
        res.status(200).json(posts);
    } catch (err){
        res.status(500).json({
            message: 'Error retriving post by id'
        });
    }
    // res.send('GET an Specific Post.')
}
// Create new Post by User id
const postUserPost = async (req, res) => {
    const {description, img_data=null, userid} = req.body;
    try{
        const newPost = await Post.create({description, img_data, userid});
        res.send(201).json({
            message: 'New Post created successfull',
            post: newPost
        });
    } catch (err){
        res.status(500).json({
            message: 'Create post by user id error',
            error: err.message
        });
    }
}
// Delete a post by postId and UserId
const deletePost = async (req, res) => {
    res.send('DELETE a Post.');
}
// Exporting functions/methods
module.exports = {
    getAllPosts,
    getPost,
    postUserPost,
    deletePost
}