import express from 'express';
import { notFoundErrorHandler } from './middlewares/error/notFoundErrorHandler';
import { errorHandler } from './middlewares/error/errorHandler';
import { routes } from './routes/routes';
import cors from 'cors'
import mongoose from 'mongoose';

export const buildApp = async () => {
    const app = express();

    // Configuration
    app.use(express.json());

    //Enable CORS
    app.use(cors())

    //MongoDB Connection
    const mongoUri = '';
    try{
        await mongoose.connect(mongoUri)
        console.log('Connected to MongoDB:',mongoUri)
    }catch(error){
        console.error('Error connecting to MongoDB:', error);
        process.exit(1)
    }

    // Routes
    app.use('/', routes);

    // Error Handlers
    app.use(notFoundErrorHandler);
    app.use(errorHandler);

    return app;
};
