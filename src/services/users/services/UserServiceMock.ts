import { inject, injectable } from "inversify";
import { CreateUserDTO } from "../../../dtos/user/createUserDTO";
import { UserDocument, UserModel } from "../../../models/UserDocument";
import { UserService } from "./UserService";
import { Types } from "mongoose";
import { UserRepositoryMock } from "../repositories/UserRepositoryMock";
import TYPES from "../../../types/Identifiers";

@injectable()
export class UserServiceMock implements UserService {

    private _userRepository: UserRepositoryMock;

	constructor(@inject(TYPES.UserRepository) userRepository: UserRepositoryMock) {
		this._userRepository = userRepository;
	}

    private users: UserDocument[] = [
        new UserModel({
            _id: new Types.ObjectId().toHexString(),
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'test111'
        }),
        new UserModel({
            _id: new Types.ObjectId().toHexString(),
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            password: 'test222'
        })
    ];
    

    async getUsers(): Promise<UserDocument[]> {
        return this._userRepository.getUsers()
    }
    async getUser(id: string): Promise<UserDocument | null> {
        const user = this.users.find(user => user._id === id)
        return this._userRepository.getUser(id) || null
    }
    async createUser(userData: CreateUserDTO): Promise<UserDocument | null> {
        const newUser = new UserModel({
            _id: new Types.ObjectId().toHexString(),
            name: "Filip",
            email: "nedeljkovicf.career@gmail.com",
            password: "admin"
        })

        this.users.push(newUser as UserDocument)
        return this._userRepository.saveUser(newUser)
    }
    
}