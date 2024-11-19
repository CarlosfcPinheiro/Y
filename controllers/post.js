// Importing local modules

// Creating post controlelrs
const getAllPosts = async (req, res) => {
    res.send('GET All Posts.');
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