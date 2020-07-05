const Yup = require('yup')
const Pokemon = require('../models/pokemon')
const User = require('../models/user')
const { Op } = require('sequelize')

class PokemonController {

  async list(req, res) {
    const { userId } = req
    const name = req.query.name || ''
    const rarity = req.query.rarity || ''

    const query = {}

    if (name) {
      query.name = { [Op.iLike]: name+'%' }
    }
    if (rarity) {
      query.rarity = rarity
    }

    let pokemons = await Pokemon.findAll({
      order: [['id', 'ASC']],
      where: query,
      include: {
        association: 'users',
        attributes: ['name'],
        through: { attributes: [] },
        where: {
          id: userId
        },
        required: false
      }
    })

    pokemons.forEach(pokemon => {
      if (pokemon.users.length) {
        pokemon.owned = true
      } else {
        pokemon.owned = false
      }
    })

    return res.json(pokemons)
  }

  async findById(req, res) {
    const { id } = req.params
    const { userId } = req

    const schema = Yup.number().required()
    if (!(await schema.isValid(id))) {
      return res.status(400).json({error: 'Invalid parameters'})
    }

    const pokemon = await Pokemon.findByPk(id, {
      include: {
        association: 'users',
        attributes: ['name'],
        through: {
          attributes: []
        },
        where: {
          id: userId
        },
        required: false
      }
    })

    if (!pokemon) {
      return res.status(404).json()
    }

    if (pokemon.users.length) {
      pokemon.owned = true
    } else {
      pokemon.owned = false
    }

    return res.json(pokemon)
  }
}

module.exports = new PokemonController()