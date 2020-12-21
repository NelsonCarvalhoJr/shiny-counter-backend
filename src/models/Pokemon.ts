import { v4 as uuid } from 'uuid';

class Pokemon {
  id: string;

  name: string;

  constructor({ name }: Omit<Pokemon, 'id'>) {
    this.id = uuid();
    this.name = name;
  }
}

export default Pokemon;
