// Importing User model
const User = require('../models/user');
// Importing Post model
const Post = require('../models/post');

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

const getPost = async (req, res) => {
    res.send('GET an Specific Post.');
}

const postUserPost = async (req, res) => {
    res.send('POST an User Post.');
}

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