import { Router } from 'express';

import gamesRouter from '@modules/games/infra/http/routes/games.routes';
import locationsRouter from '@modules/locations/infra/http/routes/locations.routes';
import methodsRouter from '@modules/methods/infra/http/routes/methods.routes';
import pokemonsRouter from '@modules/pokemons/infra/http/routes/pokemons.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/games', gamesRouter);
routes.use('/locations', locationsRouter);
routes.use('/methods', methodsRouter);
routes.use('/pokemon', pokemonsRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

export default routes;
