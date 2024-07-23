import { inject, injectable } from 'inversify';
import { CreateUserDTO } from '../../../dtos/user/createUserDTO';
import { UserDocument } from '../../../models/UserDocument';
import TYPES from '../../../types/Identifiers';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from './UserService';
import { LoginUserDTO } from '../../../dtos/user/loginUserDTO';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

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

	async deleteUser(id: string): Promise<boolean> {
		return this._userRepository.deleteUser(id)
	}

	async createUser(userData: CreateUserDTO): Promise<UserDocument | null> {
		const user = await this._userRepository.saveUser(userData);
		return user;
	}

	async loginUser(loginData: LoginUserDTO): Promise<{user: UserDocument; token: string} | null>{
		const user = await this._userRepository.findByUsername(loginData.username);
		if(user && await bcrypt.compare(loginData.password, user.password)){
			const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET || '',{expiresIn:'1d'})
			return {user, token};
		}
		return null
	}
}
