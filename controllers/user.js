// Inmport local modules

// Creating user controllers
const getAllUsers = async (req, res) => {
    res.send('GET All Users.');
}

const getUser = async (req, res) => {
    res.send('GET a specifc User.');
}

const patchUser = async (req, res) => {
    res.send('PATCH and update a specific info from User.');
}

const postUser = async (req, res) => {
    res.send('POST and create an User.');
}

// Exporting functions/methods
module.exports = {
    getAllUsers,
    getUser,
    patchUser,
    postUser
}
