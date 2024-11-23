// Importing modules
const express = require('express');
// Creating router object
const Router = express.Router();
// Importing local controllers
const {
    getAllPosts,
    getPost,
    postUserPost,
    deletePost
} = require('../controllers/post');

// Attribute routes to http methods
Router.route('/').get(getAllPosts);
Router.route('/:userid').get(getPost);
Router.route('/').post(postUserPost);
Router.route('/:id').delete(deletePost);

// Exporting post router
module.exports = Router;