import { CreateUserDTO } from '../../../dtos/user/createUserDTO';
import { UserDocument } from '../../../models/UserDocument';

export interface UserRepository {
	getUsers(): Promise<Array<UserDocument>>;
	getUser(id: string): Promise<UserDocument | null>;
	saveUser(user: CreateUserDTO): Promise<UserDocument>;
}
