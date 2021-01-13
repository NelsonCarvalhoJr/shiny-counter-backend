import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadCOnfig from '../config/upload';

import User from '../models/User';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = await getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Invalid User ID');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadCOnfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateAvatarService;
