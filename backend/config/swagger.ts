import { swaggerBookSchema } from '../src/domain/entities/Book';
import { swaggerMemberSchema } from '../src/domain/entities/Member';

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Library System API',
      version: '1.0.0',
      description: 'API documentation for the library system',
    },
    servers: [
      {
        url: 'http://localhost:' + process.env.PORT || 3000,
      },
    ],
    components: {
      schemas: {
        Book: swaggerBookSchema,
        Member: swaggerMemberSchema,
      },
    },
  },
  apis: ['./src/interfaces/http/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
