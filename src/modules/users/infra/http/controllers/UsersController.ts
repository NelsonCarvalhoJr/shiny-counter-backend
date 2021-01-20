import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUsersService from '@modules/users/services/ListUsersService';
import ShowUserService from '@modules/users/services/ShowUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

class UsersController {
  async index(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.query;

    const parsedName = name as string;
    const parsedEmail = email as string;

    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute({
      name: parsedName,
      email: parsedEmail,
    });

    return response.json(users);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user || request.params;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({
      id,
    });

    return response.json(user);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user || request.params;

    const { name, email, password, old_password } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      name,
      email,
      old_password,
      password,
    });

    delete user.password;

    return response.json(user);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user || request.params;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({ id });

    return response.status(204).send();
  }
}

export default UsersController;
