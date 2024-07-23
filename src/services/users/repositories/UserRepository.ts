import { CreateUserDTO } from '../../../dtos/user/createUserDTO';
import { UserDocument } from '../../../models/UserDocument';

export interface UserRepository {
	getUsers(): Promise<Array<UserDocument>>;
	getUser(id: string): Promise<UserDocument | null>;
	deleteUser(id: string): Promise<boolean>;
	saveUser(user: CreateUserDTO): Promise<UserDocument>;
	findByUsername(username: string): Promise<UserDocument | null>
}
