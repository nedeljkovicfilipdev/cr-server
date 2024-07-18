import { Request, Router } from 'express';
import { container } from '../container';
import { CreateUserDTO } from '../dtos/user/createUserDTO';
import { FindUserDTO } from '../dtos/user/findUserDTO';
import { FindUsersDTO } from '../dtos/user/findUsersDTO';
import { UserController } from '../services/users/controllers/userController';
import { validateDTO } from '../utils/validateDTO';

const userRouter = Router();
const userController = container.get<UserController>(UserController);

userRouter.get('/', validateDTO(FindUsersDTO), (req, res) => userController.getUsers(req, res));
userRouter.get('/:id', validateDTO(FindUserDTO), (req: Request<{ id: string }>, res) =>
	userController.getUser(req, res),
);
userRouter.post('/', validateDTO(CreateUserDTO), (req, res) => userController.createUser(req, res));

export { userRouter };
