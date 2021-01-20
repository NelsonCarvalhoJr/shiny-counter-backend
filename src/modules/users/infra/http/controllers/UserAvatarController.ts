import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';

class UserAvatarService {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user || request.params;

    const updateAvatar = container.resolve(UpdateAvatarService);

    const user = await updateAvatar.execute({
      user_id: id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}

export default UserAvatarService;
