import { sign, verify } from 'jsonwebtoken';

import ITokenOptionsDTO from '@modules/users/dtos/ITokenOptionsDTO';
import ITokenProvider from '../models/ITokenProvider';

class JSONWebTokenProvider implements ITokenProvider {
  public signToken(
    payload: string | object,
    secret: string,
    options: ITokenOptionsDTO,
  ): string {
    return sign(payload, secret, options);
  }

  public verifyToken(token: string, secret: string): string | object {
    return verify(token, secret);
  }
}

export default JSONWebTokenProvider;
