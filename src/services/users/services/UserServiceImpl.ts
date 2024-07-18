import { inject, injectable } from 'inversify';
import { CreateUserDTO } from '../../../dtos/user/createUserDTO';
import { UserDocument } from '../../../models/UserDocument';
import TYPES from '../../../types/Identifiers';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from './UserService';

@injectable()
export class UserServiceImpl implements UserService {
	
	private _userRepository: UserRepository;

	constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
		this._userRepository = userRepository;
	}

	async getUsers(): Promise<Array<UserDocument>> {
		return this._userRepository.getUsers();
	}

	async getUser(id: string): Promise<UserDocument | null> {
		const user = await this._userRepository.getUser(id);
		return user;
	}

	async createUser(userData: CreateUserDTO): Promise<UserDocument | null> {
		const user = await this._userRepository.saveUser(userData);
		return user;
	}
}
