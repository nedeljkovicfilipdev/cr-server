import { CreateUserDTO } from '../../../dtos/user/createUserDTO';
import { UserDocument } from '../../../models/UserDocument';

export interface UserService {
	getUsers(): Promise<Array<UserDocument>>;
	getUser(id: string): Promise<UserDocument | null>;
	createUser(userData: CreateUserDTO): Promise<UserDocument | null>;
}
