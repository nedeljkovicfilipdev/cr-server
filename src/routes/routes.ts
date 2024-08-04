import { Router } from 'express';
import { userRouter } from './userRouter';
import { emailRouter } from './emailRouter';

export const routes = Router();

routes.get('/test', (req, res) => res.send('Test route'));
routes.use('/users',  userRouter);
routes.use('/emails', emailRouter);

