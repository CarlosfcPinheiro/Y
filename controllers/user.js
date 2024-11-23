// Importing hash function
const {hashPaswd} = require('../utils/hash');
// Inmport User Model
const User = require('../models/user');

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
            message:'Error to get users', 
            error: err.message
        });
    }
}
// Get a specific user based on id
const getUser = async (req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findAll({
            where: {id:id}
        });
        res.status(200).json({user});
    } catch (err){
        res.status(500).json({
            message: 'Get user by id error',
            error: err.message
        });
    }
}
// Updated a specific data on the user based on id
const patchUser = async (req, res) => {
    try{
        // Get the id value on param
        const {id} = req.params;
        const updateData = req.body

        const [updated] = await User.update(updateData, {
            // Update all instances that matches attribute 'where'
            where: {id:id}
        });

        // Return message to use
        if (updated){
            const updatedUser = await User.findByPk(id);
            res.status(200).json({
                message: "User updated successfuly",
                User: updatedUser
            });
        }
    } catch(err){
        res.status(500).json({
            message: 'Update user error',
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
            message: 'User created successfuly',
            user: {newUser}
        });
    }catch(err){
        res.status(500).json({
            message: 'Create user error', 
            error: err.message
        });
    }
}

// Exporting functions/methods
module.exports = {
    getAllUsers,
    getUser,
    patchUser,
    postUser
}