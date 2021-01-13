import Router from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import ListUsersService from '../services/ListUsersService';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';
import UpdateAvatarService from '../services/UpdateAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

// Manage Profile
usersRouter.put('/profile', ensureAuthenticated, async (request, response) => {
  try {
    const { id } = request.user;

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
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateAvatar = new UpdateAvatarService();

      const user = await updateAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      delete user.password;

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
);

// Admin CRUD
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

usersRouter.patch(
  '/avatar/:id',
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateAvatar = new UpdateAvatarService();

      const user = await updateAvatar.execute({
        user_id: request.params.id,
        avatarFilename: request.file.filename,
      });

      delete user.password;

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
);

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
