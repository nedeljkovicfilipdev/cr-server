import { injectable } from 'inversify';
import { CreateUserDTO } from '../../../dtos/user/createUserDTO';
import { UserDocument, UserModel } from '../../../models/UserDocument';
import { UserRepository } from './UserRepository';

@injectable()
export class UserRepositoryImpl implements UserRepository {
	async getUsers(): Promise<Array<UserDocument>> {
		const users = await UserModel.find();
		return Promise.resolve(users);
	}

	async getUser(id: string): Promise<UserDocument | null> {
		const user = await UserModel.findById(id);
		return Promise.resolve(user);
	}

	async saveUser(userData: CreateUserDTO): Promise<UserDocument> {
		const user = await UserModel.create(userData);
		return Promise.resolve(user);
	}
}
