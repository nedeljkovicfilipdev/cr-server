import { Request, Router } from 'express';
import { container } from '../container';
import { CreateUserDTO } from '../dtos/user/createUserDTO';
import { FindUserDTO } from '../dtos/user/findUserDTO';
import { FindUsersDTO } from '../dtos/user/findUsersDTO';
import { validateDTO } from '../utils/validateDTO';
import { UserController } from '../services/users/controllers/UserController';
import { LoginUserDTO } from '../dtos/user/loginUserDTO';
import { authMiddleware } from '../middlewares/authMiddleware';
import { checkBlacklist } from '../middlewares/checkBlacklist';

const userRouter = Router();
const userController = container.get<UserController>(UserController);

userRouter.get('/', validateDTO(FindUsersDTO), (req, res) => userController.getUsers(req, res));
userRouter.get('/:id', validateDTO(FindUserDTO), (req: Request<{ id: string }>, res) =>
	userController.getUser(req, res),
);
userRouter.delete('/:id', (req: Request<{ id: string }>, res) => userController.deleteUser(req, res));
userRouter.post('/', validateDTO(CreateUserDTO), (req, res) => userController.createUser(req, res));
userRouter.post('/login', validateDTO(LoginUserDTO), (req, res) => userController.loginUser(req, res));
userRouter.post('/logout', authMiddleware, checkBlacklist, (req, res) => userController.signOut(req, res));

export { userRouter };
