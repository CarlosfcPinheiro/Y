// Importing modules
// Using cors to manage cors (Cross-Origin Resource Sharing) to manage ambient permissions
const cors = require('cors');
// Set configs
const corsConfig = cors({
    origin: ['http://localhost:5500', 'http://localhost:3000', 'https://prog-webii-projeto.onrender.com', 'https://prog-web-ii-projeto.vercel.app'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
});
// Exporting configs
module.exports = corsConfig;