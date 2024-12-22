// Import modules ==============
const morgan = require('morgan');
const express = require('express');
require('dotenv').config();
// Local Routes
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
// Local modules
const connectDB = require('./db/connect');
// Importing Cors config
const corsConfig = require('./utils/corsConfig');
// Swagger modules
const swaggerUI = require('swagger-ui-express');
const swaggerOp = require('./utils/swagger');
// Server config =============
const server = express();
const port = process.env.PORT || 3000;

// Middlewares ============
// Applying cors config
server.use(corsConfig);
server.use(morgan('tiny'));
server.use(express.json());
// Applying routers
server.use('/api/v1/users', userRouter);
server.use('/api/v1/posts', postRouter);
// Applying swagger-ui to /api-docs route
server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerOp));
// Set payload limit
server.use(express.json({limit: '5mb'}));
server.use(express.urlencoded({limit: '5mb', extended: true}));

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