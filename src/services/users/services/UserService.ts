import { CreateUserDTO } from '../../../dtos/user/createUserDTO';
import { LoginUserDTO } from '../../../dtos/user/loginUserDTO';
import { UserDocument } from '../../../models/UserDocument';

export interface UserService {
	getUsers(): Promise<Array<UserDocument>>;
	getUser(id: string): Promise<UserDocument | null>;
	deleteUser(id: string): Promise<boolean>
	createUser(userData: CreateUserDTO): Promise<UserDocument | null>;
	loginUser(loginData: LoginUserDTO): Promise<{user: UserDocument; token: string} | null>;
}
