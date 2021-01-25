import ITokenOptionsDTO from '@modules/users/dtos/ITokenOptionsDTO';

export default interface ITokenProvider {
  signToken(
    payload: string | object,
    secret: string,
    options: ITokenOptionsDTO,
  ): string;
  verifyToken(token: string, secret: string): string | object;
}
