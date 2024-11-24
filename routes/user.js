// Importing libraries
const express = require('express');
// Creating Router object
const Router = express.Router();
// Importing local controllers
const {
    getAllUsers,
    getUser,
    patchUser,
    postUser,
    postLoginUser
} = require('../controllers/user');
// Importing middlewares
const authToken = require('../middlewares/auth');

// Appllying middlewares
Router.patch('/:id', authToken);

// Attribute routes to http methods
Router.route('/').get(getAllUsers);
Router.route('/:id').get(getUser);
Router.route('/:id').patch(patchUser);
Router.route('/').post(postUser);
Router.route('/login').post(postLoginUser);

// Exporting User router
module.exports = Router;