// Importing modules
const swaggerJSDoc = require('swagger-jsdoc');
// Swagger configuration
const swaggerOp = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Y API',
            version: '1.0.0',
            description: 'Documentação da API do Y'
        },
        servers:[
            {
                url:'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'],
};
// Generate swagger options
const swaggerDocs = swaggerJSDoc(swaggerOp);
// Exporting swagger docs
module.exports = swaggerDocs;