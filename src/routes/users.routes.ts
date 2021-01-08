import Router from 'express';

import ListUsersService from '../services/ListUsersService';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const { name, email } = request.query;

  const parsedName = name as string;
  const parsedEmail = email as string;

  const listUsers = new ListUsersService();

  const users = await listUsers.execute({
    name: parsedName,
    email: parsedEmail,
  });

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { name, email, password, old_password } = request.body;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      id,
      name,
      email,
      old_password,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteUser = new DeleteUserService();

    await deleteUser.execute({ id });

    return response.status(204).send();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
