import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

import ITokenProvider from './TokenProvider/models/ITokenProvider';
import JSONWebTokenProvider from './TokenProvider/implementations/JSONWebTokenProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<ITokenProvider>(
  'TokenProvider',
  JSONWebTokenProvider,
);
