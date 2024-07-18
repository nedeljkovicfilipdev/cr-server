import { ValidationError, validateOrReject } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../errors/BadRequestError';

export function validateDTO(dtoClass: any) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const dtoInstance = Object.assign(new dtoClass(), req.body, req.params);

		try {
			await validateOrReject(dtoInstance);
			next();
		} catch (errors) {
			if (errors instanceof Array && errors[0] instanceof ValidationError) {
				const messages = extractErrorMessages(errors);
				throw new BadRequestError({ code: 400, message: messages, logging: true });
			}
			res.status(400).json(errors);
		}
	};
}

function extractErrorMessages(errors: ValidationError[]): string {
	const messages: string[] = [];

	errors.forEach((error) => {
		if (error.constraints) {
			Object.values(error.constraints).forEach((message) => {
				messages.push(message);
			});
		}
		if (error.children && error.children.length) {
			messages.push(...extractErrorMessages(error.children));
		}
	});

	return messages.join(';');
}
