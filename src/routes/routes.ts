import { Router } from 'express';
import { defaultRouter } from './defaultRouter';
import { userRouter } from './userRouter';

export const routes = Router();

routes.use('/users',  userRouter);
