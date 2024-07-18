import { Container } from 'inversify';
import 'reflect-metadata';
import { UserController } from './services/users/controllers/UserController';
import { UserRepository } from './services/users/repositories/UserRepository';
import { UserRepositoryImpl } from './services/users/repositories/UserRepositoryImpl';
import { UserService } from './services/users/services/UserService';
import { UserServiceImpl } from './services/users/services/UserServiceImpl';
import TYPES from './types/Identifiers';

const container = new Container();

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl).inSingletonScope();
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl).inSingletonScope();

container.bind<UserController>(UserController).toSelf();

export { container };
