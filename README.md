# Shiny Hunt Counter

Back-end do App de Contador para Shiny Hunters. Projeto em fase inicial de desenvolvimento.

## Entidades

| Entidades | Atributos |
| ----------- | ----------- |
| pokemon | id, name, pokedex_number |
| form | id, name, image, shiny_image, pokemon_id |
| game | id, name, generation_number |
| method | id, name |
| games_methods | id, game_id, method_id | 
| route | id, name |
| route_and_form_in_methods | id, route_id, form_id, method_id |
| user | id, name, email, password, avatar |
| hunt | id, has_shiny_charm, is_open, got_shiny, user_id |
| counter | id, value, hunt_id, form_id |


## Funcionalidades

- [x] CRUD de nomes de Pokémon
- [ ] CRUD de formas de Pokémon
- [x] CRUD de jogos de Pokémon
- [x] CRUD de métodos de Shiny Hunt
- [x] CRUD de rotas
- [ ] Relação Rota x Método x Forma
- [X] CRUD de usuários
- [ ] CRUD de caçadas
- [ ] CRUD do contador

## Iniciando o projeto

Após clonar o projeto, é necessário atualizar as dependências.

### Comandos para atualizar e executar a aplicação

```bash
yarn
yarn dev:server
```

### Configurações adicionais

- Variáveis ambiente: criar arquivo *.env* com o conteúdo de *.env.example*, para utilizar as variáveis ambientes do sistema, preenchendo todos os valores necessários
- Banco de dados: criar arquivo *ormconfig.json* com o conteúdo de *ormconfig.example.json* e configurar com os dados da conexão com o banco de dados