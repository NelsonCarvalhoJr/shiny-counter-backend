# Shiny Hunt Counter

Back-end do App de Contador para Shiny Hunters. Projeto em fase inicial de desenvolvimento.

## Entidades

| Entidades | Atributos |
| ----------- | ----------- |
| pokemon | id, name |
| form | id, name, image_url, shiny_image_url, pokemon_id |
| game | id, name |
| method | id, name, description, game_id |
| route | id, name |
| route_and_form_in_methods | id, route_id, form_id, method_id |
| user | id, name, email, password, avatar_url |
| hunt | id, has_shiny_charm, is_open, got_shiny, user_id |
| counter | id, value, hunt_id, form_id |


## Funcionalidades

- [x] CRUD de nomes de Pokémon
- [ ] CRUD de formas de Pokémon
- [ ] CRUD de jogos de Pokémon
- [ ] CRUD de métodos de Shiny Hunt
- [ ] CRUD de rotas
- [ ] Relação Rota x Método x Forma
- [ ] CRUD de usuários
- [ ] CRUD de caçadas
- [ ] CRUD do contador

## Iniciando o projeto

Após clonar o projeto, é necessário atualizar as dependências.

### Comandos para atualizar e executar a aplicação

```bash
yarn
yarn dev:server
```