require('./database')
const { Router } = require('express')
const UserController = require('./controllers/UserController')
const PokemonController = require('./controllers/PokemonController')

const routes = new Router()

routes.get('/', (req, res) => {
  return res.json({ ok: true })
})
routes.get('/pokemons', PokemonController.list)
routes.get('/pokemons/:id', PokemonController.findById)

routes.post('/users', UserController.store)


module.exports = routes