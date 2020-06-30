const Pokemon = require('../models/pokemon')

class PokemonController {

  async list(req, res) {
    const pokemons = await Pokemon.findAll()
    return res.json(pokemons)
  }

  async findById(req, res) {
    const { id } = req.params
    const pokemon = await Pokemon.findByPk(id)

    if (!pokemon) {
      return res.status(404).send()
    }

    return res.json(pokemon)
  }
}

module.exports = new PokemonController()