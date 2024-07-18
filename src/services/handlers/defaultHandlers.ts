import { Request, Response } from 'express';

export const getRoot = async (request: Request, response: Response) => {
	console.log("usao")
	return response.send({ hello: 'world' });
};
