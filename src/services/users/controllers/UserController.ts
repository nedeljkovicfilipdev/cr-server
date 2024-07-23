import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { CreateUserDTO } from '../../../dtos/user/createUserDTO';
import { UserDocument } from '../../../models/UserDocument';
import TYPES from '../../../types/Identifiers';
import { UserService } from '../services/UserService';
import { LoginUserDTO } from '../../../dtos/user/loginUserDTO';
import { TokenBlacklist } from '../../../models/TokenBlacklistDocument';

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

	async deleteUser(request: Request<{ id: string }>, response: Response): Promise<void> {
		const id: string = request.params.id;
		const success = await this.userService.deleteUser(id);
		if (success) {
		  response.status(200).send({ message: 'User deleted successfully' });
		} else {
		  response.status(404).send({ message: 'User not found' });
		}
	  }

	async createUser(request: Request, response: Response<UserDocument | null>): Promise<void> {
		const userData: CreateUserDTO = request.body;
		const user = await this.userService.createUser(userData);
		response.status(201).send(user);
	}

	async loginUser(request: Request, response: Response<{user: UserDocument; token: string} | {message: string}>) : Promise<void>{
		const loginData: LoginUserDTO = request.body;
		const result = await this.userService.loginUser(loginData);
		if(result){
			const {user, token} = result
			response.status(200).send({user, token})
		} else {
			response.status(401).send({message: 'Invalid Credentials'})
		}
	}

	async signOut(req: Request, res: Response): Promise<void> {
		const token = req.headers['authorization']?.split(' ')[1];
	
		if (!token) {
		  res.status(400).json({ message: 'No token provided' });
		  return;
		}
	
		await TokenBlacklist.create({ token });
		res.status(200).json({ message: 'Signed out successfully' });
	  }
}
