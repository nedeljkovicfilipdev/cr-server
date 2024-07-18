import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { CreateUserDTO } from '../../../dtos/user/createUserDTO';
import { UserDocument } from '../../../models/UserDocument';
import TYPES from '../../../types/Identifiers';
import { UserService } from '../services/UserService';

@injectable()
export class UserController {
	private userService: UserService;

	constructor(@inject(TYPES.UserService) userService: UserService) {
		this.userService = userService;
	}

	async getUsers(request: Request, response: Response<Array<UserDocument>>) {
		const users = await this.userService.getUsers();
		return response.send(users);
	}

	async getUser(request: Request<{ id: string }>, response: Response<UserDocument | null>) {
		const id: string = request.params.id;
		const user = await this.userService.getUser(id);
		return response.send(user);
	}

	async createUser(request: Request, response: Response<UserDocument | null>): Promise<void> {
		const userData: CreateUserDTO = request.body;
		const user = await this.userService.createUser(userData);
		response.status(201).send(user);
	}
}
