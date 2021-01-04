import { Router } from 'express';

import pokemonRouter from './pokemon.routes';

const routes = Router();

routes.use('/pokemon', pokemonRouter);

export default routes;
