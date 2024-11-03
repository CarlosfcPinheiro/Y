// Import modules
const morgan = require('morgan');
const express = require('express');
const server = express();
// Server port
const port = 3000;

// Middlewares
server.use(morgan('tiny'));

server.get('/', (req, res) => {
    res.send('Welcome to Y API!');
});

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});