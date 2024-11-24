// Import modules ==============
const morgan = require('morgan');
const express = require('express');
require('dotenv').config();
// Local Routes
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
// Local modules
const connectDB = require('./db/connect');
// Server config =============
const server = express();
const port = process.env.PORT || 3000;

// Middlewares ============
server.use(morgan('tiny'));
server.use(express.json());
server.use('/api/v1/users', userRouter);
server.use('/api/v1/posts', postRouter);

// Standard get request
server.get('/', (req, res) => {
    res.send('<h1>Welcome to Y API!</h1>');
    res.end();
});

// Main API start function
const startServer = async() => {
    try{
        await connectDB();
        server.listen(port, () => {
            console.log(`Listening server on port ${port}...`);
        });
    } catch(err){
        console.log(err);
    }
}

startServer();