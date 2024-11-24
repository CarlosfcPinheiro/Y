// Importing kwt
const jwt = require('jsonwebtoken');
// Getting var envs
require('dotenv').config();

// Middleware to authorization and restrict routes
const authToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // Case that authheader exist and extract token
    const token = authHeader && authHeader.split(' ')[1];
    if (!token){
        return res.status(401).json({
            message: 'Access denied. Token was not provided.'
        });
    }

    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err){
            return res.status(403).json({
                message: 'Invalid token.',
                error: err.message
            });
        }

        req.user = user;
    });
    next();
}
// Exporting middleware
module.exports = authToken;