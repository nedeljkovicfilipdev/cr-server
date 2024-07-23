// services/users/repositories/UserRepositoryImpl.ts
import { injectable } from 'inversify';
import { CreateUserDTO } from '../../../dtos/user/createUserDTO';
import { UserDocument, UserModel } from '../../../models/UserDocument';
import { UserRepository } from './UserRepository';
import bcrypt from 'bcryptjs';

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

  async deleteUser(id: string): Promise<boolean> {
    console.log(`Attempting to delete user with id: ${id}`);
    const result = await UserModel.findByIdAndDelete(id);
    console.log(`Result ${result}`)
    return result !== null;
  }

  async saveUser(userData: CreateUserDTO): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await UserModel.create({ ...userData, password: hashedPassword });
    return Promise.resolve(user);
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    const user = await UserModel.findOne({ username });
    return Promise.resolve(user);
  }
}
