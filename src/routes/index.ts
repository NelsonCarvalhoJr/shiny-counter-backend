import { Router } from 'express';

import gamesRouter from './games.routes';
import locationsRouter from './locations.routes';
import methodsRouter from './methods.routes';
import pokemonsRouter from './pokemons.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/games', gamesRouter);
routes.use('/locations', locationsRouter);
routes.use('/methods', methodsRouter);
routes.use('/pokemon', pokemonsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

export default routes;
