import { Router } from 'express';
import { getRoot } from '../services/handlers/defaultHandlers';

export const defaultRouter = Router();

defaultRouter.get('/', getRoot);
