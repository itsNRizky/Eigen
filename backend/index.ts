import express from 'express';
import { PrismaClient } from '@prisma/client';
import booRoutes from './src/interfaces/http/routes/BookRoutes';
import memberRoutes from './src/interfaces/http/routes/MemberRoutes';

const app = express();
const morgan = require('morgan');
const { swaggerUi, swaggerDocs } = require('./config/swagger');

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/books', booRoutes);
app.use('/api/members', memberRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Database connection has been established successfully.');
    app.listen(PORT, () => {
      console.log('Server is running on port ' + PORT);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
