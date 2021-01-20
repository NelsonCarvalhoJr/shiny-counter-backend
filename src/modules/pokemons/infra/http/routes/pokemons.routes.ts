import Router from 'express';

import PokemonsController from '../controllers/PokemonsController';

const pokemonsRouter = Router();

const pokemonsController = new PokemonsController();

pokemonsRouter.get('/', pokemonsController.index);
pokemonsRouter.get('/:id', pokemonsController.show);
pokemonsRouter.post('/', pokemonsController.create);
pokemonsRouter.put('/:id', pokemonsController.update);
pokemonsRouter.delete('/:id', pokemonsController.delete);

export default pokemonsRouter;
