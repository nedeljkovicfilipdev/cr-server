import { NextFunction, Request, Response } from 'express';

export function notFoundErrorHandler(req: Request, res: Response, next: NextFunction) {
	return res.status(404).send({ errors: [{ message: 'Route not found' }] });
}
