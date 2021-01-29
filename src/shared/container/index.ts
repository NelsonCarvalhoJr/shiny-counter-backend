import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IGamesRepository from '@modules/games/repositories/IGamesRepository';
import GamesRepository from '@modules/games/infra/typeorm/repositories/GamesRepository';

import ILocationsRepository from '@modules/locations/repositories/ILocationsRepository';
import LocationsRepository from '@modules/locations/infra/typeorm/repositories/LocationsRepository';

import IMethodsRepository from '@modules/methods/repositories/IMethodsRepository';
import MethodsRepository from '@modules/methods/infra/typeorm/repositories/MethodsRepository';

import IPokemonsRepository from '@modules/pokemons/repositories/IPokemonsRepository';
import PokemonsRepository from '@modules/pokemons/infra/typeorm/repositories/PokemonsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IGamesRepository>(
  'GamesRepository',
  GamesRepository,
);

container.registerSingleton<ILocationsRepository>(
  'LocationsRepository',
  LocationsRepository,
);
container.registerSingleton<IMethodsRepository>(
  'MethodsRepository',
  MethodsRepository,
);
container.registerSingleton<IPokemonsRepository>(
  'PokemonsRepository',
  PokemonsRepository,
);
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
