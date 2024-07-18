import mongoose from 'mongoose';
import { CreateUserDTO } from '../../../dtos/user/createUserDTO';
import { UserDocument } from '../../../models/UserDocument';
import { UserRepository } from './UserRepository';
export class UserRepositoryMock implements UserRepository {
	private users: UserDocument[] = [];

	async getUsers(): Promise<UserDocument[]> {
		return Promise.resolve(this.users);
	}

	async getUser(id: string): Promise<UserDocument | null> {
		const user = this.users.find((user) => user._id === id) || null;
		return Promise.resolve(user);
	}

	async saveUser(userData: CreateUserDTO): Promise<UserDocument> {
		const newUser: UserDocument = {
			_id: this.generateNewId(),
			name: userData.name,
			email: userData.email,
			password: userData.password,
		} as UserDocument;
		this.users.push(newUser);
		return Promise.resolve(newUser);
	}

  generateNewId() {
    return new mongoose.Types.ObjectId()
  }
}