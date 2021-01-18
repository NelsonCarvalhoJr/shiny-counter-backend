import Router from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

// Manage Profile
usersRouter.put('/profile', ensureAuthenticated, async (request, response) => {
  const { id } = request.user;

  const { name, email, password, old_password } = request.body;

  const usersRepository = new UsersRepository();
  const updateUser = new UpdateUserService(usersRepository);

  const user = await updateUser.execute({
    id,
    name,
    email,
    old_password,
    password,
  });

  delete user.password;

  return response.json(user);
});
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();
    const updateAvatar = new UpdateAvatarService(usersRepository);

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

// Admin CRUD
usersRouter.get('/', async (request, response) => {
  const { name, email } = request.query;

  const parsedName = name as string;
  const parsedEmail = email as string;

  const usersRepository = new UsersRepository();

  const users = await usersRepository.all({
    name: parsedName,
    email: parsedEmail,
    order: {
      name: 'ASC',
    },
  });

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const usersRepository = new UsersRepository();
  const createUser = new CreateUserService(usersRepository);

  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});

usersRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  const { name, email, password, old_password } = request.body;

  const usersRepository = new UsersRepository();
  const updateUser = new UpdateUserService(usersRepository);

  const user = await updateUser.execute({
    id,
    name,
    email,
    old_password,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar/:id',
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();
    const updateAvatar = new UpdateAvatarService(usersRepository);

    const user = await updateAvatar.execute({
      user_id: request.params.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const usersRepository = new UsersRepository();
  const deleteUser = new DeleteUserService(usersRepository);

  await deleteUser.execute({ id });

  return response.status(204).send();
});

export default usersRouter;
