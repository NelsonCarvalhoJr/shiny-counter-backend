import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

import User from '../models/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User);

    const user = await usersRepository
      .createQueryBuilder()
      .where('LOWER(email) = LOWER(:email)', { email })
      .getOne();

    if (!user) {
      throw Error('Invalid email/password combination');
    }

    const passwordMached = await compare(password, user?.password as string);

    if (!passwordMached) {
      throw Error('Invalid email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret as string, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
