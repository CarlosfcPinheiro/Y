// Import modules ==============
const morgan = require('morgan');
const express = require('express');
// Local Routes
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

// Server config =============
const server = express();
const port = 3000;

// Middlewares ============
server.use(morgan('tiny'));
server.use('/api/v1/users', userRouter);
server.use('/api/v1/post', postRouter);

server.get('/', (req, res) => {
    res.send('<h1>Welcome to Y API!</h1>');
    res.end();
});

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});