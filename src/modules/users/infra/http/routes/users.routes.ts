import { Router } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });
    delete user.password;

    return res.send(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default userRouter;
