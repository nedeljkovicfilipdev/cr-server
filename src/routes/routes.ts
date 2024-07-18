import { Router } from 'express';
import { defaultRouter } from './defaultRouter';

export const routes = Router();

routes.use('/', defaultRouter);
//routes.use('/users', userRouter);
