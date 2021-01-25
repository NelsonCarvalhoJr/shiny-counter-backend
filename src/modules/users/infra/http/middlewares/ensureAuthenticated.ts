import { Request, Response, NextFunction } from 'express';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import JSONWebTokenProvider from '@modules/users/providers/TokenProvider/implementations/JSONWebTokenProvider';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  const tokenProvider = new JSONWebTokenProvider();

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = tokenProvider.verifyToken(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('invalid JWT token', 401);
  }
}

export default ensureAuthenticated;
