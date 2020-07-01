require('./database')
const { Router } = require('express')
const UserController = require('./controllers/UserController')
const PokemonController = require('./controllers/PokemonController')
const AuthController = require('./controllers/AuthController')
const authMiddleware = require('./middlewares/auth')

const routes = new Router()

routes.get('/', (req, res) => {
  return res.json({ ok: true })
})
routes.get('/pokemons', authMiddleware, PokemonController.list)
routes.get('/pokemons/:id', authMiddleware, PokemonController.findById)

routes.post('/authenticate', AuthController.authenticate)
routes.post('/users', UserController.store)


module.exports = routes