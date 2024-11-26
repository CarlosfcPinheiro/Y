// Importing modules
// Using cors to manage cors (Cross-Origin Resource Sharing) to manage ambient permissions
const cors = require('cors');
// Set configs
const corsConfig = cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
});
// Exporting configs
module.exports = corsConfig;