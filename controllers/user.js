// Importing hash function
const {hashPaswd, verifyPaswd} = require('../utils/hash');
// Importing jwt module
const jwt = require('jsonwebtoken');
// Inmport User Model
const User = require('../models/user');
// Getting var envs
require('dotenv').config();

// Creating user controllers ============
// Getting all users
const getAllUsers = async (req, res) => {
    // Object destructuring with default value 'name'
    const {sortBy='name', order='ASC'} = req.query;
    try{
        const users = await User.findAll({
            order: [[sortBy, order.toUpperCase()]]
        });
        res.status(200).json(users);
    } catch(err){
        res.status(500).json({
            message:'Error to get users.', 
            error: err.message
        });
    }
}
// Get a specific user based on id
const getUser = async (req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findOne({
            where: {id:id}
        });
        // Checks if the user exists
        if (!user){
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.status(200).json({user});
    } catch (err){
        res.status(500).json({
            message: 'Get user by id error.',
            error: err.message
        });
    }
}
// Updated a specific data on the user based on id
const patchUser = async (req, res) => {
    try{
        // Get the id value on param
        const {id} = req.params;
        const updateData = req.body;
        // Verify if the id of token auth is equal to id param
        if (req.user.id != id){
            return res.status(403).json({
                message: 'Access denied.'
            });
        }

        const [updated] = await User.update(updateData, {
            // Update all instances that matches attribute 'where'
            where: {id:id}
        });

        // Return message to use
        if (updated){
            const updatedUser = await User.findByPk(id);
            res.status(200).json({
                message: "User updated successfuly.",
                User: updatedUser
            });
        }
    } catch(err){
        res.status(500).json({
            message: 'Update user error.',
            error: err.message
        });
    }
}
// Create a new user
const postUser = async (req, res) => {
    try{
        // Getting credentials from the request body
        let {name, email, password} = req.body;
        // Hash password to include on database
        password = await hashPaswd(password);
        // Creating new row in database
        const newUser = await User.create({name, email, password});
        // Config response
        res.status(201).json({
            message: 'User created successfuly.',
            user: {newUser}
        });
    }catch(err){
        res.status(500).json({
            message: 'Create user error.', 
            error: err.message
        });
    }
}

// Login with an existing User
const postLoginUser = async (req, res) => {
    const {name, password} = req.body;
    try{
        // Find user by name provided
        const user = await User.findOne({
            where: {name}
        });
        // Check if name user is valid
        if (!user){
            return res.status(404).json({
                message: `User with name "${name}" not found.`
            });
        }
        // Verify the password
        const verifyPassword = await verifyPaswd(password, user.password);
        if (!verifyPassword){
            return res.status(401).json({
                message: 'Invalid password.'
            });
        }

        // Generate encrypted jwt based on secret key
        const token = jwt.sign({id: user.id, name: user.name}, process.env.SECRET_KEY, {
            expiresIn: '1h'
        });

        res.status(200).json({
            message: 'Login successfully.',
            authToken: token
        });
    } catch(err){
        res.status(500).json({
            message: 'Login error.',
            error: err.message
        })
    }
}

// Exporting functions/methods
module.exports = {
    getAllUsers,
    getUser,
    patchUser,
    postUser,
    postLoginUser
}