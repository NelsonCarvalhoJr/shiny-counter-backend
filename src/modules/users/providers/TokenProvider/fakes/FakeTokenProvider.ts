import ITokenOptionsDTO from '@modules/users/dtos/ITokenOptionsDTO';
import ITokenProvider from '../models/ITokenProvider';

class JSONWebTokenProvider implements ITokenProvider {
  public signToken(
    payload: string | object,
    secret: string,
    options: ITokenOptionsDTO,
  ): string {
    return options.subject || 'this-is-a-token';
  }

  public verifyToken(token: string, _: string): string | object {
    return {
      sub: token,
    };
  }
}

export default JSONWebTokenProvider;
