// Importing libraries
const express = require('express');
// Creating Router object
const Router = express.Router();

// Importing local controllers
const {
    getAllUsers,
    getUser,
    patchUser,
    postUser
} = require('../controllers/user');

// Attribute routes to http methods
Router.route('/').get(getAllUsers);
Router.route('/:id').get(getUser);
Router.route('/:id').patch(patchUser);
Router.route('/').post(postUser);

// Exporting User router
module.exports = Router;