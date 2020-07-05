require('./database')
const { Router } = require('express')
const UserController = require('./controllers/UserController')
const MeController = require('./controllers/MeController')
const PokemonController = require('./controllers/PokemonController')
const ChestController = require('./controllers/ChestController')
const AuthController = require('./controllers/AuthController')
const authMiddleware = require('./middlewares/auth')

const routes = new Router()

routes.get('/', (req, res) => {
  return res.json({ ok: true })
})
routes.post('/authenticate', AuthController.authenticate)
routes.post('/users', UserController.store)


routes.use(authMiddleware)
routes.get('/pokemons', PokemonController.list)
routes.get('/pokemons/:id', PokemonController.findById)
routes.get('/me', MeController.find)
routes.post('/me/buy/:pokemonId', MeController.buyPokemon)
routes.get('/chests', ChestController.list)
routes.post('/chests', ChestController.store)
routes.post('/chests/buy/:chestId', ChestController.buy)


module.exports = routes